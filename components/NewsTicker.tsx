"use client";

import { motion } from "framer-motion";

const ITEMS = [
  "/// SYSTEM ALERT: 4,500 VETOES ISSUED THIS WEEK",
  "/// TRENDING: SENATE GRIDLOCK IN 45% OF SIMULATIONS",
  "/// CED ALIGNMENT: IRON TRIANGLE ACTIVITY DETECTED",
  "/// REAL-TIME UPDATE: GLOBAL TRADE SUMMIT ACTIVE",
];

export default function NewsTicker() {
  const content = ITEMS.join("   •   ");

  return (
    <div className="w-full bg-red-900 text-white font-mono text-sm uppercase tracking-widest">
      <div className="relative overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, ease: "linear", repeat: Infinity }}
        >
          <div className="flex shrink-0 py-2">
            <span className="px-6">{content}</span>
          </div>
          <div className="flex shrink-0 py-2" aria-hidden="true">
            <span className="px-6">{content}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


