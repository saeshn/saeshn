"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export function AudioWave() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bars = Array.from({ length: 128 }, (_, i) => i);

  return (
    <div className="flex h-32 w-full items-center justify-center overflow-hidden">
      <div className="flex h-full w-full items-center gap-[2px]">
        {bars.map((i) => {
          const height = Math.sin((i * Math.PI) / 24) * 100;
          return (
            <motion.div
              key={i}
              className="h-full w-1"
              initial={{ scaleY: 0 }}
              animate={{
                scaleY: [0.2, Math.abs(height) / 100, 0.2],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.02,
                ease: "easeInOut",
              }}
              style={{
                backgroundColor: isDark
                  ? "rgb(226 232 240 / 0.1)"
                  : "rgb(15 23 42 / 0.1)",
                transformOrigin: "bottom",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
