"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
  onReset: () => void;
}

export function ErrorState({ error, onRetry, onReset }: ErrorStateProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-6 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-card p-8 max-w-md w-full text-center space-y-4">
        <div className="mx-auto w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-red-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-1">Generation Failed</h3>
          <p className="text-sm text-slate-400">{error}</p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Button
            onClick={onRetry}
            className="bg-indigo-500 hover:bg-indigo-400 text-white font-medium px-6 py-2.5 rounded-xl h-auto"
          >
            Retry
          </Button>
          <Button
            variant="outline"
            onClick={onReset}
            className="border-white/10 text-white hover:bg-white/5 font-medium px-6 py-2.5 rounded-xl h-auto"
          >
            Start Over
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
