"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronDown, Download, FileCheck, Target } from "lucide-react";

type UnitKey = "Unit 1" | "Unit 2" | "Unit 3" | "Unit 4" | "Unit 5";

interface MissionData {
  title: string;
  scenario: string;
  hook: string;
  apConcept: string;
  assetName: string;
}

const unitData: Record<UnitKey, MissionData> = {
  "Unit 1": {
    title: "AP Unit 1: Foundations of American Democracy",
    scenario: "The Constitutional Convention",
    hook: "Students navigate the Great Compromise and the Federalist/Anti-Federalist debates in a real-time negotiation chamber.",
    apConcept: "Federalism (Topic 1.7), Separation of Powers (Topic 1.5)",
    assetName: "Unit 1 Foundations Syllabus.pdf",
  },
  "Unit 2": {
    title: "AP Unit 2: Interactions Among Branches",
    scenario: "The Federal Budget Crisis",
    hook: "Students take roles as Committee Chairs and Agency Heads. They experience gridlock, veto points, and the power of the purse firsthand.",
    apConcept: "Checks and Balances (Topic 2.1), Presidential Power (Topic 2.6)",
    assetName: "Unit 2 Simulation Syllabus.pdf",
  },
  "Unit 3": {
    title: "AP Unit 3: Civil Liberties and Civil Rights",
    scenario: "The Landmark Trial",
    hook: "A high-stakes judicial simulation where students argue precedent in a simulated Supreme Court hearing.",
    apConcept: "Bill of Rights (Topic 3.1), Selective Incorporation (Topic 3.2)",
    assetName: "Unit 3 Civil Liberties Syllabus.pdf",
  },
  "Unit 4": {
    title: "AP Unit 4: American Political Ideologies",
    scenario: "The Healthcare Reform Bill",
    hook: "Force students to trade off between fiscal conservatism and social welfare. Watch them realize why compromise is so difficult.",
    apConcept: "Ideologies of Government (Topic 4.1), Policy Making (Topic 4.5)",
    assetName: "Ideology Grading Rubric.pdf",
  },
  "Unit 5": {
    title: "AP Unit 5: Political Participation",
    scenario: "The Midterm Election Simulator",
    hook: "Students must manage media leaks, polling data, and special interest groups while trying to pass legislation.",
    apConcept: "Media as a Linkage Institution (Topic 5.13), Interest Groups (Topic 5.6)",
    assetName: "Media Bias Lesson Plan.pdf",
  },
};

const StandardsMapper = () => {
  const [selectedUnit, setSelectedUnit] = useState<UnitKey | "">("");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#unit-1") setSelectedUnit("Unit 1");
      if (hash === "#unit-2") setSelectedUnit("Unit 2");
      if (hash === "#unit-3") setSelectedUnit("Unit 3");
      if (hash === "#unit-4") setSelectedUnit("Unit 4");
      if (hash === "#unit-5") setSelectedUnit("Unit 5");
    };

    // Check on initial load
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <section id="standards-mapper" className="py-24 md:py-32 px-4 bg-slate-900/50 relative overflow-hidden">
      {/* Decorative lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-brand-blue/50 to-transparent" />
      
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-serif font-black uppercase italic">
            AP Gov <span className="text-brand-blue">Standards Mapper</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Align your curriculum with immersive simulations in seconds.</p>
        </div>

        <div className="relative z-10 space-y-8">
          {/* Unit Tabs Selector */}
          <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
            {(Object.keys(unitData) as UnitKey[]).map((unit) => {
              const isSelected = selectedUnit === unit;
              return (
                <motion.button
                  key={unit}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedUnit(unit)}
                  className={`
                    px-6 py-3 rounded-full font-bold transition-all duration-300 whitespace-nowrap
                    ${isSelected 
                      ? "bg-blue-600 text-white shadow-lg scale-105 ring-2 ring-blue-400 ring-offset-2 ring-offset-slate-900" 
                      : "bg-slate-800/50 text-slate-400 border border-slate-700 hover:bg-slate-700 hover:text-white"
                    }
                  `}
                >
                  {unit}
                </motion.button>
              );
            })}
          </div>

          {/* Dynamic Mission Brief Card */}
          <AnimatePresence mode="wait">
            {selectedUnit && (
              <motion.div
                key={selectedUnit}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  boxShadow: [
                    "0 0 0 rgba(37,99,235,0)",
                    "0 0 30px rgba(37,99,235,0.3)",
                    "0 0 15px rgba(37,99,235,0.1)"
                  ]
                }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-w-2xl mx-auto"
              >
                <div className="relative rounded-2xl border-2 border-brand-blue/50 bg-slate-950 p-8 overflow-hidden">
                  {/* Card Background Pattern */}
                  <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#2563eb_1px,transparent_1px)] bg-[size:20px_20px]" />
                  
                  <div className="relative space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20">
                        <Target className="h-4 w-4 text-brand-blue" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-blue">
                          Mission Brief: {selectedUnit}
                        </span>
                      </div>
                      <BookOpen className="h-5 w-5 text-slate-600" />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-2xl font-serif font-bold text-white tracking-tight">
                        {unitData[selectedUnit].title}
                      </h3>
                      
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-800">
                          <p className="text-[10px] font-bold uppercase text-slate-500 mb-1">Scenario</p>
                          <p className="text-brand-blue font-bold">{unitData[selectedUnit].scenario}</p>
                        </div>
                        <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-800">
                          <p className="text-[10px] font-bold uppercase text-slate-500 mb-1">AP Concept</p>
                          <p className="text-brand-blue font-bold">{unitData[selectedUnit].apConcept}</p>
                        </div>
                      </div>

                      <div className="bg-slate-900/40 p-5 rounded-lg border border-slate-800/50">
                        <p className="text-[10px] font-bold uppercase text-slate-500 mb-2">The Hook</p>
                        <p className="text-slate-300 text-sm leading-relaxed italic">
                          &quot;{unitData[selectedUnit].hook}&quot;
                        </p>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.open('https://highschool.statecraftsims.com/contact-us/', '_blank')}
                      className="w-full mt-4 flex items-center justify-center gap-3 rounded-lg bg-brand-blue px-6 py-4 text-sm font-bold text-white transition-all hover:bg-blue-700 shadow-lg shadow-brand-blue/10"
                    >
                      <Download className="h-4 w-4" />
                      Request {unitData[selectedUnit].assetName}
                    </motion.button>
                    
                    <div className="flex justify-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
                      <div className="flex items-center gap-1">
                        <FileCheck className="h-3 w-3" />
                        College Board Aligned
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default StandardsMapper;

