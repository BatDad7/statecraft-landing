import React from "react";
import { motion } from "framer-motion";
import { Bot, User, ShieldAlert, Cpu, Zap } from "lucide-react";

const AIFirewall = () => {
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
            className="text-4xl md:text-5xl font-extrabold tracking-tight uppercase italic text-white"
          >
            The <span className="text-terminal-green">AI Firewall</span>
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
            className="flex flex-col h-full"
          >
            <div className="mb-4 flex items-center gap-2 px-2">
              <Cpu className="h-4 w-4 text-slate-500" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">What AI Can Fake</span>
            </div>
            <div className="flex-1 rounded-xl border border-slate-800 bg-slate-950 p-6 shadow-inner relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-slate-700 opacity-20" />
              
              {/* ChatGPT Interface Mockup */}
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="h-8 w-8 rounded-sm bg-slate-800 flex items-center justify-center shrink-0">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <div className="bg-slate-900 rounded-lg px-4 py-2 border border-slate-800">
                    <p className="text-sm text-slate-300">Write a 500-word essay on Political Realism for AP Gov.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="h-8 w-8 rounded-sm bg-[#10a37f]/20 flex items-center justify-center shrink-0">
                    <Bot className="h-5 w-5 text-[#10a37f]" />
                  </div>
                  <div className="space-y-4 text-slate-400 font-serif leading-relaxed text-sm">
                    <p className="border-b border-slate-800 pb-2 italic text-slate-500">Generating response...</p>
                    <p>
                      Political realism is a theory of international relations that focuses on the role of the state and the pursuit of national interest. Realists argue that the international system is anarchic, meaning there is no central authority to govern the behavior of states...
                    </p>
                    <p>
                      States must therefore rely on themselves to ensure their survival, often leading to a focus on military power and strategic alliances. This perspective emphasizes that ethics and morality have little place in the pragmatic world of global politics...
                    </p>
                    <div className="h-4 w-1 bg-slate-600 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Blurred Overlay for 'Boring' effect */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
              <div className="absolute inset-0 border-2 border-red-900/0 group-hover:border-red-900/20 transition-colors pointer-events-none rounded-xl" />
            </div>
          </motion.div>

          {/* Right Side: The Solution */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col h-full"
          >
            <div className="mb-4 flex items-center gap-2 px-2">
              <Zap className="h-4 w-4 text-terminal-green" />
              <span className="text-xs font-bold uppercase tracking-widest text-terminal-green">What AI Can&apos;t Fake</span>
            </div>
            <div className="flex-1 rounded-xl border border-terminal-green/30 bg-black p-6 shadow-[0_0_30px_rgba(34,197,94,0.1)] relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-terminal-green/50" />
              
              {/* Diplomatic Cable Mockup */}
              <div className="font-mono text-sm space-y-8">
                <div className="border-b border-terminal-green/20 pb-4">
                  <p className="text-terminal-green/50 text-[10px] mb-1">ENCRYPTED CHANNEL: STATECRAFT_V3_SIGINT</p>
                  <p className="text-terminal-green font-bold">MESSAGE TYPE: DIPLOMATIC CABLE // URGENT</p>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <span className="text-terminal-green/40 shrink-0">09:00</span>
                    <p className="text-terminal-green">
                      <span className="font-bold">[SENATE_MAJORITY_LEADER]</span>:
                      If you don't compromise on this budget, we will force a veto override. Your party will pay in the midterms.
                    </p>
                  </div>

                  <div className="flex gap-4 items-start">
                    <span className="text-terminal-green/40 shrink-0">09:05</span>
                    <p className="text-white bg-terminal-green/10 p-2 rounded border border-terminal-green/20">
                      <span className="font-bold text-terminal-green">[PRESIDENT]</span>:
                      My base expects me to hold the line. A shutdown is a risk I'm willing to take for this policy.
                    </p>
                  </div>

                  <div className="flex gap-4 items-start">
                    <span className="text-terminal-green/40 shrink-0">09:07</span>
                    <div className="flex flex-col gap-1">
                      <p className="text-terminal-green/80 italic">
                        SYSTEM: Public opinion polls show a divided electorate. <span className="cursor-help border-b border-dashed border-terminal-green/30" title="Brinkmanship: The art of pushing dangerous situations to the edge of conflict to force an opponent to back down.">Brinkmanship</span> risk: HIGH.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-terminal-green/10 flex justify-between items-center">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-terminal-green/40 rounded-full" />
                    <div className="w-2 h-2 bg-terminal-green/40 rounded-full" />
                  </div>
                  <span className="text-[10px] text-terminal-green/30 tracking-widest uppercase font-sans">Human intelligence required</span>
                </div>
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

