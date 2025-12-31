import React from "react";
import clsx from "clsx";

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

export default function TrustBar({
  variant = "dark",
}: {
  variant?: "dark" | "light";
}) {
  const isLight = variant === "light";

  return (
    <section
      aria-label="Verified Partners"
      className={clsx("py-14 border-t", isLight ? "border-slate-200" : "border-slate-800/50")}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div
              className={clsx(
                "text-[10px] font-bold uppercase tracking-widest",
                isLight ? "text-slate-600" : "text-slate-400"
              )}
            >
              Verified Partners
            </div>
            <h2
              className={clsx(
                "mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight",
                isLight ? "text-slate-900" : "text-white"
              )}
            >
              Statecraft is used in 450+ Universities
            </h2>
          </div>
          <div className={clsx("text-sm max-w-xl", isLight ? "text-slate-600" : "text-slate-400")}>
            Verified partners shown below are confirmed via active users, documented case studies, and faculty super users.
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {VERIFIED_PARTNERS.map((p) => (
            <div
              key={p.name}
              className={clsx(
                "grayscale hover:grayscale-0 transition-all duration-200 rounded-xl border p-5",
                isLight
                  ? "border-slate-200 bg-white"
                  : "border-slate-700/50 bg-slate-900/70 backdrop-blur-sm"
              )}
            >
              <div
                className={clsx(
                  "text-lg font-black tracking-tight",
                  isLight ? "text-slate-900" : "text-slate-200"
                )}
              >
                {p.name}
              </div>
              <div className={clsx("mt-2 text-xs font-mono", isLight ? "text-slate-600" : "text-slate-400")}>
                {p.note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
