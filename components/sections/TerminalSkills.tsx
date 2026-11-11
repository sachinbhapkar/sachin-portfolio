"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const SKILL_TREE = [
  {
    dir: "Backend/",
    color: "text-blue-400",
    skills: [
      { name: "Java",          level: 95 },
      { name: "Spring-Boot",   level: 95 },
      { name: "Spring-Cloud",  level: 90 },
      { name: "Microservices", level: 90 },
      { name: "REST-APIs",     level: 95 },
      { name: "Apache-Kafka",  level: 75 },
      { name: "JUnit",         level: 85 },
    ],
  },
  {
    dir: "Cloud-DevOps/",
    color: "text-cyan-400",
    skills: [
      { name: "AWS-Lambda",      level: 85 },
      { name: "AWS-API-Gateway", level: 85 },
      { name: "AWS-S3",          level: 85 },
      { name: "Docker",          level: 85 },
      { name: "Jenkins",         level: 80 },
      { name: "HashiCorp-Vault", level: 85 },
      { name: "Linux",           level: 80 },
      { name: "Bash",            level: 75 },
    ],
  },
  {
    dir: "Databases/",
    color: "text-purple-400",
    skills: [
      { name: "PostgreSQL",   level: 85 },
      { name: "MySQL",        level: 85 },
      { name: "Redis",        level: 80 },
      { name: "ElastiCache",  level: 75 },
    ],
  },
  {
    dir: "Tools/",
    color: "text-amber-400",
    skills: [
      { name: "Git",        level: 90 },
      { name: "Swagger",    level: 90 },
      { name: "Postman",    level: 90 },
      { name: "SonarQube",  level: 80 },
      { name: "Kibana",     level: 75 },
      { name: "New-Relic",  level: 75 },
      { name: "Zipkin",     level: 80 },
    ],
  },
];

function bar(level: number): string {
  const filled = Math.round(level / 5);
  const empty = 20 - filled;
  return "█".repeat(filled) + "░".repeat(empty);
}

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

export default function TerminalSkills() {
  const { ref, displayed, done, isInView } = useTypeOnView("tree skills/ --dirsfirst", 55);

  return (
    <section id="skills" className="py-8 px-4 md:px-8 max-w-5xl mx-auto border-t border-slate-800/60">
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="font-mono text-sm pl-2"
        >
          <p className="text-slate-400 mb-2">skills/</p>
          {SKILL_TREE.map((cat, ci) => (
            <div key={cat.dir}>
              <p className="ml-4">
                <span className="text-slate-600">{ci === SKILL_TREE.length - 1 ? "└── " : "├── "}</span>
                <span className={`font-semibold ${cat.color}`}>{cat.dir}</span>
              </p>
              {cat.skills.map((skill, si) => {
                const isLast = si === cat.skills.length - 1;
                const prefix = ci === SKILL_TREE.length - 1 ? "    " : "│   ";
                return (
                  <motion.p
                    key={skill.name}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: ci * 0.08 + si * 0.04 }}
                    className="ml-4 flex items-center gap-2 flex-wrap"
                  >
                    <span className="text-slate-600">{prefix}{isLast ? "└── " : "├── "}</span>
                    <span className="text-slate-300 w-32 flex-shrink-0">{skill.name}</span>
                    <span className="text-green-500/60 text-xs">[{bar(skill.level)}]</span>
                    <span className="text-slate-600 text-xs">{skill.level}%</span>
                  </motion.p>
                );
              })}
            </div>
          ))}
          <p className="mt-3 text-slate-600 text-xs">{SKILL_TREE.reduce((a, c) => a + c.skills.length, 0)} skills across {SKILL_TREE.length} categories</p>
        </motion.div>
      )}

      {done && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-sm mt-6">
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
