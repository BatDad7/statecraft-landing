"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight, Laptop, Award, Trophy, Users, Globe, PlayCircle } from "lucide-react";
import Image from "next/image";

type TourStep = 1 | 2 | 3 | 4;

interface StepContent {
  unit: string;
  objective: string;
  role: string;
  context: string;
  concept: string;
  buttonText: string;
  successBadge: string;
  image: string;
}

const stepData: Record<TourStep, StepContent> = {
  1: {
    unit: "Unit 5",
    objective: "5.6 Interest Groups",
    role: "Red Interest Group Leader",
    context: "The Nuclear Modernization Bill is stuck in committee. You need to grease the wheels.",
    concept: "Dark Money & Lobbying",
    buttonText: "[EXECUTE] DEPLOY DARK MONEY",
    successBadge: "+2 Votes Gained",
    image: "/tour/step-1-lobby.png",
  },
  2: {
    unit: "Unit 2",
    objective: "2.1 Congress",
    role: "Senate Majority Leader",
    context: "The Minority party is filibustering your bill. You need 60 votes (or a nuclear option).",
    concept: "Filibuster & Cloture",
    buttonText: "[EXECUTE] NUCLEAR OPTION",
    successBadge: "Filibuster Broken",
    image: "/tour/step-2-senate.png",
  },
  3: {
    unit: "Unit 5",
    objective: "5.13 Media",
    role: "Eagle News Editor",
    context: "The public is panicking about the vote. Control the narrative.",
    concept: "Media as Gatekeeper",
    buttonText: '[EXECUTE] PUBLISH EDITORIAL',
    successBadge: "Public Support Rising",
    image: "/tour/step-3-media.png",
  },
  4: {
    unit: "Unit 2",
    objective: "2.6 Presidency",
    role: "U.S. President",
    context: "The bill has reached your desk. It is time to make it law.",
    concept: "Formal Powers (Sign vs Veto)",
    buttonText: "[EXECUTE] SIGN LEGISLATION",
    successBadge: "Bill Signed Into Law",
    image: "/tour/step-4-president.png",
  },
};

