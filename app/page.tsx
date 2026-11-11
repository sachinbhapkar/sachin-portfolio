"use client";

import { useState } from "react";
import SpringBootLoader from "@/components/SpringBootLoader";
import Terminal from "@/components/Terminal";
import TerminalBar from "@/components/TerminalBar";
import TerminalHero from "@/components/sections/TerminalHero";
import TerminalExperience from "@/components/sections/TerminalExperience";
import TerminalSkills from "@/components/sections/TerminalSkills";
import TerminalEducation from "@/components/sections/TerminalEducation";
import TerminalContact from "@/components/sections/TerminalContact";

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <SpringBootLoader onComplete={() => setBooted(true)} />
      <div
        className={`min-h-screen bg-[#0d1117] transition-opacity duration-700 ${
          booted ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Subtle scanlines overlay */}
        <div className="fixed inset-0 scanlines pointer-events-none z-10" />

        <TerminalBar />

        {/* Main scrollable terminal content */}
        <main className="relative z-20 pt-20 pb-16">
          <TerminalHero />
          <TerminalExperience />
          <TerminalSkills />
          <TerminalEducation />
          <TerminalContact />

          {/* Footer */}
          <footer className="mt-8 py-6 px-4 md:px-8 max-w-5xl mx-auto border-t border-slate-800/60 font-mono text-xs text-slate-700">
            <p>// sachin bhapkar · portfolio v2.0.0 · built with next.js + tailwind</p>
            <p className="mt-1">// © {new Date().getFullYear()} · MIT License · <a href="https://github.com/sachinbhapkar" className="term-link">github.com/sachinbhapkar</a></p>
          </footer>
        </main>

        {/* Floating terminal easter egg */}
        <Terminal />
      </div>
    </>
  );
}
