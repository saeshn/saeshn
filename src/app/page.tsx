"use client";

import { AudioPlayer } from "@/components/ui/audio-player";
import { AudioWave } from "@/components/ui/audio-wave";
import { BerlinTime } from "@/components/ui/berlin-time";
import { motion, useScroll, useTransform } from "framer-motion";
import { delaGothic } from "./fonts";
import { useRef } from "react";
import { CustomCursor } from "@/components/ui/custom-cursor";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <>
      <CustomCursor />
      <div ref={containerRef} className="relative min-h-screen">
        {/* Background with parallax */}
        <motion.div
          className="fixed inset-0 -z-10"
          style={{
            y,
            scale,
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/cover-landing.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
        </motion.div>

        {/* Content */}
        <motion.div className="relative min-h-screen" style={{ opacity }}>
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid min-h-screen place-items-center">
              <div className="relative w-full max-w-3xl space-y-16 py-20">
                {/* Top Text */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="w-full"
                >
                  <motion.p
                    className="text-sm font-medium tracking-[0.2em] text-pink-500 uppercase"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                  >
                    Prod. by Saeshn
                  </motion.p>
                </motion.div>

                {/* Center Content */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="text-center"
                >
                  <h1
                    className={`${delaGothic.className} bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-[12rem] leading-none font-bold tracking-tighter text-transparent`}
                  >
                    OTiTO
                  </h1>
                  <p className="mt-4 text-xl tracking-widest text-pink-500">
                    2025
                  </p>
                </motion.div>

                {/* Bottom Content */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="w-full space-y-8"
                >
                  <div className="relative">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-black/50 via-transparent to-black/50 backdrop-blur-sm" />
                    <AudioWave />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 rounded-2xl bg-black/30 backdrop-blur-sm" />
                    <div className="relative">
                      <AudioPlayer
                        audioUrl="/music/ONE_BLOOD.wav"
                        autoPlay={false}
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Fixed Elements */}
        <div className="fixed right-0 bottom-0 p-4">
          <BerlinTime />
        </div>
      </div>
    </>
  );
}
