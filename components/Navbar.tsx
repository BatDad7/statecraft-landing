"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2 shrink-0">
          <div className="relative h-10 w-40">
            <Image 
              src="/brand-logo.png" 
              alt="Statecraft Logo" 
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        <div className="flex items-center space-x-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="https://go.oncehub.com/Statecraft-Demo"
              className="rounded-md border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm font-bold text-slate-300 transition-colors hover:bg-slate-700 hover:text-white block"
            >
              Book Demo
            </Link>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
