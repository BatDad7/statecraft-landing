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
  theme?: 'dark' | 'light';
}

export default function Testimonials({ heading, items, theme = 'dark' }: TestimonialsProps) {
  const isLight = theme === 'light';

  return (
    <section className={`py-24 relative overflow-hidden ${isLight ? 'bg-white' : 'bg-slate-950'}`}>
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center max-w-4xl mx-auto mb-16 ${isLight ? 'text-slate-900' : 'text-white'}`}>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase italic mb-6 leading-tight">
            {heading}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {items.map((item, i) => (
            <div 
              key={i} 
              className={`p-8 rounded-2xl border ${
                isLight 
                  ? item.highlight 
                    ? 'bg-slate-50 border-blue-200 shadow-md' 
                    : 'bg-white border-slate-100'
                  : item.highlight 
                    ? 'bg-slate-900 border-brand-blue/30 shadow-[0_0_30px_rgba(37,99,235,0.1)]' 
                    : 'bg-slate-900/50 border-slate-800'
              }`}
            >
              <Quote className={`h-8 w-8 mb-6 ${
                isLight 
                  ? item.highlight ? 'text-blue-600' : 'text-slate-400'
                  : item.highlight ? 'text-brand-blue' : 'text-slate-600'
              }`} />
              <p className={`text-lg md:text-xl italic mb-8 leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                "{item.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className={`h-10 w-1 rounded-full ${
                  isLight 
                    ? item.highlight ? 'bg-blue-600' : 'bg-slate-300'
                    : item.highlight ? 'bg-brand-blue' : 'bg-slate-700'
                }`} />
                <div>
                  <p className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.author}</p>
                  <p className={`text-sm uppercase tracking-wide ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
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
