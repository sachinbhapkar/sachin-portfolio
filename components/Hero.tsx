"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Download, ExternalLink } from "lucide-react";

const TITLES = [
  "Java Backend Engineer",
  "Spring Boot Specialist",
  "Microservices Architect",
  "AWS Cloud Engineer",
];

function TypingTitle() {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const type = () => {
      const current = TITLES[titleIndex];
      const el = textRef.current;
      if (!el) return;

      if (!isDeleting) {
        el.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          isDeleting = true;
          timer = setTimeout(type, 2000);
          return;
        }
      } else {
        el.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          titleIndex = (titleIndex + 1) % TITLES.length;
        }
      }
      timer = setTimeout(type, isDeleting ? 50 : 80);
    };

    timer = setTimeout(type, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span ref={textRef} className="gradient-text">
      Java Backend Engineer
    </span>
  );
}

export default function Hero() {
  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Available for opportunities
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight"
        >
          <span className="gradient-text">Sachin</span>{" "}
          <span className="text-white">Bhapkar</span>
        </motion.h1>

        {/* Animated title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl md:text-3xl font-semibold text-slate-300 mb-6 h-10 flex items-center justify-center"
        >
          <TypingTitle />
          <span className="ml-1 w-0.5 h-8 bg-blue-400 animate-pulse" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          4.5+ years crafting scalable microservices, leading platform migrations,
          and building cloud-native solutions that power production systems.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleScroll("experience")}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow-lg hover:shadow-blue-500/30 transition-shadow flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            View Experience
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/sachin_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl glass border border-slate-700 text-slate-200 font-semibold hover:border-blue-500/50 hover:text-white transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Resume
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleScroll("contact")}
            className="px-6 py-3 rounded-xl glass border border-slate-700 text-slate-200 font-semibold hover:border-cyan-500/50 hover:text-white transition-all flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            Contact Me
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex items-center justify-center gap-4 mb-16"
        >
          <a
            href="https://linkedin.com/in/sachinbhapkar"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl glass border border-slate-700 text-slate-400 hover:text-blue-400 hover:border-blue-500/50 transition-all group"
          >
            <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </a>
          <a
            href="https://github.com/sachinbhapkar"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl glass border border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-500 transition-all group"
          >
            <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </a>
          <a
            href="mailto:sachbhapkar@gmail.com"
            className="p-3 rounded-xl glass border border-slate-700 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all group"
          >
            <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="grid grid-cols-3 gap-4 max-w-lg mx-auto"
        >
          {[
            { value: "4.5+", label: "Years Experience" },
            { value: "50+", label: "Microservices Owned" },
            { value: "90%", label: "Manual Effort Reduced" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-2xl p-4 border border-slate-700/50"
            >
              <div className="text-2xl font-black gradient-text">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => handleScroll("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1, duration: 0.5 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 hover:text-slate-300 transition-colors"
      >
        <ArrowDown className="w-6 h-6" />
      </motion.button>
    </section>
  );
}
