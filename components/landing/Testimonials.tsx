import { ReactNode } from "react";
import { Quote } from "lucide-react";

export interface Testimonial {
  quote: string;
  author: string;
  title: string;
  institution: string;
  highlight?: boolean;
}

export interface TestimonialsProps {
  heading: ReactNode;
  items: Testimonial[];
}

export default function Testimonials({ heading, items }: TestimonialsProps) {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase italic mb-6 leading-tight">
            {heading}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {items.map((item, i) => (
            <div 
              key={i} 
              className={`p-8 rounded-2xl border ${item.highlight ? 'bg-slate-900 border-brand-blue/30 shadow-[0_0_30px_rgba(37,99,235,0.1)]' : 'bg-slate-900/50 border-slate-800'}`}
            >
              <Quote className={`h-8 w-8 mb-6 ${item.highlight ? 'text-brand-blue' : 'text-slate-600'}`} />
              <p className="text-lg md:text-xl text-slate-300 italic mb-8 leading-relaxed">
                "{item.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className={`h-10 w-1 rounded-full ${item.highlight ? 'bg-brand-blue' : 'bg-slate-700'}`} />
                <div>
                  <p className="font-bold text-white">{item.author}</p>
                  <p className="text-sm text-slate-500 uppercase tracking-wide">
                    {item.title}, {item.institution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

