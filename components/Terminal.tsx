"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TerminalIcon, X, Minus, Square } from "lucide-react";

interface OutputLine {
  id: number;
  text: string;
  type: "command" | "output" | "error";
}

let lineIdCounter = 0;
function nextId() {
  return ++lineIdCounter;
}

const PROFILE_JSON = `{
  "name": "Sachin Bhapkar",
  "title": "Java Backend Engineer",
  "experience": "4.5+ years",
  "location": "Pune, India",
  "email": "sachbhapkar@gmail.com",
  "status": "AVAILABLE"
}`;

const SKILLS_JSON = `{
  "languages": ["Java 17", "SQL", "Bash"],
  "frameworks": ["Spring Boot", "Spring Cloud", "Spring Security"],
  "cloud": ["AWS (EC2, EKS, ElastiCache, Lambda)", "HashiCorp Vault"],
  "messaging": ["Apache Kafka", "RabbitMQ"],
  "databases": ["PostgreSQL", "MySQL", "Redis"],
  "tools": ["Docker", "Kubernetes", "Zipkin", "Gradle", "Maven"]
}`;

const EXPERIENCE_JSON = `[
  {
    "company": "Principal Global Services",
    "role": "Software Engineer",
    "duration": "2023 - Present",
    "location": "Pune, India"
  },
  {
    "company": "Persistent Systems (via Operative Media)",
    "role": "Lead Engineer",
    "duration": "2021 - 2023",
    "location": "Pune, India"
  }
]`;

const NEOFETCH_ART = `
\x1b[32m ███████╗██████╗ \x1b[0m   \x1b[1msachin\x1b[0m@\x1b[1mportfolio\x1b[0m
\x1b[32m ██╔════╝██╔══██╗\x1b[0m  -------------------
\x1b[32m ███████╗██████╔╝\x1b[0m  OS: SpringBoot 3.4.5 on Java 17
\x1b[32m ╚════██║██╔══██╗\x1b[0m  Kernel: Linux 5.15.0-aws
\x1b[32m ███████║██████╔╝\x1b[0m  Shell: zsh 5.9
\x1b[32m ╚══════╝╚═════╝ \x1b[0m  DE: IntelliJ IDEA
\x1b[0m                   CPU: 8-core AWS Lambda
                   Memory: 256MiB / 512MiB
                   Uptime: 4 years 6 months
                   Packages: 42 (spring-starter)
`;

