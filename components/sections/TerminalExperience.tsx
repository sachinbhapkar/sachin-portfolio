"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const experiences = [
  {
    id: 1,
    company: "Principal Global Services",
    role: "Software Engineer",
    location: "Pune, India",
    period: "Mar 2026 – Present",
    current: true,
    note: null,
    highlights: [
      "Built 10+ serverless REST APIs on AWS API Gateway + Lambda, adopted by 10+ engineers",
      "Migrated 200+ MS Access tables → 50+ AWS PostgreSQL tables to modernize legacy system",
      "Built Lambda-based KYC extraction: PostgreSQL → CSV → S3 for sanction-screening",
      "Remediated CodeQL, CSPM, AVA security findings across Java apps and AWS environments",
    ],
    stack: ["Java", "AWS Lambda", "API Gateway", "PostgreSQL", "S3", "CodeQL"],
  },
  {
    id: 2,
    company: "Persistent Systems",
    role: "Lead Software Engineer",
    location: "Pune, India",
    period: "May 2022 – Feb 2026",
    current: false,
    note: "Joined as Software Engineer at Operative Media; org subsequently rebadged under Persistent Systems.",
    highlights: [
      "Led 3-member core platform team — foundational microservices for 40+ team ecosystem",
      "Migrated Zuul Gateway → Spring Cloud Gateway; upgraded to Java 17 + Spring Boot 3.4.x",
      "Implemented BackupRestore service across 50+ microservices and 5+ data stores",
      "Introduced Zipkin distributed tracing improving observability across 40+ microservice teams",
      "Automated tenant lifecycle management, reducing manual effort by 90%+",
      "Automated API-key rotation with HashiCorp Vault, reducing manual effort by 90%+",
    ],
    stack: ["Java 17", "Spring Boot 3.4.x", "Spring Cloud", "Zipkin", "HashiCorp Vault", "Redis", "Docker", "Jenkins"],
  },
];

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

export default function TerminalExperience() {
  const { ref, displayed, done, isInView } = useTypeOnView("curl -s /api/experience | jq '.[]'", 55);

  return (
    <section id="experience" className="py-8 px-4 md:px-8 max-w-5xl mx-auto border-t border-slate-800/60">
      {/* Command */}
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

      {/* Output */}
      {done && (
        <div className="space-y-6 pl-2">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.4 }}
              className="border-l-2 border-slate-800 pl-4 font-mono text-sm"
            >
              {/* JSON-like header */}
              <p className="text-slate-500 mb-1">{"{"}</p>
              <div className="pl-4 space-y-1">
                <p>
                  <span className="text-blue-400">&quot;company&quot;</span>
                  <span className="text-slate-500">: </span>
                  <span className="text-amber-300">&quot;{exp.company}&quot;</span>
                  <span className="text-slate-500">,</span>
                </p>
                <p>
                  <span className="text-blue-400">&quot;current&quot;</span>
                  <span className="text-slate-500">: </span>
                  <span className="text-purple-400">{exp.current ? "true" : "false"}</span>
                  <span className="text-slate-500">,</span>
                </p>
                <p>
                  <span className="text-blue-400">&quot;role&quot;</span>
                  <span className="text-slate-500">: </span>
                  <span className="text-amber-300">&quot;{exp.role}&quot;</span>
                  <span className="text-slate-500">,</span>
                </p>
                <p>
                  <span className="text-blue-400">&quot;period&quot;</span>
                  <span className="text-slate-500">: </span>
                  <span className="text-amber-300">&quot;{exp.period}&quot;</span>
                  <span className="text-slate-500">,</span>
                </p>
                {exp.note && (
                  <p>
                    <span className="text-blue-400">&quot;note&quot;</span>
                    <span className="text-slate-500">: </span>
                    <span className="text-amber-300">&quot;{exp.note}&quot;</span>
                    <span className="text-slate-500">,</span>
                  </p>
                )}
                <div>
                  <span className="text-blue-400">&quot;highlights&quot;</span>
                  <span className="text-slate-500">: [</span>
                  <div className="pl-4 space-y-0.5 mt-1">
                    {exp.highlights.map((h, hi) => (
                      <p key={hi} className="text-slate-300">
                        <span className="text-slate-600 mr-1 select-none">{hi + 1}.</span>
                        <span className="text-amber-300">&quot;{h}&quot;</span>
                        {hi < exp.highlights.length - 1 && <span className="text-slate-500">,</span>}
                      </p>
                    ))}
                  </div>
                  <span className="text-slate-500">],</span>
                </div>
                <div>
                  <span className="text-blue-400">&quot;stack&quot;</span>
                  <span className="text-slate-500">: [</span>
                  <span className="ml-1">
                    {exp.stack.map((s, si) => (
                      <span key={s}>
                        <span className="text-green-300">&quot;{s}&quot;</span>
                        {si < exp.stack.length - 1 && <span className="text-slate-500">, </span>}
                      </span>
                    ))}
                  </span>
                  <span className="text-slate-500">]</span>
                </div>
              </div>
              <p className="text-slate-500">{"}"}{i < experiences.length - 1 ? "," : ""}</p>
            </motion.div>
          ))}
        </div>
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
