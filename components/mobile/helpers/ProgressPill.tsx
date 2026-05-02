import { cn } from "@/lib/utils";

function ProgressPill({ value }: { value?: string }) {
  if (!value) return null;

  const v = value.toLowerCase();
  const inProgress = v.includes("progress");
  const closed = v.includes("closed") || v.includes("done");

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-0.5 text-xs lowercase tracking-wide ring-1",
        inProgress
          ? "bg-primary/10 text-foreground/80 ring-primary/20"
          : closed
            ? "bg-muted/60 text-muted-foreground/70 ring-border/25"
            : "bg-muted/60 text-muted-foreground/70 ring-border/25"
      )}
    >
      {value}
    </span>
  );
}

export default ProgressPill