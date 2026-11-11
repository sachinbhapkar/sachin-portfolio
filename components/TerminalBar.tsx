"use client";
import { useState, useEffect } from "react";

const sections = [
  { id: "hero", label: "~" },
  { id: "experience", label: "experience" },
  { id: "skills", label: "skills" },
  { id: "education", label: "education" },
  { id: "contact", label: "contact" },
];

export default function TerminalBar() {
  const [active, setActive] = useState("hero");
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString("en-GB"));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800 bg-[#161b22]/95 backdrop-blur-sm">
      {/* Title row */}
      <div className="flex items-center px-4 py-2 gap-3">
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        {/* Title */}
        <span className="text-slate-500 text-xs flex-1 text-center">
          sachin@portfolio — bash — 120×40
        </span>
        {/* Clock */}
        <span className="text-slate-600 text-xs flex-shrink-0 font-mono">{time}</span>
      </div>

      {/* Nav row - looks like tab bar */}
      <div className="flex items-center gap-0 px-2 pb-0 overflow-x-auto">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className={`px-3 py-1 text-xs font-mono border-t-2 transition-colors whitespace-nowrap ${
              active === s.id
                ? "border-green-400 text-green-400 bg-[#0d1117]"
                : "border-transparent text-slate-600 hover:text-slate-400"
            }`}
          >
            ~/{s.label}
          </button>
        ))}
        <div className="ml-auto flex-shrink-0">
          <a
            href="/sachin_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 text-xs font-mono text-green-400 hover:text-green-300 border border-green-800 hover:border-green-600 rounded mr-2 transition-colors"
          >
            $ cat resume.pdf
          </a>
        </div>
      </div>
    </div>
  );
}
