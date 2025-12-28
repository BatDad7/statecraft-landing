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
  testimonials: {
    heading: <>From <span className="text-brand-blue">Lecture Hall</span> to Situation Room.</>,
    items: [
      {
        quote: "My students used to sleep through the Realism lecture. Now they are applying it. It bridges the gap between theory and practice perfectly.",
        author: "Dr. Sarah Miller",
        title: "Senior Lecturer",
        institution: "International Relations",
        highlight: true
      },
      {
        quote: "The auto-grading is a lifesaver for large sections. I get specific data points on student negotiation performance without grading 300 papers.",
        author: "Prof. James Chen",
        title: "Dept. of Political Science",
        institution: "State University"
      }
    ]
  }
};
