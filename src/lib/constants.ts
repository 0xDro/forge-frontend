import type { DesignStatus, PipelineStep } from "@/types/api";

export const PLACEHOLDER_PROMPTS = [
  "A fierce samurai wolf in neon armor...",
  "Vintage botanical illustration with gold leaf...",
  "Cyberpunk cityscape with holographic billboards...",
  "Abstract fluid art in midnight blues and copper...",
  "Retro synthwave sunset with palm silhouettes...",
  "Geometric mandala pattern in sacred geometry...",
  "Graffiti-style portrait with dripping paint...",
  "Minimalist line art of a mountain landscape...",
];

export const PIPELINE_STEPS = [
  { label: "Optimizing", description: "Refining your prompt with AI" },
  { label: "Generating", description: "Creating your design" },
  { label: "Processing", description: "Enhancing for print quality" },
  { label: "Finalizing", description: "Preparing for production" },
] as const;

export const STATUS_TO_STEP: Record<DesignStatus, PipelineStep | null> = {
  pending: 0,
  processing_prompt: 0,
  generating_image: 1,
  post_processing: 2,
  submitting: 3,
  completed: null,
  failed: null,
};

export const POLL_INTERVAL_MS = 2000;
export const TIMEOUT_MS = 5 * 60 * 1000;
export const PLACEHOLDER_CYCLE_MS = 3000;
