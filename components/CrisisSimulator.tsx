"use client";

import React, { useState } from "react";
import { AlertTriangle, FileText, Share2, ArrowRight } from "lucide-react";

type CrisisState = "initial" | "legislation" | "leak";

const CrisisSimulator = () => {
  const [step, setStep] = useState<CrisisState>("initial");

  const renderContent = () => {
    switch (step) {
      case "initial":
        return (
          <div className="flex flex-col items-center text-center space-y-6 animate-fade-in">
            <div className="flex items-center gap-2 text-amber-500 animate-pulse">
              <AlertTriangle className="h-6 w-6" />
              <span className="font-mono text-sm tracking-widest uppercase">Domestic Policy Simulator</span>
            </div>
            <h2 className="text-2xl font-bold text-white max-w-md">
              The Speaker of the House is threatening a government shutdown.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <button
                onClick={() => setStep("legislation")}
                className="flex-1 group relative flex flex-col items-center justify-center gap-1 rounded-lg border border-slate-700 bg-slate-800/50 px-6 py-4 transition-all hover:border-blue-500/50 hover:bg-slate-800 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="flex items-center gap-2 text-blue-400">
                  <FileText className="h-5 w-5" />
                  <span className="text-sm font-bold uppercase tracking-tight">Action: Veto Bill</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest group-hover:text-blue-400/70 transition-colors">
                  [ Simulate Unit 2 ]
                </span>
              </button>
              
              <button
                onClick={() => setStep("leak")}
                className="flex-1 group relative flex flex-col items-center justify-center gap-1 rounded-lg border border-slate-700 bg-slate-800/50 px-6 py-4 transition-all hover:border-red-500/50 hover:bg-slate-800 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="flex items-center gap-2 text-red-400">
                  <Share2 className="h-5 w-5" />
                  <span className="text-sm font-bold uppercase tracking-tight">Action: Leak Memo</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest group-hover:text-red-400/70 transition-colors">
                  [ Simulate Unit 5 ]
                </span>
              </button>
            </div>
          </div>
        );
      case "legislation":
      case "leak":
        const isLegislation = step === "legislation";
        return (
          <div className="flex flex-col items-center text-center space-y-6 animate-fade-in">
            <div className={`rounded-full ${isLegislation ? 'bg-slate-800' : 'bg-alert-red/10'} p-3`}>
              {isLegislation ? (
                <FileText className="h-8 w-8 text-slate-400" />
              ) : (
                <AlertTriangle className="h-8 w-8 text-alert-red" />
              )}
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white uppercase italic tracking-tighter">
                {isLegislation ? 'GRIDLOCK.' : 'SCANDAL.'}
              </h2>
              <p className="text-slate-400 text-lg">
                {isLegislation ? 'The Speaker of the House just blocked your Budget Veto.' : 'Your Supreme Court nominee just leaked a controversial opinion.'}
              </p>
              <p className="text-terminal-green/80 font-mono text-xs uppercase tracking-widest mt-4">
                {isLegislation ? '(AP Unit 2: Interactions Among Branches)' : '(AP Unit 5: Political Participation)'}
              </p>
            </div>
            <button
              onClick={() => window.location.href = '#demo'}
              className="mt-4 flex items-center gap-2 rounded-full bg-terminal-green px-8 py-3 text-slate-900 font-bold transition-all hover:bg-terminal-green/90 transform hover:scale-105 active:scale-95"
            >
              See How Your Students Handle The Pressure
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        );
    }
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-terminal-green/20 via-slate-800 to-alert-red/20 opacity-50 blur-xl" />
      <div className="relative rounded-xl border border-slate-700 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-terminal-green/50 to-transparent" />
        {renderContent()}
      </div>
    </div>
  );
};

export default CrisisSimulator;