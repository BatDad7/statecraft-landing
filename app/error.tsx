'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 px-4 text-center">
      <div className="rounded-2xl border border-alert-red/30 bg-slate-950 p-8 shadow-2xl">
        <div className="mb-4 flex justify-center text-alert-red animate-pulse">
          <AlertTriangle className="h-12 w-12" />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-white tracking-tight">System Malfunction Detected</h2>
        <p className="mb-6 text-slate-400 max-w-md">
          The Situation Room has encountered a critical error. Our engineers have been notified.
        </p>
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          className="inline-flex items-center gap-2 rounded-lg bg-alert-red px-6 py-3 text-sm font-bold text-white transition-all hover:bg-alert-red/90"
        >
          <RefreshCcw className="h-4 w-4" />
          Reboot System
        </button>
      </div>
    </div>
  );
}

