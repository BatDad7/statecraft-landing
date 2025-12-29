import Link from "next/link";

type ResearchCard = {
  kicker: string;
  headline: string;
  body: string;
  citation: string;
  actionLabel: string;
  href: string;
  abstractHref: string;
  highlight?: boolean;
};

const CARDS: ResearchCard[] = [
  {
    kicker: "The AI Firewall (Verified)",
    headline: "Plagiarism-Proof Assessment",
    body:
      "Research confirms Statecraft is virtually impossible to plagiarize. Unique, emergent scenarios mean no answer key exists for LLMs to scrape.",
    citation:
      "Citation: Linantud & Kaftan (2019) — “The Statecraft Effect: Assessment, Attitudes, and Academic Honesty”",
    actionLabel: "Read Research",
    href: "/higher-ed/research/the-statecraft-effect",
    abstractHref: "/assets/research/the-statecraft-effect-abstract.txt",
    highlight: true,
  },
  {
    kicker: "Instructional Automation",
    headline: "Zero Negative Impact on Pedagogy",
    body:
      "A controlled study found that instruction can be effectively outsourced to the simulation with no negative change in outcomes, freeing faculty for research.",
    citation:
      "Citation: Eric Cox (2019) — “Does Statecraft Improve Student Learning Outcomes? A Controlled Comparison”",
    actionLabel: "Read Research",
    href: "/higher-ed/research/controlled-comparison",
    abstractHref: "/assets/research/controlled-comparison-abstract.txt",
  },
  {
    kicker: "Ideological Challenge",
    headline: "Breaking Confirmation Bias",
    body:
      "Data shows the simulation forces students to confront their own 'Folk Realism' or 'Folk Idealism' when faced with structural constraints.",
    citation:
      "Citation: Jennifer Epley (2016) — “Learning by Doing: Using an Online Simulation Game in an International Relations Course”",
    actionLabel: "Read Research",
    href: "/higher-ed/research/learning-by-doing",
    abstractHref: "/assets/research/learning-by-doing-abstract.txt",
  },
];

export default function PedagogicalEfficacy() {
  return (
    <section className="mt-12">
      <div className="rounded-2xl border border-slate-700/50 bg-slate-900/70 backdrop-blur-md p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-emerald-500/80">
              /// PEDAGOGICAL EFFICACY
            </div>
            <h2 className="mt-2 text-2xl md:text-3xl font-extrabold tracking-tight">
              Pedagogical Efficacy: The Research
            </h2>
            <p className="mt-3 text-slate-300 text-sm md:text-base max-w-3xl">
              For tenure-track traditionalists, “integrity” is the proof point. These are research-backed claims that frame
              Statecraft as assessment infrastructure—not entertainment.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {CARDS.map((c) => (
            <article
              key={c.headline}
              className={`rounded-xl border p-6 bg-slate-950/30 ${
                c.highlight ? "border-terminal-green/30 shadow-[0_0_35px_rgba(34,197,94,0.08)]" : "border-slate-700/50"
              }`}
            >
              <div className="font-mono text-[10px] uppercase tracking-widest text-emerald-500/80">
                {c.kicker}
              </div>
              <h3 className="mt-3 text-xl font-bold tracking-tight text-white">
                {c.headline}
              </h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                {c.body}
              </p>

              <div className="mt-5 pt-5 border-t border-slate-800/60">
                <div className="text-xs font-mono text-slate-400">
                  {c.citation}
                </div>
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <Link
                    href={c.href}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-terminal-green/30 bg-terminal-green/10 px-4 py-2 text-sm font-bold text-terminal-green hover:bg-terminal-green/15 transition-colors"
                  >
                    {c.actionLabel}
                    <span aria-hidden="true">→</span>
                  </Link>
                  <a
                    href={c.abstractHref}
                    download
                    className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900/40 px-4 py-2 text-sm font-bold text-slate-200 hover:bg-slate-800 transition-colors"
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


