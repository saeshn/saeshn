"use client";

import { AudioPlayer } from "@/components/ui/audio-player";
import { AudioWave } from "@/components/ui/audio-wave";
import { BerlinTime } from "@/components/ui/berlin-time";
import { motion, useScroll, useTransform } from "framer-motion";
import { delaGothic } from "./fonts";
import { useRef, useState } from "react";
import { CustomCursor } from "@/components/ui/custom-cursor";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTextHovered, setIsTextHovered] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
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
            style={{ backgroundImage: "url('/otito.JPG')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />

          {/* Diagonal Text */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.h2
              initial={{ opacity: 0, x: -100, y: -100 }}
              animate={{ opacity: 0.15, x: 0, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className={`${delaGothic.className} fixed right-0 left-0 text-[8rem] font-bold tracking-tighter text-white`}
              style={{
                transform: "rotate(-45deg) translate(-15%, -50%)",
                transformOrigin: "left top",
                whiteSpace: "nowrap",
              }}
            >
              THE SAESHN TAPES Vol. 1
            </motion.h2>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div className="relative min-h-screen" style={{ opacity }}>
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid min-h-screen place-items-center">
              <div className="relative w-full max-w-3xl space-y-16 py-20">
                {/* Center Content */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="space-y-4 text-center"
                >
                  <h1
                    className={`${delaGothic.className} relative text-[12rem] leading-none font-bold tracking-tighter`}
                  >
                    <div className="relative">
                      {["O", "T", "i", "T", "O"].map((letter, index) => (
                        <motion.span
                          key={index}
                          className="relative inline-block text-white"
                          animate={
                            isAudioPlaying
                              ? {
                                  scale: [1, 1.2, 1],
                                  opacity: [1, 0.7, 1],
                                  textShadow: [
                                    "0 0 0px rgba(255,255,255,0)",
                                    "0 0 20px rgba(255,255,255,0.5)",
                                    "0 0 0px rgba(255,255,255,0)",
                                  ],
                                }
                              : {
                                  scale: 1,
                                  opacity: 1,
                                  textShadow: "0 0 0px rgba(255,255,255,0)",
                                }
                          }
                          transition={
                            isAudioPlaying
                              ? {
                                  duration: 2.5,
                                  repeat: Infinity,
                                  repeatType: "loop",
                                  ease: [0.4, 0, 0.6, 1],
                                  delay: index * 0.35,
                                }
                              : {
                                  duration: 0.3,
                                }
                          }
                        >
                          {letter}
                        </motion.span>
                      ))}
                    </div>
                  </h1>
                </motion.div>

                {/* Bottom Content */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="w-full space-y-8"
                >
                  <motion.div
                    className="relative cursor-pointer"
                    onMouseEnter={() => setIsTextHovered(true)}
                    onMouseLeave={() => setIsTextHovered(false)}
                  >
                    <motion.h2
                      className={`${delaGothic.className} bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-center text-6xl font-bold tracking-tighter text-transparent`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6 }}
                    >
                      MY ART OF MUSIC
                    </motion.h2>
                    {isTextHovered && (
                      <>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                          className="relative mt-6 mb-8 px-4"
                        >
                          <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-white/80">
                            <span className="font-semibold text-pink-500">
                              SAESHN
                            </span>{" "}
                            - For me, music is more than just sound - it&apos;s
                            expression, emotion and sometimes just pure
                            enjoyment. Now, I want to paint my own vibe onto the
                            canvas of music lovers. With{" "}
                            <span className="font-semibold text-pink-500">
                              MY ART OF MUSIC
                            </span>{" "}
                            I&apos;m here to share my musical perspective with
                            you.{" "}
                            <span className="font-semibold text-pink-500">
                              OTiTO
                            </span>{" "}
                            - THE TRUTH. THE REALITY. THE REFLECTION.
                          </p>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.3 }}
                          className="relative mt-8 space-y-6"
                        >
                          <div className="relative">
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-black/50 via-transparent to-black/50 backdrop-blur-sm" />
                            <AudioWave />
                          </div>
                          <div className="relative">
                            <div className="absolute inset-0 rounded-2xl bg-black/30 backdrop-blur-sm" />
                            <div className="relative">
                              <AudioPlayer
                                audioUrl="/music/OTITO.wav"
                                autoPlay={false}
                                onPlayingChange={(playing) =>
                                  setIsAudioPlaying(playing)
                                }
                              />
                            </div>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </motion.div>

                  {/* Producer Credit and Year - Moved below audio player */}
                  <div className="-mt-4 flex flex-col items-center space-y-2">
                    <motion.p
                      className="text-2xl font-medium tracking-[0.2em] text-pink-500 uppercase"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.2 }}
                    >
                      - Prod. by Saeshn -
                    </motion.p>
                    <motion.p
                      className="text-base tracking-widest text-pink-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.3 }}
                    >
                      2025
                    </motion.p>
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

        {/* Right Side Navigation */}
        <nav className="fixed top-1/2 right-80 -translate-y-1/2 space-y-8">
          <ul className="space-y-8">
            {[
              "SAESHN RECORDS",
              "COMMUNITY",
              "CREDITZ",
              "RELEASES",
              { text: "FINISH MY SONG", special: true },
            ].map((item, index) => (
              <motion.li
                key={typeof item === "string" ? item : item.text}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 2 + index * 0.2,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <motion.a
                  href="#"
                  className={`group relative block text-lg font-medium transition-colors ${
                    typeof item === "object" && item.special
                      ? "text-pink-500/40 hover:text-pink-500"
                      : "text-white/30 hover:text-white"
                  }`}
                  whileHover={{ x: 0 }}
                >
                  <span className="relative z-10 mix-blend-difference">
                    {typeof item === "string" ? item : item.text}
                  </span>
                  <motion.div
                    className={`absolute top-0 left-0 h-full w-0 rounded-sm ${
                      typeof item === "object" && item.special
                        ? "bg-gradient-to-r from-pink-500/20 via-pink-500/10 to-transparent"
                        : "bg-gradient-to-r from-pink-500/40 via-pink-500/20 to-transparent"
                    }`}
                    initial={{ width: 0 }}
                    whileHover={{
                      width: "150%",
                      transition: { duration: 0.4, ease: "easeOut" },
                    }}
                  />
                  <motion.div
                    className="absolute -bottom-1 left-0 h-[2px] w-0"
                    initial={{ width: 0 }}
                    whileHover={{
                      width: "100%",
                      transition: { duration: 0.3, delay: 0.1 },
                    }}
                    style={{
                      background: `linear-gradient(90deg, ${
                        typeof item === "object" && item.special
                          ? "#ec4899"
                          : "#ec4899"
                      } 0%, transparent 100%)`,
                    }}
                  />
                  <motion.div
                    className={`absolute top-1/2 -left-4 h-4 w-4 -translate-y-1/2 rounded-full ${
                      typeof item === "object" && item.special
                        ? "bg-pink-500/0"
                        : "bg-pink-500/0"
                    }`}
                    initial={{ scale: 0 }}
                    whileHover={{
                      scale: 1,
                      backgroundColor:
                        typeof item === "object" && item.special
                          ? "rgba(236, 72, 153, 0.2)"
                          : "rgba(236, 72, 153, 0.2)",
                      transition: { duration: 0.3 },
                    }}
                  />
                </motion.a>
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
