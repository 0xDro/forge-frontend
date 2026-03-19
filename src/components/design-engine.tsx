"use client";

import { AnimatePresence } from "framer-motion";
import { useDesignJob } from "@/hooks/use-design-job";
import { BackgroundGlow } from "./background-glow";
import { BrandHeader } from "./brand-header";
import { LandingState } from "./landing-state";
import { ProcessingState } from "./processing-state";
import { RevealState } from "./reveal-state";
import { ErrorState } from "./error-state";

export function DesignEngine() {
  const job = useDesignJob();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen py-12">
      <BackgroundGlow />

      <div className="absolute top-6 left-6">
        <BrandHeader />
      </div>

      <div className="w-full max-w-4xl mx-auto px-4">
        <AnimatePresence mode="wait">
          {job.engineState === "idle" && (
            <LandingState key="landing" onSubmit={job.submit} />
          )}
          {job.engineState === "processing" && (
            <ProcessingState
              key="processing"
              activeStep={job.activeStep}
              completedSteps={job.completedSteps}
              prompt={job.prompt}
            />
          )}
          {job.engineState === "completed" && job.result && (
            <RevealState
              key="reveal"
              result={job.result}
              onReset={job.reset}
            />
          )}
          {job.engineState === "error" && (
            <ErrorState
              key="error"
              error={job.error || "An unexpected error occurred"}
              onRetry={job.retry}
              onReset={job.reset}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
