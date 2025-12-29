interface IntelBriefingProps {
  date: string;
  headline: string;
  activity: string;
}

export default function IntelBriefing({ date, headline, activity }: IntelBriefingProps) {
  return (
    <section className="relative z-10">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <article
          id="dynamic-intel-feed"
          className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-xl p-6 md:p-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <div className="text-xs font-mono text-emerald-500/80 tracking-widest uppercase">
              /// INCOMING INTELLIGENCE STREAM
            </div>
          </div>

          <div id="dynamic-date" className="text-sm font-mono text-slate-400">
            {date}
          </div>

          <h2
            id="dynamic-headline"
            className="mt-3 text-xl md:text-2xl font-sans font-bold text-white tracking-tight"
          >
            {headline}
          </h2>

          <div className="mt-4 border-t border-slate-700/50 pt-4">
            <div id="dynamic-activity" className="text-sm text-slate-300 font-mono">
              {activity}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}


