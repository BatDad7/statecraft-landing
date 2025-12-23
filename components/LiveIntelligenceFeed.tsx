"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LiveIntelligenceFeed = () => {
  const [headline, setHeadline] = useState("Awaiting Satellite Uplink...");
  const [date, setDate] = useState("YYYY-MM-DD");
  const [activity, setActivity] = useState("Initializing secure connection to educational database...");
  const [isNew, setIsNew] = useState(false);
  
  // Track previous headline to avoid unnecessary updates
  const prevHeadlineRef = useRef(headline);

  const fetchIntel = async () => {
    try {
      const res = await fetch("/api/intel", { cache: 'no-store' });
      const data = await res.json();
      
      if (data.headline && data.headline !== prevHeadlineRef.current) {
        setHeadline(data.headline);
        setDate(data.date);
        setActivity(data.activity);
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
    "educationalLevel": "AP Government",
    "learningResourceType": "Simulation",
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
      
      <div className={`relative overflow-hidden rounded-xl border transition-colors duration-500 ${isNew ? 'border-brand-blue shadow-[0_0_30px_rgba(37,99,235,0.3)]' : 'border-slate-800'} bg-slate-900 p-6 md:p-8 tactical-grid shadow-2xl`}>
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
              key={headline}
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
              </h3>
              <p 
                id="dynamic-activity" 
                className="text-slate-400 font-sans leading-relaxed border-l-2 border-brand-blue/30 pl-4 mt-4"
              >
                {activity}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Decorative Corner */}
        <div className="absolute top-0 right-0 p-2 opacity-20">
          <div className="w-8 h-8 border-t-2 border-r-2 border-slate-700" />
        </div>

        {/* Syncing status indicator (only visible on mobile or small screens) */}
        <div className="absolute bottom-2 right-4 flex items-center gap-1">
          <div className="h-1 w-1 rounded-full bg-slate-800 animate-pulse" />
          <span className="text-[8px] uppercase tracking-tighter text-slate-700 font-mono">Syncing...</span>
        </div>
      </div>
    </motion.div>
  );
};

export default LiveIntelligenceFeed;