const SimTour = () => {
  const [step, setStep] = useState<TourStep>(1);
  const [isInteracting, setIsInteracting] = useState(false);
  const [showFinalCTA, setShowFinalCTA] = useState(false);

  const handleAction = () => {
    setIsInteracting(true);
    setTimeout(() => {
      setIsInteracting(false);
      if (step < 4) {
        setStep((prev) => (prev + 1) as TourStep);
      } else {
        setShowFinalCTA(true);
      }
    }, 1500);
  };

  const currentData = stepData[step];

  return (
    <section className="py-24 md:py-32 px-4 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-3xl md:text-5xl font-serif font-black uppercase italic">
            The <span className="text-brand-blue cursor-help border-b border-dashed border-brand-blue/50" title="Iron Triangle: The three-way relationship between Congress, Government Agencies, and Interest Groups.">Iron Triangle</span> in Action.
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Experience the journey from Lobbyist to Law through immersive gameplay.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Side: Device Frame */}
          <div className="lg:col-span-7 relative">
            <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[300px] md:h-[450px] max-w-[600px]">
              <div className="rounded-lg overflow-hidden h-full bg-slate-950 relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={currentData.image}
                      alt={currentData.role}
                      fill
                      className="object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Success Badge */}
                <AnimatePresence>
                  {isInteracting && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0, y: 20 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 1.2, opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
                    >
                      <div className="bg-brand-blue text-white px-8 py-4 rounded-full font-black text-2xl shadow-[0_0_40px_rgba(37,99,235,0.5)] border-4 border-white flex items-center gap-3">
                        <CheckCircle2 className="h-8 w-8" />
                        {currentData.successBadge}
                      </div>
                      
                      {step === 3 && (
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: 100 }}
                          className="mt-4 flex items-end gap-1 h-[100px]"
                        >
                          {[40, 60, 45, 80, 95].map((h, i) => (
                            <motion.div
                              key={i}
                              initial={{ height: 0 }}
                              animate={{ height: h }}
                              transition={{ delay: i * 0.1 }}
                              className="w-3 bg-terminal-green rounded-t-sm"
                            />
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Final CTA Overlay */}
                <AnimatePresence>
                  {showFinalCTA && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 z-30 bg-brand-blue/95 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center overflow-hidden"
                    >
                      {/* Confetti Effect */}
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(20)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ 
                              top: -20, 
                              left: `${Math.random() * 100}%`,
                              rotate: 0,
                              scale: Math.random() * 0.5 + 0.5
                            }}
                            animate={{ 
                              top: "120%", 
                              rotate: 360,
                              left: `${Math.random() * 100}%`
                            }}
                            transition={{ 
                              duration: Math.random() * 2 + 2, 
                              repeat: Infinity,
                              ease: "linear"
                            }}
                            className={`absolute w-3 h-3 ${['bg-white', 'bg-yellow-400', 'bg-blue-300'][i % 3]}`}
                            style={{ borderRadius: i % 2 === 0 ? '50%' : '0%' }}
                          />
                        ))}
                      </div>

                      <Trophy className="h-20 w-20 text-white mb-6 animate-bounce relative z-10" />
                      <h3 className="text-2xl font-serif font-black text-white uppercase mb-4 leading-tight px-4 relative z-10">
                        Your students just learned Unit 2 & 5 in 30 seconds.
                      </h3>
                      <p className="text-blue-100 text-lg mb-8 max-w-md relative z-10">
                        Imagine what they will learn in a semester.
                      </p>
                      <button
                        onClick={() => window.open('https://us.statecraftsim.com', '_blank')}
                        className="bg-white text-brand-blue px-10 py-4 rounded-lg font-black text-xl hover:bg-blue-50 transition-colors shadow-2xl uppercase tracking-tight relative z-10"
                      >
                        Deploy Simulation Now
                      </button>
                      <button 
                        onClick={() => { setShowFinalCTA(false); setStep(1); }}
                        className="mt-6 text-blue-200 text-sm font-bold uppercase tracking-widest hover:text-white relative z-10"
                      >
                        Replay Tour
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl rounded-t-sm h-[17px] md:h-[21px] max-w-[600px]">
              <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[60px] md:w-[96px] h-[5px] md:h-[8px] bg-gray-800 rounded-b-md" />
            </div>
          </div>

          {/* Right Side: Step Content */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((s) => (
                  <div 
                    key={s}
                    className={`h-2 w-12 rounded-full transition-all duration-500 ${
                      s <= step ? 'bg-brand-blue' : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Step {step} of 4</span>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="bg-brand-blue/10 text-brand-blue px-3 py-1 rounded-full text-xs font-black uppercase tracking-tighter border border-brand-blue/20">
                  {currentData.unit}
                </span>
                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                  🎯 {currentData.objective}
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-brand-blue font-black uppercase tracking-widest text-sm">Role: {currentData.role}</p>
                <h3 className="text-3xl font-bold text-white leading-tight">
                  &quot;{currentData.context}&quot;
                </h3>
              </div>

              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 space-y-3">
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest">AP Concept Link</p>
                <p className="text-white font-bold text-lg">{currentData.concept}</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAction}
                disabled={isInteracting || showFinalCTA}
                className={`w-full group relative flex items-center justify-center gap-3 rounded-lg py-5 text-lg font-black transition-all shadow-xl uppercase tracking-tight ${
                  isInteracting 
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-brand-blue text-white hover:bg-blue-700 hover:shadow-brand-blue/20'
                }`}
              >
                {isInteracting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="h-6 w-6 border-4 border-slate-600 border-t-brand-blue rounded-full"
                  />
                ) : (
                  <>
                    {currentData.buttonText}
                    <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimTour;

