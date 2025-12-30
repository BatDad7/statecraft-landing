import React from "react";

type Partner = {
  name: string;
  note: string;
};

const VERIFIED_PARTNERS: Partner[] = [
  { name: "University of Minnesota", note: "Active User" },
  { name: "University of Alabama", note: "Featured in “Winter Interim” Case Study" },
  {
    name: "James Madison University",
    note: "Home of Dr. Jonathan Keller (Dept Chair & Super User)",
  },
  { name: "University of Alaska", note: "Featured in “World of Statecraft” Article" },
  { name: "Augusta University", note: "Home of Nadia Jilani-Hyler (Super User)" },
  { name: "University of Georgia", note: "Large active user base" },
];

export default function TrustBar() {
  return (
    <section aria-label="Verified Partners" className="py-14 border-t border-slate-800/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Verified Partners
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Universities using Statecraft in live courses
            </h2>
          </div>
          <div className="text-sm text-slate-400 max-w-xl">
            These partners are verified via active users, documented case studies, and faculty super users.
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {VERIFIED_PARTNERS.map((p) => (
            <div
              key={p.name}
              className="grayscale hover:grayscale-0 transition-all duration-200 rounded-xl border border-slate-700/50 bg-slate-900/70 backdrop-blur-sm p-5"
            >
              <div className="text-lg font-black tracking-tight text-slate-200">
                {p.name}
              </div>
              <div className="mt-2 text-xs font-mono text-slate-400">
                {p.note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
