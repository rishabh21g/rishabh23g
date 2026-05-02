import { RESUME } from "@/constants/RESUME";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export function WorkSection({ resume }: { resume: typeof RESUME }) {
  const { experience } = resume;

  return (
    <Card className="bg-background/10 backdrop-blur-xl ring-0">
      <CardHeader>
        <CardTitle className="text-3xl font-extrabold ">Experience</CardTitle>
        <CardDescription className="text-xs">Recent roles</CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        {experience.map((job) => (
          <div key={`${job.company}-${job.role}-${job.start}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-sm font-semibold text-foreground/90">
                  {job.company}{" "}
                  <span className="font-normal text-muted-foreground/60">— {job.role}</span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground/60">{job.location}</div>
              </div>
              <div className="text-xs text-muted-foreground/60 shrink-0">
                {job.start} — {job.end}
              </div>
            </div>

            <ul className="mt-3 space-y-2 pl-4 list-disc marker:text-muted-foreground/50">
              {job.highlights.map((h) => (
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