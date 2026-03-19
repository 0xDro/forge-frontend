"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const ShirtScene = dynamic(
  () => import("./shirt-scene").then((m) => m.ShirtScene),
  { ssr: false }
);

interface DesignRevealProps {
  imageUrl: string;
  alt: string;
}

export function DesignReveal({ imageUrl, alt }: DesignRevealProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className="relative glass-card glow-indigo rounded-2xl"
      style={{ perspective: "1000px" }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 0.8,
      }}
    >
      <div
        className="relative mx-auto cursor-pointer"
        style={{
          width: "384px",
          height: "420px",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s ease-in-out",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
        onClick={() => setFlipped((f) => !f)}
        role="img"
        aria-label={alt}
      >
        {/* Front face — 3D shirt scene */}
        <div
          className="absolute inset-0"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(0deg)" }}
        >
          <ShirtScene imageUrl={imageUrl} />
        </div>

        {/* Back face — raw design image */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-2xl bg-[#1a1a2e]"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <img
            src={imageUrl}
            alt={alt}
            className="max-w-full max-h-full object-contain p-4"
          />
        </div>
      </div>

      {/* Flip hint */}
      <div className="absolute bottom-2 right-3 text-xs text-white/40 pointer-events-none">
        Click to flip
      </div>
    </motion.div>
  );
}
