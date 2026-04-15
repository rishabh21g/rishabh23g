export type HelpRow = { cmd: string; args?: string; desc: string };

export const TERMINAL_BANNER: string[] = [
  `Mac OS  v4.05.16  (c) ${new Date().getFullYear()} Apple Inc. All rights reserved.`,
  'Type "help" for available commands.',
];

export const HELP_ROWS: HelpRow[] = [
  { cmd: "help", desc: "Show available commands" },
  { cmd: "whoami", desc: "About me" },
  { cmd: "ls", args: "[-a] [path]", desc: "List directory" },
  { cmd: "cat", args: "<file>", desc: "Print file" },
  { cmd: "cd", args: "[dir]", desc: "Change directory" },
  { cmd: "pwd", desc: "Working directory" },
  { cmd: "date", desc: "Current date/time" },
  { cmd: "echo", args: "<text>", desc: "Echo text" },
  { cmd: "open", args: "<section>", desc: "Open a window" },
  { cmd: "neofetch", desc: "System info" },
  { cmd: "ping", args: "<host>", desc: "Ping a host" },
  { cmd: "man", args: "<cmd>", desc: "Manual page" },
  { cmd: "history", desc: "Command history" },
  { cmd: "env", desc: "Environment variables" },
  { cmd: "which", args: "<cmd>", desc: "Locate a command" },
  { cmd: "curl", args: "<url>", desc: "Fetch a URL" },
  { cmd: "sudo", args: "<cmd>", desc: "Superuser" },
  { cmd: "clear", desc: "Clear terminal (Ctrl+L)" },

  // a few extras
  { cmd: "banner", desc: "Show the boot banner again" },
  { cmd: "exit", desc: "Close (prints hint)" },
];

export type VfsNode =
  | { type: "dir"; entries: Record<string, VfsNode> }
  | { type: "file"; content: string; hidden?: boolean };

export const VFS_HOME: VfsNode = {
  type: "dir",
  entries: {
    "about.txt": {
      type: "file",
      content:
        "This is a tiny terminal for my portfolio.\nTry: whoami, neofetch, open resume\n",
    },
    "readme.md": {
      type: "file",
      content:
        "# Portfolio OS\nA fake terminal UI with real command parsing.\nType `help`.\n",
    },
    ".secret": { type: "file", hidden: true, content: "nice try :)\n" },
    projects: {
      type: "dir",
      entries: {
        "featured.txt": {
          type: "file",
          content: "Try: open resume\nOr: cat projects/featured.txt\n",
        },
      },
    },
    notes: {
      type: "dir",
      entries: {
        "todo.txt": {
          type: "file",
          content: "- ship\n- iterate\n",
        },
      },
    },
  },
};

export const MAN_PAGES: Record<string, string[]> = {
  help: ["help", "  Prints available commands."],
  whoami: ["whoami", "  Prints a short intro."],
  ls: ["ls [-a] [path]", "  Lists directory entries."],
  cat: ["cat <file>", "  Prints file contents."],
  cd: ["cd [dir]", "  Changes current directory."],
  pwd: ["pwd", "  Prints the current directory."],
  open: ["open <section>", "  Attempts to open a desktop window (About/Resume/etc)."],
  neofetch: ["neofetch", "  Prints a small system summary."],
  ping: ["ping <host>", "  Prints a mocked ping result."],
  curl: ["curl <url>", "  Prints a mocked fetch result."],
  sudo: ["sudo <cmd>", "  Always denied (this is a portfolio)."],
};