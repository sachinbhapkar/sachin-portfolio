"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const NEOFETCH_ART = [
  "  ███████╗██████╗ ",
  "  ██╔════╝██╔══██╗",
  "  ███████╗██████╔╝",
  "  ╚════██║██╔══██╗",
  "  ███████║██████╔╝",
  "  ╚══════╝╚═════╝ ",
  "                  ",
  "  sachin@portfolio",
  "  ────────────────",
];

const INFO = [
  { key: "Name",     val: "Sachin Bhapkar" },
  { key: "Role",     val: "Java Backend Engineer" },
  { key: "Exp",      val: "4.5+ years" },
  { key: "Stack",    val: "Spring Boot · Spring Cloud · AWS" },
  { key: "OS",       val: "macOS (deploying to Linux / AWS)" },
  { key: "Shell",    val: "zsh · bash" },
  { key: "Editor",   val: "IntelliJ IDEA" },
  { key: "Location", val: "Pune, India" },
  { key: "Email",    val: "sachbhapkar@gmail.com" },
  { key: "GitHub",   val: "github.com/sachinbhapkar" },
];

const HEALTH_JSON = `{
  "status": "UP",
  "components": {
    "career": {
      "status": "ACTIVE",
      "company": "Principal Global Services"
    },
    "experience": {
      "status": "UP",
      "years": "4.5+",
      "specialization": "Microservices & Cloud"
    },
    "openToWork": {
      "status": "true",
      "type": ["Full-time", "Remote", "Hybrid"]
    }
  }
}`;

// Simple JSON syntax highlighter component
function JsonHighlight({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => {
        const colored = line
          .replace(/"([^"]+)":/g, '<span class="text-blue-400">"$1"</span>:')
          .replace(/: "([^"]+)"/g, ': <span class="text-amber-300">"$1"</span>')
          .replace(/: (true|false)/g, ': <span class="text-purple-400">$1</span>')
          .replace(/[\[\]{}]/g, (m) => `<span class="text-slate-500">${m}</span>`);
        return (
          <div key={i} dangerouslySetInnerHTML={{ __html: colored }} />
        );
      })}
    </>
  );
}

export default function TerminalHero() {
  const [phase, setPhase] = useState(0);
  // phase 0: type cmd1
  // phase 1: show neofetch
  // phase 2: type cmd2
  // phase 3: show health json

  const [cmd1Text, setCmd1Text] = useState("");
  const [cmd2Text, setCmd2Text] = useState("");

  useEffect(() => {
    const CMD1 = "neofetch --profile";
    let timer: ReturnType<typeof setTimeout>;
    let i = 0;
    timer = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setCmd1Text(CMD1.slice(0, i));
        if (i >= CMD1.length) {
          clearInterval(interval);
          setTimeout(() => setPhase(1), 400);
        }
      }, 55);
    }, 500);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase !== 1) return;
    const CMD2 = "curl -s /actuator/health | jq";
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setCmd2Text(CMD2.slice(0, i));
        if (i >= CMD2.length) {
          clearInterval(interval);
          setTimeout(() => setPhase(3), 400);
        }
      }, 55);
    }, 1400);
    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <section id="hero" className="pt-24 pb-8 px-4 md:px-8 max-w-5xl mx-auto">
      {/* Command 1 */}
      <div className="mb-4">
        <p className="text-sm">
          <span className="text-green-400">sachin@portfolio</span>
          <span className="text-slate-500">:</span>
          <span className="text-blue-400">~</span>
          <span className="text-slate-500">$ </span>
          <span className="text-white">{cmd1Text}</span>
          {phase === 0 && <span className="cursor" />}
        </p>
      </div>

      {/* Neofetch output */}
      {phase >= 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-8 flex gap-6 flex-wrap"
        >
          {/* ASCII art */}
          <div className="text-green-400 text-xs leading-5 font-mono flex-shrink-0">
            {NEOFETCH_ART.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
          {/* Info */}
          <div className="text-sm space-y-0.5 font-mono">
            <p className="text-green-400 font-semibold">sachin@portfolio</p>
            <p className="text-slate-600">{"─".repeat(28)}</p>
            {INFO.map((item) => (
              <div key={item.key} className="flex gap-2">
                <span className="text-blue-400 w-10 flex-shrink-0">{item.key}</span>
                <span className="text-slate-500">:</span>
                <span className="text-slate-300">{item.val}</span>
              </div>
            ))}
            <p className="text-slate-600 mt-1">{"─".repeat(28)}</p>
            <div className="flex gap-1 mt-1">
              {["#1d2733","#1a3a2a","#1a2a3a","#2d1a3a","#3a1a1a","#3a3a1a","#1a3a3a","#3a2a1a"].map(c => (
                <span key={c} style={{ background: c }} className="w-4 h-4 inline-block rounded-sm" />
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Command 2 */}
      {phase >= 1 && (
        <div className="mb-4">
          <p className="text-sm">
            <span className="text-green-400">sachin@portfolio</span>
            <span className="text-slate-500">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-slate-500">$ </span>
            <span className="text-white">{cmd2Text}</span>
            {phase === 2 && <span className="cursor" />}
          </p>
        </div>
      )}

      {/* Health JSON */}
      {phase >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 text-sm font-mono leading-6 pl-4 border-l border-slate-800"
        >
          <pre className="whitespace-pre-wrap">
            <JsonHighlight text={HEALTH_JSON} />
          </pre>
        </motion.div>
      )}

      {/* Blinking prompt at end */}
      {phase >= 3 && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-sm">
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
