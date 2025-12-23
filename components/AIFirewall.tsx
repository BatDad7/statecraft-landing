import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, ShieldAlert, Cpu, Zap, MessageSquare } from "lucide-react";

const AIFirewall = () => {
  const [typedLines, setTypedLines] = useState<number>(0);
  const simulationLines = [
    { user: "USA", text: "If you don't lower tariffs by midnight, we block the naval strait.", color: "text-blue-400" },
    { user: "China", text: "That is an act of war. We are mobilizing the 7th Fleet.", color: "text-red-400" },
    { user: "UN", text: "Security Council is convening an emergency session.", color: "text-amber-400" },
  ];

  return (
    <section className="relative py-24 px-4 border-t border-slate-800 bg-slate-900 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center items-center gap-2 text-terminal-green"
          >
            <ShieldAlert className="h-5 w-5" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] font-bold">Protocol: Anti-Plagiarism</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-black tracking-tight uppercase italic text-white"
          >
            The <span className="text-brand-blue">AI Firewall</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-3xl font-bold text-slate-400 max-w-3xl mx-auto tracking-tight"
          >
            The Essay is Dead. Long Live the Simulation.
          </motion.p>
        </div>

        {/* Split Screen Comparison */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Side: The Problem */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col h-full group"
          >
            <div className="mb-4 flex items-center gap-2 px-2">
              <Cpu className="h-4 w-4 text-slate-500" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">The Problem: AI Slop</span>
            </div>
            <div className="flex-1 rounded-xl border border-slate-800 bg-slate-950 p-6 shadow-inner relative overflow-hidden">
              <div className="absolute top-4 right-4 z-10">
                <motion.div
                  initial={{ rotate: -15, scale: 0 }}
                  whileInView={{ rotate: -15, scale: 1 }}
                  className="bg-red-600 text-white font-black text-xs px-3 py-1 border-2 border-white shadow-lg uppercase tracking-tighter"
                >
                  Easy to Fake
                </motion.div>
              </div>

              {/* ChatGPT Interface Mockup */}
              <div className="space-y-6 opacity-60">
                <div className="flex gap-4 items-start">
                  <div className="h-8 w-8 rounded-sm bg-slate-800 flex items-center justify-center shrink-0">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <div className="bg-slate-900 rounded-lg px-4 py-2 border border-slate-800">
                    <p className="text-sm text-slate-300">Explain Realism in IR.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="h-8 w-8 rounded-sm bg-slate-800 flex items-center justify-center shrink-0">
                    <Bot className="h-5 w-5 text-slate-400" />
                  </div>
                  <div className="space-y-4 text-slate-400 font-serif leading-relaxed text-sm bg-slate-900/50 p-4 rounded-lg border border-slate-800/50">
                    <p className="font-bold text-slate-300 mb-2">The GPT Essay</p>
                    <p>
                      Realism is a theory in international relations that emphasizes the competitive and conflictual side of politics. It assumes that the state is the principal actor...
                    </p>
                    <p className="text-xs italic text-slate-500 mt-4">
                      (Generated in 1.4 seconds. Identical to 4,000 other submissions.)
                    </p>
                  </div>
                </div>
              </div>

              {/* Blurred Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Right Side: The Solution */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onViewportEnter={() => {
              const interval = setInterval(() => {
                setTypedLines((prev) => {
                  if (prev < simulationLines.length) return prev + 1;
                  clearInterval(interval);
                  return prev;
                });
              }, 1000);
            }}
            className="flex flex-col h-full"
          >
            <div className="mb-4 flex items-center gap-2 px-2">
              <Zap className="h-4 w-4 text-brand-blue" />
              <span className="text-xs font-bold uppercase tracking-widest text-brand-blue">The Solution: Statecraft Data</span>
            </div>
            <div className="flex-1 rounded-xl border border-brand-blue/30 bg-black p-6 shadow-[0_0_30px_rgba(37,99,235,0.1)] relative overflow-hidden group">
              <div className="absolute top-4 right-4 z-10">
                <motion.div
                  initial={{ rotate: 15, scale: 0 }}
                  whileInView={{ rotate: 15, scale: 1 }}
                  className="bg-brand-blue text-white font-black text-xs px-3 py-1 border-2 border-white shadow-lg uppercase tracking-tighter"
                >
                  Impossible to Fake
                </motion.div>
              </div>

              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-blue to-transparent" />
              
              {/* Simulation Log Interface */}
              <div className="font-mono text-sm space-y-6">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
                  <MessageSquare className="h-4 w-4 text-brand-blue" />
                  <span className="font-bold text-white">The Simulation Log</span>
                </div>

                <div className="space-y-4">
                  <AnimatePresence>
                    {simulationLines.slice(0, typedLines).map((line, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex gap-3 items-start"
                      >
                        <span className={`font-bold shrink-0 min-w-[60px] ${line.color}`}>[{line.user}]:</span>
                        <p className="text-slate-200 leading-snug">{line.text}</p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {typedLines < simulationLines.length && (
                    <motion.div
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="h-5 w-2 bg-brand-blue ml-[60px]"
                    />
                  )}
                </div>

                {typedLines === simulationLines.length && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="pt-8 border-t border-slate-800 flex justify-between items-center"
                  >
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-brand-blue rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-brand-blue/40 rounded-full" />
                      <div className="w-2 h-2 bg-brand-blue/40 rounded-full" />
                    </div>
                    <span className="text-[10px] text-brand-blue/50 tracking-widest uppercase font-sans">Verified Human Activity</span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
      
      {/* Background Decorative Grid Detail */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none -z-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
    </section>
  );
};

export default AIFirewall;

