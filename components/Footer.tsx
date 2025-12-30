import clsx from "clsx";

export default function Footer({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const isLight = variant === "light";

  return (
    <footer
      className={clsx(
        "border-t",
        isLight ? "border-slate-200 bg-slate-50" : "border-slate-800 bg-slate-950/40"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div
              className={clsx(
                "font-mono text-xs uppercase tracking-widest",
                isLight ? "text-slate-500" : "text-slate-500"
              )}
            >
              Statecraft Simulations
            </div>
            <p className={clsx("text-sm max-w-xl", isLight ? "text-slate-600" : "text-slate-400")}>
              Simulation-based assessment for political science. Built for engagement, academic integrity, and teacher/professor workflows.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              className={clsx(
                "text-sm transition-colors",
                isLight ? "text-slate-600 hover:text-blue-700" : "text-slate-400 hover:text-white"
              )}
              href="mailto:help@statecraftsims.com"
            >
              Support
            </a>
            <a
              className={clsx(
                "text-sm transition-colors",
                isLight ? "text-slate-600 hover:text-blue-700" : "text-slate-400 hover:text-white"
              )}
              href="https://www.statecraftsims.com"
              target="_blank"
              rel="noreferrer"
            >
              Main Site
            </a>
          </div>
        </div>

        <div
          className={clsx(
            "mt-8 pt-6 border-t flex flex-col md:flex-row md:items-center md:justify-between gap-3",
            isLight ? "border-slate-200" : "border-slate-800"
          )}
        >
          <div className={clsx("text-xs", isLight ? "text-slate-500" : "text-slate-600")}>
            © {new Date().getFullYear()} Statecraft Simulations. All rights reserved.
          </div>
          <div className={clsx("text-xs font-mono uppercase tracking-widest", isLight ? "text-slate-500" : "text-slate-600")}>
            // Secure Connection Active
          </div>
        </div>
      </div>
    </footer>
  );
}


