"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-terminal-green" />
          <span className="text-xl font-bold tracking-tighter uppercase italic">
            Statecraft
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/demo"
              className="rounded-md bg-terminal-green px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-terminal-green/90 block"
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
