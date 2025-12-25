"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, FileText, Share2, ArrowRight } from "lucide-react";

type CrisisState = "initial" | "legislation" | "leak";

const CrisisSimulator = () => {
  const [step, setStep] = useState<CrisisState>("initial");

  const variants = {
    enter: { x: 300, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 },
  };

  const renderContent = () => {
    switch (step) {
      case "initial":
        return (
          <motion.div
            key="initial"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex flex-col items-center text-center space-y-6"
          >
            <div className="flex items-center gap-2 text-alert-red animate-pulse">
              <AlertTriangle className="h-6 w-6" />
              <span className="font-mono text-sm tracking-widest uppercase">Crisis Alert</span>
            </div>
            <h2 className="text-2xl font-bold text-white max-w-md">
              The Supreme Court just struck down your Executive Order. Polls are crashing.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep("legislation")}
                className="flex-1 group relative flex items-center justify-center gap-3 rounded-lg border border-terminal-green/30 bg-terminal-green/10 px-6 py-4 transition-all hover:bg-terminal-green/20"
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 rounded-lg ring-2 ring-terminal-green/50 pointer-events-none"
                />
                <FileText className="h-5 w-5 text-terminal-green" />
                <span className="text-sm font-bold text-white uppercase tracking-tight">
                  Draft Emergency Legislation
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep("leak")}
                className="flex-1 group relative flex items-center justify-center gap-3 rounded-lg border border-alert-red/30 bg-alert-red/10 px-6 py-4 transition-all hover:bg-alert-red/20"
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                  className="absolute inset-0 rounded-lg ring-2 ring-alert-red/50 pointer-events-none"
                />
                <Share2 className="h-5 w-5 text-alert-red" />
                <span className="text-sm font-bold text-white uppercase tracking-tight">
                  Leak Statement to Press
                </span>
              </motion.button>
            </div>
          </motion.div>
        );
      case "legislation":
      case "leak":
        const isLegislation = step === "legislation";
        return (
          <motion.div
            key={step}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex flex-col items-center text-center space-y-6"
          >
            <div className={`rounded-full ${isLegislation ? 'bg-slate-800' : 'bg-alert-red/10'} p-3`}>
              {isLegislation ? (
                <FileText className="h-8 w-8 text-slate-400" />
              ) : (
                <AlertTriangle className="h-8 w-8 text-alert-red" />
              )}
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white uppercase italic tracking-tighter">
                {isLegislation ? 'GRIDLOCK.' : 'SCANDAL.'}
              </h2>
              <p className="text-slate-400 text-lg">
                {isLegislation ? 'Bill stalled in Committee.' : 'Approval rating drops 5%.'}
              </p>
              <p className="text-terminal-green/80 font-mono text-xs uppercase tracking-widest mt-4">
                {isLegislation ? '(AP Unit 2: Interactions Among Branches)' : '(AP Unit 5: Political Participation)'}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '#demo'}
              className="mt-4 flex items-center gap-2 rounded-full bg-terminal-green px-8 py-3 text-slate-900 font-bold transition-all hover:bg-terminal-green/90"
            >
              See How Your Students Handle The Pressure
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
        );
    }
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-terminal-green/20 via-slate-800 to-alert-red/20 opacity-50 blur-xl" />
      <div className="relative rounded-xl border border-slate-700 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-terminal-green/50 to-transparent" />
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CrisisSimulator;
