"use client";

import { AudioPlayer } from "@/components/ui/audio-player";
import { AudioWave } from "@/components/ui/audio-wave";
import { BerlinTime } from "@/components/ui/berlin-time";
import { motion, useScroll, useTransform } from "framer-motion";
import { delaGothic } from "./fonts";
import { useRef, useState, useEffect } from "react";
import { CustomCursor } from "@/components/ui/custom-cursor";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTextHovered, setIsTextHovered] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  if (!isMounted) {
    return null; // Return nothing during SSR
  }

  const sparkleVariants = {
    animate: {
      opacity: [0.8, 1, 0.8],
      filter: [
        "brightness(1) drop-shadow(0 0 2px rgba(236, 72, 153, 0.3))",
        "brightness(1.4) drop-shadow(0 0 8px rgba(236, 72, 153, 0.8))",
        "brightness(1) drop-shadow(0 0 2px rgba(236, 72, 153, 0.3))",
      ],
      textShadow: [
        "0 0 4px rgba(236, 72, 153, 0.3), 0 0 8px rgba(236, 72, 153, 0.2)",
        "0 0 8px rgba(236, 72, 153, 0.7), 0 0 16px rgba(236, 72, 153, 0.4)",
        "0 0 4px rgba(236, 72, 153, 0.3), 0 0 8px rgba(236, 72, 153, 0.2)",
      ],
    },
  };

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
                    className={`${delaGothic.className} relative text-[4rem] leading-none font-bold tracking-tighter md:text-[8rem] lg:text-[12rem]`}
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
                      className={`${delaGothic.className} bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-center text-3xl font-bold tracking-tighter text-transparent md:text-4xl lg:text-6xl`}
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
                          <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-white/80 md:text-base lg:text-lg">
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
                            {isAudioPlaying && <AudioWave />}
                          </div>
                          <div className="relative">
                            <div className="absolute inset-0 rounded-2xl bg-black/30 backdrop-blur-sm" />
                            <div className="relative">
                              <AudioPlayer
                                audioUrl="/music/OTITO.wav"
                                autoPlay={false}
                                onPlayingChange={(playing) => {
                                  setIsAudioPlaying(playing);
                                  if (playing) {
                                    setHasPlayedOnce(true);
                                  }
                                }}
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

        {/* Scroll Indicator */}
        <motion.div
          className="fixed bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <p className="text-sm tracking-widest text-white/50 uppercase">
            scroll and discover the story
          </p>
          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white/50"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </motion.div>
        </motion.div>

        {/* Right Side Navigation */}
        <nav
          className="fixed top-1/2 z-50 -translate-y-1/2 space-y-8"
          style={{ right: "304px" }}
        >
          <ul className="space-y-8">
            {[
              "SAESHN - WHAT WE DO",
              "COMMUNITY",
              "LYRICS",
              "RELEASES",
              "MERCH",
              "CREDITS AND CONTACT",
            ].map((item, index) => (
              <motion.li
                key={item}
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
                  className="group relative block text-lg font-medium text-white/30 transition-colors hover:text-white"
                  whileHover={{ x: 0 }}
                >
                  <span className="relative z-10 mix-blend-difference">
                    {item}
                  </span>
                  <motion.div
                    className="absolute top-0 left-0 h-full w-0 rounded-sm bg-gradient-to-r from-pink-500/40 via-pink-500/20 to-transparent"
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
                      background:
                        "linear-gradient(90deg, #ec4899 0%, transparent 100%)",
                    }}
                  />
                  <motion.div
                    className="absolute top-1/2 -left-4 h-4 w-4 -translate-y-1/2 rounded-full bg-pink-500/0"
                    initial={{ scale: 0 }}
                    whileHover={{
                      scale: 1,
                      backgroundColor: "rgba(236, 72, 153, 0.2)",
                      transition: { duration: 0.3 },
                    }}
                  />
                </motion.a>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Left Side FINISH MY SONG button */}
        {hasPlayedOnce && (
          <motion.div
            className="fixed top-[65%] left-[25rem] -translate-y-1/2"
            initial={{
              opacity: 0,
              x: -100,
              scale: 0.5,
              filter: "blur(10px)",
              textShadow: "0 0 0px rgba(236, 72, 153, 0)",
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              filter: "blur(0px)",
              textShadow: [
                "0 0 20px rgba(236, 72, 153, 0.8)",
                "0 0 40px rgba(236, 72, 153, 0.6)",
                "0 0 20px rgba(236, 72, 153, 0.8)",
              ],
            }}
            transition={{
              duration: 1.2,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
              textShadow: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
          >
            <motion.a
              href="#"
              className="group relative block text-lg font-medium text-pink-500/80 transition-colors hover:text-pink-500"
              whileHover={{ x: 0 }}
              animate="animate"
              variants={sparkleVariants}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              <motion.span
                className="relative z-10 inline-block mix-blend-difference"
                initial={{ rotateX: -90 }}
                animate={{ rotateX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.4,
                  ease: "easeOut",
                }}
              >
                FINISH MY SONG
              </motion.span>
              <motion.div
                className="absolute top-0 left-0 h-full w-0 rounded-sm bg-gradient-to-r from-pink-500/20 via-pink-500/10 to-transparent"
                initial={{ width: 0 }}
                animate={{
                  width: ["0%", "150%", "0%"],
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.6,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-1 left-0 h-[2px] w-0"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 0.8,
                  delay: 1,
                  ease: "easeOut",
                }}
                style={{
                  background:
                    "linear-gradient(90deg, #ec4899 0%, transparent 100%)",
                }}
              />
              <motion.div
                className="absolute top-1/2 -left-4 h-4 w-4 -translate-y-1/2 rounded-full bg-pink-500/0"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.5, 1],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 1,
                  delay: 0.8,
                  ease: "easeOut",
                }}
              />
            </motion.a>
          </motion.div>
        )}

        {/* Mobile Navigation */}
        <nav className="fixed right-0 bottom-0 left-0 z-50 bg-black/80 backdrop-blur-lg md:hidden">
          <ul className="flex justify-around px-2 py-4">
            {["SAESHN", "COMMUNITY", "RELEASES", "CONTACT"].map(
              (item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 * index,
                  }}
                >
                  <motion.a
                    href="#"
                    className="group relative block text-sm font-medium text-white/50 transition-colors hover:text-white"
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="relative z-10">{item}</span>
                  </motion.a>
                </motion.li>
              ),
            )}
          </ul>
        </nav>

        {/* Audio Player Container - Mobile Optimized */}
        <div className="fixed right-0 bottom-16 left-0 px-4 md:hidden">
          <div className="relative rounded-lg bg-black/70 backdrop-blur-sm">
            <div className="p-2">
              <AudioPlayer
                audioUrl="/music/OTITO.wav"
                autoPlay={false}
                onPlayingChange={(playing) => {
                  setIsAudioPlaying(playing);
                  if (playing) {
                    setHasPlayedOnce(true);
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Berlin Time - Mobile Optimized */}
        <div className="fixed right-0 bottom-20 p-4 md:bottom-0">
          <BerlinTime />
        </div>

        {/* Scroll Indicator - Hide on Mobile */}
        <motion.div
          className="fixed bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <p className="text-sm tracking-widest text-white/50 uppercase">
            scroll and discover the story
          </p>
          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white/50"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
