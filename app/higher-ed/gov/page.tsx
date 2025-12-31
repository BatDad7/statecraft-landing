import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Statecraft Gov 2.0 | Higher Ed",
  description:
    "Gov 2.0 landing page for Higher Education. Use /higher-ed for the canonical hub experience.",
};

export default function HigherEdGov() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-xs font-mono uppercase tracking-widest text-slate-500">
          Gov 2.0
        </div>
        <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight font-serif">
          Higher Ed hub moved
        </h1>
        <p className="mt-4 text-slate-700">
          The canonical Gov 2.0 experience now lives at{" "}
          <span className="font-mono">/higher-ed</span> (served at{" "}
          <span className="font-mono">gov.statecraftsims.com/</span>).
        </p>
        <div className="mt-8">
          <Link
            href="/higher-ed"
            className="inline-flex items-center justify-center rounded-lg bg-blue-700 px-5 py-3 font-bold text-white hover:bg-blue-800 transition-colors"
          >
            Go to Gov 2.0 hub →
          </Link>
        </div>
      </div>
    </main>
  );
}
