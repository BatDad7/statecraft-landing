import type { Metadata } from 'next';
import HeroSection from "@/components/landing/HeroSection";
import TrustBar from "@/components/landing/TrustBar";
import FeatureGrid from "@/components/landing/FeatureGrid";
import { higherEdContent } from "@/lib/content/higher-ed-gov";

export const metadata: Metadata = {
  title: 'Statecraft for Political Science Departments',
  description: 'The auto-graded simulation for Intro to IR and Comparative Politics.',
};

export default function HigherEdGov() {
  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <HeroSection 
        {...higherEdContent.hero} 
        primaryCtaLink="/syllabus/higher-ed"
        secondaryCtaLink="https://www.youtube.com/watch?v=gameplay"
      />
      
      <TrustBar {...higherEdContent.trustBar} />
      
      <FeatureGrid {...higherEdContent.featureGrid} />
      
      {/* 
        Phase 4: Implement Testimonials based on higherEdContent 
        <Testimonials data={higherEdContent.testimonials} />
      */}
    </div>
  );
}
