"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, Lock, ExternalLink, FileText, Calendar, Shield, Map, LifeBuoy, Calculator, GraduationCap } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHigherEd = pathname?.startsWith('/higher-ed');

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
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

          <div className="flex items-center gap-4">
            {/* Desktop "Quick Action" - Book Demo */}
            <Link
              href="https://go.oncehub.com/Statecraft-Demo"
              className="hidden sm:block rounded-md border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm font-bold text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
            >
              Book Demo
            </Link>

            {/* Tactical Hamburger Button */}
            <button
              onClick={toggleMenu}
              className="relative group p-2 rounded-md border border-transparent hover:border-slate-700 hover:bg-slate-800 transition-all"
              aria-label="Open Tactical Menu"
            >
              <Menu className="h-6 w-6 text-slate-300 group-hover:text-terminal-green" />
            </button>
          </div>
        </div>
      </nav>

      {/* Slide-out Drawer / Overlay */}
      <div 
        className={`fixed inset-0 z-[60] bg-slate-900/90 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleMenu}
      >
        <div 
          className={`absolute right-0 top-0 h-full w-80 bg-slate-950 border-l border-slate-800 shadow-2xl transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900">
            <span className="font-mono text-xs uppercase tracking-widest text-slate-500">
              // Classified Access
            </span>
            <button 
              onClick={toggleMenu}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              aria-label="Close Menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="p-6 space-y-2 overflow-y-auto max-h-[calc(100vh-140px)]">
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-4">
              Intelligence Channels
            </div>

            <NavLink href="#daily-intel-brief" icon={FileText} onClick={toggleMenu}>
              Daily Intel Brief
            </NavLink>

            {/* AP Gov Specific Links - Hide on Higher Ed */}
            {!isHigherEd && (
              <>
                <NavLink href="#standards-mapper" icon={Map} onClick={toggleMenu}>
                  Curriculum Map
                </NavLink>

                <NavLink href="#document-docket" icon={FileText} onClick={toggleMenu}>
                  Required Documents
                </NavLink>

                <NavLink href="#ai-firewall" icon={Shield} onClick={toggleMenu}>
                  AI Policy Firewall
                </NavLink>
              </>
            )}

            {/* Higher Ed Specific Links - If we had any, we'd put them here */}
            {isHigherEd && (
              <NavLink href="/assets/Statecraft_Syllabus_2025.pdf" icon={FileText} onClick={toggleMenu}>
                Download Syllabus
              </NavLink>
            )}

            <div className="my-6 border-t border-slate-800" />

            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-4">
              Operations
            </div>

            <NavLink href="https://go.oncehub.com/Statecraft-Demo" icon={Calendar} onClick={toggleMenu}>
              Schedule Demo
            </NavLink>

            <NavLink href="https://statecraftapp-staging.azurewebsites.net/quote" icon={Calculator} onClick={toggleMenu}>
              Get Instant Quote
            </NavLink>

            <NavLink href="mailto:help@statecraftsims.com" icon={LifeBuoy} onClick={toggleMenu}>
              Contact Support
            </NavLink>

            <div className="my-6 border-t border-slate-800" />

            <a 
              href="https://www.statecraftsims.com/login" 
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between w-full p-3 rounded-md bg-terminal-green/10 border border-terminal-green/20 text-terminal-green hover:bg-terminal-green/20 transition-all group mb-2"
            >
              <span className="flex items-center gap-3 font-bold text-sm">
                <Lock className="h-4 w-4" />
                Teacher Login
              </span>
              <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </a>

            <a 
              href="https://www.statecraftsims.com/login" 
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between w-full p-3 rounded-md border border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:border-slate-500 transition-all group"
            >
              <span className="flex items-center gap-3 font-bold text-sm">
                <GraduationCap className="h-4 w-4" />
                Student Login
              </span>
              <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Footer Decoration */}
          <div className="absolute bottom-0 left-0 w-full p-6 border-t border-slate-800 bg-slate-900/50">
            <div className="flex items-center gap-2 opacity-50">
              <div className="h-2 w-2 rounded-full bg-terminal-green animate-pulse" />
              <span className="font-mono text-[10px] uppercase">Secure Connection Active</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const NavLink = ({ href, icon: Icon, children, onClick }: { href: string, icon: any, children: React.ReactNode, onClick: () => void }) => (
  <Link 
    href={href}
    onClick={onClick}
    className="flex items-center gap-3 p-3 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-all group"
  >
    <Icon className="h-4 w-4 text-slate-500 group-hover:text-terminal-green transition-colors" />
    <span className="text-sm font-medium">{children}</span>
  </Link>
);

export default Navbar;