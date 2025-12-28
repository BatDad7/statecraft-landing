import type { Metadata } from 'next';
import HeroSection from "@/components/landing/HeroSection";
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
        onCtaPrimary={() => window.open('/syllabus/higher-ed', '_blank')}
        onCtaSecondary={() => window.open('https://www.youtube.com/watch?v=gameplay', '_blank')}
      />
      
      {/* 
        Phase 4: Implement Feature Grid and Testimonials based on higherEdContent 
        <FeatureGrid features={higherEdContent.features} />
        <Testimonials data={higherEdContent.testimonials} />
      */}
    </div>
  );
}
