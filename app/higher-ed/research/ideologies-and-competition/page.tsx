import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ideologies and Competition | Statecraft Higher Ed",
  description: "Research summary: simulation constraints and confirmation bias disruption.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-900 text-white px-4 py-20">
      <div className="max-w-3xl mx-auto">
        <Link href="/higher-ed" className="text-sm text-slate-400 hover:text-white">
          ← Back to Higher Ed
        </Link>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight">
          Ideologies and Competition
        </h1>
        <p className="mt-4 text-slate-300">
          Placeholder page for the article link. Next step: add the journal citation, DOI/link, and a concise summary of findings.
        </p>
      </div>
    </main>
  );
}


