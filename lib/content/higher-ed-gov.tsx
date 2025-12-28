import React from 'react';
import { Bot, DollarSign, Scale, ScrollText, Users, Clock } from "lucide-react";

export const higherEdContent = {
  hero: {
    badgeText: 'Institutional Analysis Engine',
    mainHeading: <>The <span className="text-brand-blue">Living Constitution</span> Simulation.</>,
    subHeading: 'A 4-period simulation covering 50+ topics including AI Regulation, Federal Budget, and Civil Liberties. Flexible timing from one day to several weeks per period.',
    primaryCtaText: 'VIEW SYLLABUS INTEGRATION',
    secondaryCtaText: 'Watch Walkthrough',
    techSpecs: ['4 Periods + Tutorial', '50+ Topics', 'Flexible Timing']
  },
  trustBar: {
    label: "Adopting Departments Include:",
    logos: ["Harvard", "Georgetown", "Yale", "Stanford", "LSE"]
  },
  featureGrid: {
    title: <>Core <span className="text-brand-blue">Policy Modules</span></>,
    subtitle: "Structured into four quarters covering critical modern governance challenges.",
    features: [
      { 
        icon: Bot, 
        title: "AI Regulation", 
        text: "Students grapple with emerging issues surrounding artificial intelligence, balancing innovation with safety and regulation." 
      },
      { 
        icon: DollarSign, 
        title: "Federal Budget", 
        text: "Navigate the fiscal policy minefield. Students must pass a budget while managing interest groups and reelection pressures." 
      },
      { 
        icon: Scale, 
        title: "Civil Liberties vs. Security", 
        text: "Balance the tension between protecting individual rights and ensuring national security in high-stakes scenarios." 
      }
    ]
  },
  testimonials: {
    heading: <>From <span className="text-brand-blue">Lecture Hall</span> to Floor Vote.</>,
    items: [
      {
        quote: "The 'Period 0' tutorial week was a game changer. My students entered the main simulation confident and ready to negotiate.",
        author: "Dr. Sarah Miller",
        title: "Senior Lecturer",
        institution: "American Politics",
        highlight: true
      },
      {
        quote: "I use the Debrief Presentation as 25% of their grade. The insights they share about legislative gridlock are profound.",
        author: "Prof. James Chen",
        title: "Dept. of Political Science",
        institution: "State University"
      }
    ]
  }
};
