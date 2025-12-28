"use client";

import { ChevronRight, Award } from "lucide-react";
import CrisisSimulator from "@/components/CrisisSimulator";

export default function HeroSectionClient() {
  return (
    <section className="relative flex min-h-[calc(100vh-64px)] flex-col items-center justify-center overflow-hidden px-4 py-20">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 -z-20 pointer-events-none overflow-hidden">
        {/* Darkened USA Map Placeholder */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-10 grayscale brightness-[0.2]">
          <svg viewBox="0 0 1000 600" fill="currentColor" className="w-full h-full text-terminal-green">
            <path d="M150,150 L850,150 L850,450 L150,450 Z" />
          </svg>
        </div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.03)_0%,transparent_70%)]" />
      </div>

      <div className="z-10 text-center max-w-5xl mx-auto flex flex-col items-center">
        <div className="mb-8 flex flex-wrap justify-center gap-4 animate-fade-in-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-4 py-1.5 text-xs font-bold text-alert-red uppercase tracking-widest cursor-default border border-slate-700">
            <div className="h-2 w-2 rounded-full bg-alert-red animate-pulse" />
            Situation Room Active
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-4 py-1.5 text-xs font-bold text-blue-400 uppercase tracking-widest cursor-default border border-slate-700">
            <Award className="h-4 w-4" />
            College Board Aligned
          </span>
        </div>

        <h1 className="text-5xl font-extrabold tracking-tighter sm:text-7xl lg:text-8xl uppercase italic mb-8 animate-fade-in-up delay-100">
          Teach <span className="text-terminal-green">Government</span> Through Action.
        </h1>

        <p className="mb-12 text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200">
          Stop lecturing about gridlock. Make them live it. 
          The ultimate immersive simulation designed for AP Government classrooms.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 animate-fade-in-up delay-300">
          <div className="relative group">
            <button
              onClick={() => {
                window.open('/assets/Statecraft_Syllabus_2025.pdf', '_blank');
              }}
              className="relative z-10 flex items-center justify-center gap-3 rounded-full bg-amber-500 px-8 py-4 text-lg font-black text-slate-900 transition-all hover:bg-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transform hover:scale-105 active:scale-95"
            >
              AUTHORIZE MISSION ACCESS
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-full text-center whitespace-nowrap">
              <a 
                href="/assets/Statecraft_Syllabus_2025.docx" 
                className="text-xs text-slate-500 hover:text-amber-500 underline underline-offset-4 transition-colors font-mono"
                download
              >
                [ Need .DOCX? ]
              </a>
            </div>
          </div>

          <button
            onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')} // Placeholder Trailer Link
            className="flex items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-slate-800 backdrop-blur-sm hover:border-slate-500 transform hover:scale-105 active:scale-95"
          >
            Watch Trailer
            <ChevronRight className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        <div className="w-full flex justify-center mb-16 animate-fade-in-up delay-400">
          <CrisisSimulator />
        </div>
      </div>
    </section>
  );
}