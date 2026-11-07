"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, MapPin, ChevronRight } from "lucide-react";
import { SectionHeader } from "./About";

const experiences = [
  {
    company: "Principal Global Services",
    role: "Software Engineer",
    location: "Pune, India",
    period: "Mar 2026 – Present",
    color: "from-blue-500 to-cyan-500",
    current: true,
    bullets: [
      "Built and integrated 10+ serverless REST APIs on AWS API Gateway and Lambda, adopted by an internal engineering team of 10+.",
      "Helped modernize a legacy 32-bit Microsoft Access application by migrating and consolidating 200+ source tables into 50+ AWS PostgreSQL tables.",
      "Built Lambda-based KYC data extraction from PostgreSQL to CSV delivered to Amazon S3, feeding downstream sanction-screening workflows.",
      "Remediated CodeQL, CSPM, and AVA security findings across Java applications and AWS environments, improving security and compliance posture.",
    ],
    tags: ["AWS Lambda", "API Gateway", "PostgreSQL", "S3", "Java", "Security"],
  },
  {
    company: "Persistent Systems",
    role: "Lead Software Engineer",
    location: "Pune, India",
    period: "May 2022 – Feb 2026",
    color: "from-indigo-500 to-purple-500",
    current: false,
    bullets: [
      "Led a 3-member core platform team responsible for foundational microservices, backend architecture, and scalability/performance improvements.",
      "Migrated legacy Zuul Gateway to Spring Cloud Gateway and modernized Spring Cloud microservices to Java 17 and Spring Boot 3.4.x.",
      "Implemented the BackupRestore service supporting 50+ microservices across 5+ data stores and introduced Zipkin distributed tracing.",
      "Developed backend application to automate tenant lifecycle management, reducing manual effort by 90%+.",
      "Automated API-key rotation using HashiCorp Vault, reducing manual effort by 90%+ and improving security posture.",
    ],
    tags: [
      "Spring Boot",
      "Spring Cloud",
      "Java 17",
      "HashiCorp Vault",
      "Zipkin",
      "Redis",
      "Docker",
    ],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="relative py-24 md:py-32 bg-[#0d1521]">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          tag="Career"
          title="Work Experience"
          subtitle="A track record of leading high-impact backend engineering projects."
        />

        <div ref={ref} className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-cyan-500/30 to-transparent hidden md:block" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative flex flex-col md:flex-row gap-6 md:gap-0 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 z-10">
                  <motion.div
                    animate={
                      exp.current
                        ? { scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }
                        : {}
                    }
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`w-4 h-4 rounded-full bg-gradient-to-br ${exp.color} shadow-lg`}
                  />
                </div>

                {/* Card - full width on mobile, half on desktop */}
                <div
                  className={`w-full md:w-5/12 ${
                    index % 2 === 0 ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"
                  }`}
                >
                  <div className="glass glass-hover rounded-2xl p-6 md:p-8 group border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300">
                    {/* Company header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3
                            className={`text-lg font-bold bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}
                          >
                            {exp.company}
                          </h3>
                          {exp.current && (
                            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/20">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-white font-semibold">{exp.role}</p>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-4 mb-5 text-sm text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </span>
                    </div>

                    {/* Bullets */}
                    <ul className="space-y-3 mb-5">
                      {exp.bullets.map((bullet, bi) => (
                        <li key={bi} className="flex items-start gap-2 text-slate-400 text-sm">
                          <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800/60 text-slate-400 border border-slate-700/50 hover:border-blue-500/30 hover:text-blue-300 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
