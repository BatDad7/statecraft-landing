"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo.png" 
            alt="Statecraft Simulations" 
            width={64} 
            height={64} 
            className="h-16 w-16 object-contain"
            priority
          />
        </Link>

        <div className="flex items-center space-x-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="https://highschool.statecraftsims.com/us-gov-demo/"
              target="_blank"
              className="rounded-md bg-brand-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 block"
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