function runCommand(cmd: string): string[] {
  const trimmed = cmd.trim().toLowerCase();

  if (trimmed === "help" || trimmed === "--help") {
    return [
      "Available commands:",
      "  whoami          — Who is Sachin?",
      "  uname -a        — System information",
      "  pwd             — Current directory",
      "  ls -la          — List files",
      "  cat resume.pdf  — View resume",
      "  curl /api/profile      — Profile JSON",
      "  curl /api/skills       — Skills JSON",
      "  curl /api/experience   — Experience JSON",
      "  ./contact.sh    — Contact info",
      "  neofetch        — System stats",
      "  git log --oneline — Commit history",
      "  clear           — Clear terminal",
    ];
  }

  if (trimmed === "whoami") {
    return [
      "sachin bhapkar — java backend engineer, 4.5+ yrs",
      "currently: software engineer @ principal global services, pune",
      "previously: lead engineer @ persistent systems (via operative media)",
    ];
  }

  if (trimmed === "uname -a") {
    return [
      "Linux sachin-portfolio 5.15.0-aws #1 SMP Java-17 aarch64 spring-cloud/GNU",
    ];
  }

  if (trimmed === "pwd") {
    return ["/home/sachin/portfolio"];
  }

  if (trimmed === "ls -la" || trimmed === "ls") {
    return [
      "total 32",
      "drwxr-xr-x  sachin sachin  4096 Nov 11 18:47 .",
      "drwxr-xr-x  sachin sachin  4096 Nov 11 18:47 ..",
      "-rw-r--r--  sachin sachin  2048 Nov 11 18:47 resume.pdf",
      "drwxr-xr-x  sachin sachin  4096 Nov 11 18:47 experience/",
      "drwxr-xr-x  sachin sachin  4096 Nov 11 18:47 skills/",
      "-rwxr-xr-x  sachin sachin   512 Nov 11 18:47 contact.sh",
    ];
  }

  if (trimmed === "cat resume.pdf") {
    return ["Error: Binary file. Try: curl /api/profile"];
  }

  if (trimmed === "curl /api/profile") {
    return PROFILE_JSON.split("\n");
  }

  if (trimmed === "curl /api/skills") {
    return SKILLS_JSON.split("\n");
  }

  if (trimmed === "curl /api/experience") {
    return EXPERIENCE_JSON.split("\n");
  }

  if (trimmed === "./contact.sh") {
    return [
      "Email:    sachbhapkar@gmail.com",
      "LinkedIn: linkedin.com/in/sachinbhapkar",
      "GitHub:   github.com/sachinbhapkar",
    ];
  }

  if (trimmed === "neofetch") {
    return NEOFETCH_ART.split("\n");
  }

  if (trimmed === "git log --oneline") {
    return [
      "a1b2c3d feat: migrate zuul to spring cloud gateway",
      "b2c3d4e fix: redis elasticache connection pooling",
      "c3d4e5f feat: automate tenant lifecycle management",
      "d4e5f6a feat: add zipkin distributed tracing",
      "e5f6a7b feat: hashicorp vault api-key rotation",
      "f6a7b8c chore: upgrade to java 17 and spring boot 3.4.x",
    ];
  }

  if (trimmed === "clear") {
    return ["__CLEAR__"];
  }

  if (trimmed === "") {
    return [];
  }

  return [`bash: ${cmd.trim()}: command not found`];
}

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<OutputLine[]>([
    {
      id: nextId(),
      text: 'Welcome! Type "help" to see available commands.',
      type: "output",
    },
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleSubmit = () => {
    const cmd = input.trim();

    const cmdLine: OutputLine = {
      id: nextId(),
      text: cmd,
      type: "command",
    };

    const result = runCommand(input);

    if (result.length === 1 && result[0] === "__CLEAR__") {
      setOutput([]);
      setInput("");
      setHistoryIndex(-1);
      if (cmd) setHistory((prev) => [cmd, ...prev]);
      return;
    }

    const outputLines: OutputLine[] = result.map((line) => ({
      id: nextId(),
      text: line,
      type: (line.startsWith("bash:") ? "error" : "output") as
        | "output"
        | "error",
    }));

    setOutput((prev) => [...prev, cmdLine, ...outputLines]);
    setInput("");
    setHistoryIndex(-1);

    if (cmd) {
      setHistory((prev) => [cmd, ...prev.slice(0, 49)]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const nextIndex = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(nextIndex);
      setInput(nextIndex === -1 ? "" : history[nextIndex] ?? "");
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50 group">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen((v) => !v)}
          className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 flex items-center justify-center hover:bg-green-500/30 hover:border-green-400/60 transition-all shadow-lg shadow-green-500/10"
          aria-label="Open Terminal (try: neofetch)"
        >
          <TerminalIcon className="w-5 h-5" />
        </motion.button>
        {/* Tooltip */}
        <div className="absolute bottom-14 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl">
            Open Terminal (try: neofetch)
          </div>
        </div>
      </div>

      {/* Terminal Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-20 right-6 z-40 w-[90vw] max-w-[520px] h-[340px] rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-700/50 flex flex-col"
            style={{ background: "#0d1117" }}
          >
            {/* Title Bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-700/50 bg-[#161b22] flex-shrink-0">
              {/* macOS dots */}
              <button
                onClick={() => setOpen(false)}
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors flex-shrink-0"
                aria-label="Close"
              />
              <div className="w-3 h-3 rounded-full bg-yellow-500 flex-shrink-0" />
              <div className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0" />
              <span className="ml-2 text-slate-400 text-xs font-mono flex-1 text-center">
                sachin@portfolio:~$
              </span>
              {/* Spacer icons for symmetry */}
              <Minus className="w-3 h-3 text-slate-600 opacity-0" />
              <Square className="w-3 h-3 text-slate-600 opacity-0" />
              <X
                className="w-3 h-3 text-slate-600 cursor-pointer hover:text-slate-400 transition-colors"
                onClick={() => setOpen(false)}
              />
            </div>

            {/* Output area */}
            <div
              ref={outputRef}
              className="flex-1 overflow-y-auto px-4 py-3 font-mono text-sm text-green-400 leading-relaxed"
              onClick={() => inputRef.current?.focus()}
            >
              {output.map((line) => (
                <motion.div
                  key={line.id}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.1 }}
                  className={
                    line.type === "command"
                      ? "text-cyan-300"
                      : line.type === "error"
                      ? "text-red-400"
                      : "text-green-400"
                  }
                >
                  {line.type === "command" ? (
                    <span>
                      <span className="text-blue-400">sachin@portfolio</span>
                      <span className="text-slate-500">:</span>
                      <span className="text-purple-400">~</span>
                      <span className="text-slate-400">$ </span>
                      <span className="text-white">{line.text}</span>
                    </span>
                  ) : (
                    <span className="whitespace-pre-wrap">{line.text}</span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Input area */}
            <div className="flex items-center px-4 py-2.5 border-t border-slate-700/50 bg-[#0d1117] flex-shrink-0">
              <span className="font-mono text-sm flex-shrink-0">
                <span className="text-blue-400">sachin@portfolio</span>
                <span className="text-slate-500">:</span>
                <span className="text-purple-400">~</span>
                <span className="text-slate-400">$ </span>
              </span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent font-mono text-sm text-white outline-none caret-green-400 ml-1"
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
