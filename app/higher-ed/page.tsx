import type { Metadata } from "next";

import Footer from "@/components/Footer";
import HigherEdHero from "@/components/higher-ed/Hero";
import TrustBar from "@/components/higher-ed/TrustBar";
import SyllabusMap from "@/components/higher-ed/SyllabusMap";
import PedagogicalEfficacy from "@/components/PedagogicalEfficacy";
import PolicyBrief from "@/components/dynamic/PolicyBrief";
import CourseSchema from "@/components/seo/CourseSchema";
import { redis } from "@/lib/redis";

export const metadata: Metadata = {
  title: "Statecraft Higher Ed: AI-Proof Political Science Assessment Platform",
  description:
    "The only simulation-based assessment engine that evaluates real-time critical thinking, secures academic integrity against AI, and maps to Rational Choice Theory.",
};

export const revalidate = 60;

type DailyBrief = {
  headline: string;
  activity: string;
  topic_tag: string;
  date?: string;
  generated_at?: string;
};

const fallbackCollegeBrief: DailyBrief = {
  headline: "Policy Brief Pending",
  activity:
    "Secure connection established. Waiting for today’s department briefing upload.",
  topic_tag: "COLLEGE_GOV_STANDBY",
};

async function getCollegeGovBrief(): Promise<DailyBrief> {
  try {
    if (!process.env.UPSTASH_REDIS_REST_URL) return fallbackCollegeBrief;
    const raw = await redis.get("daily_brief:college-gov");
    if (!raw) return fallbackCollegeBrief;

    if (typeof raw === "string") {
      try {
        return JSON.parse(raw) as DailyBrief;
      } catch {
        return fallbackCollegeBrief;
      }
    }

    return raw as DailyBrief;
  } catch {
    return fallbackCollegeBrief;
  }
}

export default async function HigherEdHubPage() {
  const brief = await getCollegeGovBrief();

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

        <PolicyBrief
          topic={brief.headline}
          analysis={brief.activity}
          discussion={`Discussion: How does “${brief.topic_tag}” relate to the current news cycle?`}
          source="Statecraft Intelligence (College Gov)"
          theme="light"
        />

        <TrustBar variant="light" />
        <SyllabusMap variant="light" />
        <PedagogicalEfficacy variant="light" />
      </main>

      <Footer variant="light" />
    </div>
  );
}
