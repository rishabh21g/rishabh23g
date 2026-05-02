import { Button } from "@/components/ui/button";
import { ResumeLink } from "@/constants/RESUME";

function isExternalHref(href: string) {
return /^https?:\/\//i.test(href);
}
export function LinkButton({ link }: { link: ResumeLink }) {
  const Icon = link.icon;
  const external = isExternalHref(link.href);

  return (
    <Button
      asChild
      variant="outline"
      size="sm"
      className="bg-muted/60 backdrop-blur-md border-border/30"
    >
      <a
        href={link.href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer noopener" : undefined}
      >
        <Icon className="h-3.5 w-3.5 text-muted-foreground/80" aria-hidden="true" />
        {link.label}
      </a>
    </Button>
  );
}