"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareCode, X, Bot, Sparkles } from "lucide-react";

type TAVertical = "ap-gov" | "college-gov";

const StatecraftTA = ({
  vertical = "ap-gov",
}: {
  vertical?: TAVertical;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Use production by default. Override in Vercel (or locally) with NEXT_PUBLIC_TA_BASE_URL
  // e.g. "https://statecraftapp.azurewebsites.net" (prod) or "https://statecraftapp-staging.azurewebsites.net" (staging)
  const baseUrl =
    (process.env.NEXT_PUBLIC_TA_BASE_URL || "https://statecraftapp.azurewebsites.net").replace(
      /\/+$/,
      ""
    );
  // Standalone deep links supported by the TA app.
  // - AP Gov: `/ap-gov`
  // - American Gov: `/am-gov` (selection page today; can be made auto-select in the TA app)
  const assistantUrl =
    vertical === "ap-gov" ? `${baseUrl}/ap-gov` : `${baseUrl}/am-gov`;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleAssistant = () => {
    if (isMobile) {
      window.open(assistantUrl, "_blank");
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="mb-4 mr-2 rounded-xl bg-slate-800 border border-slate-700 p-3 shadow-2xl backdrop-blur-md whitespace-nowrap"
          >
            <p className="text-xs text-slate-300 font-medium">
              Launch Syllabus Architect
            </p>
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-slate-800 border-r border-b border-slate-700 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal / Sidebar */}
      <AnimatePresence>
        {isOpen && !isMobile && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            className="mb-4 w-[400px] h-[80vh] flex flex-col rounded-2xl border border-brand-blue/30 bg-slate-900/95 shadow-[0_0_40px_rgba(37,99,235,0.2)] backdrop-blur-xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-800/50">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-brand-blue" />
                  <span className="font-serif font-bold text-white tracking-tight">Statecraft AI | Course Architect</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">
                  {vertical === "college-gov"
                    ? "Tip: if you see the sim chooser, click “American Government” to start"
                    : "Ask me to align Statecraft with AP Gov Unit 4"}
                </span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                aria-label="Close Assistant"
                className="p-1 rounded-full hover:bg-slate-700 transition-colors text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Iframe Content */}
            <div className="flex-1 w-full bg-slate-900 relative">
              <iframe 
                src={assistantUrl}
                className="w-full h-full border-none"
                title="Statecraft AI Assistant"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button (FAB) */}
      <motion.button
        onClick={toggleAssistant}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle Syllabus Architect Assistant"
        className={`group relative flex items-center justify-center h-16 w-16 rounded-full bg-slate-900 border transition-all duration-300 shadow-2xl ${
          isOpen 
            ? 'border-brand-blue shadow-[0_0_20px_rgba(37,99,235,0.4)]' 
            : 'border-brand-blue/30 hover:border-brand-blue shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]'
        }`}
      >
        <div className="relative flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="h-8 w-8 text-brand-blue" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                className="flex items-center justify-center"
              >
                <MessageSquareCode className="h-8 w-8 text-brand-blue group-hover:text-brand-blue transition-colors" />
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -top-1 -right-1"
                >
                  <Sparkles className="h-4 w-4 text-brand-blue" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    </div>
  );
};

export default StatecraftTA;

