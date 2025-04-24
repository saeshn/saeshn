import { useEffect, useRef, useState } from "react";
import { Button } from "./button";
import { Slider } from "./slider";
import { Play, Pause } from "lucide-react";

interface AudioPlayerProps {
  audioUrl: string;
  autoPlay?: boolean;
}

export function AudioPlayer({ audioUrl, autoPlay = false }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    if (autoPlay) {
      audio.play().catch(() => {
        // Autoplay might be blocked by browser
        setIsPlaying(false);
      });
    }

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [autoPlay]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (newValue: number[]) => {
    if (!audioRef.current) return;
    const [value] = newValue;
    audioRef.current.currentTime = value;
    setProgress(value);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <audio ref={audioRef} src={audioUrl} />

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={togglePlayPause}
          className="h-12 w-12"
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </Button>

        <div className="flex-1">
          <Slider
            value={[progress]}
            max={duration}
            step={0.1}
            onValueChange={handleProgressChange}
            className="w-full"
          />
          <div className="text-muted-foreground mt-1 flex justify-between text-sm">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
