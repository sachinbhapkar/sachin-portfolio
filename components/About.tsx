"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  MapPin,
  Briefcase,
  Coffee,
  Zap,
  Users,
  Shield,
} from "lucide-react";

const highlights = [
  {
    icon: Briefcase,
    title: "Platform Leadership",
    desc: "Led 3-member core platform team at Persistent Systems managing 40+ microservice ecosystem",
  },
  {
    icon: Zap,
    title: "Migration Expert",
    desc: "Migrated Zuul to Spring Cloud Gateway, upgraded to Java 17 & Spring Boot 3.4.x",
  },
  {
    icon: Shield,
    title: "Security Focus",
    desc: "Remediated CodeQL, CSPM, and AVA findings improving security and compliance posture",
  },
  {
    icon: Users,
    title: "Team Player",
    desc: "Built APIs adopted by 10+ engineers; automated workflows reducing manual effort by 90%+",
  },
  {
    icon: Coffee,
    title: "Cloud Native",
    desc: "Hands-on with AWS Lambda, API Gateway, S3, Redis/ElastiCache, HashiCorp Vault",
  },
  {
    icon: MapPin,
    title: "Based in Pune",
    desc: "Working at the intersection of backend engineering and cloud infrastructure in India",
  },
];

function SectionHeader({
  tag,
  title,
  subtitle,
}: {
  tag: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-16">
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-400 mb-3"
      >
        {tag}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-5xl font-black text-white mb-4"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-lg max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-6 h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
      />
    </div>
  );
}

export { SectionHeader };

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          tag="Who I Am"
          title="About Me"
          subtitle="Building robust backend systems that scale — from microservices architecture to cloud infrastructure."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Bio text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <p className="text-slate-300 text-lg leading-relaxed">
              I'm a Java backend engineer with{" "}
              <span className="text-blue-400 font-semibold">4.5+ years</span> of
              experience building and scaling Spring Boot and Spring Cloud
              microservices. I specialize in designing distributed systems that
              are reliable, observable, and maintainable.
            </p>
            <p className="text-slate-400 leading-relaxed">
              At{" "}
              <span className="text-cyan-400 font-semibold">
                Persistent Systems
              </span>
              , I led a core platform team of 3, owning gateway migration,
              framework upgrades, distributed tracing, backup/restore tooling,
              and tenant lifecycle automation across a 40+ team microservice
              ecosystem.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Currently at{" "}
              <span className="text-cyan-400 font-semibold">
                Principal Global Services
              </span>
              , I'm building serverless REST APIs on AWS, modernizing legacy
              systems, and remediating security findings to improve compliance
              posture.
            </p>

            {/* Tech stack row */}
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                "Java",
                "Spring Boot",
                "AWS",
                "Docker",
                "Redis",
                "Kafka",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Highlights grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="glass glass-hover rounded-2xl p-5 group cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-3 group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-all">
                  <item.icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="font-semibold text-slate-200 text-sm mb-1">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
