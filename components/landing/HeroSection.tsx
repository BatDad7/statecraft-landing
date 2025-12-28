"use client";

import { ChevronRight, Award, CheckCircle2 } from "lucide-react";
import CrisisSimulator from "@/components/CrisisSimulator";
import { ReactNode } from "react";

export interface HeroProps {
  badgeText: string;
  mainHeading: ReactNode;
  subHeading: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  techSpecs: string[];
  primaryCtaLink?: string;
  secondaryCtaLink?: string;
  variant?: 'tactical' | 'academic';
}

export default function HeroSection({
  badgeText,
  mainHeading,
  subHeading,
  primaryCtaText,
  secondaryCtaText,
  techSpecs,
  primaryCtaLink = '/assets/Statecraft_Syllabus_2025.pdf',
  secondaryCtaLink = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  variant = 'tactical'
}: HeroProps) {
  const handlePrimary = () => window.open(primaryCtaLink, '_blank');
  const handleSecondary = () => window.open(secondaryCtaLink, '_blank');

  const isAcademic = variant === 'academic';

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
          {/* Situation Room Badge - Only for Tactical */}
          {!isAcademic && (
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-4 py-1.5 text-xs font-bold text-alert-red uppercase tracking-widest cursor-default border border-slate-700">
              <div className="h-2 w-2 rounded-full bg-alert-red animate-pulse" />
              Situation Room Active
            </span>
          )}
          
          {/* Main Badge */}
          <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest cursor-default border ${
            isAcademic 
              ? 'bg-amber-900/20 text-amber-500 border-amber-500/30' // Legislative Gold
              : 'bg-slate-800 text-blue-400 border-slate-700'
          }`}>
            <Award className="h-4 w-4" />
            {badgeText}
          </span>
        </div>

        <h1 className={`text-5xl font-extrabold tracking-tighter sm:text-7xl lg:text-8xl uppercase italic mb-8 animate-fade-in-up delay-100 ${
          isAcademic ? 'font-serif tracking-tight normal-case' : ''
        }`}>
          {mainHeading}
        </h1>

        <p className="mb-12 text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200">
          {subHeading}
        </p>

        <div className="flex flex-col items-center gap-8 mb-16 animate-fade-in-up delay-300">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="relative group">
              <button
                onClick={handlePrimary}
                className={`relative z-10 flex items-center justify-center gap-3 rounded-full px-8 py-4 text-lg font-black transition-all transform hover:scale-105 active:scale-95 ${
                  isAcademic 
                    ? 'bg-amber-600 text-white hover:bg-amber-500 hover:shadow-[0_0_30px_rgba(217,119,6,0.4)]' 
                    : 'bg-amber-500 text-slate-900 hover:bg-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]'
                }`}
              >
                {primaryCtaText}
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
              onClick={handleSecondary}
              className="flex items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-slate-800 backdrop-blur-sm hover:border-slate-500 transform hover:scale-105 active:scale-95"
            >
              {secondaryCtaText}
              <ChevronRight className="h-5 w-5 text-slate-500" />
            </button>
          </div>

          {/* Tech Specs */}
          {techSpecs && techSpecs.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-500 font-mono uppercase tracking-wider">
              {techSpecs.map((spec, index) => (
                <span key={index} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-slate-600" />
                  {spec}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="w-full flex justify-center mb-16 animate-fade-in-up delay-400">
          <CrisisSimulator />
        </div>
      </div>
    </section>
  );
}
