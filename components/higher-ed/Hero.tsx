"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HigherEdHero() {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left: Copy */}
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="font-mono text-xs uppercase tracking-widest text-emerald-500/80">
              /// AI FIREWALL / ACADEMIC INTEGRITY
            </div>

            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-serif">
              The Essay is Dead. Long Live the Simulation.
            </h1>

            <p className="mt-6 text-lg text-slate-300 leading-relaxed">
              Secure your curriculum against AI cheating with the only assessment platform that evaluates emergent, real-time
              critical thinking—not algorithmically generated text.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/higher-ed/gov"
                className="inline-flex items-center justify-center rounded-lg bg-terminal-green px-6 py-3 font-bold text-slate-950 hover:bg-terminal-green/90 transition-colors"
              >
                View Instructor Tour (No Call Required)
              </Link>

              <a
                href="/assets/Statecraft_HigherEd_Syllabus_2025.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-6 py-3 font-bold text-white hover:bg-white/10 transition-colors"
              >
                Download 15-Week Syllabus
              </a>
            </div>

            <div className="mt-8 text-sm text-slate-400 font-mono">
              Output is behavior—coalitions, bargaining, institutional moves—captured as decision logs.
            </div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
          >
            <div className="rounded-2xl border border-slate-700/50 bg-slate-900/70 backdrop-blur-md p-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-mono text-xs uppercase tracking-widest text-emerald-500/80">
                    Live Integrity Check
                  </div>
                  <div className="mt-1 text-white font-semibold tracking-tight">
                    Unique Student Interactions vs. Static Text
                  </div>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Monitoring
                </div>
              </div>

              {/* “Graph” placeholder */}
              <div className="mt-6 rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
                <div className="flex items-end gap-3 h-36">
                  {/* interactions (green) */}
                  {[32, 54, 68, 82, 95, 110].map((h, i) => (
                    <div key={`g-${i}`} className="flex-1">
                      <div
                        className="w-full rounded-md bg-emerald-500/70"
                        style={{ height: `${h}px` }}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Static Text (low variance)</span>
                  <span>Interactive Decisions (high variance)</span>
                </div>

                {/* “Static text” line */}
                <div className="mt-3 relative h-8">
                  <div className="absolute inset-x-0 top-1/2 h-px bg-white/15" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-500">
                    baseline
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-700/50 bg-slate-950/30 p-4">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                    Integrity Score
                  </div>
                  <div className="mt-2 text-2xl font-bold text-white">94</div>
                  <div className="mt-1 text-xs font-mono text-emerald-400">+12 vs essays</div>
                </div>
                <div className="rounded-xl border border-slate-700/50 bg-slate-950/30 p-4">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                    AI Exposure
                  </div>
                  <div className="mt-2 text-2xl font-bold text-white">Low</div>
                  <div className="mt-1 text-xs font-mono text-slate-400">behavioral evidence</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


