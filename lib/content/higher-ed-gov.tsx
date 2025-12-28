import React from 'react';
import { Landmark, Scale, Users } from "lucide-react";

export const higherEdContent = {
  hero: {
    badgeText: 'Institutional Analysis Engine',
    mainHeading: <>The <span className="text-brand-blue">Living Constitution</span> Simulation.</>,
    subHeading: 'Move beyond the textbook. Let students experience the frustration of gridlock, the complexity of federalism, and the necessity of coalition building.',
    primaryCtaText: 'VIEW SYLLABUS INTEGRATION',
    secondaryCtaText: 'Watch Gameplay',
    techSpecs: ['Zero Grading Load', 'LMS Integration', 'Research Ready']
  },
  trustBar: {
    label: "Adopting Departments Include:",
    logos: ["Harvard", "Georgetown", "Yale", "Stanford", "LSE"]
  },
  featureGrid: {
    title: <>Simulate <span className="text-brand-blue">Institutional Decay</span></>,
    subtitle: "Replace 20 hours of grading with automated data generation.",
    features: [
      { icon: Landmark, title: "Separation of Powers", text: "Students control distinct branches. Ambition creates counter-ambition naturally." },
      { icon: Scale, title: "Judicial Review", text: "The Supreme Court player isn't just a referee—they shape policy through verified case law." },
      { icon: Users, title: "Polarization Metrics", text: "Track how partisan divide impacts legislative output in real-time." }
    ]
  },
  testimonials: {
    heading: <>From <span className="text-brand-blue">Lecture Hall</span> to Floor Vote.</>,
    items: [
      {
        quote: "My students used to sleep through the Federalism lecture. Now they are fighting over block grants vs. categorical grants in the sim. It bridges the gap perfectly.",
        author: "Dr. Sarah Miller",
        title: "Senior Lecturer",
        institution: "American Politics",
        highlight: true
      },
      {
        quote: "The auto-grading is a lifesaver for large sections. I get specific data points on legislative efficiency without grading 300 bills.",
        author: "Prof. James Chen",
        title: "Dept. of Political Science",
        institution: "State University"
      }
    ]
  }
};
