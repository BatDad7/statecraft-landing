import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HigherEdHero from "@/components/higher-ed/Hero";
import SyllabusMap from "@/components/higher-ed/SyllabusMap";
import PedagogicalEfficacy from "@/components/higher-ed/PedagogicalEfficacy";
import NewsTicker from "@/components/NewsTicker";
import CourseSchema from "@/components/seo/CourseSchema";

export const metadata: Metadata = {
  title: "Statecraft Higher Ed: AI-Proof Political Science Assessment Platform",
  description:
    "The only simulation-based assessment engine that evaluates real-time critical thinking, secures academic integrity against AI, and maps to Rational Choice Theory.",
};

export default function HigherEdHubPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <CourseSchema
        courseName="Introduction to American Government: Simulation-Integrated"
        description="Undergraduate political science course utilizing Statecraft Gov 2.0 for rational choice theory application."
        provider="Statecraft Simulations"
        educationalLevel={["Higher Education", "Undergraduate"]}
      />

      {/* Cleaner dark look: soften/hide the tactical grid behind this page */}
      <div className="fixed inset-0 bg-slate-900 z-[-10]" />
      <div className="fixed inset-0 bg-slate-900/95 z-[-9]" />

      <NewsTicker />
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-16">
        <HigherEdHero />
        <SyllabusMap />
        <PedagogicalEfficacy />
      </main>

      <Footer />
    </div>
  );
}


