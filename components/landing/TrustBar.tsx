export default function TrustBar({ logos, label }: { logos: string[], label: string }) {
  return (
    <section className="py-10 bg-slate-950 border-b border-slate-800">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">
          {label}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {logos.map((logo, i) => (
            <span key={i} className="text-xl md:text-2xl font-serif font-bold text-slate-400">
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

