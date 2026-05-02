export type SectionId = "home" | "work" | "skills" | "projects" | "education";


export const SECTIONS: Array<{ id: SectionId; label: string; menuBarLabel: string }> = [
  { id: "home", label: "Home", menuBarLabel: "Home" },
  { id: "work", label: "Work", menuBarLabel: "Experience" },
  { id: "skills", label: "Skills", menuBarLabel: "Skills" },
  { id: "projects", label: "Projects", menuBarLabel: "Projects" },
  { id: "education", label: "More", menuBarLabel: "Education" },
];