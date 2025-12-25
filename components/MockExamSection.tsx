"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Download, FileCheck } from "lucide-react";

const MockExamSection = () => {
  return (
    <section className="py-20 bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
          
          {/* Text Side */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest text-blue-500">
                Assessment Integation
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
              Prepare for the Exam. <br />
              <span className="text-slate-500 italic">By Living the Content.</span>
            </h2>
            
            <p className="text-slate-400 text-lg leading-relaxed">
              Don't just memorize definitions. Statecraft simulations generate data that directly mirrors AP Gov FRQ scenarios. 
              Our "Mock 5A" assessment helps you benchmark student readiness against College Board standards.
            </p>
            
            <ul className="space-y-4 pt-4">
              <li className="flex items-center gap-3">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-500/20 text-blue-500">
                  <Check className="h-4 w-4" />
                </div>
                <span className="text-slate-300 font-medium">Aligned with Unit 5: Political Participation</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-500/20 text-blue-500">
                  <Check className="h-4 w-4" />
                </div>
                <span className="text-slate-300 font-medium">Auto-Graded FRQ Practice</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-500/20 text-blue-500">
                  <Check className="h-4 w-4" />
                </div>
                <span className="text-slate-300 font-medium">Real-time Data Analysis</span>
              </li>
            </ul>

            <div className="pt-8">
              <button 
                className="group flex items-center gap-3 px-6 py-3 rounded-md bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700 hover:border-blue-500/50"
                onClick={() => window.open('/assets/mock-exam-5a.png', '_blank')}
              >
                <FileCheck className="h-5 w-5 text-blue-500 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-white uppercase tracking-wide text-sm">
                  View Sample Assessment
                </span>
                <Download className="h-4 w-4 text-slate-500 group-hover:text-white transition-colors ml-auto" />
              </button>
            </div>
          </div>

          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 relative group"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000" />
            
            <div className="relative rounded-lg overflow-hidden border border-slate-700 bg-slate-800 shadow-2xl">
              {/* Browser Header Mockup */}
              <div className="h-8 bg-slate-900 border-b border-slate-700 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/50" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/50" />
                  <div className="h-3 w-3 rounded-full bg-green-500/50" />
                </div>
                <div className="ml-4 px-3 py-1 bg-slate-800 rounded text-[10px] text-slate-500 font-mono flex-1 text-center">
                  statecraft-sims.edu/assessments/mock-5a
                </div>
              </div>
              
              {/* Actual Image */}
              <div className="relative aspect-[4/3]">
                <Image 
                  src="/assets/mock-exam-5a.png"
                  alt="Mock Exam 5A Preview"
                  fill
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur border border-blue-500/30 px-4 py-2 rounded-md shadow-xl">
                  <p className="text-xs text-blue-400 font-black uppercase tracking-widest">
                    Assessment Preview
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default MockExamSection;

