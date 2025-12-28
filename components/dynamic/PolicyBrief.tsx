import { ScrollText } from "lucide-react";

interface PolicyBriefProps {
  topic: string;
  analysis: string;
  discussion?: string;
  source?: string;
}

export default function PolicyBrief({ topic, analysis, discussion, source = "Analysis via Gemini 3 Pro" }: PolicyBriefProps) {
  return (
    <section className="py-12 border-y border-slate-800 bg-slate-900">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-start gap-6 bg-slate-800/50 p-8 rounded-r-lg border-l-4 border-brand-blue backdrop-blur-sm">
          <div className="hidden md:block p-3 bg-brand-blue/10 rounded-full">
            <ScrollText className="h-6 w-6 text-brand-blue" />
          </div>
          
          <div className="space-y-4 w-full">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">
                Daily Policy Briefing
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {new Date().toLocaleDateString()}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white leading-tight">
              {topic}
            </h3>

            <div className="prose prose-invert prose-slate max-w-none">
              <p className="text-lg text-slate-300 leading-relaxed">
                {analysis}
              </p>
            </div>

            {discussion && (
              <div className="mt-6 pt-6 border-t border-slate-700/50">
                <p className="text-sm font-bold text-slate-400 uppercase mb-2">Discussion Prompt</p>
                <p className="text-slate-300 italic">"{discussion}"</p>
              </div>
            )}

            <div className="pt-4 flex justify-end">
              <span className="text-[10px] text-slate-600 uppercase tracking-wider">
                {source}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

