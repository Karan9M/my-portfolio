"use client";

import React, { useEffect, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { BorderBeam } from "@/components/magicui/border-beam";

export function GithubContributions() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    fetch("/api/github-contributions")
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          setError(json.error);
        } else {
          setData(json);
        }
      })
      .catch(() => setError("Failed to load contributions"));
  }, []);

  const theme = {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  if (!mounted || (data.length === 0 && !error)) {
    return (
      <div className="w-full h-[160px] rounded-xl bg-muted animate-pulse" />
    );
  }

  if (error) {
    return (
      <div className="w-full h-[160px] rounded-xl bg-muted flex items-center justify-center p-4 text-center">
        <p className="text-sm text-muted-foreground">
          {error}. 
          <br/>
          Make sure to add <code className="bg-background px-1 py-0.5 rounded">GITHUB_TOKEN</code> to your .env file!
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl">
      <BorderBeam
        duration={6}
        size={400}
        className="from-transparent via-purple-500 to-transparent"
      />
      <BorderBeam
        duration={6}
        delay={3}
        size={400}
        className="from-transparent via-pink-500 to-transparent"
      />
      <motion.div
        className="w-full overflow-hidden rounded-xl bg-card hover:shadow-lg transition-shadow duration-300 p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-4 hover:scale-[1.02] flex items-center justify-center transition-transform duration-300">
          <ActivityCalendar
            data={data}
            theme={theme}
            colorScheme={resolvedTheme as "light" | "dark"}
            fontSize={12}
            blockSize={12}
            blockMargin={4}
            showTotalCount={false}
            showColorLegend={false}
          />
        </div>
      </motion.div>
    </div>
  );
}