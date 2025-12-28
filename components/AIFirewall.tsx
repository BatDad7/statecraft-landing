import React from "react";
import { Bot, User, ShieldAlert, Cpu, Zap } from "lucide-react";

const AIFirewall = () => {
  return (
    <section className="relative py-24 px-4 border-t border-slate-800 bg-slate-900 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4 animate-fade-in-up">
          <div className="flex justify-center items-center gap-2 text-terminal-green">
            <ShieldAlert className="h-5 w-5" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] font-bold">Protocol: Anti-Plagiarism</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight uppercase italic text-white">
            The <span className="text-terminal-green">AI Firewall</span>
          </h2>
          <p className="text-2xl md:text-3xl font-bold text-slate-400 max-w-3xl mx-auto tracking-tight">
            The Essay is Dead. Long Live the Simulation.
          </p>
        </div>

        {/* Split Screen Comparison */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Side: The Problem */}
          <div className="flex flex-col h-full animate-fade-in-left delay-100">
            <div className="mb-4 flex items-center gap-2 px-2">
              <Cpu className="h-4 w-4 text-slate-500" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">What AI Can Fake</span>
            </div>
            <div className="flex-1 rounded-xl border border-slate-800 bg-slate-950 p-6 shadow-inner relative overflow-hidden group hover:border-slate-700 transition-colors">
              <div className="absolute top-0 left-0 w-full h-1 bg-slate-700 opacity-20" />
              
              {/* ChatGPT Interface Mockup */}
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="h-8 w-8 rounded-sm bg-slate-800 flex items-center justify-center shrink-0">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <div className="bg-slate-900 rounded-lg px-4 py-2 border border-slate-800">
                    <p className="text-sm text-slate-300">Explain Madison&apos;s argument in Federalist No. 10.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="h-8 w-8 rounded-sm bg-[#10a37f]/20 flex items-center justify-center shrink-0">
                    <Bot className="h-5 w-5 text-[#10a37f]" />
                  </div>
                  <div className="space-y-4 text-slate-400 font-serif leading-relaxed text-sm">
                    <p className="border-b border-slate-800 pb-2 italic text-slate-500">Generating response...</p>
                    <p>
                      In Federalist No. 10, James Madison argues that a strong central government can guard against the &quot;factionalism&quot; of smaller groups. He defines a faction as a number of citizens, whether amounting to a majority or a minority of the whole, who are united by some common impulse of passion...
                    </p>
                    <p>
                      Madison suggests that in a large republic, there will be so many different factions that no single one will be able to dominate the others. This plurality of interests helps protect the rights of the minority against the tyranny of the majority...
                    </p>
                    <div className="h-4 w-1 bg-slate-600 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Blurred Overlay for 'Boring' effect */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
              <div className="absolute inset-0 border-2 border-red-900/0 group-hover:border-red-900/20 transition-colors pointer-events-none rounded-xl" />
            </div>
          </div>

          {/* Right Side: The Solution */}
          <div className="flex flex-col h-full animate-fade-in-right delay-200">
            <div className="mb-4 flex items-center gap-2 px-2">
              <Zap className="h-4 w-4 text-terminal-green" />
              <span className="text-xs font-bold uppercase tracking-widest text-terminal-green">What AI Can&apos;t Fake</span>
            </div>
            <div className="flex-1 rounded-xl border border-terminal-green/30 bg-black p-6 shadow-[0_0_30px_rgba(34,197,94,0.1)] relative overflow-hidden group hover:shadow-[0_0_40px_rgba(34,197,94,0.2)] transition-shadow">
              <div className="absolute top-0 left-0 w-full h-1 bg-terminal-green/50" />
              
              {/* Diplomatic Cable Mockup */}
              <div className="font-mono text-sm space-y-8">
                <div className="border-b border-terminal-green/20 pb-4">
                  <p className="text-terminal-green/50 text-[10px] mb-1">SECURE CHANNEL: K_STREET_MONITOR</p>
                  <p className="text-terminal-green font-bold">ALERT: INTEREST GROUP ACTIVITY DETECTED</p>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <span className="text-terminal-green/40 shrink-0">14:00</span>
                    <p className="text-terminal-green">
                      <span className="font-bold">[LOBBYIST_ENERGY_COALITION]</span>:
                      Senator, if you vote for this carbon tax, our PAC will primary you. We have 50,000 jobs in your district.
                    </p>
                  </div>

                  <div className="flex gap-4 items-start">
                    <span className="text-terminal-green/40 shrink-0">14:05</span>
                    <p className="text-white bg-terminal-green/10 p-2 rounded border border-terminal-green/20">
                      <span className="font-bold text-terminal-green">[SENATOR_OHIO]</span>:
                      I can't survive a primary challenge. Tell the President I need a carve-out for coal or I'm walking.
                    </p>
                  </div>

                  <div className="flex gap-4 items-start">
                    <span className="text-terminal-green/40 shrink-0">14:07</span>
                    <div className="flex flex-col gap-1">
                      <p className="text-terminal-green/80 italic">
                        SYSTEM: Factional conflict detected. <span className="cursor-help border-b border-dashed border-terminal-green/30" title="Pluralist Theory: The theory that open, multiple, and competing groups can check the asserted power by any one group.">Pluralist Theory</span> in action.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-terminal-green/10 flex justify-between items-center">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-terminal-green/40 rounded-full" />
                    <div className="w-2 h-2 bg-terminal-green/40 rounded-full" />
                  </div>
                  <span className="text-[10px] text-terminal-green/30 tracking-widest uppercase font-sans">Human intelligence required</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Background Decorative Grid Detail */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none -z-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
    </section>
  );
};

export default AIFirewall;