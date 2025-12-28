interface TrustBarProps {
  logos: string[];
  label: string;
  theme?: 'dark' | 'light';
}

export default function TrustBar({ logos, label, theme = 'dark' }: TrustBarProps) {
  const isLight = theme === 'light';

  return (
    <section className={`py-10 border-b ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
      <div className="container mx-auto px-4 text-center">
        <p className={`text-sm font-bold uppercase tracking-widest mb-6 ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
          {label}
        </p>
        <div className={`flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500`}>
          {logos.map((logo, i) => (
            <span key={i} className={`text-xl md:text-2xl font-serif font-bold ${isLight ? 'text-slate-400 hover:text-slate-600' : 'text-slate-400'}`}>
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
