"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
      <div className="relative aspect-[3/4] w-full max-w-sm mx-auto">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-contain p-4"
          sizes="(max-width: 640px) 90vw, 384px"
          priority
        />
      </div>
    </motion.div>
  );
}
