import Navbar from "@/components/navbar";
import { PageBackground } from "@/components/page-background";
import { ScrollProgress } from "@/components/scroll-progress";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: "Karan Mavadiya | Full Stack Developer",
    template: `%s | Karan Mavadiy`,
  },
  description:
    "Karan Mavadiya is a Full Stack Developer from India, with expertise in React, Next.js, TypeScript and Node.js. I create modern web applications and have a passion for clean, efficient code. View my portfolio to see my latest projects and technical blog posts.",
  keywords: [
    "Karan Mavadiya",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "Web Developer India",
    "Software Engineer",
  ],
  authors: [{ name: "Karan mavadiya" }],
  creator: "Karan mavadiya",
  publisher: "Karan mavadiya",
  alternates: {
    canonical: DATA.url,
  },
  openGraph: {
    title: "Karan mavadiya | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, TypeScript and Node.js. Check out my portfolio, projects and blog posts.",
    url: DATA.url,
    siteName: "Karan mavadiya - Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/portfolio.png",
        width: 1200,
        height: 630,
        alt: "Karan mavadiya - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karan mavadiya | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, TypeScript and Node.js",
    images: [
      {
        url: "/portfolio.png",
        width: 1200,
        height: 630,
        alt: "Karan - Full Stack Developer",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(fontSans.variable, "font-sans antialiased")}>
          {/* Background container */}
          <div className="fixed inset-0 z-[-1]">
            <PageBackground />
          </div>

          {/* Main content */}
          <div className="relative z-10 max-w-2xl mx-auto py-12 sm:py-24 px-6">
            <ScrollProgress />
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <TooltipProvider delayDuration={0}>
                {children}
                <Navbar />
              </TooltipProvider>
            </ThemeProvider>
          </div>
        </body>
      </html>
    </ViewTransitions>
  );
}
