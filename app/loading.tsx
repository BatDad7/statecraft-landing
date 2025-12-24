import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center space-y-4">
      <div className="relative flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-brand-blue animate-spin" />
        <div className="absolute inset-0 rounded-full border-2 border-brand-blue/20" />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-blue animate-pulse">
          Establishing Secure Uplink
        </span>
        <span className="text-[8px] font-mono text-slate-600 mt-2">
          DECISION_LOG_SYNC: IN_PROGRESS
        </span>
      </div>
    </div>
  );
}

