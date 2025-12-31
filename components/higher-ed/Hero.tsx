"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";

export default function HigherEdHero({
  variant = "dark",
}: {
  variant?: "dark" | "light";
}) {
  const isLight = variant === "light";

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
            <div
              className={clsx(
                "font-mono text-xs uppercase tracking-widest",
                isLight ? "text-blue-700" : "text-emerald-500/80"
              )}
            >
              /// AI FIREWALL / ACADEMIC INTEGRITY
            </div>

            <h1
              className={clsx(
                "mt-4 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-serif",
                isLight ? "text-slate-900" : "text-white"
              )}
            >
              The Essay is Dead. Long Live the Simulation.
            </h1>

            <p
              className={clsx(
                "mt-6 text-lg leading-relaxed",
                isLight ? "text-slate-700" : "text-slate-300"
              )}
            >
              Secure your curriculum against AI cheating with the only assessment platform that evaluates emergent, real-time
              critical thinking—not algorithmically generated text.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/higher-ed/gov"
                className={clsx(
                  "inline-flex items-center justify-center rounded-lg px-6 py-3 font-bold transition-colors",
                  isLight
                    ? "bg-blue-700 text-white hover:bg-blue-800 shadow-lg shadow-blue-900/20"
                    : "bg-terminal-green text-slate-950 hover:bg-terminal-green/90"
                )}
              >
                View Instructor Tour (No Call Required)
              </Link>

              <a
                href="/assets/Statecraft_HigherEd_Syllabus_2025.pdf"
                target="_blank"
                rel="noreferrer"
                className={clsx(
                  "inline-flex items-center justify-center rounded-lg border px-6 py-3 font-bold transition-colors",
                  isLight
                    ? "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                    : "border-white/20 bg-white/5 text-white hover:bg-white/10"
                )}
              >
                Download 15-Week Syllabus
              </a>
            </div>

            <div
              className={clsx(
                "mt-8 text-sm font-mono",
                isLight ? "text-slate-500" : "text-slate-400"
              )}
            >
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
            <div
              className={clsx(
                "rounded-2xl border p-6 shadow-2xl backdrop-blur-md",
                isLight
                  ? "border-slate-200 bg-white/90"
                  : "border-slate-700/50 bg-slate-900/70"
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div
                    className={clsx(
                      "font-mono text-xs uppercase tracking-widest",
                      isLight ? "text-blue-700" : "text-emerald-500/80"
                    )}
                  >
                    Integrity signals (illustrative)
                  </div>
                  <div
                    className={clsx(
                      "mt-1 font-semibold tracking-tight",
                      isLight ? "text-slate-900" : "text-white"
                    )}
                  >
                    Unique Student Interactions vs. Static Text
                  </div>
                </div>
                <div
                  className={clsx(
                    "flex items-center gap-2 font-mono text-xs",
                    isLight ? "text-slate-500" : "text-slate-400"
                  )}
                >
                  <span
                    className={clsx(
                      "h-2 w-2 rounded-full animate-pulse",
                      isLight ? "bg-blue-600" : "bg-emerald-500"
                    )}
                  />
                  Example visualization
                </div>
              </div>

              {/* “Graph” placeholder */}
              <div
                className={clsx(
                  "mt-6 rounded-xl border p-4",
                  isLight
                    ? "border-slate-200 bg-slate-50"
                    : "border-slate-700/50 bg-slate-950/40"
                )}
              >
                <div className="flex items-end gap-3 h-36">
                  {/* interactions (green) */}
                  {[32, 54, 68, 82, 95, 110].map((h, i) => (
                    <div key={`g-${i}`} className="flex-1">
                      <div
                        className={clsx(
                          "w-full rounded-md",
                          isLight ? "bg-blue-600" : "bg-emerald-500/70"
                        )}
                        style={{ height: `${h}px` }}
                      />
                    </div>
                  ))}
                </div>

                <div
                  className={clsx(
                    "mt-4 flex items-center justify-between text-[11px] font-mono",
                    isLight ? "text-slate-500" : "text-slate-400"
                  )}
                >
                  <span>Static Text (low variance)</span>
                  <span>Interactive Decisions (high variance)</span>
                </div>

                {/* “Static text” line */}
                <div className="mt-3 relative h-8">
                  <div
                    className={clsx(
                      "absolute inset-x-0 top-1/2 h-px",
                      isLight ? "bg-slate-300" : "bg-white/15"
                    )}
                  />
                  <div
                    className={clsx(
                      "absolute right-0 top-1/2 -translate-y-1/2 text-[10px] font-mono",
                      isLight ? "text-slate-500" : "text-slate-500"
                    )}
                  >
                    static-text baseline
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div
                  className={clsx(
                    "rounded-xl border p-4",
                    isLight
                      ? "border-slate-200 bg-slate-50"
                      : "border-slate-700/50 bg-slate-950/30"
                  )}
                >
                  <div
                    className={clsx(
                      "font-mono text-[10px] uppercase tracking-widest",
                      isLight ? "text-slate-500" : "text-slate-500"
                    )}
                  >
                    Integrity signal
                  </div>
                  <div
                    className={clsx(
                      "mt-2 text-2xl font-bold",
                      isLight ? "text-slate-900" : "text-white"
                    )}
                  >
                    High
                  </div>
                  <div
                    className={clsx(
                      "mt-1 text-xs font-mono",
                      isLight ? "text-slate-600" : "text-slate-300"
                    )}
                  >
                    Built from decision logs + role-based actions
                  </div>
                </div>
                <div
                  className={clsx(
                    "rounded-xl border p-4",
                    isLight
                      ? "border-slate-200 bg-slate-50"
                      : "border-slate-700/50 bg-slate-950/30"
                  )}
                >
                  <div
                    className={clsx(
                      "font-mono text-[10px] uppercase tracking-widest",
                      isLight ? "text-slate-500" : "text-slate-500"
                    )}
                  >
                    AI exposure (static text)
                  </div>
                  <div
                    className={clsx(
                      "mt-2 text-2xl font-bold",
                      isLight ? "text-slate-900" : "text-white"
                    )}
                  >
                    Lower
                  </div>
                  <div
                    className={clsx(
                      "mt-1 text-xs font-mono",
                      isLight ? "text-slate-500" : "text-slate-400"
                    )}
                  >
                    Less dependent on prose-only outputs
                  </div>
                </div>
              </div>

              <div className={clsx("mt-4 text-xs leading-relaxed", isLight ? "text-slate-500" : "text-slate-400")}>
                Illustration only — this landing page does not analyze student submissions. In product, instructors can review
                participation traces and decision logs to support academic integrity.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


