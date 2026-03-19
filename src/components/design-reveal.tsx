"use client";

import { motion } from "framer-motion";

interface DesignRevealProps {
  imageUrl: string;
  alt: string;
}

export function DesignReveal({ imageUrl, alt }: DesignRevealProps) {
  return (
    <motion.div
      className="relative glass-card glow-indigo overflow-hidden rounded-2xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 0.8,
      }}
    >
      <div className="relative aspect-[3/4] w-full max-w-sm mx-auto flex items-center justify-center p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={alt}
          className="max-w-full max-h-full object-contain rounded-lg"
        />
      </div>
    </motion.div>
  );
}
