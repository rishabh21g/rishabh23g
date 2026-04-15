import type { LucideIcon } from "lucide-react";
import { Briefcase, Camera, Contact, Cpu, File, Notebook, Terminal, User } from "lucide-react";

export type DockAppId =
  | "about"
  | "camera"
  | "contact"
  | "experience"
  | "terminal"
  | "resume"
  | "system"
  | "notes";

export type DockApp = {
  id: DockAppId;
  label: string;
  icon: LucideIcon;
};

export const APPS: DockApp[] = [
  { id: "about", label: "ABOUT", icon: User },
  { id: "camera", label: "CAMERA", icon: Camera },
  { id: "contact", label: "CONTACT", icon: Contact },
  { id: "experience", label: "EXPERIENCE", icon: Briefcase },
  { id: "terminal", label: "TERMINAL", icon: Terminal },
  { id: "resume", label: "RESUME", icon: File },
  { id: "system", label: "SYSTEM", icon: Cpu },
  { id: "notes", label: "NOTES", icon: Notebook },
];