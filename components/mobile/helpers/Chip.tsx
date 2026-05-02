function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md bg-muted/60 ring-1 ring-border/25 px-2.5 py-1 text-[0.65rem] text-foreground/80">
      {children}
    </span>
  );
}

export default Chip