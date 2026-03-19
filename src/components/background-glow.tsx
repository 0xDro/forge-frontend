"use client";

import { motion } from "framer-motion";

export function BackgroundGlow() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 40, -20, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[40%] left-[50%] w-[40vw] h-[40vw] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 20, -40, 0],
          y: [0, -20, 30, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
