'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertOctagon, RefreshCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('SPA Runtime Error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="space-y-6"
      >
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-alert-red/10 border border-alert-red/20">
            <AlertOctagon className="h-12 w-12 text-alert-red" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-3xl font-serif font-bold text-white uppercase italic tracking-tighter">
            System Failure
          </h2>
          <p className="text-slate-400 max-w-md mx-auto">
            The Situation Room has encountered a critical uplink error. 
            Standard protocols have been suspended.
          </p>
        </div>

        <button
          onClick={() => reset()}
          className="flex items-center gap-2 mx-auto rounded-lg bg-brand-blue px-8 py-3 text-sm font-bold text-white transition-all hover:bg-blue-700 shadow-lg shadow-brand-blue/20"
        >
          <RefreshCcw className="h-4 w-4" />
          Attempt Reconnection
        </button>
      </motion.div>
    </div>
  );
}

