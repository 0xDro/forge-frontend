"use client";

import { PIPELINE_STEPS } from "@/lib/constants";
import { PipelineNode } from "./pipeline-node";
import type { PipelineStep } from "@/types/api";

interface PipelineVisualizerProps {
  activeStep: PipelineStep;
  completedSteps: number;
}

function getNodeState(index: number, activeStep: PipelineStep, completedSteps: number) {
  if (index < completedSteps) return "done" as const;
  if (index === activeStep) return "active" as const;
  return "pending" as const;
}

export function PipelineVisualizer({ activeStep, completedSteps }: PipelineVisualizerProps) {
  return (
    <div className="flex items-start justify-center gap-0">
      {PIPELINE_STEPS.map((step, i) => (
        <div key={step.label} className="flex items-start">
          <PipelineNode
            label={step.label}
            description={step.description}
            state={getNodeState(i, activeStep, completedSteps)}
            index={i}
          />
          {i < PIPELINE_STEPS.length - 1 && (
            <div className="flex items-center h-12 px-2">
              <div className="relative w-12 sm:w-16 h-0.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-indigo-500 rounded-full transition-all duration-700 ease-out origin-left"
                  style={{
                    width: i < completedSteps ? "100%" : "0%",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
