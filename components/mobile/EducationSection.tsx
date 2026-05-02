
import { RESUME } from "@/constants/RESUME";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export function EducationSection({ resume }: { resume: typeof RESUME }) {
  const { education, achievements } = resume;

  return (
    <Card className="bg-background/10 backdrop-blur-xl ring-0">
      <CardHeader>
        <CardTitle className="text-3xl font-extrabold ">Education & Achievements</CardTitle>
        <CardDescription className="text-xs">Highlights</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <div className="text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground/60">
            Education
          </div>

          <div className="mt-3 space-y-3">
            {education.map((e) => (
              <div key={`${e.school}-${e.degree}`} className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-foreground/90">{e.degree}</div>
                  <div className="mt-1 text-xs text-muted-foreground/60">{e.school}</div>
                </div>
                <div className="text-xs text-muted-foreground/60 shrink-0">
                  {e.start ?? ""}
                  {e.start || e.end ? " — " : ""}
                  {e.end ?? ""}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground/60">
            Achievements
          </div>

          <div className="mt-3 space-y-4">
            {achievements.map((a) => (
              <div key={`${a.title}-${a.date}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-foreground/90">
                      {a.title}
                      {a.org ? (
                        <span className="font-normal text-muted-foreground/60"> — {a.org}</span>
                      ) : null}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground/60 shrink-0">{a.date}</div>
                </div>

                <ul className="mt-3 space-y-2 pl-4 list-disc marker:text-muted-foreground/50">
                  {a.highlights.map((h) => (
                    <li key={h} className="text-xs leading-relaxed text-muted-foreground/70">
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}