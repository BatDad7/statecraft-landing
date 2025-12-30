import { Settings, Eye, FileText } from "lucide-react";
import AIFirewall from "@/components/AIFirewall";
import StandardsMapper from "@/components/StandardsMapper";
import DocumentDocket from "@/components/DocumentDocket";
import HeroSection from "@/components/landing/HeroSection";
import TrustBar from "@/components/landing/TrustBar";
import FeatureGrid from "@/components/landing/FeatureGrid";
import Testimonials from "@/components/landing/Testimonials";
import IntelBriefing from "@/components/landing/intel-briefing";
import { redis } from '@/lib/redis';
import { parseDailyBrief, type DailyBrief as ParsedBrief } from "@/lib/briefs";
import ImplementationGuide from "@/components/shared/ImplementationGuide";

// Force revalidation every 60 seconds to pick up new Redis content
export const revalidate = 60;

async function getDailyBrief(): Promise<ParsedBrief> {
  try {
    // If env vars are missing (build time), return fallback immediately
    if (!process.env.UPSTASH_REDIS_REST_URL) {
      return fallbackBrief;
    }
    
    const raw = await redis.get("daily_brief");
    return parseDailyBrief(raw, fallbackBrief);
  } catch (error) {
    console.error('Failed to fetch daily brief:', error);
    return fallbackBrief;
  }
}

const fallbackBrief: ParsedBrief = {
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

      {/* Intel Briefing (Dynamic SEO Engine) */}
      <div id="daily-intel-brief">
        <IntelBriefing
          date={displayDate}
          headline={brief.headline}
          activity={brief.activity}
          topicTag={brief.topic_tag}
        />
      </div>

      <ImplementationGuide theme="dark" variant="ap-gov" />

      <TrustBar 
        label="Trusted by 600+ education institutions"
        logos={[
          "Norfolk Academy",
          "Houston ISD",
          "University Liggett School",
          "Bristol Eastern High School (CT)"
        ]}
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

      <div id="testimonials">
        <Testimonials 
        heading={<>Simulated Politics. Real <span className="text-terminal-green">Stakes</span>.</>}
        items={[
          {
            quote: "Statecraft is the best tool I've ever used. Even my most passive students logged in voluntarily outside of class—because the simulation kept creating teachable moments.",
            author: "Rory Simpson",
            title: "Social Studies Teacher",
            institution: "Griswold High School (OR)",
            highlight: true
          },
          {
            quote: "We use Statecraft U.S. Government 2.0 as the culminating assessment for our entire cohort. Students become executive officials, Congress, and media—turning the course into a living government.",
            author: "Scott Pangrazzi",
            title: "Upper School Social Studies Teacher",
            institution: "University Liggett School (MI)"
          },
          {
            quote: "It scaled to hundreds of students in a high-diversity context. They practiced decision-making under constraints and coalition building—exactly what textbooks struggle to measure.",
            author: "John Sigren",
            title: "Government & Public Administration CTE Teacher",
            institution: "Houston ISD (TX)"
          },
          {
            quote: "Very few worlds end up solving the common problems—it shows how difficult it is to put aside your own interest. Students remembered the lessons years later.",
            author: "Tom Lavoie",
            title: "Social Studies Department",
            institution: "Bristol Eastern High School (CT)"
          }
        ]}
        />
      </div>

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
