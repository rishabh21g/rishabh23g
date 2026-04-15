import React from "react";
import { DockAppId } from "./dock";



export const REGISTRY: Record<DockAppId, { title: string; Component: React.ComponentType }> = {
  about: { title: "ABOUT", Component: React.lazy(() => import("@/components/Screens/About")) },
  camera: { title: "CAMERA", Component: React.lazy(() => import("@/components/Screens/Camera")) },
  contact: { title: "CONTACT", Component: React.lazy(() => import("@/components/Screens/Contact")) },
  experience: { title: "EXPERIENCE", Component: React.lazy(() => import("@/components/Screens/Experience")) },
  terminal: { title: "TERMINAL", Component: React.lazy(() => import("@/components/Screens/Terminal")) },
  resume: { title: "RESUME", Component: React.lazy(() => import("@/components/Screens/Resume")) },
  system: { title: "SYSTEM", Component: React.lazy(() => import("@/components/Screens/System")) },
  notes: { title: "NOTES", Component: React.lazy(() => import("@/components/Screens/Notes")) },
};

 export const DEFAULT_POS: Record<DockAppId, { left: number; top: number }> = {
  about: { left: 520, top: 50 },
  camera: { left: 800, top: 60 },
  experience: { left: 110, top: 130 },
  contact: { left: 260, top: 140 },
  terminal: { left: 140, top: 180 },
  resume: { left: 420, top: 100 },
  system: { left: 700, top: 180 },
  notes: { left: 340, top: 120 },
};

