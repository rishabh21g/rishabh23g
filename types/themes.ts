export type ThemeId = "theme-default" | "theme-midnight" | "theme-logic" | "theme-weeknd" | "theme-radiohead";

export const THEMES: { id: ThemeId; label: string }[] = [
  { id: "theme-default", label: "DEFAULT" },
  { id: "theme-logic", label: "LOGIC" },
  { id: "theme-midnight", label: "MIDNIGHT" },
  { id: "theme-weeknd", label: "THE WEEKND" },
  { id: "theme-radiohead", label: "RADIOHEAD" },
];