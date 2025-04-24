"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export function AudioWave() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bars = Array.from({ length: 64 }, (_, i) => i);

  return (
    <div className="flex h-40 w-full items-center justify-center overflow-hidden">
      <div className="flex h-full w-full items-center justify-center gap-1">
        {bars.map((i) => {
          const height = Math.sin((i * Math.PI) / 16) * 100;
          const delay = (i / bars.length) * 0.5;

          return (
            <motion.div
              key={i}
              className="h-full w-1.5"
              initial={{ scaleY: 0 }}
              animate={{
                scaleY: [0.2, Math.abs(height) / 100, 0.2],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay,
                ease: "easeInOut",
              }}
              style={{
                backgroundColor: isDark
                  ? "rgb(226 232 240 / 0.2)"
                  : "rgb(15 23 42 / 0.2)",
                transformOrigin: "bottom",
                borderRadius: "2px",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
