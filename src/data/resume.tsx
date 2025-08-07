import { Icons } from "@/components/icons";
import { FolderIcon, HomeIcon, NotebookIcon, VideoIcon } from "lucide-react";
import SwiftMac from "../../public/images/swiftui-mac.png";
import ResumeMac from "../../public/images/resume-mac.png";
import SmartMac from "../../public/images/smart-mac.png";
import DrJobMac from "../../public/images/drjob-mac.png";

export const DATA = {
  name: "Karan Mavadiya 🧑‍💻",
  initials: "KM",
  url: "https://github.com/karan9m/my-resume",
  location: "Ahmedabad, India",
  locationLink: "https://www.google.com/maps/place/Ahmedabad",
  description:
    "A Full Stack Developer from India, Code is an art 🎨 be the artist!",
  summary:
    "A Computer Science graduate from [LJ university](https://ljku.edu.in/), specialize in modern web development and am actively working on [open-source projects](https://github.com/karan9m). I'm passionate about creating impactful solutions and sharing knowledge through my [technical blog](https://mekaran.vercel.app/blog) as well as on [X(Twitter)](https://x.com/karan_9M/highlights) too | Free-lancer.",
  avatarUrl: "/Avatar.png",
  skills: [
    "React",
    "Next.js",
    "Typescript",
    "Node.js",
    "Java",
    "MongoDB",
    "JavaScript",
    "git",
    "Linux",
    "RestAPI",
    "AI API",
    "TailwindCSS",
    "Framer-motion",
    "GSAP",
    "Python",
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
        url: "https://x.com/karan_9M",
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
  education: [
    {
      school: "LJ University",
      href: "https://ljku.edu.in/",
      degree: "Degree in Computer Science and Information Technology(*)",
      logoUrl: "/images/lju.png",
      start: "2025",
      end: "2028",
    },
    {
      school: "LJ University",
      href: "https://ljku.edu.in/",
      degree: "Diploma in Computer Science and Information Technology",
      logoUrl: "/images/lju.png",
      start: "2021",
      end: "2024",
    },
    {
      school: "Shree durga vidhya vihar",
      href: "https://www.durgaschool.com/",
      degree: "SSC Boards",
      logoUrl: "/images/durga.jpeg",
      start: "2020",
      end: "2021",
    },
  ],
  projects: [
    {
      title: "SwiftUI",
      href: "https://swiftui.vercel.app/",
      dates: "March 2025 - Ongoing",
      active: true,
      description:
        "A UI component library inspired by AceternityUI, designed to help developers create beautiful and interactive user interfaces with ease. It features a wide range of components, animations, and utilities that can be easily integrated into any Next.js project.",
      technologies: [
        "Next.js",
        "TailwindCSS",
        "Framer-motion",
        "TypeScript",
        "shadcnUI",
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
          href: "https://www.wallpaperz.in/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/StarKnightt/wallpaperz",
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
      title: "Smart notes",
      href: "https://smrtnotes.vercel.app/",
      dates: "April 2024 - September 2024",
      active: true,
      description:
        "Smart Notes is an AI-powered note-taking application utilizing Retrieval-Augmented Generation (RAG) to help users efficiently organize, search, and generate content from their notes. It enables intelligent retrieval of information and provides contextual suggestions, making knowledge management seamless and interactive.",
      technologies: [
        "React.js",
        "Octokit",
        "Rest API",
        "TailwindCSS",
        "react-icons",
        "react-router-dom",
        "Vite",
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
