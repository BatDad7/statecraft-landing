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
        topic={brief?.headline || "Executive Orders vs. Legislation"}
        analysis={brief?.activity || "Analyzing the constitutional friction between Article II powers and Congressional oversight in the modern era."}
        discussion={brief ? "How does this event illustrate the concept of Imperial Presidency?" : "Discuss: Does the War Powers Resolution actually constrain the President?"}
        source={brief ? "Statecraft Intelligence: College Gov Feed" : "Mock Analysis"}
      />
      
      <TrustBar {...higherEdContent.trustBar} />
      
      <FeatureGrid {...higherEdContent.featureGrid} />
      
      <Testimonials {...higherEdContent.testimonials} />
    </div>
  );
}
