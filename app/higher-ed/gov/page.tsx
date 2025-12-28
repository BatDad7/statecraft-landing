import type { Metadata } from 'next';
import HeroSection from "@/components/landing/HeroSection";
import TrustBar from "@/components/landing/TrustBar";
import FeatureGrid from "@/components/landing/FeatureGrid";
import Testimonials from "@/components/landing/Testimonials";
import CourseSchema from "@/components/seo/CourseSchema";
import PolicyBrief from "@/components/dynamic/PolicyBrief";
import { higherEdContent } from "@/lib/content/higher-ed-gov";
import { redis } from '@/lib/redis';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Statecraft for Political Science Departments',
  description: 'The auto-graded simulation for Intro to IR and Comparative Politics.',
};

interface DailyBrief {
  headline: string;
  activity: string;
  topic_tag: string;
  date?: string;
}

async function getDailyBrief(): Promise<DailyBrief | null> {
  try {
    if (!process.env.UPSTASH_REDIS_REST_URL) return null;
    const brief = await redis.get<DailyBrief>('daily_brief:college-gov');
    return brief || null;
  } catch (error) {
    console.error('Failed to fetch daily brief:', error);
    return null;
  }
}

export default async function HigherEdGov() {
  const brief = await getDailyBrief();

  // Prefer dynamic brief, fallback to static content config
  const policyData = brief ? {
    topic: brief.headline,
    analysis: brief.activity,
    discussion: `Discussion: How does '${brief.topic_tag}' relate to the current news cycle?`,
    source: "Statecraft Intelligence: Live Feed"
  } : {
    topic: higherEdContent.dailyIntel.headline,
    analysis: higherEdContent.dailyIntel.brief,
    discussion: higherEdContent.dailyIntel.actionItem,
    source: higherEdContent.dailyIntel.source
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <CourseSchema 
        courseName="Statecraft: International Relations & Comparative Politics"
        description="A semester-long immersive simulation for higher education political science departments. Covers realism, liberalism, and constructivism."
      />
      
      <HeroSection 
        {...higherEdContent.hero} 
        primaryCtaLink="/syllabus/higher-ed"
        secondaryCtaLink="https://www.youtube.com/watch?v=gameplay"
      />

      <PolicyBrief 
        topic={policyData.topic}
        analysis={policyData.analysis}
        discussion={policyData.discussion}
        source={policyData.source}
      />
      
      <TrustBar {...higherEdContent.trustBar} />
      
      <FeatureGrid {...higherEdContent.featureGrid} />
      
      <Testimonials {...higherEdContent.testimonials} />
    </div>
  );
}
