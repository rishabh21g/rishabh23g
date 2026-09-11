import type { IconType } from "react-icons";
import { BiWindows, BiNetworkChart } from "react-icons/bi";
import { BsTypescript } from "react-icons/bs";

import {
  FaGithub, FaLinkedin, FaInstagram, FaSpotify, FaJs, FaPython, FaHtml5, FaCss3Alt, FaNodeJs, FaDocker, FaGitAlt, FaNpm
} from "react-icons/fa";
import { FaEarthAsia, FaXTwitter } from "react-icons/fa6";
import { FiMail, FiGlobe } from "react-icons/fi";
import {
  SiExpress, SiGoland, SiLinux, SiNextdotjs, SiRedux, SiShadcnui, SiSupabase, SiTailwindcss, SiVercel
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import {
  FaReact, FaDatabase, FaAws
} from "react-icons/fa";
import { FaGolang } from "react-icons/fa6";
import {
  SiNginx, SiPostgresql, SiRedis, SiFirebase, SiSocketdotio, SiExpo,
  SiOpensearch, SiMinio, SiK6, SiSlack, SiCloudflare, SiAnthropic,
  SiMongodb, SiFastify, SiRazorpay, SiWireguard, SiPuppeteer, SiDuckdb, SiLivekit, SiResend
} from "react-icons/si";
import { TbApi, TbVector, TbWebhook, TbRocket, TbActivityHeartbeat, TbDatabaseSearch, TbBrowser, TbGhost, TbPlugConnected } from "react-icons/tb";

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

export type SkillWithIcon = {
  name: string;
  icon: IconType;
};
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
  handle: string;
  age: number;
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
  techTags?: string[];
  links?: ResumeLink[];
};

export type ResumeProject = {
  name: string;
  subtitle?: string;
  progress: string;
  links: ResumeLink[];
  highlights: string[];
  stack?: SkillWithIcon[];
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
  links?: ResumeLink[];
};

export type ResumeSkills = {
  languages: SkillWithIcon[];
  librariesFrameworks: SkillWithIcon[];
  database: SkillWithIcon[];
  toolsOS: SkillWithIcon[];
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
  systems: ResumeSystemsSection[]
};

