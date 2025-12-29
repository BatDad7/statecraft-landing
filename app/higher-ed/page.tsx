import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Statecraft Higher Ed: AI-Proof Political Science Assessment Platform",
  description:
    "The only simulation-based assessment engine that evaluates real-time critical thinking, secures academic integrity against AI, and maps to Rational Choice Theory.",
};

export default function HigherEdHubPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Cleaner dark look: soften/hide the tactical grid behind this page */}
      <div className="fixed inset-0 bg-slate-900 z-[-10]" />
      <div className="fixed inset-0 bg-slate-900/95 z-[-9]" />

      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="max-w-3xl">
          <div className="font-mono text-xs uppercase tracking-widest text-emerald-500/80">
            /// HIGHER EDUCATION
          </div>
          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight">
            AI-Proof Assessment for Political Science
          </h1>
          <p className="mt-5 text-lg text-slate-300">
            Statecraft Higher Ed is a simulation-based assessment engine for real-time critical thinking, academic integrity, and theory-to-practice learning outcomes.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="/higher-ed/gov"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-6 py-3 font-bold text-slate-950 hover:bg-emerald-500 transition-colors"
            >
              View Gov 2.0 Landing
            </a>
            <a
              href="/assets/Statecraft_HigherEd_Syllabus_2025.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900/60 px-6 py-3 font-bold text-white hover:bg-slate-800 transition-colors"
            >
              Download Sample Syllabus
            </a>
          </div>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-slate-700/50 bg-slate-900/70 backdrop-blur-md p-6">
            <div className="font-mono text-xs uppercase tracking-widest text-slate-400">
              Integrity
            </div>
            <p className="mt-2 text-slate-300 text-sm">
              Evaluate authentic reasoning and interaction—hard to outsource to generative AI.
            </p>
          </div>
          <div className="rounded-xl border border-slate-700/50 bg-slate-900/70 backdrop-blur-md p-6">
            <div className="font-mono text-xs uppercase tracking-widest text-slate-400">
              Measurement
            </div>
            <p className="mt-2 text-slate-300 text-sm">
              Capture decision logs, negotiation behavior, coalition moves, and theory-aligned outcomes.
            </p>
          </div>
          <div className="rounded-xl border border-slate-700/50 bg-slate-900/70 backdrop-blur-md p-6">
            <div className="font-mono text-xs uppercase tracking-widest text-slate-400">
              Deployment
            </div>
            <p className="mt-2 text-slate-300 text-sm">
              Works in the browser. Fits large sections. Designed for faculty workflows.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


