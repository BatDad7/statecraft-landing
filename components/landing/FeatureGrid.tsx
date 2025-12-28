import { ReactNode } from "react";

export interface Feature {
  icon: ReactNode;
  title: string;
  text: string;
}

export interface FeatureGridProps {
  title: ReactNode;
  subtitle: string;
  features: Feature[];
}

export default function FeatureGrid({ title, subtitle, features }: FeatureGridProps) {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.05]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase italic mb-4">
            {title}
          </h2>
          <p className="text-xl text-slate-400">
            {subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 hover:border-brand-blue/30 transition-colors group">
              <div className="mb-6 inline-block p-3 rounded-lg bg-slate-900 border border-slate-700 group-hover:border-brand-blue/30 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
