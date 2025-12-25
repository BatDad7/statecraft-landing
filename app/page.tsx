"use client";

import { motion } from "framer-motion";
import { AlertCircle, ChevronRight, Terminal } from "lucide-react";
import CrisisSimulator from "@/components/CrisisSimulator";
import AIFirewall from "@/components/AIFirewall";
import StandardsMapper from "@/components/StandardsMapper";

export default function Home() {
  return (
    <div className="bg-slate-900 text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative flex min-h-[calc(100vh-64px)] flex-col items-center justify-center overflow-hidden px-4 py-20">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 -z-20 pointer-events-none overflow-hidden">
          {/* Darkened USA Map Placeholder */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-10 grayscale brightness-[0.2]">
            <svg viewBox="0 0 1000 600" fill="currentColor" className="w-full h-full text-terminal-green">
              <path d="M150,150 L850,150 L850,450 L150,450 Z" />
            </svg>
          </div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.03)_0%,transparent_70%)]" />
        </div>

        <div className="z-10 text-center max-w-5xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex justify-center"
          >
            <span className="inline-flex items-center rounded-full bg-alert-red/10 px-3 py-1 text-xs font-medium text-alert-red ring-1 ring-inset ring-alert-red/20 uppercase tracking-widest">
              <AlertCircle className="mr-1 h-3 w-3" />
              Situation Room Active
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl font-extrabold tracking-tighter sm:text-7xl lg:text-8xl uppercase italic mb-8"
          >
            Teach <span className="text-terminal-green">Government</span> Through Action.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12 text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            Stop lecturing about gridlock. Make them live it. 
            The ultimate immersive simulation designed for AP Government classrooms.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="w-full flex justify-center mb-16"
          >
            <CrisisSimulator />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-md bg-terminal-green px-10 py-5 text-lg font-bold text-slate-900 transition-all hover:bg-terminal-green/90 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]"
            >
              <Terminal className="h-6 w-6" />
              Request Curriculum Access
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-md border border-slate-700 bg-slate-800/30 px-10 py-5 text-lg font-bold text-white transition-all hover:bg-slate-800 backdrop-blur-sm"
            >
              Watch Trailer
              <ChevronRight className="h-6 w-6 text-slate-500" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* AI Firewall Section */}
      <AIFirewall />

      {/* Standards Mapper Section */}
      <StandardsMapper />
    </div>
  );
}
