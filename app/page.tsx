import { Settings, Eye, FileText } from "lucide-react";
import AIFirewall from "@/components/AIFirewall";
import StandardsMapper from "@/components/StandardsMapper";
import DocumentDocket from "@/components/DocumentDocket";
import HeroSection from "@/components/landing/HeroSection";
import TrustBar from "@/components/landing/TrustBar";
import FeatureGrid from "@/components/landing/FeatureGrid";
import Testimonials from "@/components/landing/Testimonials";
import TacticalBriefing from "@/components/TacticalBriefing";
import { redis } from '@/lib/redis';

// Force revalidation every 60 seconds to pick up new Redis content
export const revalidate = 60;

interface DailyBrief {
  headline: string;
  activity: string;
  topic_tag: string;
  date?: string;
}

async function getDailyBrief(): Promise<DailyBrief> {
  try {
    // If env vars are missing (build time), return fallback immediately
    if (!process.env.UPSTASH_REDIS_REST_URL) {
      return fallbackBrief;
    }
    
    const brief = await redis.get<DailyBrief>('daily_brief');
    
    if (!brief) {
      return fallbackBrief;
    }
    
    return brief;
  } catch (error) {
    console.error('Failed to fetch daily brief:', error);
    return fallbackBrief;
  }
}

const fallbackBrief: DailyBrief = {
  headline: "Intelligence Channels Silent",
  activity: "Secure connection established. Waiting for daily briefing upload from HQ.",
  topic_tag: "SYSTEM_STANDBY",
  date: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
};

export default async function Home() {
  const brief = await getDailyBrief();
  
  // Use Brief Date or Current Date
  const displayDate = brief.date || new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Statecraft Simulations",
    "url": "https://statecraftsim.com",
    "mainEntity": {
      "@type": "Article",
      "headline": brief.headline,
      "datePublished": new Date().toISOString(),
      "articleBody": brief.activity,
      "author": {
        "@type": "Organization",
        "name": "Statecraft Intelligence"
      }
    }
  };

  // LearningResource schema (AP Gov landing). Placeholder is intentionally a string so it survives JSON.stringify.
  const learningResourceJsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": "Statecraft AP Gov Simulation",
    "educationalAlignment": "AP United States Government and Politics",
    // TODO: Replace this placeholder with the dynamic headline (e.g., from #dynamic-headline) later.
    "headline": "__DYNAMIC_HEADLINE_PLACEHOLDER__",
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResourceJsonLd) }}
      />
      
      {/* Hero Section Configured for AP Gov */}
      <HeroSection 
        badgeText="College Board Aligned"
        mainHeading={<>Teach <span className="text-terminal-green">Government</span> Through Action.</>}
        subHeading="Stop lecturing about gridlock. Make them live it. The ultimate immersive simulation designed for AP Government classrooms."
        primaryCtaText="AUTHORIZE MISSION ACCESS"
        secondaryCtaText="Watch Trailer"
        secondaryCtaLink="https://www.youtube.com/watch?v=N4y2Wk1R2mU"
        techSpecs={["Browser Based", "No Install", "Chromebook Compatible"]}
      />

      {/* Daily Intelligence Brief Section (Dynamic SEO Engine) */}
      <div id="daily-intel-brief">
        <TacticalBriefing 
          headline={brief.headline}
          date={displayDate}
          activity={brief.activity}
        />
      </div>

      <TrustBar 
        label="Trusted by 500+ High Schools"
        logos={["Lake Travis HS", "Westlake HS", "Austin High", "Bowie HS", "Anderson HS"]}
      />

      <FeatureGrid 
        title={<>Complete <span className="text-terminal-green">Simulation</span> Control</>}
        subtitle="You are the Game Master. We handle the math."
        features={[
          { 
            icon: <Settings className="h-8 w-8 text-brand-blue" />, 
            title: "Custom Scenarios", 
            text: "Adjust difficulty, crisis frequency, and turn length to fit your schedule." 
          },
          { 
            icon: <Eye className="h-8 w-8 text-emerald-500" />, 
            title: "Real-Time Monitoring", 
            text: "Track every trade, treaty, and message in real-time." 
          },
          { 
            icon: <FileText className="h-8 w-8 text-amber-500" />, 
            title: "Instant Assessment", 
            text: "One-click grading reports exportable to any LMS." 
          }
        ]}
      />

      <Testimonials 
        heading={<>Simulated Politics. Real <span className="text-terminal-green">Addiction</span>.</>}
        items={[
          {
            quote: "My students enter class asking 'What's happening in Statecraft today?' It's the first time they've cared about foreign policy.",
            author: "Nadia Jiani-Hyler",
            title: "Social Studies Dept Chair",
            institution: "Westlake High School",
            highlight: true
          },
          {
            quote: "The engagement is night and day compared to textbook lectures. They actually read the textbook to win the game.",
            author: "Sarah Thomas",
            title: "AP Gov Teacher",
            institution: "Austin High School"
          }
        ]}
      />

      {/* AI Firewall Section */}
      <div id="ai-firewall">
        <AIFirewall />
      </div>

      {/* Standards Mapper Section */}
      <div id="standards-mapper">
        <StandardsMapper />
      </div>

      {/* Document Docket Section */}
      <div id="document-docket">
        <DocumentDocket />
      </div>
    </div>
  );
}
