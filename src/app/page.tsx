"use client";

import { AudioWave } from "@/components/ui/audio-wave";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-6xl">
            SAESHN
          </h1>
          <p className="text-muted-foreground text-balance">
            Electronic Music Producer & Artist
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-3xl"
        >
          <AudioWave />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-muted-foreground max-w-xl text-center"
        >
          <p className="text-balance">
            Crafting unique soundscapes through a fusion of electronic,
            afrobeat, reggae, R&B, hip-hop, and trap music.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
