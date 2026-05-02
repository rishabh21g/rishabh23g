import { RESUME } from "@/constants/RESUME";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Chip from "./helpers/Chip";


export function StackSection({ resume }: { resume: typeof RESUME }) {
  const { skills } = resume;

  return (
    <Card className="bg-background/10 backdrop-blur-xl ring-0">
      <CardHeader>
        <CardTitle className="text-3xl font-extrabold ">Skills</CardTitle>
        <CardDescription className="text-xs">Stack overview</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <div className="text-sm uppercase tracking-tight text-muted-foreground/60">Languages</div>
          <div className="mt-2 flex flex-wrap gap-1">
            {skills.languages.map((s) => (
              <Chip key={s.name}>
                <s.icon className="inline mr-1"/>
                {s.name}</Chip>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm uppercase tracking-tight text-muted-foreground/60">Frameworks</div>
          <div className="mt-2 flex flex-wrap gap-1">
            {skills.librariesFrameworks.map((s) => (
              <Chip key={s.name}>
                <s.icon className="inline mr-1"/>
                {s.name}</Chip>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm uppercase tracking-tight text-muted-foreground/60">Data / Infra</div>
          <div className="mt-2 flex flex-wrap gap-1">
            {skills.database.map((s) => (
              <Chip key={s.name}>
                <s.icon className="inline mr-1"/>
                {s.name}</Chip>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm uppercase tracking-tight text-muted-foreground/60">Tools / OS</div>
          <div className="mt-2 flex flex-wrap gap-1">
            {skills.toolsOS.map((s) => (
              <Chip key={s.name}>
                <s.icon className="inline mr-1"/>
                {s.name}</Chip>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}