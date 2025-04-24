"use client";

import { useEffect, useState } from "react";

export function BerlinTime() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const berlinTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Europe/Berlin",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);

      const ms = now.getMilliseconds().toString().padStart(3, "0");
      setTime(`${berlinTime}.${ms}`);
    };

    // Update immediately
    updateTime();

    // Update every millisecond
    const interval = setInterval(updateTime, 1);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed right-0 bottom-0 left-0 flex items-center justify-between p-4">
      <div className="text-muted-foreground/60 font-mono text-sm">
        <div className="bg-background/50 rounded-lg px-4 py-2 backdrop-blur">
          <span className="tabular-nums">{time}</span>
        </div>
      </div>
      <div className="text-muted-foreground/60 font-mono text-sm">
        <div className="bg-background/50 rounded-lg px-4 py-2 backdrop-blur">
          <span>BERLIN</span>
        </div>
      </div>
    </div>
  );
}
