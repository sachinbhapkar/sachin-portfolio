"use client";

import { useState } from "react";
import SpringBootLoader from "@/components/SpringBootLoader";
import Terminal from "@/components/Terminal";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <SpringBootLoader onComplete={() => setBooted(true)} />
      <main
        className={`relative min-h-screen bg-[#0f172a] overflow-hidden transition-opacity duration-500 ${
          booted ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Global background elements */}
        <div className="fixed inset-0 bg-grid pointer-events-none z-0" />
        <div className="fixed top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none z-0" />

        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Contact />

        {/* Footer */}
        <footer className="relative z-10 py-8 text-center border-t border-slate-800">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Sachin Bhapkar. Built with Next.js &
            Tailwind CSS.
          </p>
        </footer>

        {/* Floating Terminal */}
        <Terminal />
      </main>
    </>
  );
}
