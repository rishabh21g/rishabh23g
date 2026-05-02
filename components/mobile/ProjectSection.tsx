import { RESUME } from "@/constants/RESUME";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Chip from "./helpers/Chip";
import ProgressPill from "./helpers/ProgressPill";
import { LinkButton } from "./helpers/LinkButton";



export function ProjectsSection({ resume }: { resume: typeof RESUME }) {
  const { projects, client_projects } = resume;

  return (
    <Card className="bg-background/10 backdrop-blur-xl ring-0">
      <CardHeader>
        <CardTitle className="text-3xl font-extrabold ">Projects</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {[...projects, ...(client_projects ?? [])].map((p) => (
          <div key={p.name}>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="text-sm font-semibold text-foreground/90 truncate">{p.name}</div>
                  <ProgressPill value={(p as any).progress} />
                </div>

                {p.subtitle ? (
                  <div className="mt-1 text-xs text-muted-foreground/60">{p.subtitle}</div>
                ) : null}

                {p.stack?.length ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {p.stack.map((s) => {
                      const IconNode = s.icon;
                      return (
                        <Chip key={s.name}>
                          <span className="flex items-center gap-1.5">
                            <IconNode className="h-3 w-3" />
                            {s.name}
                          </span>
                        </Chip>
                      );
                    })}
                  </div>
                ) : null}
              </div>

              {p.links?.length ? (
                <div className="flex flex-wrap items-center justify-end gap-1 shrink-0">
                  {p.links.map((l) => (
                    <LinkButton key={`${p.name}-${l.key}-${l.href}`} link={l} />
                  ))}
                </div>
              ) : null}
            </div>

            <ul className="mt-3 space-y-2 pl-4 list-disc marker:text-muted-foreground/50">
              {p.highlights.map((h) => (
                <li key={h} className="text-xs leading-relaxed text-muted-foreground/70">
                  {h}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}