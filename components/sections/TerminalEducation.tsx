"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

function useTypeOnView(text: string, speed = 50) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(interval); setDone(true); }
    }, speed);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);
  return { ref, displayed, done, isInView };
}

export default function TerminalEducation() {
  const { ref, displayed, done, isInView } = useTypeOnView("cat education.txt", 55);

  const lines = [
    { label: "Degree",      value: "Bachelor of Technology (B.Tech)" },
    { label: "Stream",      value: "Computer Science & Engineering" },
    { label: "Institution", value: "G H Raisoni College of Engineering and Management" },
    { label: "Location",    value: "Pune, Maharashtra, India" },
    { label: "Graduated",   value: "May 2020" },
    { label: "Duration",    value: "4 years (2016 – 2020)" },
  ];

  return (
    <section id="education" className="py-8 px-4 md:px-8 max-w-5xl mx-auto border-t border-slate-800/60">
      <div className="mb-4" ref={ref}>
        <p className="text-sm">
          <span className="text-green-400">sachin@portfolio</span>
          <span className="text-slate-500">:</span>
          <span className="text-blue-400">~</span>
          <span className="text-slate-500">$ </span>
          <span className="text-white">{displayed}</span>
          {!done && isInView && <span className="cursor" />}
        </p>
      </div>

      {done && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-mono text-sm pl-2"
        >
          <p className="text-slate-600 mb-3">{"─".repeat(60)}</p>
          {lines.map((line, i) => (
            <motion.div
              key={line.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.08 }}
              className="flex gap-2 mb-1"
            >
              <span className="text-blue-400 w-14 flex-shrink-0">{line.label}</span>
              <span className="text-slate-500">:</span>
              <span className="text-slate-300">{line.value}</span>
            </motion.div>
          ))}
          <p className="text-slate-600 mt-3">{"─".repeat(60)}</p>
          <p className="text-slate-600 text-xs mt-2">// Core: DSA · OS · DBMS · Networks · OOP · Distributed Systems</p>
        </motion.div>
      )}

      {done && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-sm mt-6">
          <span className="text-green-400">sachin@portfolio</span>
          <span className="text-slate-500">:</span>
          <span className="text-blue-400">~</span>
          <span className="text-slate-500">$ </span>
          <span className="cursor" />
        </motion.p>
      )}
    </section>
  );
}
