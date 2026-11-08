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
    title: "Platform Work",
    desc: "Led the core platform team at Persistent Systems — the team responsible for things other teams depend on",
  },
  {
    icon: Zap,
    title: "Migrations Done Right",
    desc: "Zuul → Spring Cloud Gateway, Java 11 → Java 17, Spring Boot 2.x → 3.4.x — all in production",
  },
  {
    icon: Shield,
    title: "Security Mindset",
    desc: "Dealt with CodeQL, CSPM, AVA findings — not just flagging them but actually fixing them",
  },
  {
    icon: Users,
    title: "Team First",
    desc: "Built APIs used by 10+ engineers, automated workflows that saved hours of manual work every week",
  },
  {
    icon: Coffee,
    title: "Cloud Hands-On",
    desc: "AWS Lambda, API Gateway, S3, Redis, HashiCorp Vault — not just on slides, in production",
  },
  {
    icon: MapPin,
    title: "Pune, India",
    desc: "Open to remote and hybrid opportunities — timezone flexible for the right role",
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
          subtitle="Building reliable backend systems — the kind that don't wake you up at 3am."
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
              experience. I've spent most of that time in the microservices world — 
              writing Spring Boot services, dealing with distributed systems headaches, 
              and trying to make things simpler for the teams around me.
            </p>
            <p className="text-slate-400 leading-relaxed">
              At{" "}
              <span className="text-cyan-400 font-semibold">
                Persistent Systems
              </span>
              , I ended up leading a small core platform team. We owned the stuff 
              nobody wants to touch — gateway migrations, framework upgrades, tracing 
              setup, backup tooling, tenant automation. It was unglamorous work, but it 
              made life better for 40+ teams.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Now at{" "}
              <span className="text-cyan-400 font-semibold">
                Principal Global Services
              </span>
              , I'm building serverless APIs on AWS, cleaning up old systems, 
              and fixing security findings that accumulated over the years.
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
