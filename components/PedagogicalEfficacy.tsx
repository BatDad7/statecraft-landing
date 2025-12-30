import Link from "next/link";
import clsx from "clsx";

type ResearchCard = {
  category: string;
  headline: string;
  body: string;
  citation: string;
  readHref: string;
  abstractHref: string;
};

export type PedagogicalEfficacyVariant = "dark" | "light";

const CARDS: ResearchCard[] = [
  {
    category: "Academic Honesty",
    headline: "Assessment that resists test-bank + LLM copying",
    body:
      "Because outcomes emerge from unique scenario paths and decisions, there’s no static answer key to copy—supporting academic integrity in higher-stakes assessment.",
    citation:
      "Linantud & Kaftan (2019) — “The Statecraft Effect: Assessment, Attitudes, and Academic Honesty”",
    readHref: "/higher-ed/research/the-statecraft-effect",
    abstractHref: "/assets/research/the-statecraft-effect-abstract.txt",
  },
  {
    category: "Learning Outcomes",
    headline: "Controlled comparison evidence on learning impact",
    body:
      "Controlled comparisons help isolate learning effects beyond novelty—useful for departments evaluating outcomes and accreditation-aligned assessment.",
    citation:
      "Eric Cox (2019) — “Does Statecraft Improve Student Learning Outcomes? A Controlled Comparison”",
    readHref: "/higher-ed/research/controlled-comparison",
    abstractHref: "/assets/research/controlled-comparison-abstract.txt",
  },
  {
    category: "Student Engagement",
    headline: "Engagement gains via learning-by-doing in simulation",
    body:
      "Simulation-based learning increases participation and sustained attention by forcing tradeoffs, coalitions, and consequence-driven decision making.",
    citation:
      "Jennifer Epley (2016) — “Learning by Doing: Using an Online Simulation Game in an International Relations Course”",
    readHref: "/higher-ed/research/learning-by-doing",
    abstractHref: "/assets/research/learning-by-doing-abstract.txt",
  },
];

export default function PedagogicalEfficacy({
  variant = "dark",
}: {
  variant?: PedagogicalEfficacyVariant;
}) {
  const isLight = variant === "light";

  return (
    <section id="pedagogical-efficacy" className={clsx("py-16", isLight ? "text-slate-900" : "text-white")}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-3xl">
          <div
            className={clsx(
              "text-[10px] font-bold uppercase tracking-widest",
              isLight ? "text-slate-600" : "text-slate-400"
            )}
          >
            Research-backed efficacy
          </div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">
            Pedagogical Efficacy
          </h2>
          <p className={clsx("mt-4", isLight ? "text-slate-700" : "text-slate-300")}>
            Direct links to specific papers referenced in our audit, plus downloadable abstract handouts you can share with faculty.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {CARDS.map((c) => (
            <article
              key={c.headline}
              className={clsx(
                "rounded-2xl border backdrop-blur-sm p-6",
                isLight
                  ? "border-slate-200 bg-white"
                  : "border-slate-700/50 bg-slate-900/70"
              )}
            >
              <div
                className={clsx(
                  "text-xs font-mono uppercase tracking-widest",
                  isLight ? "text-slate-600" : "text-slate-400"
                )}
              >
                {c.category}
              </div>
              <h3 className={clsx("mt-3 text-xl font-extrabold tracking-tight", isLight ? "text-slate-900" : "text-white")}>
                {c.headline}
              </h3>
              <p className={clsx("mt-3 text-sm leading-relaxed", isLight ? "text-slate-700" : "text-slate-300")}>
                {c.body}
              </p>

              <div className={clsx("mt-5 pt-5 border-t", isLight ? "border-slate-200" : "border-slate-800/60")}>
                <div className={clsx("text-xs font-mono", isLight ? "text-slate-600" : "text-slate-400")}>
                  Citation: {c.citation}
                </div>

                <div className="mt-4 flex flex-col gap-3">
                  <Link
                    href={c.readHref}
                    className={clsx(
                      "inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-bold transition-colors",
                      isLight
                        ? "border-blue-200 bg-blue-50 text-blue-800 hover:bg-blue-100"
                        : "border-terminal-green/30 bg-terminal-green/10 text-terminal-green hover:bg-terminal-green/15"
                    )}
                  >
                    Read Research
                    <span aria-hidden="true">→</span>
                  </Link>
                  <a
                    href={c.abstractHref}
                    download
                    className={clsx(
                      "inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-bold transition-colors",
                      isLight
                        ? "border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
                        : "border-slate-700 bg-slate-900/40 text-slate-200 hover:bg-slate-800"
                    )}
                  >
                    Download Research Abstract
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
