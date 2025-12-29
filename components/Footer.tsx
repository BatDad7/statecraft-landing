export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/40">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="font-mono text-xs uppercase tracking-widest text-slate-500">
              Statecraft Simulations
            </div>
            <p className="text-sm text-slate-400 max-w-xl">
              Simulation-based assessment for political science. Built for engagement, academic integrity, and teacher/professor workflows.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              className="text-sm text-slate-400 hover:text-white transition-colors"
              href="mailto:help@statecraftsims.com"
            >
              Support
            </a>
            <a
              className="text-sm text-slate-400 hover:text-white transition-colors"
              href="https://www.statecraftsims.com"
              target="_blank"
              rel="noreferrer"
            >
              Main Site
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="text-xs text-slate-600">
            © {new Date().getFullYear()} Statecraft Simulations. All rights reserved.
          </div>
          <div className="text-xs font-mono text-slate-600 uppercase tracking-widest">
            // Secure Connection Active
          </div>
        </div>
      </div>
    </footer>
  );
}


