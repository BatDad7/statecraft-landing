import { ScrollText } from "lucide-react";

interface PolicyBriefProps {
  topic: string;
  analysis: string;
  discussion?: string;
  source?: string;
  theme?: 'dark' | 'light';
}

export default function PolicyBrief({ topic, analysis, discussion, source = "Analysis via Gemini 3 Pro", theme = 'dark' }: PolicyBriefProps) {
  const isLight = theme === 'light';

  return (
    <section className={`py-12 border-y ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
      <div className="container mx-auto px-4 max-w-4xl">
        <div className={`flex items-start gap-6 p-8 rounded-r-lg border-l-4 shadow-lg backdrop-blur-sm ${
          isLight 
            ? 'bg-white border-red-600 shadow-slate-200' 
            : 'bg-gradient-to-r from-slate-800 to-slate-900 border-amber-600'
        }`}>
          <div className={`hidden md:block p-3 rounded-full ${
            isLight ? 'bg-red-50' : 'bg-amber-900/20'
          }`}>
            <ScrollText className={`h-6 w-6 ${isLight ? 'text-red-600' : 'text-amber-500'}`} />
          </div>
          
          <div className="space-y-4 w-full">
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold uppercase tracking-widest ${isLight ? 'text-red-600' : 'text-amber-500'}`}>
                Daily Policy Briefing
              </span>
              <span className={`text-xs font-mono ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                {new Date().toLocaleDateString()}
              </span>
            </div>

            <h3 className={`text-2xl md:text-3xl font-serif font-bold leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {topic}
            </h3>

            <div className={`prose prose-sm md:prose-base max-w-none ${isLight ? 'prose-slate' : 'prose-invert prose-slate'}`}>
              <p className={`text-lg leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                {analysis}
              </p>
            </div>

            {discussion && (
              <div className={`mt-6 pt-6 border-t ${isLight ? 'border-slate-100' : 'border-slate-700/50'}`}>
                <p className={`text-sm font-bold uppercase mb-2 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Discussion Prompt</p>
                <p className={`italic ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>"{discussion}"</p>
              </div>
            )}

            <div className="pt-4 flex justify-end">
              <span className={`text-[10px] uppercase tracking-wider ${isLight ? 'text-slate-400' : 'text-slate-600'}`}>
                {source}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
