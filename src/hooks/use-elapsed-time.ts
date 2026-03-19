"use client";

import { useEffect, useRef, useState } from "react";

export function useElapsedTime(running: boolean) {
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!running) {
      startRef.current = null;
      return;
    }

    startRef.current = performance.now();
    const tick = () => {
      if (startRef.current !== null) {
        setElapsed(performance.now() - startRef.current);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [running]);

  const seconds = elapsed / 1000;
  const display = seconds < 60
    ? `${seconds.toFixed(1)}s`
    : `${Math.floor(seconds / 60)}m ${(seconds % 60).toFixed(0)}s`;

  return { elapsed, seconds, display };
}
