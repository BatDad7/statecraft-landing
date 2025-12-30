"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  FileText,
  Map,
  ShieldCheck,
  User,
  LogIn,
  GraduationCap,
} from "lucide-react";
import clsx from "clsx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const host =
    typeof window !== "undefined" ? window.location.host.toLowerCase() : "";
  const isGovDomain =
    host.includes("gov.statecraftsims.com") || host.includes("gov.statecraftsim.com");
  const isHigherEd = pathname?.startsWith("/higher-ed") || isGovDomain;

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Dynamic Styles
  const navClass = clsx(
    "sticky top-0 z-50 w-full backdrop-blur-md transition-colors duration-300 border-b",
    isHigherEd
      ? "border-slate-200 bg-white/90 text-slate-900"
      : "border-slate-800 bg-slate-900/80 text-white"
  );

  const navLinkClass = clsx(
    "flex items-center gap-3 p-3 rounded-md transition-all group",
    isHigherEd
      ? "text-slate-600 hover:text-blue-700 hover:bg-blue-50"
      : "text-slate-300 hover:text-white hover:bg-slate-800"
  );

  const iconClass = clsx(
    "h-5 w-5 transition-colors",
    isHigherEd
      ? "text-slate-400 group-hover:text-blue-600"
      : "text-slate-500 group-hover:text-terminal-green"
  );

  return (
    <nav className={navClass}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 z-50 relative">
          {isHigherEd ? (
            <>
              <Image
                src="/gov-logo.png"
                alt="Statecraft Gov 2.0"
                width={34}
                height={34}
                priority
                className="h-[34px] w-[34px] rounded-full"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-black tracking-tight">Statecraft</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-700">
                  Gov 2.0 Higher Ed
                </span>
              </div>
            </>
          ) : (
            <>
              <Image
                src="/logo.png"
                alt="Statecraft AP Gov"
                width={34}
                height={34}
                priority
                className="h-[34px] w-[34px] rounded-full"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-black tracking-tight uppercase italic">
                  Statecraft
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-terminal-green">
                  AP GOV • Situation Room
                </span>
              </div>
            </>
          )}
        </Link>

        {/* Desktop CTA & Hamburger */}
        <div className="flex items-center gap-4 z-50 relative">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:block"
          >
            <Link
              href="/demo"
              className={clsx(
                "rounded-md px-4 py-2 text-sm font-semibold transition-colors block shadow-lg",
                isHigherEd
                  ? "bg-blue-700 text-white hover:bg-blue-600 shadow-blue-900/10"
                  : "bg-terminal-green text-slate-900 hover:bg-terminal-green/90 shadow-terminal-green/20"
              )}
            >
              Book Demo
            </Link>
          </motion.div>

          <button
            onClick={toggleMenu}
            className={clsx(
              "p-2 rounded-md transition-colors",
              isHigherEd
                ? "text-slate-600 hover:bg-slate-100"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            )}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className={clsx(
                "absolute inset-x-0 top-16 h-[calc(100vh-64px)] overflow-y-auto border-b shadow-2xl backdrop-blur-xl",
                isHigherEd
                  ? "bg-white/95 border-slate-200"
                  : "bg-slate-900/95 border-slate-800"
              )}
            >
              <div className="p-6 space-y-6 max-w-lg mx-auto">
                <div>
                  <div
                    className={clsx(
                      "text-[10px] font-bold uppercase tracking-widest mb-4",
                      isHigherEd ? "text-slate-500" : "text-slate-600"
                    )}
                  >
                    {isHigherEd ? "Higher Ed Resources" : "Intelligence Channels"}
                  </div>
                  <div className="space-y-2">
                    {!isHigherEd ? (
                      <>
                        <Link href="/#daily-intel-brief" className={navLinkClass}>
                          <FileText className={iconClass} />
                          <span className="font-medium">Daily Intel Brief</span>
                        </Link>
                        <Link href="/#standards-mapper" className={navLinkClass}>
                          <Map className={iconClass} />
                          <span className="font-medium">Curriculum Map</span>
                        </Link>
                        <Link href="/#ai-firewall" className={navLinkClass}>
                          <ShieldCheck className={iconClass} />
                          <span className="font-medium">AI Policy Firewall</span>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/assets/Statecraft_HigherEd_Syllabus_2025.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={navLinkClass}
                        >
                          <FileText className={iconClass} />
                          <span className="font-medium">Download Syllabus (PDF)</span>
                        </Link>
                        <Link
                          href="/higher-ed#pedagogical-efficacy"
                          className={navLinkClass}
                        >
                          <GraduationCap className={iconClass} />
                          <span className="font-medium">Pedagogical Efficacy</span>
                        </Link>
                      </>
                    )}
                  </div>
                </div>

                <div
                  className={clsx(
                    "border-t my-6",
                    isHigherEd ? "border-slate-100" : "border-slate-800"
                  )}
                />

                {/* Operations */}
                <div>
                  <div
                    className={clsx(
                      "text-[10px] font-bold uppercase tracking-widest mb-4",
                      isHigherEd ? "text-slate-500" : "text-slate-600"
                    )}
                  >
                    Operations
                  </div>
                  <div className="space-y-2">
                    <Link
                      href="https://www.statecraftsims.com/login"
                      className={navLinkClass}
                    >
                      <User className={iconClass} />
                      <span className="font-medium">Instructor Login</span>
                    </Link>
                    <Link
                      href="https://www.statecraftsims.com/login"
                      className={navLinkClass}
                    >
                      <LogIn className={iconClass} />
                      <span className="font-medium">Student Login</span>
                    </Link>
                  </div>
                </div>

                {/* Mobile CTA */}
                <div className="pt-6 sm:hidden">
                  <Link
                    href="/demo"
                    className={clsx(
                      "flex w-full items-center justify-center rounded-lg px-4 py-4 text-base font-bold shadow-lg transition-all active:scale-95",
                      isHigherEd
                        ? "bg-blue-700 text-white hover:bg-blue-600 shadow-blue-900/20"
                        : "bg-terminal-green text-slate-900 hover:bg-terminal-green/90 shadow-terminal-green/20"
                    )}
                  >
                    Book Instructor Demo
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
