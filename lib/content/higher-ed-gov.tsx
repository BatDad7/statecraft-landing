import React from 'react';
import { ClipboardCheck, ShieldCheck, Database } from "lucide-react";

export const higherEdContent = {
  hero: {
    badgeText: 'Department Level Deployment',
    mainHeading: <>Move Beyond <span className="text-brand-blue">Theory</span>. Simulate International Relations.</>,
    subHeading: 'The auto-graded simulation for Intro to IR and Comparative Politics. Replace 20 hours of TA grading with immersive active learning.',
    primaryCtaText: 'VIEW SYLLABUS INTEGRATION',
    secondaryCtaText: 'Watch Gameplay',
    techSpecs: ['Zero Grading Load', 'LMS Integration', 'Research Ready']
  },
  trustBar: {
    label: "Adopting Departments Include:",
    logos: ["Harvard", "Georgetown", "Yale", "Stanford", "LSE"]
  },
  featureGrid: {
    title: <>Research-Grade <span className="text-brand-blue">Simulation</span></>,
    subtitle: "Replace 20 hours of grading with automated data generation.",
    features: [
      { icon: ClipboardCheck, title: "Zero Grading Load", text: "Objective scores calculated automatically based on treaty adherence." },
      { icon: ShieldCheck, title: "Academic Integrity", text: "Unique simulation seeds for every semester prevent test-bank cheating." },
      { icon: Database, title: "Data Export", text: "Download raw CSV logs for quantitative analysis assignments." }
    ]
  },
  testimonials: [
    { 
      institution: 'Georgetown', 
      quote: 'The Game Theory application is unparalleled. My students finally grasp the Prisoner\'s Dilemma in a visceral way.' 
    },
    { 
      institution: 'UT Austin', 
      quote: 'I used to spend weeks grading participation. Now Statecraft handles the metrics, and I focus on the debrief.' 
    }
  ]
};
