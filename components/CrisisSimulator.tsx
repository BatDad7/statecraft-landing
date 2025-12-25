"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Gavel, Share2, ArrowRight } from "lucide-react";

type CrisisState = "idle" | "legislation_selected" | "leak_selected";

const CrisisSimulator = () => {
  const [state, setState] = useState<CrisisState>("idle");

  const variants = {
    idle: { x: 0, opacity: 1, scale: 1 },
    exit_left: { x: -100, opacity: 0, transition: { duration: 0.3 } },
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.4 },
    },
    enter_right: { x: 100, opacity: 0 },
    center: { x: 0, opacity: 1 },
  };

  const pulseAnimation = {
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const handleReset = () => {
    setState("idle");
  };

  const scrollToStandards = (unit: string) => {
    window.location.hash = unit;
    const element = document.getElementById("standards-mapper");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderContent = () => {
    switch (state) {
      case "idle":
        return (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit="exit_left"
            className="flex flex-col items-center text-center space-y-6"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-alert-red animate-pulse">
                <AlertTriangle className="h-6 w-6" />
                <span className="font-serif text-sm tracking-widest uppercase font-bold">Interactive Case Study</span>
              </div>
              <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black">Domestic Policy Simulator</span>
            </div>
            <h2 className="text-2xl font-bold text-white max-w-md">
              The Speaker of the House is threatening a government shutdown.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={pulseAnimation}
                onClick={() => setState("legislation_selected")}
                className="flex-1 group relative flex flex-col items-center justify-center gap-1 rounded-lg border border-brand-blue/30 bg-brand-blue/20 hover:bg-brand-blue/30 px-6 py-4 transition-all shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <Gavel className="h-5 w-5 text-brand-blue" />
                  <span className="text-sm font-bold text-white uppercase tracking-tight">
                    Action: Veto Bill
                  </span>
                </div>
                <span className="text-[10px] font-bold text-brand-blue/80 uppercase tracking-widest">
                  Click to Simulate Unit 2
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={pulseAnimation}
                onClick={() => setState("leak_selected")}
                className="flex-1 group relative flex flex-col items-center justify-center gap-1 rounded-lg border border-alert-red/30 bg-alert-red/20 hover:bg-alert-red/30 px-6 py-4 transition-all shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <Share2 className="h-5 w-5 text-alert-red" />
                  <span className="text-sm font-bold text-white uppercase tracking-tight">
                    Action: Leak Memo
                  </span>
                </div>
                <span className="text-[10px] font-bold text-alert-red/80 uppercase tracking-widest">
                  Click to Simulate Unit 5
                </span>
              </motion.button>
            </div>
          </motion.div>
        );
      case "legislation_selected":
        return (
          <motion.div
            key="legislation"
            initial="enter_right"
            animate="center"
            variants={variants}
            className="flex flex-col items-center text-center space-y-6 border-2 border-amber-500 rounded-xl p-6 bg-amber-500/5"
          >
            <div className="bg-amber-500/10 p-3 rounded-full">
              <Gavel className="h-8 w-8 text-amber-500" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-serif font-black text-white uppercase italic tracking-tighter">
                GRIDLOCK.
              </h2>
              <p className="text-slate-200 text-lg">
                The Speaker of the House just blocked your Budget Veto.
              </p>
              <p className="text-amber-500 font-mono text-xs uppercase tracking-widest mt-4">
                (AP Unit 2: Interactions Among Branches)
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleReset}
                className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
              >
                Try Different Path
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToStandards("#unit-2")}
                className="flex items-center gap-2 rounded-full bg-brand-blue px-8 py-3 text-white font-bold transition-all hover:bg-blue-700 shadow-lg shadow-brand-blue/20"
              >
                Resolve This
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </div>
          </motion.div>
        );
      case "leak_selected":
        return (
          <motion.div
            key="leak"
            initial="enter_right"
            animate={["center", "shake"]}
            variants={variants}
            className="flex flex-col items-center text-center space-y-6 border-2 border-red-600 rounded-xl p-6 bg-red-600/5"
          >
            <div className="bg-red-600/10 p-3 rounded-full">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-serif font-black text-white uppercase italic tracking-tighter">
                SCANDAL.
              </h2>
              <p className="text-slate-200 text-lg">
                Your Supreme Court nominee just leaked a controversial opinion.
              </p>
              <p className="text-red-600 font-mono text-xs uppercase tracking-widest mt-4">
                (AP Unit 5: Political Participation)
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleReset}
                className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
              >
                Try Different Path
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToStandards("#unit-5")}
                className="flex items-center gap-2 rounded-full bg-brand-blue px-8 py-3 text-white font-bold transition-all hover:bg-blue-700 shadow-lg shadow-brand-blue/20"
              >
                Resolve This
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand-blue/20 via-slate-800 to-alert-red/20 opacity-50 blur-xl" />
      <div className="relative rounded-xl border border-slate-700 bg-slate-800 p-8 shadow-2xl backdrop-blur-xl border-t-4 border-t-amber-500 overflow-hidden">
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/p6-static.png')]" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-blue/50 to-transparent" />
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CrisisSimulator;
