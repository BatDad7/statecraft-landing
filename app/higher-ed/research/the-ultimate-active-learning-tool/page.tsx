import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Ultimate Active Learning Tool | Statecraft Higher Ed",
  description: "Case study: plagiarism-resistant, simulation-based assessment and engagement.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-900 text-white px-4 py-20">
      <div className="max-w-3xl mx-auto">
        <Link href="/higher-ed" className="text-sm text-slate-400 hover:text-white">
          ← Back to Higher Ed
        </Link>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight">
          The Ultimate Active Learning Tool
        </h1>
        <p className="mt-4 text-slate-300">
          Placeholder page for the case study link. Next step: drop in the PDF or full write-up and cite the original source.
        </p>
      </div>
    </main>
  );
}


