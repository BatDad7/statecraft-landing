import clsx from "clsx";
import Link from "next/link";
import { GraduationCap, Clock, ClipboardCheck, BarChart3 } from "lucide-react";

type Theme = "dark" | "light";
type Variant = "ap-gov" | "college-gov";

export default function ImplementationGuide({
  theme = "dark",
  variant = "ap-gov",
}: {
  theme?: Theme;
  variant?: Variant;
}) {
  const isLight = theme === "light";
  const isCollege = variant === "college-gov";

  return (
    <section id="implementation" className={clsx("py-16", isLight ? "text-slate-900" : "text-white")}>
      <div className="max-w-6xl mx-auto px-4">
        <div
          className={clsx(
            "rounded-2xl border p-6 md:p-8",
            isLight ? "border-slate-200 bg-white shadow-sm" : "border-slate-700/50 bg-slate-900/70 backdrop-blur-md"
          )}
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="max-w-3xl">
              <div
                className={clsx(
                  "text-[10px] font-bold uppercase tracking-widest",
                  isLight ? "text-slate-600" : "text-slate-400"
                )}
              >
                Classroom implementation
              </div>
              <h2 className={clsx("mt-3 text-2xl md:text-3xl font-extrabold tracking-tight", isLight ? "text-slate-900" : "text-white")}>
                Length of Simulation & Class Time
              </h2>
              <p className={clsx("mt-4 text-sm md:text-base leading-relaxed", isLight ? "text-slate-700" : "text-slate-300")}>
                {isCollege ? (
                  <>
                    Statecraft Gov 2.0 is organized into <span className="font-semibold">five periods (0–4)</span>, similar to
                    quarters in a sports game. We recommend <span className="font-semibold">1–2 weeks per period</span> for optimal
                    engagement (adjustable from one day to several weeks depending on your course design).
                  </>
                ) : (
                  <>
                    Statecraft can run as a focused unit or a longer arc. For best results, we recommend{" "}
                    <span className="font-semibold">1–2 weeks per period</span> with clear weekly routines (memos + checkpoints),
                    while keeping most class time focused on debrief + standards mapping.
                  </>
                )}
              </p>
            </div>

            <div className="shrink-0 flex gap-3">
              <Link
                href="/demo"
                className={clsx(
                  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-bold transition-colors",
                  isLight ? "bg-blue-700 text-white hover:bg-blue-800" : "bg-terminal-green text-slate-950 hover:bg-terminal-green/90"
                )}
              >
                <GraduationCap className="h-4 w-4" />
                Watch Walkthrough
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div
              className={clsx(
                "rounded-xl border p-5",
                isLight ? "border-slate-200 bg-slate-50" : "border-slate-700/50 bg-slate-950/30"
              )}
            >
              <div className="flex items-center gap-2">
                <Clock className={clsx("h-5 w-5", isLight ? "text-blue-700" : "text-terminal-green")} />
                <div className={clsx("font-mono text-xs uppercase tracking-widest", isLight ? "text-slate-600" : "text-slate-400")}>
                  Period structure
                </div>
              </div>
              <ul className={clsx("mt-4 space-y-3 text-sm", isLight ? "text-slate-700" : "text-slate-300")}>
                <li>
                  <span className="font-semibold">Period 0</span>: tutorial week (roles, dashboards, low-stakes points boost).
                </li>
                <li>
                  <span className="font-semibold">Periods 1–4</span>: each begins with a role-based briefing that sets incentives and
                  grading targets.
                </li>
              </ul>
            </div>

            <div
              className={clsx(
                "rounded-xl border p-5",
                isLight ? "border-slate-200 bg-slate-50" : "border-slate-700/50 bg-slate-950/30"
              )}
            >
              <div className="flex items-center gap-2">
                <ClipboardCheck className={clsx("h-5 w-5", isLight ? "text-blue-700" : "text-terminal-green")} />
                <div className={clsx("font-mono text-xs uppercase tracking-widest", isLight ? "text-slate-600" : "text-slate-400")}>
                  Assignments & grading
                </div>
              </div>
              <ul className={clsx("mt-4 space-y-3 text-sm", isLight ? "text-slate-700" : "text-slate-300")}>
                <li>
                  <span className="font-semibold">Role research</span>: top 5 role choices + responsibilities.
                </li>
                <li>
                  <span className="font-semibold">Weekly memos</span>: reflections linking course concepts to decisions.
                </li>
                <li>
                  <span className="font-semibold">Debrief</span>: 30–60 min presentation; optional paper for deeper analysis.
                </li>
                <li>
                  Suggested weights: <span className="font-semibold">5%</span> performance, <span className="font-semibold">5%</span>{" "}
                  role research, <span className="font-semibold">10%</span> participation, <span className="font-semibold">15–25%</span>{" "}
                  debrief.
                </li>
              </ul>
            </div>
          </div>

          <div
            className={clsx(
              "mt-6 rounded-xl border p-5",
              isLight ? "border-slate-200 bg-white" : "border-slate-700/50 bg-slate-950/20"
            )}
          >
            <div className="flex items-center gap-2">
              <BarChart3 className={clsx("h-5 w-5", isLight ? "text-blue-700" : "text-terminal-green")} />
              <div className={clsx("font-mono text-xs uppercase tracking-widest", isLight ? "text-slate-600" : "text-slate-400")}>
                Engagement tracking
              </div>
            </div>
            <ul className={clsx("mt-4 grid gap-3 md:grid-cols-3 text-sm", isLight ? "text-slate-700" : "text-slate-300")}>
              <li>
                <span className="font-semibold">Weekly emails</span>: summaries of play + performance.
              </li>
              <li>
                <span className="font-semibold">Instructor dashboard</span>: student events tab for every action.
              </li>
              <li>
                <span className="font-semibold">Student dashboards</span>: review messages + interactions.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}


