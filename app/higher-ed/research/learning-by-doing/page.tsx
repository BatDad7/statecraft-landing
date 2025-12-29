import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Learning by Doing (2016) | Statecraft Higher Ed",
  description:
    "Research citation: “Learning by Doing: Using an Online Simulation Game in an International Relations Course” (Jennifer Epley, 2016).",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-900 text-white px-4 py-20">
      <div className="max-w-3xl mx-auto">
        <Link href="/higher-ed" className="text-sm text-slate-400 hover:text-white">
          ← Back to Higher Ed
        </Link>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight">
          Learning by Doing: Using an Online Simulation Game in an International Relations Course (2016)
        </h1>

        <p className="mt-4 text-slate-300">
          Citation: Jennifer Epley (2016).
        </p>

        <a
          className="mt-8 inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900/50 px-5 py-3 font-bold text-white hover:bg-slate-800 transition-colors"
          href="/assets/research/learning-by-doing-abstract.txt"
          download
        >
          Download Research Abstract
        </a>

        <p className="mt-6 text-sm text-slate-400">
          Note: This page is a citation hub. Next step is to add the official publication link/DOI and a verified abstract.
        </p>
      </div>
    </main>
  );
}


