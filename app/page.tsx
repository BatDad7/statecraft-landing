"use client";

import { motion } from "framer-motion";
import { AlertCircle, ChevronRight, Terminal, ShieldCheck, Check, Power, Zap, ClipboardCheck, Quote, Lock } from "lucide-react";
import CrisisSimulator from "@/components/CrisisSimulator";
import AIFirewall from "@/components/AIFirewall";
import StandardsMapper from "@/components/StandardsMapper";
import SimTour from "@/components/SimTour";
import LiveIntelligenceFeed from "@/components/LiveIntelligenceFeed";
import DocumentDocket from "@/components/DocumentDocket";

export default function Home() {
  const handleRequestAccess = () => {
    // Action A: Trigger Download
    const link = document.createElement('a');
    link.href = '/assets/Statecraft_Syllabus_2025.pdf';
    link.download = 'Statecraft_Syllabus_2025.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Action B: Open Calendly in new tab
    window.open('https://calendly.com', '_blank');
  };

  const techSpecs = [
    "Runs on Chromebooks & iPads",
    "FERPA & COPPA: CLEARED",
    "Auto-Grading Included",
    "No Installation Required",
  ];

  const trustLogos = [
    "PURDUE UNIVERSITY",
    "UNIVERSITY OF GEORGIA",
    "TEXAS A&M",
    "UNIVERSITY LIGGETT SCHOOL",
    "NORFOLK ACADEMY",
  ];

  const controlFeatures = [
    {
      icon: <Power className="h-8 w-8 text-brand-blue" />,
      title: "Turn Zero",
      text: "Launch the world in 5 minutes. No installation required.",
    },
    {
      icon: <Zap className="h-8 w-8 text-amber-500" />,
      title: "COMMAND OVERSIGHT",
      text: "Full administrative privileges to pause simulations, override crises, and review student <span className=\"cursor-help border-b border-dashed border-slate-500\" title=\"Intelligence: Data on student performance and in-game decisions.\">intel</span>.",
    },
    {
      icon: <ClipboardCheck className="h-8 w-8 text-terminal-green" />,
      title: "Auto-Grading",
      text: "Participation and objective scores are calculated automatically. Get your weekends back.",
    },
  ];

  const testimonials = [
    {
      quote: "The American Government Sim doesn’t go easy on students. They come out of it realizing just how difficult it is for leaders to do their jobs. It illustrates separation of powers and checks and balances better than any lecture.",
      author: "Nadia Jiani-Hyler",
      title: "Lecturer, Political Science",
      institution: "Augusta University",
    },
    {
      quote: "Statecraft solves the problem of passive learning. My students used to gloss over these concepts; now they are arguing about them in the hallway. It forces interaction and requires them to pay attention.",
      author: "Alex McDonnell",
      title: "AP Government Teacher",
      institution: "High School Case Study",
    },
  ];

  return (
    <div className="bg-slate-900 text-white min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative flex min-h-[calc(100vh-64px)] flex-col items-center justify-center overflow-hidden px-4 py-24 md:py-32">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 -z-20 pointer-events-none overflow-hidden">
          {/* Territory Borders Map Placeholder */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-15 grayscale brightness-[0.4] text-slate-800">
            <svg viewBox="0 0 1000 600" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
              {/* Simulated Territory Polygons */}
              <path d="M100,100 L250,80 L400,120 L350,250 L150,220 Z" />
              <path d="M400,120 L600,90 L750,150 L700,300 L450,280 Z" />
              <path d="M750,150 L900,180 L850,400 L650,450 L700,300 Z" />
              <path d="M150,220 L350,250 L450,450 L200,500 L100,350 Z" />
              <path d="M450,280 L700,300 L650,450 L400,550 L350,400 Z" />
              {/* Minor border lines */}
              <line x1="250" y1="80" x2="300" y2="20" strokeDasharray="4 4" />
              <line x1="600" y1="90" x2="650" y2="30" strokeDasharray="4 4" />
            </svg>
          </div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05)_0%,transparent_70%)]" />
        </div>

        <div className="z-10 text-center max-w-5xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex flex-col sm:flex-row items-center gap-4 justify-center"
          >
            <span className="inline-flex items-center rounded-full bg-alert-red/10 px-3 py-1 text-xs font-medium text-alert-red ring-1 ring-inset ring-alert-red/20 uppercase tracking-widest">
              <AlertCircle className="mr-1 h-3 w-3" />
              Situation Room Active
            </span>
            <span className="inline-flex items-center rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-bold text-blue-200 ring-1 ring-inset ring-brand-blue/30 uppercase tracking-tight backdrop-blur-sm">
              <img src="/gov-logo.png" alt="AP Gov" className="mr-2 h-6 w-6 rounded-full border border-brand-blue/30" />
              College Board Aligned
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl font-serif font-black tracking-tighter sm:text-7xl lg:text-8xl uppercase italic mb-8 leading-tight"
          >
            Teach <span className="text-brand-blue">Government</span> Through Action.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12 text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Stop lecturing about <span className="cursor-help border-b border-dashed border-slate-500" title="Gridlock: A situation when there is difficulty passing laws that satisfy the needs of the people.">gridlock</span>. Make them live it. 
            Statecraft is a turn-based classroom simulation where students play the roles of politicians, lobbyists, and media.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="w-full flex justify-center mb-16"
          >
            <CrisisSimulator />
          </motion.div>

          <div className="flex flex-col items-center gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(34, 211, 238, 0)",
                    "0 0 30px rgba(34, 211, 238, 0.4)",
                    "0 0 0px rgba(34, 211, 238, 0)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                onClick={handleRequestAccess}
                className="w-full sm:w-auto flex flex-col items-center justify-center gap-1 rounded-md bg-amber-500 px-12 py-6 transition-all hover:bg-amber-400 text-black shadow-[0_0_60px_rgba(245,158,11,0.4)] border-4 border-black/10 group md:hover:scale-105"
              >
                <div className="flex items-center gap-3 text-2xl font-black uppercase tracking-tighter">
                  <Lock className="h-7 w-7" />
                  AUTHORIZE MISSION ACCESS
                </div>
                <span className="text-[12px] font-bold text-black/80 uppercase tracking-widest border-t border-black/10 pt-1 mt-1">
                  (Secure Download: Syllabus Kit)
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://www.youtube.com/watch?v=HOoq01t41bk', '_blank')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-md border border-slate-700 bg-slate-800/30 px-10 py-5 text-lg font-bold text-white transition-all hover:bg-slate-800 backdrop-blur-sm"
              >
                Watch Simulation Trailer
                <ChevronRight className="h-6 w-6 text-slate-500" />
              </motion.button>
            </motion.div>

            {/* Tech Specs Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 px-4"
            >
              {techSpecs.map((spec, i) => {
                const isHighlighted = spec.includes("Chromebook") || spec.includes("Installation");
                return (
                  <div key={i} className="flex items-center gap-2">
                    {!isHighlighted && <Check className="h-4 w-4 text-slate-500" />}
                    <span className={`uppercase tracking-widest ${
                      isHighlighted 
                        ? "bg-blue-900/50 border border-blue-500/30 px-3 py-1 rounded-full text-blue-200 text-sm font-mono"
                        : "text-[12px] font-medium text-slate-400"
                    }`}>
                      {spec}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dynamic SEO Engine: Live Intelligence Feed */}
      <div className="max-w-4xl mx-auto mt-32 md:mt-48 mb-24">
        <LiveIntelligenceFeed />
      </div>

      {/* Trust Bar Section */}
      <section className="bg-slate-950 border-y border-slate-800 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-12">
            Trusted by faculty at 500+ institutions including:
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 md:gap-x-16">
            {trustLogos.map((logo, i) => (
              <span 
                key={i} 
                className="text-sm font-sans font-bold text-slate-500 opacity-60 hover:opacity-100 transition-opacity cursor-default tracking-tighter"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Security Protocols & Clearance Section */}
      <section className="py-12 bg-slate-900 border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <div className="text-center md:text-left">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500 mb-2">Security Status</h3>
              <p className="text-xl font-serif font-black uppercase italic text-white">Security Protocols & Clearance</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-terminal-green/30 bg-terminal-green/5">
                <ShieldCheck className="h-4 w-4 text-terminal-green" />
                <span className="text-xs font-black text-terminal-green uppercase tracking-widest">FERPA: VERIFIED</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-terminal-green/30 bg-terminal-green/5">
                <ShieldCheck className="h-4 w-4 text-terminal-green" />
                <span className="text-xs font-black text-terminal-green uppercase tracking-widest">COPPA: LEVEL 1 CLEARED</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-alert-red/30 bg-alert-red/5">
                <AlertCircle className="h-4 w-4 text-alert-red" />
                <span className="text-xs font-black text-alert-red uppercase tracking-widest">AD-NETWORKS: BLOCKED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Sim Tour */}
      <SimTour />

      {/* Standards Mapper Section */}
      <StandardsMapper />

      {/* Required Documents Section */}
      <DocumentDocket />

      {/* Testimonials Section */}
      <section className="py-24 md:py-32 px-4 bg-slate-900/50 border-t border-slate-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-serif font-black uppercase italic mb-6">
              Academic Rigor Meets <span className="text-brand-blue">Student Addiction.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-slate-900/50 border border-slate-800 p-8 rounded-xl overflow-hidden"
              >
                <Quote className="absolute -top-4 -right-4 h-32 w-32 text-slate-700/20 -rotate-12 pointer-events-none" />
                <div className="relative z-10">
                  <p className="text-lg text-slate-200 leading-relaxed mb-8 italic">
                    &quot;{t.quote}&quot;
                  </p>
                  <div>
                    <p className="font-bold text-white uppercase tracking-tight">{t.author}</p>
                    <p className="text-sm text-slate-500 uppercase tracking-widest">{t.title}</p>
                    <p className="text-sm text-brand-blue/80 font-bold uppercase">{t.institution}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Command Oversight Section */}
      <section id="demo" className="py-24 md:py-32 px-4 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6-static.png')]" />
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif font-black uppercase italic">
              Total <span className="text-brand-blue">Command Oversight.</span>
            </h2>
            <p className="text-2xl font-bold text-slate-400 max-w-2xl mx-auto">You are the Game Master. They are the players.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            {controlFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl hover:border-brand-blue/50 transition-colors group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 uppercase tracking-tight">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Firewall Section */}
      <AIFirewall />
    </div>
  );
}
