"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { RESUME } from "@/constants/RESUME";
import { HELP_ROWS, MAN_PAGES, TERMINAL_BANNER, VFS_HOME, type VfsNode } from "@/constants/TERMINAL";
import { Line } from "@/types/terminal";


function tokenize(input: string): string[] {
  const out: string[] = [];
  const re = /"([^"]*)"|(\S+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(input))) out.push(m[1] ?? m[2]);
  return out;
}

function joinPath(parts: string[]) {
  return parts.length ? `~/${parts.join("/")}` : "~";
}

function resolveToParts(cwdParts: string[], raw?: string) {
  if (!raw || raw.trim() === "" || raw.trim() === "~") return [];
  const s = raw.trim();

  const base = s.startsWith("~/") ? [] : s.startsWith("/") ? [] : [...cwdParts];
  const rel = s.replace(/^~\//, "").replace(/^\//, "");
  for (const p of rel.split("/").filter(Boolean)) {
    if (p === ".") continue;
    if (p === "..") base.pop();
    else base.push(p);
  }
  return base;
}

function getNode(root: VfsNode, parts: string[]): VfsNode | null {
  let node: VfsNode = root;
  for (const p of parts) {
    if (node.type !== "dir") return null;
    node = node.entries[p];
    if (!node) return null;
  }
  return node;
}

function listDir(node: VfsNode, showAll: boolean) {
  if (node.type !== "dir") return [];
  return Object.keys(node.entries)
    .filter((name) => showAll || !name.startsWith(".") && !(node.entries[name].type === "file" && (node.entries[name] as any).hidden))
    .sort((a, b) => a.localeCompare(b));
}

export default function Terminal() {
  const { basics, summary, skills } = RESUME;

  const user = basics.handle || "user";
  const host = "mac-book air m5";

  const [cwdParts, setCwdParts] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number | null>(null);

  const [lines, setLines] = useState<Line[]>(() => [
    ...TERMINAL_BANNER.map((t) => ({ kind: "banner" as const, text: t, dim: true })),
    { kind: "out" as const, text: "" },
  ]);

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const promptLeft = useMemo(() => `${user}@${host}`, [user]);
  const promptCwd = useMemo(() => (cwdParts.length ? `~/${cwdParts.join("/")}` : "~"), [cwdParts]);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight });
  }, [lines]);

  const print = (text: string | string[], dim = false) => {
    const arr = Array.isArray(text) ? text : text.split("\n");
    setLines((prev) => [...prev, ...arr.map((t) => ({ kind: "out" as const, text: t, dim }))]);
  };

  const run = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    setLines((prev) => [
      ...prev,
      { kind: "cmd", text: `${promptLeft} ${promptCwd} % ${trimmed}` },
    ]);

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIdx(null);

    const [cmd, ...args] = tokenize(trimmed);

    // Built-ins
    if (cmd === "clear") {
      setLines([{ kind: "out", text: "" }]);
      return;
    }

    if (cmd === "banner") {
      print(TERMINAL_BANNER, true);
      return;
    }

    if (cmd === "help") {
      const rows = HELP_ROWS.map((r) => {
        const left = `${r.cmd}${r.args ? ` ${r.args}` : ""}`;
        return `${left.padEnd(18, " ")} ${r.desc}`;
      });
      print(["Commands:", ...rows]);
      return;
    }

    if (cmd === "man") {
      const target = args[0];
      if (!target) return print('man: missing command. Try: man help');
      const page = MAN_PAGES[target];
      if (!page) return print(`man: no manual entry for ${target}`);
      print(page);
      return;
    }

    if (cmd === "whoami") {
      print([
        basics.name,
        basics.headline,
        `${basics.location} · ${basics.email}`,
        "",
        summary,
      ]);
      return;
    }

    if (cmd === "pwd") {
      const path = cwdParts.length ? `/Users/${user}/${cwdParts.join("/")}` : `/Users/${user}`;
      print(path);
      return;
    }

    if (cmd === "cd") {
      const nextParts = resolveToParts(cwdParts, args[0] ?? "~");
      const node = getNode(VFS_HOME, nextParts);
      if (!node) return print(`cd: no such file or directory: ${args[0] ?? ""}`);
      if (node.type !== "dir") return print(`cd: not a directory: ${args[0] ?? ""}`);
      setCwdParts(nextParts);
      return;
    }

    if (cmd === "ls") {
      const showAll = args.includes("-a");
      const pathArg = args.find((a) => !a.startsWith("-"));
      const parts = resolveToParts(cwdParts, pathArg);
      const node = getNode(VFS_HOME, parts);
      if (!node) return print(`ls: cannot access '${pathArg}': No such file or directory`);
      if (node.type === "file") return print(pathArg ?? "");
      const names = listDir(node, showAll);
      print(names.join("  "));
      return;
    }

    if (cmd === "cat") {
      const p = args[0];
      if (!p) return print("cat: missing file operand");
      const parts = resolveToParts(cwdParts, p);
      const node = getNode(VFS_HOME, parts);
      if (!node) return print(`cat: ${p}: No such file or directory`);
      if (node.type !== "file") return print(`cat: ${p}: Is a directory`);
      print(node.content.replace(/\n$/, ""));
      return;
    }

    if (cmd === "date") {
      print(new Date().toString());
      return;
    }

    if (cmd === "echo") {
      print(args.join(" "));
      return;
    }

    if (cmd === "history") {
      if (!history.length) return print("history: empty");
      print(history.map((h, i) => `${String(i + 1).padStart(3, " ")}  ${h}`));
      return;
    }

    if (cmd === "env") {
      print([
        `USER=${user}`,
        `HOST=${host}`,
        `PWD=${joinPath(cwdParts)}`,
        `SHELL=/bin/zsh`,
        `THEME=dark`,
      ]);
      return;
    }

    if (cmd === "which") {
      const target = args[0];
      if (!target) return print("which: missing command");
      const known = new Set(HELP_ROWS.map((r) => r.cmd));
      print(known.has(target) ? `/usr/bin/${target}` : `${target} not found`);
      return;
    }

    if (cmd === "curl") {
      const url = args[0];
      if (!url) return print("curl: missing URL");
      print([
        "HTTP/1.1 200 OK",
        "content-type: text/plain; charset=utf-8",
        "",
        `(mock) fetched: ${url}`,
      ]);
      return;
    }

    if (cmd === "ping") {
      const hostArg = args[0];
      if (!hostArg) return print("ping: missing host");
      print([
        `PING ${hostArg} (1.1.1.1): 56 data bytes`,
        `64 bytes from 1.1.1.1: icmp_seq=0 ttl=57 time=12.3 ms`,
        `64 bytes from 1.1.1.1: icmp_seq=1 ttl=57 time=11.9 ms`,
        "",
        `--- ${hostArg} ping statistics ---`,
        "2 packets transmitted, 2 packets received, 0.0% packet loss",
      ]);
      return;
    }

    if (cmd === "sudo") {
      print("sudo: a portfolio terminal cannot elevate privileges.");
      return;
    }

    if (cmd === "neofetch") {
      const langs = skills.languages.slice(0, 4).join(", ");
      print([
        "       .--.",
        "      |o_o |",
        "      |:_/ |",
        "     //   \\ \\",
        "    (|     | )",
        "   /'\\_   _/`\\",
        "   \\___)=(___/",
        "",
        `${user}@${host}`,
        `OS: Mac OS  v4.5.16`,
        `Shell: zsh (mock)`,
        `Uptime: 3 hrs (mock)`,
        `Languages: ${langs}${skills.languages.length > 4 ? ", ..." : ""}`,
      ]);
      return;
    }

    if (cmd === "open") {
      const section = (args[0] || "").toLowerCase();
      if (!section) return print("open: missing section. Example: open resume");


      print(`opening: ${section} (if wired)`);
      return;
    }

    if (cmd === "exit") {
      print("Use the Dock close button (red dot).");
      return;
    }

    print(`${cmd}: command not found. Try: help`);
  };

  return (
    <div
      className={[
        "h-105 w-190 max-w-[92vw] max-h-[55vh]",
        "flex flex-col",
        "font-mono select-text",
      ].join(" ")}
      onMouseDown={() => inputRef.current?.focus()}
    >
      <div
        ref={scrollerRef}
        className={[
          "flex-1 overflow-y-auto pr-2",
          "text-[0.95rem] leading-relaxed",
          "text-muted-foreground/65",
          "whitespace-pre-wrap",
        ].join(" ")}
      >
        {lines.map((l, idx) => (
          <div
            key={idx}
            className={[
              l.kind === "cmd" ? "text-foreground/75" : "",
              l.dim ? "opacity-70" : "",
            ].join(" ")}
          >
            {l.text || "\u00A0"}
          </div>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-border/20 no-scrollbar">
        <div className="flex items-center gap-2 text-foreground/80 no-scrollbar">
          <span className="shrink-0 opacity-80">{promptLeft}</span>
          <span className="shrink-0 text-muted-foreground/70">{promptCwd}</span>
          <span className="shrink-0 opacity-80">%</span>

          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-foreground/80 placeholder:text-muted-foreground/40 overflow-hidden no-scrollbar"
            autoCapitalize="none"
            autoFocus={true}
            autoCorrect="off"
            spellCheck={false}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const v = input;
                setInput("");
                run(v);
              }

              if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                setLines([{ kind: "out", text: "" }]);
              }

              if (e.key === "ArrowUp") {
                e.preventDefault();
                if (!history.length) return;
                setHistoryIdx((prev) => {
                  const next = prev === null ? history.length - 1 : Math.max(0, prev - 1);
                  setInput(history[next] ?? "");
                  return next;
                });
              }

              if (e.key === "ArrowDown") {
                e.preventDefault();
                if (!history.length) return;
                setHistoryIdx((prev) => {
                  if (prev === null) return null;
                  const next = prev + 1;
                  if (next >= history.length) {
                    setInput("");
                    return null;
                  }
                  setInput(history[next] ?? "");
                  return next;
                });
              }
            }}
            placeholder='Type "help"…'
          />
        </div>
      </div>
    </div>
  );
}