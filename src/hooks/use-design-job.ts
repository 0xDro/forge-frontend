"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createDesign, getDesignStatus, getDesignDetail } from "@/lib/api-client";
import { STATUS_TO_STEP, POLL_INTERVAL_MS, TIMEOUT_MS } from "@/lib/constants";
import type {
  DesignDetailResponse,
  DesignStatus,
  DesignStatusResponse,
  PipelineStep,
} from "@/types/api";

export type EngineState = "idle" | "processing" | "completed" | "error";

interface DesignJobState {
  engineState: EngineState;
  jobId: string | null;
  status: DesignStatus;
  activeStep: PipelineStep;
  completedSteps: number;
  result: DesignDetailResponse | null;
  error: string | null;
  prompt: string;
}

export function useDesignJob() {
  const [state, setState] = useState<DesignJobState>({
    engineState: "idle",
    jobId: null,
    status: "pending",
    activeStep: 0,
    completedSteps: 0,
    result: null,
    error: null,
    prompt: "",
  });

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const jobIdRef = useRef<string | null>(null);

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const handleStatusUpdate = useCallback(
    async (statusRes: DesignStatusResponse) => {
      const designStatus = statusRes.status as DesignStatus;

      if (designStatus === "completed") {
        stopPolling();
        try {
          const detail = await getDesignDetail(statusRes.job_id);
          setState((s) => ({
            ...s,
            engineState: "completed",
            status: "completed",
            completedSteps: 4,
            result: detail,
          }));
        } catch {
          setState((s) => ({
            ...s,
            engineState: "error",
            error: "Failed to fetch design details",
          }));
        }
        return;
      }

      if (designStatus === "failed") {
        stopPolling();
        setState((s) => ({
          ...s,
          engineState: "error",
          status: "failed",
          error: statusRes.failure?.message || "Design generation failed",
        }));
        return;
      }

      const step = STATUS_TO_STEP[designStatus];
      if (step !== null) {
        setState((s) => ({
          ...s,
          status: designStatus,
          activeStep: step,
          completedSteps: step,
        }));
      }
    },
    [stopPolling]
  );

  const startPolling = useCallback(
    (jobId: string) => {
      pollRef.current = setInterval(async () => {
        try {
          const statusRes = await getDesignStatus(jobId);
          await handleStatusUpdate(statusRes);
        } catch {
          // Silently retry on network errors during polling
        }
      }, POLL_INTERVAL_MS);

      timeoutRef.current = setTimeout(() => {
        stopPolling();
        setState((s) => ({
          ...s,
          engineState: "error",
          error: "Design generation timed out after 5 minutes",
        }));
      }, TIMEOUT_MS);
    },
    [handleStatusUpdate, stopPolling]
  );

  const submit = useCallback(
    async (prompt: string) => {
      stopPolling();
      setState({
        engineState: "processing",
        jobId: null,
        status: "pending",
        activeStep: 0,
        completedSteps: 0,
        result: null,
        error: null,
        prompt,
      });

      try {
        const res = await createDesign({ prompt, product_type: "tshirt" });
        jobIdRef.current = res.job_id;
        setState((s) => ({ ...s, jobId: res.job_id }));
        startPolling(res.job_id);
      } catch (err) {
        setState((s) => ({
          ...s,
          engineState: "error",
          error: err instanceof Error ? err.message : "Failed to create design",
        }));
      }
    },
    [stopPolling, startPolling]
  );

  const reset = useCallback(() => {
    stopPolling();
    setState({
      engineState: "idle",
      jobId: null,
      status: "pending",
      activeStep: 0,
      completedSteps: 0,
      result: null,
      error: null,
      prompt: "",
    });
  }, [stopPolling]);

  const retry = useCallback(() => {
    if (state.prompt) {
      submit(state.prompt);
    }
  }, [state.prompt, submit]);

  useEffect(() => {
    return () => stopPolling();
  }, [stopPolling]);

  return { ...state, submit, reset, retry };
}
