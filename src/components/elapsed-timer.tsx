"use client";

import { useElapsedTime } from "@/hooks/use-elapsed-time";

interface ElapsedTimerProps {
  running: boolean;
}

export function ElapsedTimer({ running }: ElapsedTimerProps) {
  const { display } = useElapsedTime(running);

  return (
    <div className="flex items-center gap-2 text-slate-500">
      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
      <span className="font-mono text-sm tabular-nums">{display}</span>
    </div>
  );
}
