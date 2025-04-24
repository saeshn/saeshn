"use client";

import { AudioWave } from "@/components/ui/audio-wave";
import { BerlinTime } from "@/components/ui/berlin-time";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useEffect } from "react";

export default function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
console.log(mouseY)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth) * 100);
      mouseY.set((clientY / innerHeight) * 100);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      <div className="noise" />
      <main className="grid min-h-screen place-items-center">
        <div
          className="glow relative flex flex-col items-center gap-16 p-6"
          style={
            {
              "--x": useMotionTemplate`${mouseX}%`,
              "--y": useMotionTemplate`${mouseY}%`,
            } as React.CSSProperties
          }
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              className="gradient-text mb-6 text-6xl font-bold tracking-tighter sm:text-7xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              SAESHN
            </motion.h1>
            <motion.p
              className="text-muted-foreground text-lg text-balance"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Electronic Music Producer & Artist
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="w-full max-w-2xl"
          >
            <AudioWave />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-lg text-center"
          >
            <p className="text-muted-foreground text-balance">
              Crafting unique soundscapes through a fusion of electronic,
              afrobeat, reggae, R&B, hip-hop, and trap music.
            </p>
          </motion.div>
        </div>
      </main>
      <BerlinTime />
    </>
  );
}
