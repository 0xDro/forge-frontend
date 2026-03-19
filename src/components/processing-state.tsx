"use client";

import { motion } from "framer-motion";
import { PipelineVisualizer } from "./pipeline-visualizer";
import { ElapsedTimer } from "./elapsed-timer";
import type { PipelineStep } from "@/types/api";

interface ProcessingStateProps {
  activeStep: PipelineStep;
  completedSteps: number;
  prompt: string;
}

export function ProcessingState({ activeStep, completedSteps, prompt }: ProcessingStateProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-10 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-white">Creating your design</h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto truncate">
          &ldquo;{prompt}&rdquo;
        </p>
      </div>

      <PipelineVisualizer activeStep={activeStep} completedSteps={completedSteps} />

      <ElapsedTimer running={true} />
    </motion.div>
  );
}
