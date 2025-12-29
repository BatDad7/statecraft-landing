import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Outsourcing Learning | Statecraft Higher Ed",
  description: "Research summary: instruction outsourced to simulation with no negative outcome change.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-900 text-white px-4 py-20">
      <div className="max-w-3xl mx-auto">
        <Link href="/higher-ed" className="text-sm text-slate-400 hover:text-white">
          ← Back to Higher Ed
        </Link>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight">
          Outsourcing Learning
        </h1>
        <p className="mt-4 text-slate-300">
          Placeholder page for the paper link. Next step: add the paper link/PDF and a short abstract + citation details.
        </p>
      </div>
    </main>
  );
}


