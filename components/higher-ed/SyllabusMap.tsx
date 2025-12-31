import clsx from "clsx";

type SyllabusSegment = {
  weeks: string;
  label: string;
  tag: string;
  note?: string;
  highlight?: boolean;
};

const SEGMENTS: SyllabusSegment[] = [
  {
    weeks: "Weeks 1–3",
    label: "Lecture Replacement",
    tag: "Constitutional Underpinnings",
  },
  {
    weeks: "Weeks 4–6",
    label: "Simulation Start (Turn 1)",
    tag: "Federalism & State Friction",
  },
  {
    weeks: "Weeks 7–9",
    label: "Turn 2: The Iron Triangle",
    tag: "Lobbying & Bureaucracy",
    note: "Hard to Teach Concepts",
    highlight: true,
  },
  {
    weeks: "Weeks 10–12",
    label: "Turn 3: Crisis & Courts",
    tag: "Civil Liberties Scenarios",
  },
];

export default function SyllabusMap({
  variant = "dark",
}: {
  variant?: "dark" | "light";
}) {
  const isLight = variant === "light";

  return (
    <section className="mt-12">
      <div
        className={clsx(
          "rounded-2xl border p-6 md:p-8 backdrop-blur-md",
          isLight
            ? "border-slate-200 bg-white/90 shadow-sm"
            : "border-slate-700/50 bg-slate-900/70"
        )}
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <div
              className={clsx(
                "font-mono text-xs uppercase tracking-widest",
                isLight ? "text-blue-700" : "text-emerald-500/80"
              )}
            >
              /// SYLLABUS MAP
            </div>
            <h2
              className={clsx(
                "mt-2 text-2xl md:text-3xl font-extrabold tracking-tight",
                isLight ? "text-slate-900" : "text-white"
              )}
            >
              15-Week Semester → Simulation Turns
            </h2>
            <p
              className={clsx(
                "mt-3 text-sm md:text-base max-w-2xl",
                isLight ? "text-slate-700" : "text-slate-300"
              )}
            >
              This is designed to{" "}
              <span className={clsx("font-semibold", isLight ? "text-slate-900" : "text-white")}>
                replace inefficient lecturing
              </span>
              , not add to it.
              The simulation becomes the assessment substrate—students generate evidence through real interactions.
            </p>
          </div>

          <div className="shrink-0">
            <div
              className={clsx(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2",
                isLight ? "border-blue-200 bg-blue-50" : "border-emerald-500/30 bg-emerald-500/10"
              )}
            >
              <span
                className={clsx(
                  "h-2 w-2 rounded-full animate-pulse",
                  isLight ? "bg-blue-600" : "bg-emerald-500"
                )}
              />
              <span
                className={clsx(
                  "font-mono text-xs uppercase tracking-widest",
                  isLight ? "text-blue-800" : "text-emerald-300"
                )}
              >
                Saves 13% Instructional Time
              </span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-10">
          {/* Mobile: stacked vertical timeline */}
          <div className="md:hidden relative pl-6 border-l-2 border-terminal-green/70">
            {SEGMENTS.map((s, idx) => {
              const isLast = idx === SEGMENTS.length - 1;
              return (
                <div key={`m-${s.weeks}`} className={`${!isLast ? "pb-8" : ""} relative`}>
                  <div
                    className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border ${
                      s.highlight
                        ? "bg-terminal-green border-terminal-green shadow-[0_0_20px_rgba(34,197,94,0.35)]"
                        : "bg-slate-900 border-terminal-green/60"
                    }`}
                  />

                  <div
                    className={`rounded-xl border p-5 ${
                      s.highlight
                        ? "border-terminal-green/30 bg-slate-950/40 shadow-[0_0_35px_rgba(34,197,94,0.08)]"
                        : "border-slate-700/50 bg-slate-950/30"
                    }`}
                  >
                    <div className="flex flex-col gap-3">
                      <div className="font-mono text-xs uppercase tracking-widest text-slate-400">
                        {s.weeks}
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/50 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-slate-300">
                          {s.label}
                        </span>
                        {s.note && (
                          <span className="inline-flex items-center rounded-full border border-terminal-green/30 bg-terminal-green/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-terminal-green">
                            {s.note}
                          </span>
                        )}
                      </div>

                      <div className="font-mono text-sm text-white">
                        {s.tag}
                      </div>

                      <div className="text-xs text-slate-400 font-mono">
                        Evidence: negotiation logs • coalition moves • constraints
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop: horizontal timeline w/ connector line */}
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute left-0 right-0 top-6 h-px bg-slate-700/60" />
              <div className="grid md:grid-cols-4 gap-6">
                {SEGMENTS.map((s) => (
                  <div key={`d-${s.weeks}`} className="relative">
                    <div
                      className={`mx-auto h-4 w-4 rounded-full border ${
                        s.highlight
                          ? "bg-terminal-green border-terminal-green shadow-[0_0_20px_rgba(34,197,94,0.35)]"
                          : "bg-slate-900 border-slate-500"
                      }`}
                      style={{ marginTop: "16px" }}
                    />

                    <div
                      className={`mt-6 rounded-xl border p-5 ${
                        s.highlight
                          ? "border-terminal-green/30 bg-slate-950/40 shadow-[0_0_35px_rgba(34,197,94,0.08)]"
                          : "border-slate-700/50 bg-slate-950/30"
                      }`}
                    >
                      <div className="font-mono text-xs uppercase tracking-widest text-slate-400">
                        {s.weeks}
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/50 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-slate-300">
                          {s.label}
                        </span>
                        {s.note && (
                          <span className="inline-flex items-center rounded-full border border-terminal-green/30 bg-terminal-green/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-terminal-green">
                            {s.note}
                          </span>
                        )}
                      </div>

                      <div className="mt-4 font-mono text-sm text-white">
                        {s.tag}
                      </div>

                      <div className="mt-3 text-xs text-slate-400 font-mono">
                        Evidence: negotiation logs • coalition moves • constraints
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


