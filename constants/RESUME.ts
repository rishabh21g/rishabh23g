import { ReactNode } from "react";
import type { IconType } from "react-icons";

import { FaGithub, FaLinkedin, FaInstagram, FaSpotify } from "react-icons/fa";
import { FaEarthAsia, FaXTwitter } from "react-icons/fa6";
import { FiMail, FiGlobe } from "react-icons/fi";

export type ResumeLinkKey =
  | "portfolio"
  | "linkedin"
  | "github"
  | "mail"
  | "twitter"
  | "instagram"
  | "spotify"
  | "live"
  | "repo";

export type ResumeLink = {
  key: ResumeLinkKey;
  label: string;
  href: string;
  icon: IconType;
};
export type ResumeSystemItem = {
  name: string;
  meta?: string; 
};

export type ResumeSystemsSection = {
  title: string; 
  items: ResumeSystemItem[];
};

export type ResumeBasics = {
  name: string;
  headline: string; // short role line
  location: string;
  email: string;
  phone: string;
  handle: string;
  age:number;
  avatarSrc?: string,
  links: ResumeLink[];
};

export type ResumeExperience = {
  company: string;
  role: string;
  start: string; // "Jul 2025"
  end: string;   // "Present"
  location: string; // "Remote"
  highlights: string[];
};

export type ResumeProject = {
  name: string;
  subtitle?: string;
  links: ResumeLink[];
  highlights: string[];
  stack?: string[];
};

export type ResumeEducation = {
  degree: string;
  school: string;
  location?: string;
  start?: string;
  end?: string;
};

export type ResumeAchievement = {
  date: string; // "June 2025"
  title: string;
  org?: string;
  highlights: string[];
};

export type ResumeSkills = {
  languages: string[];
  librariesFrameworks: string[];
  database: string[];
  toolsOS: string[];
  theoretical: string[];
};

export type ResumeData = {
  basics: ResumeBasics;
  summary: string
  experience: ResumeExperience[];
  skills: ResumeSkills;
  projects: ResumeProject[];
  client_projects?: ResumeProject[]; 
  education: ResumeEducation[];
  achievements: ResumeAchievement[];
  systems :ResumeSystemsSection[]
};

