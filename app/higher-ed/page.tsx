import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HigherEdHero from "@/components/higher-ed/Hero";

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
        <HigherEdHero />
      </main>

      <Footer />
    </div>
  );
}


