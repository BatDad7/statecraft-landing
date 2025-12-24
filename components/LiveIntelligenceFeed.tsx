"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LiveIntelligenceFeed = () => {
  const INITIAL_HEADLINE = (
    <>
      ESTABLISHING SECURE <span className="cursor-help border-b border-dashed border-slate-500" title="Uplink: A communications link from a ground station to a satellite.">UPLINK</span>... [STAND BY]
    </>
  );
  const [headline, setHeadline] = useState<string | React.ReactNode>(INITIAL_HEADLINE);
  const [headlineKey, setHeadlineKey] = useState("initial");
  const [date, setDate] = useState("Establishing...");
  const [activity, setActivity] = useState("Initializing secure connection to educational database...");
  const [apUnit, setApUnit] = useState<string | null>(null);
  const [concept, setConcept] = useState<string | null>(null);
  const [foundationalDoc, setFoundationalDoc] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(false);
  
  const isInitial = headlineKey === "initial";
  
  // Track previous headline to avoid unnecessary updates
  const prevHeadlineRef = useRef<string | React.ReactNode>(headline);

  const fetchIntel = async () => {
    try {
      const res = await fetch("/api/intel", { cache: 'no-store' });
      const data = await res.json();
      
      if (data.headline && data.headline !== prevHeadlineRef.current) {
        setHeadline(data.headline);
        setHeadlineKey(data.headline);
        setDate(data.date);
        setActivity(data.activity);
        setApUnit(data.ap_unit || null);
        setConcept(data.concept || null);
        setFoundationalDoc(data.foundational_doc || null);
        prevHeadlineRef.current = data.headline;
        
        // Visual flash for new data
        setIsNew(true);
        setTimeout(() => setIsNew(false), 2000);
      }
    } catch (error) {
      console.error("Failed to fetch intelligence feed:", error);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchIntel();

    // Set up polling every 10 seconds
    const interval = setInterval(fetchIntel, 10000);

    return () => clearInterval(interval);
  }, []);

  // Schema.org LearningResource JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": headline,
    "description": activity,
    "educationalLevel": "High School",
    "learningResourceType": "Simulation",
    "teaches": concept || "AP Government",
    "datePublished": date,
    "publisher": {
      "@type": "Organization",
      "name": "Statecraft Simulations"
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="my-12 px-4"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className={`relative overflow-hidden rounded-xl border transition-all duration-500 ${isNew ? 'border-brand-blue shadow-[0_0_30px_rgba(37,99,235,0.3)] bg-slate-900' : 'border-slate-800 bg-slate-900/40'} p-6 md:p-8 shadow-2xl ${isInitial ? 'cursor-wait' : ''}`}>
        {/* Header with Status Dot */}
        <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <AnimatePresence>
                <motion.span 
                  key={isNew ? 'active' : 'idle'}
                  animate={{ scale: isNew ? [1, 1.5, 1] : 1 }}
                  className={`absolute inline-flex h-full w-full rounded-full ${isNew ? 'bg-brand-blue' : 'bg-red-500'} opacity-75 animate-ping`}
                ></motion.span>
              </AnimatePresence>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isNew ? 'bg-brand-blue' : 'bg-red-600'}`}></span>
            </div>
            <span className={`text-[10px] font-black uppercase tracking-[0.3em] transition-colors ${isNew ? 'text-brand-blue' : 'text-slate-500'}`}>
              Current Intelligence Briefing
            </span>
          </div>
          <div className="text-[10px] font-mono text-slate-600" id="dynamic-date">
            {date}
          </div>
        </div>

        {/* Content Body */}
        <div 
          className="space-y-4"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={headlineKey}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.4 }}
            >
              {isNew && (
                <span className="sr-only">New Intelligence Received:</span>
              )}
              <h3 
                id="dynamic-headline" 
                className="text-2xl md:text-3xl font-serif font-bold text-white leading-tight"
              >
                {headline}
                {isInitial && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "steps(2)" }}
                    className="inline-block ml-1 w-2 h-6 md:h-8 bg-brand-blue align-middle"
                  />
                )}
              </h3>

              {/* Curriculum Metadata Badges */}
              {(apUnit || concept || foundationalDoc) && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {apUnit && (
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-800 uppercase tracking-tighter">
                      {apUnit}
                    </span>
                  )}
                  {concept && (
                    <span className="inline-flex items-center rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-medium text-slate-300 border border-slate-700">
                      {concept}
                    </span>
                  )}
                  {foundationalDoc && (
                    <span className="inline-flex items-center rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-bold text-amber-500 border border-amber-500/30">
                      {foundationalDoc}
                    </span>
                  )}
                </div>
              )}

              <p 
                id="dynamic-activity" 
                className="text-slate-400 font-sans leading-relaxed border-l-2 border-brand-blue/30 pl-4 mt-4"
              >
                {activity}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default LiveIntelligenceFeed;
