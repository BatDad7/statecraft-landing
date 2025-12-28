"use client";

import React from "react";
import { Check, FileText } from "lucide-react";

const DOCUMENTS = [
  "Federalist No. 10",
  "Brutus No. 1",
  "The Declaration of Independence",
  "Articles of Confederation",
  "The Constitution",
  "Federalist No. 51",
  "Letter from Birmingham Jail",
  "Federalist No. 70",
  "Federalist No. 78",
];

const DocumentDocket = () => {
  return (
    <section className="py-12 border-b border-slate-800 bg-slate-950/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-8 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-amber-500/60">
              Classified Archive
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-serif font-black uppercase italic text-slate-500 tracking-wider">
            Required Foundational Documents
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
          {DOCUMENTS.map((doc, index) => (
            <div
              key={doc}
              className={`group relative flex items-center gap-2 px-4 py-2 bg-[#f0e6d2] text-[#4a4036] rounded-sm shadow-md border-t border-white/50 border-b-2 border-[#d4c5b0] cursor-default hover:scale-105 hover:-rotate-1 transition-transform duration-300 animate-fade-in-up`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Checkmark Badge */}
              <div className="absolute -top-2 -right-2 bg-terminal-green text-slate-900 rounded-full p-0.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <Check className="h-3 w-3" />
              </div>
              
              <FileText className="h-4 w-4 opacity-50" />
              <span className="font-mono text-xs font-bold uppercase tracking-tight">
                {doc}
              </span>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-6 animate-fade-in-up delay-500">
           <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terminal-green/10 border border-terminal-green/20 text-[10px] font-bold text-terminal-green uppercase tracking-widest">
              <Check className="h-3 w-3" />
              Integrated Curriculum Asset // 100% Coverage Verified
           </span>
        </div>
      </div>
    </section>
  );
};

export default DocumentDocket;