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

export default function SyllabusMap() {
  return (
    <section className="mt-12">
      <div className="rounded-2xl border border-slate-700/50 bg-slate-900/70 backdrop-blur-md p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-emerald-500/80">
              /// SYLLABUS MAP
            </div>
            <h2 className="mt-2 text-2xl md:text-3xl font-extrabold tracking-tight">
              15-Week Semester → Simulation Turns
            </h2>
            <p className="mt-3 text-slate-300 text-sm md:text-base max-w-2xl">
              This is designed to <span className="text-white font-semibold">replace inefficient lecturing</span>, not add to it.
              The simulation becomes the assessment substrate—students generate evidence through real interactions.
            </p>
          </div>

          <div className="shrink-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-300">
                Saves 13% Instructional Time
              </span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-10">
          <div className="relative pl-6 md:pl-8 border-l border-slate-700/60">
            {SEGMENTS.map((s, idx) => {
              const isLast = idx === SEGMENTS.length - 1;
              return (
                <div key={s.weeks} className={`${!isLast ? "pb-10" : ""} relative`}>
                  {/* Node */}
                  <div
                    className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border ${
                      s.highlight
                        ? "bg-emerald-500 border-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.35)]"
                        : "bg-slate-900 border-slate-500"
                    }`}
                  />

                  {/* Card */}
                  <div
                    className={`rounded-xl border p-5 md:p-6 ${
                      s.highlight
                        ? "border-emerald-500/30 bg-slate-950/40 shadow-[0_0_35px_rgba(16,185,129,0.08)]"
                        : "border-slate-700/50 bg-slate-950/30"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div className="font-mono text-xs uppercase tracking-widest text-slate-400">
                        {s.weeks}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/50 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-slate-300">
                          {s.label}
                        </span>
                        {s.note && (
                          <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-emerald-300">
                            {s.note}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col md:flex-row md:items-center gap-3">
                      <div className="font-mono text-sm text-white">
                        {s.tag}
                      </div>
                      <div className="md:flex-1" />
                      <div className="text-xs text-slate-400 font-mono">
                        Evidence: negotiation logs • coalition moves • constraints
                      </div>
                    </div>

                    {/* Connector “track” hint */}
                    <div className="mt-5 h-1 w-full rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full ${
                          s.highlight ? "bg-emerald-500/70" : "bg-slate-600/40"
                        }`}
                        style={{ width: s.highlight ? "72%" : "45%" }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


