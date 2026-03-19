"use client";

import { motion } from "framer-motion";

type NodeState = "pending" | "active" | "done";

interface PipelineNodeProps {
  label: string;
  description: string;
  state: NodeState;
  index: number;
}

export function PipelineNode({ label, description, state, index }: PipelineNodeProps) {
  return (
    <motion.div
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="relative flex items-center justify-center w-12 h-12">
        {/* Background circle */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-500 ${
            state === "done"
              ? "bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.4)]"
              : state === "active"
              ? "bg-indigo-500/20"
              : "bg-white/5"
          }`}
        />

        {/* Spinning ring for active */}
        {state === "active" && (
          <div className="absolute inset-[-3px] rounded-full border-2 border-transparent border-t-indigo-400 animate-spin-ring" />
        )}

        {/* Done checkmark */}
        {state === "done" && (
          <svg
            className="relative w-5 h-5 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.path
              d="M5 13l4 4L19 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </svg>
        )}

        {/* Active dot */}
        {state === "active" && (
          <motion.div
            className="relative w-2 h-2 rounded-full bg-indigo-400"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}

        {/* Pending dot */}
        {state === "pending" && (
          <div className="relative w-2 h-2 rounded-full bg-slate-600" />
        )}
      </div>

      <div className="text-center">
        <p
          className={`text-xs font-medium transition-colors duration-300 ${
            state === "done"
              ? "text-indigo-400"
              : state === "active"
              ? "text-white"
              : "text-slate-600"
          }`}
        >
          {label}
        </p>
        <p
          className={`text-[10px] mt-0.5 transition-colors duration-300 ${
            state === "active" ? "text-slate-400" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
}
