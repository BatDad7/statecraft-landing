import React from 'react';
import { Landmark, Scale, LineChart, ScrollText, Users, DollarSign, Bot } from "lucide-react";

export const higherEdContent = {
  hero: {
    variant: 'academic' as const, // Force academic style
    badgeText: "Institutional Analysis Engine",
    mainHeading: <>Don't Just Teach the Constitution. <span className="text-amber-500">Stress-Test It.</span></>,
    subHeading: "The only simulation that forces students to navigate the friction of Separation of Powers, Federalism, and Partisan Gridlock in real-time.",
    primaryCtaText: "View Syllabus Integration",
    secondaryCtaText: "Watch Walkthrough",
    techSpecs: ["Role-Based Scenarios", "LMS Integration", "FERPA Compliant", "Zero Grading Load"],
  },
  trustBar: {
    label: "Deployed in Departments at:",
    logos: ["Harvard", "Georgetown", "Yale", "Stanford", "LSE"],
  },
  dailyIntel: {
    topic: "Administrative Law",
    headline: "SCOTUS Overturns Chevron: Agency Power Curtailed",
    brief: "In a 6-3 ruling, the Court has ended the 40-year precedent of deferring to agency interpretations of ambiguous statutes. Simulation Update: Students playing 'Agency Heads' will now face increased judicial scrutiny on rulemaking scores.",
    actionItem: "Assign the 'Judicial Review' Module.",
    source: "Analysis via Gemini 1.5 Pro"
  },
  featureGrid: {
    title: <>From <span className="text-amber-500">Textbook</span> to Committee Floor</>,
    subtitle: "Move beyond theory. Give them the roles, the incentives, and the gridlock.",
    features: [
      {
        icon: <Landmark className="h-8 w-8 text-sky-400" />,
        title: "Legislative Gridlock",
        text: "Students don't just pass bills; they face the filibuster, committee gatekeeping, and the whip count. Efficiency is the enemy."
      },
      {
        icon: <Scale className="h-8 w-8 text-amber-500" />,
        title: "Judicial Review",
        text: "The Supreme Court player isn't a referee—they shape policy by ruling on the constitutionality of every student-passed act."
      },
      {
        icon: <LineChart className="h-8 w-8 text-emerald-500" />,
        title: "Public Opinion Tracking",
        text: "Real-time polling data forces Representatives to balance their conscience against the 'median voter' in their simulated district."
      }
    ]
  },
  testimonials: {
    heading: <>Academic Rigor Meets <span className="text-amber-500">Political Reality.</span></>,
    items: [
      {
        quote: "I use the Debrief Presentation as 25% of their grade. The insights they share about the difficulty of coalition building are profound.",
        author: "Prof. James Chen",
        title: "Dept. of Political Science",
        institution: "State University"
      },
      {
        quote: "It solves the 'Free Rider' problem in group work. The simulation incentives force every student to lobby, trade, and vote to survive.",
        author: "Dr. Sarah Miller",
        title: "Senior Lecturer, American Politics",
        institution: "Research University"
      }
    ]
  }
};
