import { Newspaper, Clock, BookOpen } from "lucide-react";
import AIFirewall from "@/components/AIFirewall";
import DocumentDocket from "@/components/DocumentDocket";
import HeroSection from "@/components/HeroSection";
import { redis } from '@/lib/redis';

// Force revalidation every 60 seconds
export const revalidate = 60;

interface DailyBrief {
  headline: string;
  activity: string;
  topic_tag: string;
  date?: string;
}

async function getDailyBrief(): Promise<DailyBrief> {
  try {
    if (!process.env.UPSTASH_REDIS_REST_URL) {
      return fallbackBrief;
    }
    // Attempt to fetch specific college brief, fall back to general if missing
    const brief = await redis.get<DailyBrief>('daily_brief:college-gov');
    return brief || fallbackBrief;
  } catch (error) {
    console.error('Failed to fetch daily brief:', error);
    return fallbackBrief;
  }
}

const fallbackBrief: DailyBrief = {
  headline: "Intelligence Channels Silent",
  activity: "Secure connection established.",
  topic_tag: "SYSTEM_STANDBY",
  date: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
};

export default async function HigherEdGovPage() {
  const brief = await getDailyBrief();
  const displayDate = brief.date || new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      {/* Higher Ed Specific Hero */}
      <HeroSection 
        title={<>Elevate <span className="text-blue-500">American Politics</span> with Strategic Simulation.</>}
        subtitle="Move beyond the textbook. Give your undergraduates a hands-on lab in institutional friction, polarization, and legislative strategy."
        badge="Higher Ed Edition"
        ctaPrimary="VIEW SYLLABUS INTEGRATION"
        ctaSecondary="Watch Gameplay"
      />

      {/* Daily Brief (Reused Layout) */}
      <section className="py-12 border-y border-slate-800 tactical-grid">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-8">
              <div className="flex items-center gap-2 mb-3 text-blue-400 font-bold uppercase tracking-widest text-xs">
                <Newspaper size={16} /> 
                Geopolitical Analysis Feed
              </div>
              <h2 className="text-3xl font-serif font-bold text-white mb-4 leading-tight min-h-[2.5rem]">
                {brief.headline}
              </h2>
              <div className="prose prose-invert prose-sm text-slate-400 max-w-none min-h-[6rem]">
                {brief.activity}
              </div>
            </div>

            <div className="md:col-span-4 bg-slate-900/50 p-6 rounded-lg border border-slate-800 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-blue-400 font-mono text-sm mb-4">
                <Clock size={14} /> 
                <span>{displayDate}</span>
              </div>
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-bold block mb-1">Semester Alignment</span>
                  <div className="inline-block px-2 py-1 rounded bg-slate-800 border border-slate-700 text-xs text-slate-300 font-mono uppercase">
                    {brief.topic_tag}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reused Components */}
      <AIFirewall />
      
      {/* Custom "Research" Section for Profs */}
      <section className="py-24 px-4 bg-slate-950 border-t border-slate-800">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="p-3 rounded-full bg-blue-500/10 text-blue-500">
              <BookOpen className="h-8 w-8" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase italic mb-6">Built on Political Science Theory</h2>
          <p className="text-xl text-slate-400 leading-relaxed mb-12">
            Statecraft isn't just a game; it's a model. Grounded in <strong>Mayhew’s Electoral Connection</strong>, <strong>Fenno’s Home Style</strong>, and <strong>Neustadt’s Presidential Power</strong>, the simulation allows students to test theoretical frameworks in a controlled environment.
          </p>
          <a href="#" className="text-blue-400 hover:text-blue-300 font-bold uppercase tracking-widest text-sm border-b border-blue-400/50 hover:border-blue-300 transition-colors">
            Read the Pedagogical Whitepaper
          </a>
        </div>
      </section>

      <DocumentDocket />
    </div>
  );
}

