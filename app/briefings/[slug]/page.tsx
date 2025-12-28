import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Redis } from "@upstash/redis";
import { ShieldCheck, Calendar, BookOpen, Target, ChevronLeft } from "lucide-react";
import Link from "next/link";

interface BriefingPageProps {
  params: { slug: string };
}

async function getBriefingData(slug: string) {
  try {
    const redis = Redis.fromEnv();
    const data = await redis.get(`intel_slug:${slug}`);
    return data as any;
  } catch (error) {
    console.error("Error fetching briefing data:", error);
    return null;
  }
}

export async function generateMetadata({ params }: BriefingPageProps): Promise<Metadata> {
  const data = await getBriefingData(params.slug);

  if (!data) {
    return { title: "Briefing Not Found | Statecraft" };
  }

  return {
    title: `Simulation Briefing: ${data.concept} | AP Gov ${data.ap_unit} | Statecraft`,
    description: `${data.activity} - Learn how Statecraft simulations cover AP Gov Topic ${data.topic_number || 'X.X'}.`,
    openGraph: {
      title: `Intelligence Briefing: ${data.headline}`,
      description: data.activity,
      type: "article",
    },
  };
}

export default async function BriefingPage({ params }: BriefingPageProps) {
  const data = await getBriefingData(params.slug);

  if (!data) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": data.headline,
    "description": data.activity,
    "educationalLevel": "High School",
    "learningResourceType": "Simulation Briefing",
    "teaches": `${data.concept} (Topic ${data.topic_number || 'X.X'})`,
    "datePublished": data.date,
    "publisher": {
      "@type": "Organization",
      "name": "Statecraft Simulations"
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white font-sans py-20 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto max-w-4xl">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-blue transition-colors mb-12 uppercase text-xs font-black tracking-widest group"
        >
          <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Command Center
        </Link>

        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-8 md:p-12 tactical-grid shadow-2xl">
          {/* Top Secret Stamp */}
          <div className="absolute top-8 right-8 opacity-10 pointer-events-none select-none -rotate-12">
            <span className="text-4xl md:text-6xl font-black uppercase italic border-4 md:border-8 border-alert-red px-4 md:px-8 text-alert-red">
              Classified
            </span>
          </div>

          <div className="relative z-10 space-y-8">
            <div className="flex flex-wrap items-center gap-4 text-xs font-black uppercase tracking-[0.3em] text-brand-blue">
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20">
                <ShieldCheck className="h-3 w-3" />
                Intelligence Briefing
              </span>
              <span className="flex items-center gap-2 text-slate-500">
                <Calendar className="h-3 w-3" />
                ID: {data.date}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-serif font-black uppercase italic leading-tight text-white">
              {data.headline}
            </h1>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 text-slate-500 mb-2">
                  <BookOpen className="h-4 w-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Curriculum Unit</span>
                </div>
                <p className="text-lg font-bold text-white uppercase">{data.ap_unit}</p>
              </div>

              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 text-slate-500 mb-2">
                  <Target className="h-4 w-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Topic Number</span>
                </div>
                <p className="text-lg font-bold text-white uppercase">Topic {data.topic_number || 'X.X'}</p>
              </div>

              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 text-slate-500 mb-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Core Concept</span>
                </div>
                <p className="text-lg font-bold text-white uppercase">{data.concept}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">Activity Report</h2>
              <div className="text-xl md:text-2xl text-slate-300 leading-relaxed font-serif italic border-l-4 border-brand-blue/30 pl-8 py-4 bg-slate-900/20">
                &quot;{data.activity}&quot;
              </div>
            </div>

            <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-2 text-center md:text-left">
                <p className="text-sm font-bold text-white uppercase tracking-tight">Ready to simulate this in your classroom?</p>
                <p className="text-xs text-slate-500 uppercase tracking-widest">Join 500+ institutions using Statecraft.</p>
              </div>
              <Link 
                href="/#demo"
                className="w-full md:w-auto px-8 py-4 bg-brand-blue text-white font-black uppercase tracking-tighter rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-brand-blue/20 text-center"
              >
                Deploy Simulation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
