import { useEffect, useRef, useState } from "react";
import { Slider } from "@/components/ui/slider";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { motion } from "framer-motion";

interface AudioPlayerProps {
  audioUrl: string;
  autoPlay?: boolean;
  onPlayingChange?: (
    isPlaying: boolean,
    audio: HTMLAudioElement | null,
  ) => void;
  className?: string;
}

export function AudioPlayer({
  audioUrl,
  autoPlay = false,
  onPlayingChange,
  className = "",
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const previousVolume = useRef(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    if (autoPlay) {
      audio.play().catch(() => {
        setIsPlaying(false);
        onPlayingChange?.(false, audio);
      });
    }

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [autoPlay, onPlayingChange]);

  const togglePlayPause = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        await audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
      onPlayingChange?.(!isPlaying, audioRef.current);
    } catch (error) {
      console.error("Error toggling play/pause:", error);
    }
  };

  const skipForward = () => {
    if (!audioRef.current) return;
    const newTime = Math.min(currentTime + 10, duration);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const skipBackward = () => {
    if (!audioRef.current) return;
    const newTime = Math.max(currentTime - 10, 0);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSeek = async (value: number[]) => {
    if (!audioRef.current) return;
    const newTime = value[0];
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);

    // Automatically start playing when seeking
    if (!isPlaying) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        onPlayingChange?.(true, audioRef.current);
      } catch (error) {
        console.error("Error starting playback:", error);
      }
    }
  };

  const handleVolumeChange = (value: number[]) => {
    if (!audioRef.current) return;
    const newVolume = value[0];
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
    if (newVolume > 0) {
      setIsMuted(false);
      previousVolume.current = newVolume;
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = previousVolume.current;
      setVolume(previousVolume.current);
    } else {
      previousVolume.current = volume;
      audioRef.current.volume = 0;
      setVolume(0);
    }
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`bg-secondary/20 w-full rounded-xl p-4 ${className}`}>
      <audio ref={audioRef} src={audioUrl} preload="metadata" loop />

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <motion.button
            onClick={skipBackward}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500/20 text-pink-500 transition-colors hover:bg-pink-500/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SkipBack size={16} />
          </motion.button>

          <motion.button
            onClick={togglePlayPause}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500 text-white transition-colors hover:bg-pink-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </motion.button>

          <motion.button
            onClick={skipForward}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500/20 text-pink-500 transition-colors hover:bg-pink-500/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SkipForward size={16} />
          </motion.button>
        </div>

        <div className="flex-1">
          <Slider
            value={[currentTime]}
            min={0}
            max={duration}
            step={0.1}
            onValueChange={handleSeek}
            className="cursor-pointer"
          />
        </div>

        <div className="flex min-w-[80px] justify-end font-mono text-sm">
          <span className="text-pink-500">{formatTime(currentTime)}</span>
          <span className="mx-1 text-pink-500/60">/</span>
          <span className="text-pink-500/60">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-4">
        <motion.button
          onClick={toggleMute}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500/20 text-pink-500 transition-colors hover:bg-pink-500/30"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </motion.button>

        <div className="w-24">
          <Slider
            value={[volume]}
            min={0}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="cursor-pointer"
          />
        </div>

        <div className="flex-1 text-sm font-medium text-pink-500/80">
          - OTiTO -
        </div>
      </div>
    </div>
  );
}
