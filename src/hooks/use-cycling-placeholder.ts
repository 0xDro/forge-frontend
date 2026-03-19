"use client";

import { useCallback, useEffect, useState } from "react";
import { PLACEHOLDER_PROMPTS, PLACEHOLDER_CYCLE_MS } from "@/lib/constants";

export function useCyclingPlaceholder() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const cycle = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setIndex((i) => (i + 1) % PLACEHOLDER_PROMPTS.length);
      setVisible(true);
    }, 300);
  }, []);

  useEffect(() => {
    const id = setInterval(cycle, PLACEHOLDER_CYCLE_MS);
    return () => clearInterval(id);
  }, [cycle]);

  return { placeholder: PLACEHOLDER_PROMPTS[index], visible };
}
