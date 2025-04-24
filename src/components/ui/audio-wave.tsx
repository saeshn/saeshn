"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// Initial opacity values to avoid hydration mismatch
const INITIAL_OPACITIES = Array.from({ length: 32 }, () => 0.3);

export function AudioWave() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Determine if dark mode based on theme or system preference
  const isDark = mounted
    ? theme === "dark" || (theme === "system" && systemTheme === "dark")
    : false;

  // Generate random height between min and max
  const randomHeight = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let isAnimating = true;
    let prevHeights = Array(32).fill(0.2);

    const animate = () => {
      if (!isAnimating) return;

      // Create new target heights
      const newHeights = prevHeights.map((prev) => {
        const shouldSpike = Math.random() < 0.2;
        if (shouldSpike) {
          return randomHeight(0.7, 1);
        }
        // Make height somewhat related to previous height for smoother transitions
        const minHeight = Math.max(0.2, prev - 0.3);
        const maxHeight = Math.min(0.8, prev + 0.3);
        return randomHeight(minHeight, maxHeight);
      });

      // Update previous heights
      prevHeights = newHeights;

      // Animate each bar
      const bars = document.querySelectorAll(".audio-wave-bar");
      bars.forEach((bar, index) => {
        bar.animate([{ transform: `scaleY(${prevHeights[index]})` }], {
          duration: isHovered ? 600 : 1000,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "forwards",
        });
      });

      // Schedule next animation with longer intervals
      setTimeout(
        () => {
          if (isAnimating) {
            requestAnimationFrame(animate);
          }
        },
        isHovered ? 200 : 300,
      );
    };

    // Start animation immediately
    requestAnimationFrame(animate);

    return () => {
      isAnimating = false;
    };
  }, [isHovered]); // Remove mounted dependency

  return (
    <div
      className="group relative flex h-40 w-full items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex h-full w-full items-center justify-center gap-1.5">
        {Array.from({ length: 32 }, (_, index) => (
          <div
            key={index}
            className="audio-wave-bar h-full w-2 rounded-full transition-colors"
            style={{
              backgroundColor: isDark
                ? `rgba(226, 232, 240, ${INITIAL_OPACITIES[index]})`
                : `rgba(15, 23, 42, ${INITIAL_OPACITIES[index]})`,
              transformOrigin: "bottom",
              transform: "scaleY(0.2)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
