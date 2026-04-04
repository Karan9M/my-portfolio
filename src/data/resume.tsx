import { Icons } from "@/components/icons";
import { FolderIcon, HomeIcon, NotebookIcon, VideoIcon } from "lucide-react";
import SwiftMac from "../../public/images/swiftui-mac.png";
import ResumeMac from "../../public/images/resume-mac.png";
import SmartMac from "../../public/images/smart-mac.png";
import DrJobMac from "../../public/images/drjob-mac.png";
import MMateMac from "../../public/images/mmate-mac.png";
import MyClassMac from "../../public/images/myclass-mac.png";
import AiLeadMac from "../../public/images/ailead-mac.png";

export const DATA = {
  name: "Karan Mavadiya 🧑‍💻",
  initials: "KM",
  url: "https://github.com/karan9m/my-resume",
  location: "Ahmedabad, India",
  locationLink: "https://www.google.com/maps/place/Ahmedabad",
  description:
    "Full-Stack Product Engineer (AI-Augmented) — shipping production-grade B2B SaaS at 3× speed 🚀",
  summary:
    "High-velocity Product Engineer specializing in shipping production-grade B2B SaaS from zero to one. I leverage an AI-augmented workflow (Cursor, Claude, Copilot, V0) to deliver features **3× faster** than standard development cycles — compressing 2-week sprints into 2 days without sacrificing architecture quality. Currently serving as the **sole architect and primary engineer** at [SpeedMVPs](https://speedmvps.com/), owning every layer from DB schema design to production UI. Built and launched [AiLeadz](https://www.aileadz.io/) — a live B2B platform with 250M+ verified contacts — as the single engineer behind all system-design and product decisions. Seeking to help early-stage founders ship their *Zero to One* products remotely.",
  avatarUrl: "/Avatar.png",
  skills: [
    "TypeScript",
    "JavaScript",
    "Python",
    "Java",
    "Go",
    "C/C++",
    "SQL",
    "React.js",
    "Next.js",
    "TailwindCSS",
    "Framer Motion",
    "GSAP",
    "shadcn/ui",
    "Node.js",
    "FastAPI",
    "Flask",
    "REST API",
    "OpenAI API",
    "OpenRouter API",
    "Convex",
    "PostgreSQL",
    "Supabase",
    "MongoDB",
    "MS-SQL",
    "LLM Integration",
    "Prompt Engineering",
    "Agentic Workflows",
    "RAG Pipelines",
    "Vector Search",
    "Git",
    "Docker",
    "Vercel",
    "AWS",
    "Google Cloud Platform",
    "Linux",
    "CI/CD",
  ],
  videos: [
    {
      title: "Track Your Coding time for free",
      description:
        "Learn how to track your code time with complete analytics and insights.",
      thumbnail: "/video1.avif",
      url: "https://youtu.be/tBatfQjWxCg?si=sy2vZbCHoIYNME-3",
      date: "2024-05-15",
    },
    {
      title: "Fix multi-cursor in VS Code",
      description: "Simple trick to fix multi-cursor in VS Code.",
      thumbnail: "/video2.avif",
      url: "https://youtu.be/E9h7M6ZK_tA?si=ykzV7ARU4VMnbBRo",
      date: "2024-07-01",
    },
    {
      title: "Twitter(X)'s monetization (Hindi)",
      description: "Is the policy broken? Let's find out.",
      thumbnail: "/video3.avif",
      url: "https://youtu.be/Z3h1jt6jKLY?si=blL4l4FNco9WW9FT",
      date: "2024-11-04",
    },
    {
      title: "How to fix any kind of ban in twitter (Hindi)",
      description: "Learn how to fix any kind of ban in twitter.",
      thumbnail: "/video4.avif",
      url: "https://youtu.be/P7JRFrcXlQU",
      date: "2024-12-24",
    },
    {
      title: "Microsoft's new shocking move (Hindi)",
      description:
        "GitHub Copilot is now free for everyone, let's see what's the catch.",
      thumbnail: "/video5.avif",
      url: "https://www.youtube.com/watch?v=uIJOUe8T3_I",
      date: "2024-12-19",
    },
    {
      title: "How to run DeepSeek R1 model locally (Hindi)",
      description: "Learn how to run DeepSeek R1 model locally, in easy steps",
      thumbnail: "/video6.avif",
      url: "https://youtu.be/BgB2pW6QgVg",
      date: "2025-01-29",
    },
    {
      title:
        "How to do zoom in and out video recording in Windows for free. (Hindi)",
      description:
        "Learn how to do zoom in and out video recording in Windows for free.",
      thumbnail: "/video7.avif",
      url: "https://youtu.be/WziGdEiT9fE",
      date: "2025-03-16",
    },
    {
      title: "I Finally Got My FIRST PC!",
      description:
        "In this video I talked about my first PC, overall experience was really good, I also talked about the components that I used in the PC in details as well as why to use them and why not.",
      thumbnail: "/video8.avif",
      url: "https://youtu.be/vHTbqgmB2U8",
      date: "2025-05-06",
    },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
    { href: "/projects", icon: FolderIcon, label: "Projects" },
  ],
  contact: {
    email: "karanmavadiya38@gmail.com",
    tel: "+91 8799422599",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/karan9m",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/karan9m/",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/karandotcom",
        icon: Icons.x,

        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:karanmavadiya38@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },
  work: [
    {
      company: "SpeedMVPs",
      href: "https://speedmvps.com/",
      badges: ["Remote"],
      location: "Remote",
      title: "Full-Stack Product Engineer (Core Team)",
      logoUrl: "/images/speedmvps.png",
      start: "Sept 2025",
      end: "Present",
      description:
        "Sole architect and primary engineer for all high-complexity platform features — making system-design decisions, DB schema choices, and API contracts independently. Reduced feature delivery time by 60% through AI-augmented workflows (Cursor, Claude Dev, GitHub Copilot). Built and launched AiLeadz end-to-end — a B2B lead-gen SaaS with 250M+ verified contacts, AI-driven lead scoring, automated cold-email campaigns, and real-time analytics (featured on 47+ platforms, 4.9/5 rating). Engineered MaterialMate (M-Mate), an AI construction estimator integrating the Qwen2.5-VL vision model, a plumbing rules engine, and a PostgreSQL SKU matcher. Shipped MyClassGPT, an LLM-driven EdTech platform with a RAG pipeline serving contextual answers in under 1.5 seconds.",
    },
    {
      company: "CodeBeautify",
      href: "http://codebeautify.org/",
      badges: [],
      location: "Ahmedabad, India",
      title: "Software Developer Intern",
      logoUrl: "/images/codebeautify.png",
      start: "2023",
      end: "2024",
      description:
        "Optimized high-traffic developer utilities (JSON Formatter, XML Viewer, SQL Beautifier) used by thousands of developers globally — implementing performance improvements that measurably reduced page load times. Revamped UI/UX across multiple tools in collaboration with the design team, reducing user drop-off and improving overall task completion rates.",
    },
  ],
  education: [
    {
      school: "LJ University",
      href: "https://ljku.edu.in/",
      degree: "Bachelor of Engineering — Computer Science (Lateral Entry via Diploma)",
      logoUrl: "/images/lju.png",
      start: "2024",
      end: "2027",
    },
    {
      school: "LJ University",
      href: "https://ljku.edu.in/",
      degree: "Diploma — Computer Science",
      logoUrl: "/images/lju.png",
      start: "2022",
      end: "2024",
    },
    {
      school: "Shree Durga Vidhya Vihar",
      href: "https://www.durgaschool.com/",
      degree: "SSC Boards",
      logoUrl: "/images/durga.jpeg",
      start: "2020",
      end: "2021",
    },
  ],
  projects: [
    {
      title: "AiLeadz",
      href: "https://www.aileadz.io/",
      dates: "Sept 2024 - Present",
      active: true,
      description:
        "A live B2B lead-gen SaaS platform with 250M+ verified contacts, AI-driven lead scoring, automated cold-email campaigns, and real-time analytics. Featured on 47+ platforms with a 4.9/5 rating. Built end-to-end as the sole engineer responsible for all system-design and product decisions.",
      technologies: [
        "Next.js",
        "TypeScript",
        "FastAPI",
        "PostgreSQL",
        "Supabase",
        "OpenAI API",
        "TailwindCSS",
        "Vercel",
      ],
      links: [
        {
          type: "Website",
          href: "https://www.aileadz.io/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: AiLeadMac,
      video: "",
    },
    {
      title: "MaterialMate (M-Mate)",
      href: "https://speedmvps.com/",
      dates: "2025 - Present",
      active: true,
      description:
        "An AI construction estimator integrating the Qwen2.5-VL vision model, an AS/NZS 3500 plumbing rules engine, and a PostgreSQL SKU matcher — achieving 10–15% accuracy delta vs. licensed plumber benchmarks. Stack: Python, FastAPI, Next.js 15, Supabase, OpenRouter API.",
      technologies: [
        "Python",
        "FastAPI",
        "Next.js",
        "Supabase",
        "PostgreSQL",
        "OpenRouter API",
        "Qwen2.5-VL",
      ],
      links: [
        {
          type: "Website",
          href: "https://speedmvps.com/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: MMateMac,
      video: "",
    },
    {
      title: "MyClassGPT",
      href: "https://www.myclassgpt.com/",
      dates: "2024 - Present",
      active: true,
      description:
        "An LLM-driven EdTech platform delivering NEP-aligned, region-specific learning in India. Designed the RAG pipeline serving contextual answers with citations in under 1.5 seconds.",
      technologies: [
        "Next.js",
        "TypeScript",
        "OpenAI API",
        "RAG Pipeline",
        "Vector Search",
        "TailwindCSS",
        "Supabase",
      ],
      links: [
        {
          type: "Website",
          href: "https://www.myclassgpt.com/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: MyClassMac,
      video: "",
    },
    {
      title: "SwiftUI — UI Component Library",
      href: "https://swiftui.vercel.app/",
      dates: "March 2025 - Ongoing",
      active: true,
      description:
        "A library of 100+ production-ready, fully responsive UI components for React and Next.js with dark/light theming, WCAG accessibility compliance, and optimized bundle size via tree-shaking. Integrated GSAP and Framer Motion for declarative micro-animations and page transitions.",
      technologies: [
        "Next.js",
        "TypeScript",
        "TailwindCSS",
        "Framer Motion",
        "GSAP",
        "shadcn/ui",
        "Vercel",
      ],
      links: [
        {
          type: "Website",
          href: "https://swiftui.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/karan9m/",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: SwiftMac,
      video: "",
    },
    {
      title: "Dr.Job",
      href: "https://www.dr-job.vercel.app/",
      dates: "January 2025 - February 2025",
      active: true,
      description:
        "Dr.Job is a job portal that connects job seekers with employers, providing a platform for job listings, applications, and recruitment.",
      technologies: [
        "Next.js",
        "Git",
        "TailwindCSS",
        "Framer-motion",
        "TypeScript",
        "Imagekit",
        "shadcnUI",
        "NextAuth",
        "Vercel",
      ],
      links: [
        {
          type: "Website",
          href: "https://www.dr-job.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/karan9m/dr.job",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: DrJobMac,
      video: "",
    },
    {
      title: "Resumind",
      href: "https://resumindd.vercel.app/",
      dates: "May 2023 - Sept 2023",
      active: true,
      description:
        "An AI-powered resume analyzer and dynamic CV builder. This project leverages artificial intelligence to review, analyze, and enhance resumes, providing users with actionable feedback and suggestions. Built from scratch with a robust backend, it offers an interactive interface for creating, editing, and optimizing CVs for better job prospects.",
      technologies: [
        "CSS",
        "javascript",
        "MongoDB",
        "Express.js",
        "HTML",
        "Regex",
        "Node.js",
      ],
      links: [
        {
          type: "Website",
          href: "https://resumindd.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/karan9m/resumind",
          icon: <Icons.github className="size-3" />,
        },
      ],

      image: ResumeMac,
      video: "",
    },
    {
      title: "SmartNotes — AI Note-Taking App",
      href: "https://smrtnotes.vercel.app/",
      dates: "April 2024 - September 2024",
      active: true,
      description:
        "A full-stack collaborative note-taking app with real-time multi-user editing, GPT-driven summarization, vector-based semantic search, and a hierarchical tagging system. Built with Convex as a reactive serverless backend for real-time data sync and event-driven functions, eliminating the need for a dedicated WebSocket server.",
      technologies: [
        "TypeScript",
        "OpenAI API",
        "Convex",
        "TailwindCSS",
        "Next.js",
      ],
      links: [
        {
          type: "Website",
          href: "https://smrtnotes.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/karan9m/smartnotes",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: SmartMac,
      video: "",
    },
    {
      title: "NoteForge",
      href: "https://noteforgee.vercel.app/",
      dates: "September 2024 - October 2024",
      active: true,
      description:
        "NoteForge is a note-taking application designed specifically for developers to efficiently document code, save snippets, and organize technical knowledge. It offers a clean interface for managing programming notes, making it easy to store, search, and reference code examples and development workflows.",
      technologies: [
        "React.js",
        "font-awesome",
        "react-icons",
        "react-dom",
        "CSS3",
        "Vite",
        "Git",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/karan9m/noteforge",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Website",
          href: "https://noteforgee.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/images/note-mac.png",
      video: "",
    },
    {
      title: "Klimate",
      href: "https://kilimate.vercel.app/",
      dates: "September 2024 - October 2024",
      active: true,
      description:
        "Klimate is a modern weather app that provides real-time weather updates with a unique blend of futuristic and nostalgic coffee shop-inspired design. It features an interactive menu and retro vibes, making weather tracking both informative and visually engaging.",
      technologies: [
        "React.js",
        "Git",
        "TailwindCSS",
        "Framer-motion",
        "React-icons",
        "React-router-dom",
      ],
      links: [
        {
          type: "Website",
          href: "https://kilimate.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/Karan9M/Kilimate",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/images/kilimate-mac.png",
      video: "",
    },
    {
      title: "LightSaaS Landing page",
      href: "https://light-saas-alpha.vercel.app/",
      dates: "December 2024 - January 2025",
      active: true,
      description:
        "LightSaaS is a modern and visually engaging landing page designed for SaaS applications. It features an interactive 3D carousel gallery with support for images, videos, and an integrated music player, providing a dynamic and immersive user experience.",
      technologies: [
        "Next.js",
        "CSS 3D Transform",
        "SoundCloud Widget API",
        "Modern-Javascript",
        "Vercel",
        "Git",
      ],
      links: [
        {
          type: "Website",
          href: "https://light-saas-alpha.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/Karan9M/LightSaaS",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/images/light-saas-mac.png",
      video: "",
    },
  ],
  hackathons: [
    {
      title: "Smart India Hackathon",
      dates: "March 23rd - 25th, 2022",
      location: "Bhubaneswar, India",
      description:
        "Developed a learing portal with some free education content with the best paid contents too, the project was called as 'EducationX'.",
      image: "/smart-india-hackathon.webp",
      mlh: "https://github.com/Synchrotek/E-LearningX",
      links: [],
    },
    {
      title: "Smart India Hackathon",
      dates: "December 19th - 23rd, 2023",
      location: "Bhubaneswar, India",
      description:
        "Developed A collaborative coding web platform that enables Multiuser collboration on a coding project in real-time with features of group chat, to-do lists.",
      image: "/logo.webp",
      mlh: "https://nexuslink01v.netlify.app/",
      links: [],
    },
  ],
} as const;
