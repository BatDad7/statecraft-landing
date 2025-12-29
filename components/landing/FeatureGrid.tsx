"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export interface Feature {
  icon: ReactNode;
  title: string;
  text: string;
}

export interface FeatureGridProps {
  title: ReactNode;
  subtitle: string;
  features: Feature[];
  theme?: 'dark' | 'light';
}

function applyHigherEdTerminology(input: string): string {
  // Guardrails for higher-ed only (professor-facing).
  return input
    .replace(/\bGame Master Dashboard\b/gi, 'Instructor Analytics Suite')
    .replace(/\bGame Master\b/gi, 'Instructional Director')
    .replace(/\bAP Prep\b/gi, 'Theory Application')
    .replace(/\bHigh School\b/gi, 'Undergraduate Research')
    .replace(/\bFun\b/gi, 'Engagement')
    .replace(/\bGame\b/gi, 'Simulation');
}

export default function FeatureGrid({ title, subtitle, features, theme = 'dark' }: FeatureGridProps) {
  const pathname = usePathname();
  const isHigherEdRoute = pathname?.startsWith('/higher-ed');
  const isLight = theme === 'light';

  const safeSubtitle = isHigherEdRoute ? applyHigherEdTerminology(subtitle) : subtitle;
  const safeFeatures = isHigherEdRoute
    ? features.map((f) => ({
        ...f,
        title: applyHigherEdTerminology(f.title),
        text: applyHigherEdTerminology(f.text),
      }))
    : features;

  return (
    <section className={`py-24 relative overflow-hidden ${isLight ? 'bg-white' : 'bg-slate-900'}`}>
      {/* Grid Pattern Background */}
      <div className={`absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.05] ${isLight ? 'hidden' : 'block'}`} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className={`text-3xl md:text-4xl font-extrabold uppercase mb-4 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {title}
          </h2>
          <p className={`text-xl ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            {safeSubtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {safeFeatures.map((feature, i) => (
            <div key={i} className={`p-8 rounded-xl border transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl ${
              isLight 
                ? 'bg-slate-50 border-slate-200 hover:border-blue-200' 
                : 'bg-slate-800/50 border-slate-700 hover:border-brand-blue/30'
            }`}>
              <div className={`mb-6 inline-block p-3 rounded-lg border transition-colors ${
                isLight 
                  ? 'bg-white border-slate-200 group-hover:border-blue-200' 
                  : 'bg-slate-900 border-slate-700 group-hover:border-brand-blue/30'
              }`}>
                {feature.icon}
              </div>
              <h3 className={`text-xl font-bold font-serif mb-3 ${isLight ? 'text-slate-900' : 'text-white'}`}>{feature.title}</h3>
              <p className={`${isLight ? 'text-slate-600' : 'text-slate-400'} leading-relaxed`}>{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
