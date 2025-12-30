import type { Metadata } from "next";

import Footer from "@/components/Footer";
import HigherEdHero from "@/components/higher-ed/Hero";
import TrustBar from "@/components/higher-ed/TrustBar";
import SyllabusMap from "@/components/higher-ed/SyllabusMap";
import PedagogicalEfficacy from "@/components/PedagogicalEfficacy";
import CourseSchema from "@/components/seo/CourseSchema";

export const metadata: Metadata = {
  title: "Statecraft Higher Ed: AI-Proof Political Science Assessment Platform",
  description:
    "The only simulation-based assessment engine that evaluates real-time critical thinking, secures academic integrity against AI, and maps to Rational Choice Theory.",
};

export default function HigherEdHubPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <CourseSchema
        courseName="Introduction to American Government: Simulation-Integrated"
        description="Undergraduate political science course utilizing Statecraft Gov 2.0 for rational choice theory application."
        provider="Statecraft Simulations"
        educationalLevel={["Higher Education", "Undergraduate"]}
      />

      <main className="max-w-6xl mx-auto px-4 py-16">
        <HigherEdHero variant="light" />
        <TrustBar variant="light" />
        <SyllabusMap variant="light" />
        <PedagogicalEfficacy variant="light" />
      </main>

      <Footer variant="light" />
    </div>
  );
}
