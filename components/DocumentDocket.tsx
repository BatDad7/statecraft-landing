"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileCheck } from "lucide-react";

const DocumentDocket = () => {
  const documents = [
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

  return (
    <section className="py-16 md:py-24 bg-slate-950 border-y border-slate-800 relative overflow-hidden">
      {/* Background "STAMP" effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
        <span className="text-[20vw] font-black uppercase italic border-[1vw] border-alert-red px-[5vw] text-alert-red rotate-12">
          Declassified
        </span>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-serif font-black uppercase italic tracking-tighter text-white"
          >
            CLASSIFIED ARCHIVE: <span className="text-amber-500">REQUIRED FOUNDATIONAL DOCUMENTS</span>
          </motion.h2>
          <p className="text-slate-500 text-xs font-black uppercase tracking-[0.3em] mt-2">
            INTEGRATED CURRICULUM ASSET // 100% COVERAGE VERIFIED
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
          {documents.map((doc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ rotate: [-1, 1, -1], transition: { repeat: Infinity, duration: 2 } }}
              className="group relative flex items-center gap-2 bg-amber-50 px-4 py-3 rounded-sm border-b-4 border-r-4 border-amber-200/50 shadow-lg transform -rotate-1 hover:-translate-y-1 transition-all"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/p6-static.png')] opacity-10 pointer-events-none" />
              <FileCheck className="h-4 w-4 text-amber-800" />
              <span className="text-sm font-black uppercase tracking-tight text-amber-900 font-mono">
                {doc}
              </span>
              
              {/* "Top Secret" stamp style checkmark */}
              <div className="ml-1 bg-alert-red/10 text-alert-red border border-alert-red/30 px-1 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter rotate-12">
                Cleared
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DocumentDocket;

