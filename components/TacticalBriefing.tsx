"use client";

import { motion } from "framer-motion";

interface TacticalBriefingProps {
  headline?: string;
  date?: string;
  activity?: string;
  topicTag?: string;
}

export default function TacticalBriefing({ 
  headline = "FLASH INTEL: HALEY ENDORSEMENT & VOTER CONSOLIDATION",
  date,
  activity = "In a strategic shift reported within the last 24 hours, former candidate Nikki Haley announced she will vote for Donald Trump... [Truncate remaining text slightly for space if needed]",
  topicTag
}: TacticalBriefingProps) {
  
  const defaultDate = "Sunday, December 28, 2025";
  const displayDate = date || defaultDate;
  const alignmentBadgeText = topicTag || "AP UNIT ALIGNMENT: American Political Ideologies";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-6xl mx-auto px-4 py-8"
    >
      <article className="relative overflow-hidden rounded-lg border border-slate-700 bg-slate-900/80 backdrop-blur-md shadow-2xl tactical-grid">
        
        {/* Header Badge */}
        <div className="flex items-center gap-3 border-b border-slate-700/50 bg-slate-950/50 px-6 py-3">
          <div className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-red-600"></span>
          </div>
          <span className="font-mono text-xs font-bold tracking-[0.2em] text-red-500">
            /// LIVE INTELLIGENCE FEED ///
          </span>
        </div>

        {/* Main Content */}
        <div className="p-8 md:p-10">
          <div className="grid gap-8 md:grid-cols-12">
            
            {/* Left Column: Headline & Activity */}
            <div className="md:col-span-8 space-y-6">
              <h2 
                id="dynamic-headline" 
                className="font-mono text-3xl md:text-4xl font-bold leading-tight text-green-400"
              >
                {headline}
              </h2>
              
              <div 
                id="dynamic-activity" 
                className="font-mono text-sm md:text-base leading-relaxed text-emerald-300 whitespace-pre-wrap"
              >
                {activity}
              </div>

              <div className="pt-2">
                <span className="inline-flex items-center rounded border border-slate-700 bg-slate-950/40 px-3 py-1 font-mono text-xs text-emerald-300">
                  {alignmentBadgeText}
                </span>
              </div>
            </div>

            {/* Right Column: Date & Metadata */}
            <div className="md:col-span-4 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-700/50 pt-6 md:pt-0 md:pl-8">
              <div>
                <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-slate-500">
                  Current Date
                </span>
                <time 
                  id="dynamic-date" 
                  className="font-mono text-xl text-terminal-green"
                >
                  {displayDate}
                </time>
              </div>

              <div className="mt-8 md:mt-0">
                <div className="mb-2 h-px w-full bg-gradient-to-r from-slate-700 to-transparent" />
                <div className="flex justify-between items-end">
                  <span className="font-mono text-[10px] uppercase text-slate-600">
                    Encryption: AES-256
                  </span>
                  <span className="font-mono text-[10px] uppercase text-slate-600">
                    Status: ONLINE
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Decorative Corner Accents */}
        <div className="absolute top-0 left-0 h-4 w-4 border-l-2 border-t-2 border-red-500/50" />
        <div className="absolute top-0 right-0 h-4 w-4 border-r-2 border-t-2 border-red-500/50" />
        <div className="absolute bottom-0 left-0 h-4 w-4 border-l-2 border-b-2 border-red-500/50" />
        <div className="absolute bottom-0 right-0 h-4 w-4 border-r-2 border-b-2 border-red-500/50" />

      </article>
    </motion.div>
  );
}

