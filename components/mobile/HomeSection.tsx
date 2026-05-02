import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Mail, MapPin } from "lucide-react";
import { RESUME } from "@/constants/RESUME";
import { LinkButton } from "./helpers/LinkButton";

export function HomeSection({ resume }: { resume: typeof RESUME }) {
  const { basics, summary } = resume;

  return (
    <Card className=" backdrop-blur-xl ring-0">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <CardTitle className="text-4xl leading-tight font-extrabold">{basics.name}</CardTitle>
            <CardDescription className="mt-1">{basics.headline}</CardDescription>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground/70">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {basics.location}
              </span>

              <a
                href={`mailto:${basics.email}`}
                className="inline-flex items-center gap-1.5 hover:text-foreground/80 transition-colors"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                {basics.email}
              </a>
            </div>
          </div>

          {basics.avatarSrc ? (
            <Image
              src={basics.avatarSrc}
              alt={basics.name}
              width={62}
              height={62}
              className="h-14 w-14 rounded-full ring-1 ring-border/30 object-cover bg-muted/30"
              priority
            />
          ) : null}
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-xs text-muted-foreground/70 leading-relaxed">{summary}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {basics.links.map((l) => (
            <LinkButton key={`${l.key}-${l.href}`} link={l} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}