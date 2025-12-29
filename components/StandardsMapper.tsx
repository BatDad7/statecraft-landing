"use client";

import React, { useState } from "react";
import { BookOpen, ChevronDown, Download, FileCheck, Target } from "lucide-react";

type UnitKey = "Unit 1" | "Unit 2" | "Unit 3" | "Unit 4";

interface MissionData {
  title: string;
  simName: string;
  keyConcept: string;
  description: string;
}

const unitData: Record<UnitKey, MissionData> = {
  "Unit 1": {
    title: "Foundations of American Democracy",
    simName: "The Constitutional Convention",
    keyConcept: "Federalism & Power Distribution",
    description: "Students navigate the Great Compromise and the Federalist/Anti-Federalist debates in a real-time negotiation chamber.",
  },
  "Unit 2": {
    title: "Interactions Among Branches of Government",
    simName: "The Legislative Gauntlet",
    keyConcept: "Bicameralism & Presidential Veto",
    description: "Experience the friction of policymaking. Students must shepherd a bill through committees while managing executive pressure.",
  },
  "Unit 3": {
    title: "Civil Liberties and Civil Rights",
    simName: "The Landmark Trial",
    keyConcept: "Bill of Rights & Selective Incorporation",
    description: "A high-stakes judicial simulation where students argue precedent in a simulated Supreme Court hearing.",
  },
  "Unit 4": {
    title: "American Political Ideologies and Beliefs",
    simName: "The Budget Crisis",
    keyConcept: "Fiscal Policy & Ideology",
    description: "Balance the federal budget while staying true to constituent ideologies. Every dollar spent is a political choice.",
  },
};

const StandardsMapper = () => {
  const [selectedUnit, setSelectedUnit] = useState<UnitKey | "">("");

  return (
    <section className="py-24 px-4 bg-slate-900/50 relative overflow-hidden">
      {/* Decorative lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-terminal-green/50 to-transparent" />
      
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase italic mb-4">
            AP Gov <span className="text-terminal-green">Standards Mapper</span>
          </h2>
          <p className="text-slate-400">Align your curriculum with immersive simulations in seconds.</p>
        </div>

        <div className="relative z-10 space-y-8 animate-fade-in-up delay-100">
          {/* Dropdown Menu */}
          <div className="max-w-md mx-auto relative">
            <label className="block text-xs font-bold uppercase tracking-[0.2em] text-terminal-green/70 mb-2 px-1">
              Which Unit are you teaching next?
            </label>
            <div className="relative group">
              <select
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value as UnitKey)}
                className="w-full appearance-none bg-slate-800 border border-slate-700 text-white py-4 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-terminal-green/50 transition-all cursor-pointer font-bold"
              >
                <option value="" disabled>Select an AP Unit...</option>
                <option value="Unit 1">Unit 1: Foundations</option>
                <option value="Unit 2">Unit 2: Branches</option>
                <option value="Unit 3">Unit 3: Civil Liberties</option>
                <option value="Unit 4">Unit 4: Ideologies</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 group-hover:text-terminal-green transition-colors">
                <ChevronDown className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Dynamic Mission Brief Card */}
          {selectedUnit && (
            <div className="max-w-2xl mx-auto animate-fade-in-up">
              <div className="relative rounded-2xl border border-terminal-green/30 bg-slate-950 p-8 shadow-[0_0_40px_rgba(34,197,94,0.05)] overflow-hidden">
                {/* Card Background Pattern */}
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#22c55e_1px,transparent_1px)] bg-[size:20px_20px]" />
                
                <div className="relative space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-terminal-green/10 border border-terminal-green/20">
                      <Target className="h-4 w-4 text-terminal-green" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-terminal-green">
                        Mission Brief: {selectedUnit}
                      </span>
                    </div>
                    <BookOpen className="h-5 w-5 text-slate-600" />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      {unitData[selectedUnit].title}
                    </h3>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-800">
                        <p className="text-[10px] font-bold uppercase text-slate-500 mb-1">Recommended Sim</p>
                        <p className="text-terminal-green font-bold">{unitData[selectedUnit].simName}</p>
                      </div>
                      <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-800">
                        <p className="text-[10px] font-bold uppercase text-slate-500 mb-1">Key Concept</p>
                        <p className="text-white font-bold">{unitData[selectedUnit].keyConcept}</p>
                      </div>
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed italic">
                      &quot;{unitData[selectedUnit].description}&quot;
                    </p>
                  </div>

                  <a
                    href="/assets/Statecraft_Syllabus_2025.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-4 flex items-center justify-center gap-3 rounded-lg bg-terminal-green px-6 py-4 text-sm font-bold text-slate-900 transition-all hover:bg-terminal-green/90 shadow-lg shadow-terminal-green/10 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Download className="h-4 w-4" />
                    Download 2025 Syllabus (PDF)
                  </a>
                  
                  <div className="flex justify-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
                    <div className="flex items-center gap-1">
                      <FileCheck className="h-3 w-3" />
                      College Board Aligned
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default StandardsMapper;