"use client";

import { motion } from "framer-motion";
import { PromptInput } from "./prompt-input";

interface LandingStateProps {
  onSubmit: (prompt: string) => void;
}

export function LandingState({ onSubmit }: LandingStateProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-8 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
          Design anything.
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
            Print-ready in seconds.
          </span>
        </h1>
        <p className="text-slate-400 text-lg max-w-lg mx-auto">
          Describe your vision and watch our AI pipeline transform it into a
          high-resolution, production-ready design.
        </p>
      </div>

      <PromptInput onSubmit={onSubmit} />

      <div className="flex items-center gap-6 text-xs text-slate-600">
        <span>3600 × 4800px</span>
        <span className="h-3 w-px bg-slate-700" />
        <span>300 DPI</span>
        <span className="h-3 w-px bg-slate-700" />
        <span>Print-Ready PNG</span>
      </div>
    </motion.div>
  );
}