export const RESUME: ResumeData = {
  basics: {
    name: "Rishabh Gupta",
    headline: "Software Engineer, Backend and Infrastructure (Go, Python, TypeScript)",
    location: "Saket, New Delhi",
    email: "rishabhiitm@zohomail.in",
    handle: "rishabh21g",
    age: 23,
    avatarSrc: "/dp.jpeg",
    links: [
      { key: "portfolio", label: "Portfolio", href: "https://rishabh.godraw.app/", icon: FiGlobe },
      { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/rishabh19g/", icon: FaLinkedin },
      { key: "github", label: "GitHub", href: "https://github.com/rishabh21g", icon: FaGithub },
      { key: "mail", label: "Mail", href: "mailto:rishabhiitm@zohomail.in", icon: FiMail },
      { key: "twitter", label: "Twitter", href: "https://x.com/rishabh21g", icon: FaXTwitter },
      { key: "instagram", label: "Instagram", href: "https://www.instagram.com/rishabh_share", icon: FaInstagram },
      { key: "spotify", label: "Spotify", href: "https://open.spotify.com/user/312tysykmam4t5o26zpnc3jpdwoe?si=koDAvygQQcKkBW7woVYd7Q", icon: FaSpotify },
    ],
  },

  summary: "Backend and infrastructure engineer working in Go, Python and TypeScript. I built Scout, an AI native web search and knowledge API with its own crawl fleet, its own index and hybrid lexical plus vector retrieval, and I run the production fleet behind it at Enrich Labs (enrich.so).",

  experience: [
    {
      company: "Enrich Labs / Inboxkit",
      role: "Fullstack Engineer",
      start: "May 2026",
      end: "Present",
      location: "Onsite - Gurgaon",
      links: [
        { key: "live", label: "enrich.so", href: "https://enrich.so", icon: FaEarthAsia },
      ],
      highlights: [
        "Built **Scout** on my own, end to end. It is an **AI native web search and knowledge API for LLMs and agents**, the same category **Exa and Parallel.ai** work in, with its own crawl fleet, its own index, **hybrid lexical and vector retrieval** and verifiable answers. The scrape, crawl and extract side matches what Firecrawl offers and prices at or under market.",
        "It runs as **13 Go and Python microservices**: a crawler, a fetcher, a parser, an **embedder**, a **re ranker**, a lexical indexer, a vector indexer, a search API, and workers for extraction, screenshots and sitemaps. Every service has graceful shutdown, structured logging, health and metrics endpoints.",
        "Go and Python talk to each other over **gRPC with protobuf**. One set of proto files is the contract for every service, generated into both languages, so the ML side in Python and the serving side in Go stay in sync and calls stay typed and streaming friendly.",
        "Built our own corpus instead of renting an index. I pull **Common Crawl** data straight from their public **S3** buckets and process it with **DuckDB**, with **Redis** tracking shards and handling dedupe, then feed it through the embedder and both indexers so the corpus keeps growing. The re ranker sits on top of the hybrid results.",
        "I own the production fleet. **6 VPS and 31 containers** split by plane, lexical index, vector index, serving, ML inference, crawl, and a Postgres and Redis spine, all joined over a **WireGuard mesh**. Datastores listen on the mesh only and a single Cloudflare fronted box takes public traffic.",
        "Deploys run on **Dokploy**, one Compose file per plane, each tracking main so a merge deploys itself. Scripted host bootstrap, per plane rollout, contract tests after every deploy, **k6** for load testing, and **Beszel** for fleet monitoring with a 30 alert baseline kept in version control and alerts routed to Slack.",
        "Wrote the batch engine every async product sits on. **Redis Streams** wakes the workers, **Postgres holds the source of truth**, compare and set instead of locks, at least once delivery with idempotent workers, and a reaper that sweeps stuck jobs.",
        "Built a **5 tier fetch chain** for anti bot sites: plain HTTP, TLS fingerprint impersonation, proxy pool, headless Chromium, then Puppeteer, on top of a Postgres backed crawl frontier with Redis priority queues, circuit breakers and a byte budget per tier.",
        "Took **screenshot p95 from 25s to 5s** and **search p50 from 1288ms to 700ms** on the same hardware after proving the limits were software, container CPU quotas and a semaphore permit leak, not the machines. The fleet sits at **33% CPU when saturated**. I also debugged two production outages solo, a 24 hour indexing stall and a crawl fleet wedge.",
        "Also ship **Inboxkit**, the cold email side of the business. Automated domain and DNS setup for **DKIM, DMARC and SPF** over REST APIs and webhooks, with a React dashboard for bulk mailbox provisioning.",
      ],
      techTags: ["Go", "Python", "gRPC", "Protobuf", "TypeScript", "PostgreSQL", "Redis / Redis Streams", "DuckDB", "OpenSearch", "Qdrant", "Common Crawl", "MinIO / S3", "Docker", "Dokploy", "WireGuard", "Beszel", "k6", "Puppeteer", "Cloudflare"]
    },
    {
      company: "Logicknots",
      role: "Software Development Engineer I",
      start: "Jul 2025",
      end: "Jan 2026",
      location: "Remote",
      highlights: [
        "Promoted from Intern to SDE I for leading end-to-end development of a Canvas-based draw editor (React.js) and a cross-platform LMS app (React Native/Expo).",
        "Built performant Go (Golang) APIs with validations, rate limiting, and centralized error handling, ensuring scalable production reliability.",
        "Designed efficient state management with TanStack Query, Context API, and custom hooks, improving data synchronization and cutting redundant re-renders.",
        "Developed core Canvas rendering logic, tools (ruler, rectangle, guides), and real-time synchronization between UI and state.",
        "Containerized services with Docker to streamline CI/CD and maintain consistent multi-environment deployments.",
      ],
      techTags: ["React", "TypeScript", "Canvas API", "Go", "PostgreSQL", "Docker" ]
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
      techTags: ["React", "framer-motion", "Tailwind CSS"]
    },
  ],

  skills: {
    languages: [
      { name: "JavaScript", icon: FaJs },
      { name: "TypeScript", icon: BsTypescript },
      { name: "Golang", icon: FaGolang },
      { name: "SQL", icon: FaDatabase },
      { name: "Python", icon: FaPython },
      { name: "HTML", icon: FaHtml5 },
      { name: "CSS", icon: FaCss3Alt },],
    librariesFrameworks: [
      { name: "React.js", icon: FaReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React Native", icon: FaReact },
      { name: "Expo", icon: SiExpo },
      { name: "Node.js", icon: FaNodeJs },
      { name: "Express.js", icon: SiExpress },
      { name: "Go-Gin", icon: SiGoland },
      { name: "Shadcn", icon: SiShadcnui },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Zustand", icon: SiRedux },
      { name: "Fastify", icon: SiFastify },
      { name: "gRPC", icon: TbApi },
      { name: "Protobuf", icon: BiNetworkChart },
      { name: "WebSockets", icon: SiSocketdotio },
      { name: "Webhooks", icon: TbWebhook },
      { name: "Puppeteer", icon: SiPuppeteer },
      { name: "Playwright", icon: TbBrowser },
      { name: "Cloak Browser", icon: TbGhost },
      { name: "LiveKit", icon: SiLivekit },
      { name: "MCP Servers", icon: TbPlugConnected },
      { name: "Resend", icon: SiResend },
      { name: "LLM APIs (Claude/OpenAI)", icon: SiAnthropic },
      { name: "RAG / Vector Search", icon: TbDatabaseSearch },
    ],
    database: [
      { name: "Redis", icon: SiRedis },
      { name: "PostgresSQL", icon: SiPostgresql },
      { name: "Supabase", icon: SiSupabase },
      { name: "Firebase", icon: SiFirebase },
      { name: "MongoDB", icon: SiMongodb },
      { name: "DuckDB", icon: SiDuckdb },
      { name: "Qdrant (Vector DB)", icon: TbVector },
      { name: "OpenSearch", icon: SiOpensearch },
      { name: "MinIO", icon: SiMinio },
      { name: "Cloudflare R2", icon: SiCloudflare },
      { name: "AWS S3", icon: FaAws },
    ],
    toolsOS: [
      { name: "Windows", icon: BiWindows },
      { name: "Linux (Ubuntu)", icon: SiLinux },
      { name: "Github", icon: FaGithub },
      { name: "Docker", icon: FaDocker },
      { name: "Git", icon: FaGitAlt },
      { name: "NPM", icon: FaNpm },
      { name: "VSCode", icon: VscCode },
      { name: "Vercel", icon: SiVercel },
      { name: "Dokploy", icon: TbRocket },
      { name: "k6 (Load Testing)", icon: SiK6 },
      { name: "Beszel (Monitoring)", icon: TbActivityHeartbeat },
      { name: "Slack", icon: SiSlack },
      { name: "WireGuard", icon: SiWireguard },
      { name: "Razorpay", icon: SiRazorpay },
    ],
    theoretical: ["Operating System",
      "Computer Networks",
      "Object Oriented Programming",
      "Database Management System",
      "Computational Thinking",
      "Theory of Computation",
      "AI-Based Engineering (LLM apps, RAG, agentic workflows)",
      "System Design & Observability",
    ],
  },

  projects: [
    {
      name: "GoDraw",
      subtitle: "Free Infinite Whiteboard (PWA)",
      progress: "In progress",
      links: [
        {
          key: "live",
          label: "Live",
          href: "https://plus.gordaw.app/",
          icon: FaEarthAsia,
        },
      ],
      highlights: [
        "Built an **infinite collaborative whiteboard** from scratch on the Canvas API and Rough.js, with freehand drawing, object manipulation and **infinite pages inside one document**.",
        "Wrote a custom rendering pipeline with requestAnimationFrame, viewport culling and a multi layered canvas so large boards stay smooth.",
        "Real time sync runs on **Yjs CRDTs over WebSocket**, so edits merge without conflicts across clients, with Redis Pub/Sub carrying updates between regions.",
        "**Self hosted LiveKit** for voice and video on the canvas. A room holds **50+ collaborators** with live cursors, chat and threaded comments on any shape.",
        "Built an **MCP server for drawing**, so an AI agent can draw on the canvas directly: ER diagrams, notes, tables and shapes, plus an in app **AI chat** for generating and editing boards.",
        "Built a **teaching mode** on the canvas that plays strokes back as a lesson and **predicts the next stroke** to guide the person following along.",
        "Docs live next to the drawings, so a page can hold an **ER diagram with its documentation** instead of a separate file.",
        "**Role based sharing** with per link permissions, plus share by email and email campaigns for growth, with onboarding mail sent through **Resend**.",
        "Payments run on **Razorpay**. The backend is **Fastify**, fronted by **Cloudflare** as proxy and CDN.",
        "I deploy and run the whole thing myself on a **VPS with Dokploy**, Docker containers behind Nginx, no managed platform involved.",
      ],
      stack: [
        { name: "React", icon: FaReact },
        { name: "Zustand", icon: SiRedux },
        { name: "Fastify", icon: SiFastify },
        { name: "Go", icon: FaGolang },
        { name: "WebSocket / Yjs", icon: SiSocketdotio },
        { name: "LiveKit", icon: SiLivekit },
        { name: "MCP", icon: TbPlugConnected },
        { name: "PostgreSQL", icon: SiPostgresql },
        { name: "Redis (Pub/Sub)", icon: SiRedis },
        { name: "Razorpay", icon: SiRazorpay },
        { name: "Resend", icon: SiResend },
        { name: "Cloudflare", icon: SiCloudflare },
        { name: "Docker", icon: FaDocker },
        { name: "Nginx", icon: SiNginx },
        { name: "Dokploy", icon: TbRocket },
        { name: "REST API", icon: TbApi }
      ],
    },
  ],

  education: [
    {
      degree: "Bachelor in Data Science with AI and ML",
      school: "Indian Institute of Technology Madras, Chennai",
      start: "2025",
      end: "Present",
    },
    {
      degree: "Bachelor of Technology in Computer Science (B.Tech)",
      school: "Dr. A.P.J. Abdul Kalam Technical University, Greater Noida",
      start: "2022",
      end: "Present",
    },
  ],

  achievements: [
    {
      date: "Jun 2026",
      title: "1st Place, Hustlerprenaurs by Escape Room",
      org: "IIT Madras with Kyptronix LLP",
      highlights: [
        "Won **1st place** among all participating teams as **founder of GoDraw**, the AI powered collaborative whiteboard, and came away with **startup growth support and mentorship**.",
      ],
      links: [
        {
          key: "linkedin",
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/rishabh19g/overlay/Honor/864312520/treasury/?profileId=ACoAACeah5MBb3_fAXbbmo6Mox4FofqS0m3U18c",
          icon: FaLinkedin,
        },
        {
          key: "live",
          label: "Photo",
          href: "https://hustlepreneur.kyptronix.com/hero3.jpg",
          icon: FaEarthAsia,
        },
      ],
    },
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
        { name: "Qdrant + OpenSearch", meta: "Search / Vectors" },
        { name: "MinIO / R2 / S3", meta: "Object Storage" },
        { name: "Dokploy / Vercel", meta: "Deployment" },
        { name: "Beszel + k6", meta: "Monitoring / Load Testing" },
      ],
    },
  ],
};