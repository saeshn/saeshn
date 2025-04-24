"use client";

import { AudioWave } from "@/components/ui/audio-wave";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="grid min-h-screen place-items-center">
      <div className="flex flex-col items-center gap-12 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-7xl">
            SAESHN
          </h1>
          <p className="text-muted-foreground text-lg text-balance">
            Electronic Music Producer & Artist
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-2xl"
        >
          <AudioWave />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-lg text-center"
        >
          <p className="text-muted-foreground text-balance">
            Crafting unique soundscapes through a fusion of electronic,
            afrobeat, reggae, R&B, hip-hop, and trap music.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
