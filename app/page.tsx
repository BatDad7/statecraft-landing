import { Newspaper, Clock, MapPin } from "lucide-react";
import AIFirewall from "@/components/AIFirewall";
import StandardsMapper from "@/components/StandardsMapper";
import DocumentDocket from "@/components/DocumentDocket";
import HeroSection from "@/components/landing/HeroSection";
import { redis } from '@/lib/redis';

// Force revalidation every 60 seconds to pick up new Redis content
export const revalidate = 60;

interface DailyBrief {
  headline: string;
  activity: string;
  topic_tag: string;
  date?: string;
}

async function getDailyBrief(): Promise<DailyBrief> {
  try {
    // If env vars are missing (build time), return fallback immediately
    if (!process.env.UPSTASH_REDIS_REST_URL) {
      return fallbackBrief;
    }
    
    const brief = await redis.get<DailyBrief>('daily_brief');
    
    if (!brief) {
      return fallbackBrief;
    }
    
    return brief;
  } catch (error) {
    console.error('Failed to fetch daily brief:', error);
    return fallbackBrief;
  }
}

const fallbackBrief: DailyBrief = {
  headline: "Intelligence Channels Silent",
  activity: "Secure connection established. Waiting for daily briefing upload from HQ.",
  topic_tag: "SYSTEM_STANDBY",
  date: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
};

export default async function Home() {
  const brief = await getDailyBrief();
  
  // Use Brief Date or Current Date
  const displayDate = brief.date || new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Statecraft Simulations",
    "url": "https://statecraftsim.com",
    "mainEntity": {
      "@type": "Article",
      "headline": brief.headline,
      "datePublished": new Date().toISOString(),
      "articleBody": brief.activity,
      "author": {
        "@type": "Organization",
        "name": "Statecraft Intelligence"
      }
    }
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section Configured for AP Gov */}
      <HeroSection 
        badgeText="College Board Aligned"
        mainHeading={<>Teach <span className="text-terminal-green">Government</span> Through Action.</>}
        subHeading="Stop lecturing about gridlock. Make them live it. The ultimate immersive simulation designed for AP Government classrooms."
        primaryCtaText="AUTHORIZE MISSION ACCESS"
        secondaryCtaText="Watch Trailer"
        techSpecs={["Browser Based", "No Install", "Chromebook Compatible"]}
      />

      {/* Daily Intelligence Brief Section (Server Rendered) */}
      <section className="py-12 border-y border-slate-800 tactical-grid">
        <div id="daily-intel-brief" className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-12 gap-8 items-start">
            
            {/* Col 1: Briefing Content (Span 8) */}
            <div className="md:col-span-8">
              <div className="flex items-center gap-2 mb-3 text-brand-blue font-bold uppercase tracking-widest text-xs">
                <Newspaper size={16} /> 
                Daily Intelligence Brief
              </div>
              <h2 id="dynamic-headline" className="text-3xl font-serif font-bold text-white mb-4 leading-tight min-h-[2.5rem]">
                {brief.headline}
              </h2>
              <div id="dynamic-activity" className="prose prose-invert prose-sm text-slate-400 max-w-none min-h-[6rem]">
                {brief.activity}
              </div>
            </div>

            {/* Col 2: Metadata Sidebar (Span 4) */}
            <div className="md:col-span-4 bg-slate-900/50 p-6 rounded-lg border border-slate-800 backdrop-blur-sm">
              <div id="dynamic-date" className="flex items-center gap-2 text-emerald-500 font-mono text-sm mb-4">
                <Clock size={14} /> 
                <span>{displayDate}</span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-bold block mb-1">Current Unit Alignment</span>
                  <div id="dynamic-topic" className="inline-block px-2 py-1 rounded bg-slate-800 border border-slate-700 text-xs text-slate-300 font-mono uppercase">
                    {brief.topic_tag}
                  </div>
                </div>
                
                {/* Placeholder for future metadata */}
                <div className="pt-4 border-t border-slate-800/50">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Live Feed Active
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* AI Firewall Section */}
      <div id="ai-firewall">
        <AIFirewall />
      </div>

      {/* Standards Mapper Section */}
      <div id="standards-mapper">
        <StandardsMapper />
      </div>

      {/* Document Docket Section */}
      <div id="document-docket">
        <DocumentDocket />
      </div>
    </div>
  );
}
