"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCyclingPlaceholder } from "@/hooks/use-cycling-placeholder";

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  disabled?: boolean;
}

export function PromptInput({ onSubmit, disabled }: PromptInputProps) {
  const [value, setValue] = useState("");
  const { placeholder, visible } = useCyclingPlaceholder();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) {
      onSubmit(trimmed);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="glass-card glow-indigo p-1.5 flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={disabled}
            className="w-full bg-transparent border-none outline-none px-4 py-3 text-white text-sm placeholder:text-transparent"
            placeholder={placeholder}
          />
          {!value && (
            <motion.span
              className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-500 pointer-events-none"
              initial={false}
              animate={{ opacity: visible ? 0.6 : 0, y: visible ? 0 : -4 }}
              transition={{ duration: 0.3 }}
            >
              {placeholder}
            </motion.span>
          )}
        </div>
        <Button
          type="submit"
          disabled={disabled || !value.trim()}
          className="bg-indigo-500 hover:bg-indigo-400 text-white font-medium px-6 py-2.5 rounded-xl transition-all disabled:opacity-40 h-auto"
        >
          Generate
        </Button>
      </div>
    </form>
  );
}