export const RESUME: ResumeData = {
  basics: {
    name: "Rishabh Gupta",
    headline: "Software Engineer / Fullstack Developer Golang + React Native",
    location: "Saket, New Delhi",
    email: "rishabhiitm@zohomail.in",
    phone: "+91 8840952165",
    handle :"rishabh21g",
    age :23,
    avatarSrc: "/dp.jpeg",
    links: [
      { key: "portfolio", label: "Portfolio", href: "https://rishabhiitm.me", icon: FiGlobe },
      { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/rishabh19g/", icon: FaLinkedin },
      { key: "github", label: "GitHub", href: "https://github.com/rishabh21g", icon: FaGithub },
      { key: "mail", label: "Mail", href: "mailto:rishabhiitm@zohomail.in", icon: FiMail },
      { key: "twitter", label: "Twitter", href: "https://x.com/rishabh21g", icon: FaXTwitter },
      { key: "instagram", label: "Instagram", href: "https://www.instagram.com/rishabh_share", icon: FaInstagram },
      { key: "spotify", label: "Spotify", href: "https://open.spotify.com/user/312tysykmam4t5o26zpnc3jpdwoe?si=koDAvygQQcKkBW7woVYd7Q", icon: FaSpotify },
    ],
  },

  summary: "Software Development Engineer specializing in Golang and JavaScript, with expertise in building scalable and modern web and mobile applications ",

  experience: [
    {
      company: "Logicknots",
      role: "Software Development Engineer I",
      start: "Jul 2025",
      end: "Present",
      location: "Remote",
      highlights: [
        "Promoted from Intern to SDE I for leading end-to-end development of a Canvas-based draw editor (React.js) and a cross-platform LMS app (React Native/Expo).",
        "Built performant Go (Golang) APIs with validations, rate limiting, and centralized error handling, ensuring scalable production reliability.",
        "Designed efficient state management with TanStack Query, Context API, and custom hooks, improving data synchronization and cutting redundant re-renders.",
        "Developed core Canvas rendering logic, tools (ruler, rectangle, guides), and real-time synchronization between UI and state.",
        "Containerized services with Docker to streamline CI/CD and maintain consistent multi-environment deployments.",
      ],
    },
    {
      company: "SocialZone",
      role: "Freelance Developer",
      start: "Feb 2025",
      end: "May 2025",
      location: "Remote",
      highlights: [
        "Developed the company’s official website using React.js, Framer Motion, and Tailwind CSS with lazy loading, asset optimization, and a scalable design system.",
      ],
    },
  ],

  skills: {
    languages: ["JavaScript", "TypeScript", "Golang", "SQL",  "Python", "HTML"],
    librariesFrameworks: [
      "React.js",
      "Next.js",
      "React Native",
      "Expo",
      "Node.js",
      "Express.js",
      "Go-Gin",
      "Shadcn",
      "Tailwind CSS",
      "Zustand",
    ],
    database: ["Redis", "PostgresSQL", "Supabase", "Firebase"],
    toolsOS: ["Windows", "Linux (Ubuntu)", "Github", "Docker", "Git", "NPM", "VSCode", "Vercel"],
    theoretical: [
      "Operating System",
      "Computer Networks",
      "OOPs with Java",
      "DBMS",
      "Computational Thinking",
      "Theory of Computation",
    ],
  },

  projects: [
    {
      name: "GoDraw",
      subtitle: "Free Infinite Whiteboard (PWA)",
      links: [
        {
          key: "live",
          label: "Live",
          href: "https://plus.gordaw.app/",
          icon: FaEarthAsia,
        },
      ],
      highlights: [
        "Developed a real-time collaborative whiteboard app powered by Rough.js and the Canvas API.",
        "Implemented real-time synchronization using Yjs CRDTs and a Go backend with Gorilla WebSocket.",
        "Built with React, Docker, Nginx, and PostgreSQL for high performance and reliability.",
      ],
      stack: ["React", "Go", "WebSocket", "Yjs", "PostgreSQL", "Docker", "Nginx"],
    },
    {
      name: "MailGo",
      subtitle: "Concurrent Email Sender",
      links: [
        {
          key: "repo",
          label: "GitHub",
          href: "https://github.com/rishabh21g/mailchimp",
          icon: FaGithub,
        },
      ],
      highlights: [
        "Built a web dashboard with auth (Gin + JWT), templates, CSV upload, and bulk email sending.",
        "Engineered a concurrent email delivery system with goroutines, channels, and rate-limited workers (producer-consumer).",
        "Integrated PostgreSQL for user management, dynamic HTML templates, and Mailpit for SMTP testing.",
      ],
      stack: ["Go", "Gin", "JWT", "PostgreSQL", "Mailpit"],
    },
    {
  name: "AI Interview Mobile Application", 
  subtitle: "AI-Powered Technical Interview Platform",
  links: [
    {
      key: "repo",
      label: "GitHub",
      href: "https://github.com/rishabh21g/LK-interview-app.git",
      icon: FaGithub,
    },
  ],
  highlights: [
    "Led the development of a cross-platform mobile app (React Native) for conducting AI-driven technical interviews.",
    "Integrated real-time speech-to-text transcription and analysis to provide candidates with live feedback and generate performance metrics.",
    "Engineered a system to securely record, process, and upload entire interview sessions for post-interview review by hiring managers.",
    "Built a robust and secure authentication flow and managed complex application state using Zustand for a seamless user experience.",
  ],
  stack: ["React Native", "Expo", "Zustand", "AI/ML APIs", "Speech-to-Text" , "Video/Audio Processing", "Secure Authentication" ],
},
{
  name: "AI Trip Planner",
  subtitle: "Effortless, AI-powered trip recommendations",
  links: [
    {
      key: "repo",
      label: "GitHub",
      href: "https://github.com/rishabh21g/Trip_planner", 
      icon: FaGithub,
    },
  ],
  highlights: [
    "Developed a smart travel planner that generates personalized itineraries using the Gemini AI API.",
    "Integrated the Google Places API to fetch and display top-rated destinations, including reviews and locations.",
    "Implemented a real-time database with Firebase to securely save and sync user trip plans across devices.",
    "Built a modern and responsive user interface using React.js, Tailwind CSS, and Shadcn UI.",
    "Engineered a secure authentication system with Firebase Auth for user login and registration.",
    "Created an interactive map view to help users visually explore and organize their travel destinations.",
  ],
  stack: ["React", "Tailwind CSS", "Shadcn UI", "Firebase", "Gemini AI", "Google Places API"],
},
  ],
  client_projects:[
    {
      name: "Doctor Portfolio",
      subtitle: "Personal Website for a Doctor with appointment scheduling",
      links: [
        {
          key: "live",
          label: "Live",
          href: "https://drreemabhatt.in/",
          icon: FaEarthAsia,
        },
      ],
      highlights: [
        "Designed and developed a personal portfolio website for Dr. Satyarth, showcasing his medical expertise and services.",
        "Implemented a clean and responsive design using React.js and Tailwind CSS, ensuring optimal user experience across devices.",
        "Integrated contact forms and appointment scheduling features to enhance patient engagement.",
      ],
      stack: ["React", "Tailwind CSS", "Vercel" , "Resend" , "RestAPI" , "Google Map API"],
    },
  ],

  education: [
    {
      degree: "Bachelor in Data Science with AI and ML",
      school: "Indian Institute of Technology Madras, Chennai",
      start: "2022",
      end: "Present",
    },
    {
      degree: "Bachelor of Technology in Computer Science (B.Tech)",
      school: "Dr. A.P.J. Abdul Kalam Technical University, Greater Noida",
      start: "2025",
      end: "Present",
    },
  ],

  achievements: [
    {
      date: "June 2025",
      title: "Finalist, CompassionateThon",
      org: "IIT Madras",
      highlights: [
        "Top 15 out of 7,000+ applicants (250 teams) for ideathon; product development + pitching.",
      ],
    },
    {
      date: "June 2025",
      title: "3rd Place, Chess Tournament, Paradox’25",
      org: "IIT Madras",
      highlights: ["Secured third position in an inter-college chess competition."],
    },
  ],
  systems: [
  {
    title: "HARDWARE",
    items: [
      { name: "MacBook Air M5", meta: "24GB · primary machine" },
      { name: 'Mac Display', meta: "Liquid Retina XDR" },
      { name: "Evofox Katana X2 TKL", meta: "Mechanical White" },
      { name: "Truke BGT Ultra", meta: "for music" },
    ],
  },
  {
    title: "EDITOR",
    items: [
      { name: "VS Code", meta: "daily driver" },
      { name: "Dark Modern", meta: "theme" },
      { name: "JetBrains Mono", meta: "font, 14px" },
    ],
  },
  {
    title: "TERMINAL",
    items: [
      { name: "Ghostty", meta: "GPU-accelerated" },
      { name: "zsh", meta: "oh-my-zsh" },
    ],
  },
  {
    title: "TOOLS",
    items: [
      { name: "Notion", meta: "docs + writing" },
      { name: "Excalidraw / GoDraw", meta: "UI work" },
      { name: "TablePlus", meta: "DB client" },
    ],
  },
  {
    title: "STACK DEFAULTS",
    items: [
      { name: "Golang/Javascript", meta: "Backend" },
      { name: "Next.js / React js", meta: "Web" },
      { name: "React Native / Expo", meta: "Mobile" },
      { name: "PostgreSQL + Redis", meta: "Data Layer" },
      { name: "Vercel / Render / DigitalOcean", meta: "Deployment" },
    ],
  },
],
};