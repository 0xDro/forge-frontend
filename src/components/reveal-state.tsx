"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DesignReveal } from "./design-reveal";
import { SpecsRow } from "./specs-row";
import type { DesignDetailResponse } from "@/types/api";

interface RevealStateProps {
  result: DesignDetailResponse;
  onReset: () => void;
}

export function RevealState({ result, onReset }: RevealStateProps) {
  const imageUrl = result.result?.preview_url || result.result?.image_url || "";
  const specs = result.result?.specs;

  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-8 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-white">Your design is ready</h2>
        <p className="text-sm text-slate-500">Print-ready and production quality</p>
      </div>

      {imageUrl && (
        <DesignReveal imageUrl={imageUrl} alt="Generated design" />
      )}

      {specs && <SpecsRow specs={specs} />}

      <div className="flex items-center gap-3">
        {result.result?.image_url && (
          <a
            href={result.result.image_url}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-indigo-500 hover:bg-indigo-400 text-white font-medium px-6 py-2.5 rounded-xl transition-colors"
          >
            Download Full Resolution
          </a>
        )}
        <Button
          variant="outline"
          onClick={onReset}
          className="border-white/10 text-white hover:bg-white/5 font-medium px-6 py-2.5 rounded-xl h-auto"
        >
          Try Another
        </Button>
      </div>
    </motion.div>
  );
}
