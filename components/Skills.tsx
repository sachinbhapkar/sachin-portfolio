"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "./About";
import {
  Code2,
  Cloud,
  Database,
  Wrench,
  Terminal,
  GitBranch,
} from "lucide-react";

const skillCategories = [
  {
    name: "Backend",
    icon: Code2,
    color: "from-blue-500 to-blue-600",
    textColor: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    skills: [
      { name: "Java", level: 95 },
      { name: "Spring Boot", level: 95 },
      { name: "Spring Cloud", level: 90 },
      { name: "Microservices", level: 90 },
      { name: "REST APIs", level: 95 },
      { name: "Apache Kafka", level: 75 },
      { name: "JUnit", level: 85 },
      { name: "System Design", level: 80 },
    ],
  },
  {
    name: "Cloud & DevOps",
    icon: Cloud,
    color: "from-cyan-500 to-cyan-600",
    textColor: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
    skills: [
      { name: "AWS Lambda", level: 85 },
      { name: "AWS API Gateway", level: 85 },
      { name: "AWS S3", level: 85 },
      { name: "Docker", level: 85 },
      { name: "Jenkins", level: 80 },
      { name: "HashiCorp Vault", level: 85 },
      { name: "Linux", level: 80 },
      { name: "Bash", level: 75 },
    ],
  },
  {
    name: "Databases",
    icon: Database,
    color: "from-indigo-500 to-purple-500",
    textColor: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/20",
    skills: [
      { name: "PostgreSQL", level: 85 },
      { name: "MySQL", level: 85 },
      { name: "Redis", level: 80 },
      { name: "AWS ElastiCache", level: 75 },
    ],
  },
  {
    name: "Tools & Observability",
    icon: Wrench,
    color: "from-violet-500 to-pink-500",
    textColor: "text-violet-400",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/20",
    skills: [
      { name: "Git", level: 90 },
      { name: "Swagger", level: 90 },
      { name: "Postman", level: 90 },
      { name: "SonarQube", level: 80 },
      { name: "Kibana", level: 75 },
      { name: "New Relic", level: 75 },
      { name: "Zipkin", level: 80 },
    ],
  },
];

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-slate-300 text-sm font-medium">{name}</span>
        <span className="text-slate-500 text-xs">{level}%</span>
      </div>
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          tag="Expertise"
          title="Technical Skills"
          subtitle="Things I actually use day-to-day, not just things I've heard of."
        />

        <div ref={ref} className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: ci * 0.1 }}
              className="glass glass-hover rounded-2xl p-6 md:p-8 border border-slate-700/50"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-10 h-10 rounded-xl ${cat.bgColor} flex items-center justify-center`}
                >
                  <cat.icon className={`w-5 h-5 ${cat.textColor}`} />
                </div>
                <h3 className="font-bold text-white">{cat.name}</h3>
              </div>

              {/* Skill bars */}
              <div className="space-y-3">
                {cat.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={cat.color}
                    delay={ci * 0.1 + si * 0.07}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional skill badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10"
        >
          <div className="glass rounded-2xl p-6 border border-slate-700/50">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-5 h-5 text-blue-400" />
              <h3 className="font-semibold text-white">Also proficient in</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                "Distributed Tracing",
                "API Security",
                "OAuth 2.0",
                "CI/CD Pipelines",
                "Event-Driven Architecture",
                "Serverless",
                "Code Review",
                "Technical Documentation",
                "Agile / Scrum",
                "Security Remediation",
              ].map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ y: -2, scale: 1.03 }}
                  className="skill-badge px-3 py-1.5 rounded-lg text-sm bg-slate-800/60 text-slate-400 border border-slate-700/50 hover:border-blue-500/30 hover:text-blue-300 cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
