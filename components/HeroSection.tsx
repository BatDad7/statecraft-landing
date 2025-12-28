"use client";

import dynamic from 'next/dynamic';

const HeroSectionClient = dynamic(() => import('./HeroSectionClient'), { 
  ssr: false,
  loading: () => <div className="min-h-[calc(100vh-64px)]" /> // Prevent layout shift
});

export default function HeroSection(props: any) {
  return <HeroSectionClient {...props} />;
}
