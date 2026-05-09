"use client";

import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <div className="subtle-grid absolute inset-0 opacity-70" />
      <motion.div
        className="absolute left-[8%] top-[12%] h-64 w-64 rounded-full bg-cyanIQ/16 blur-3xl"
        animate={{ x: [0, 42, -18, 0], y: [0, -26, 30, 0], scale: [1, 1.15, 0.94, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[8%] top-[3%] h-80 w-80 rounded-full bg-violetIQ/18 blur-3xl"
        animate={{ x: [0, -48, 26, 0], y: [0, 36, -20, 0], scale: [1, 0.92, 1.12, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
