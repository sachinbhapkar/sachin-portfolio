"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Mail,
  Linkedin,
  Github,
  Phone,
  MapPin,
  Send,
  ExternalLink,
} from "lucide-react";
import { SectionHeader } from "./About";

const contactLinks = [
  {
    label: "Email",
    value: "sachbhapkar@gmail.com",
    href: "mailto:sachbhapkar@gmail.com",
    icon: Mail,
    color: "from-blue-500 to-blue-600",
    textColor: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    hoverBorder: "hover:border-blue-500/50",
    desc: "Best way to reach me",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/sachinbhapkar",
    href: "https://linkedin.com/in/sachinbhapkar",
    icon: Linkedin,
    color: "from-cyan-500 to-cyan-600",
    textColor: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
    hoverBorder: "hover:border-cyan-500/50",
    desc: "Connect professionally",
  },
  {
    label: "GitHub",
    value: "github.com/sachinbhapkar",
    href: "https://github.com/sachinbhapkar",
    icon: Github,
    color: "from-slate-500 to-slate-600",
    textColor: "text-slate-300",
    bgColor: "bg-slate-500/10",
    borderColor: "border-slate-500/20",
    hoverBorder: "hover:border-slate-400/50",
    desc: "See my code",
  },
  {
    label: "Phone",
    value: "+91 9022093206",
    href: "tel:+919022093206",
    icon: Phone,
    color: "from-indigo-500 to-purple-500",
    textColor: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/20",
    hoverBorder: "hover:border-indigo-500/50",
    desc: "Call or WhatsApp",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-blue-500/5 via-cyan-500/3 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        <SectionHeader
          tag="Get In Touch"
          title="Let's Connect"
          subtitle="Whether it's a job, a side project, or just a chat about backend architecture — feel free to reach out."
        />

        <div ref={ref} className="max-w-4xl mx-auto">
          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative glass rounded-3xl p-8 md:p-12 border border-slate-700/50 mb-10 overflow-hidden text-center"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />

            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30">
                <Send className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Got something in mind?{" "}
                <span className="gradient-text">Let&apos;s talk.</span>
              </h3>
              <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
                I&apos;m actively looking for new opportunities. If you think I could be a good fit,
                or just want to say hello — my inbox is always open.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="mailto:sachbhapkar@gmail.com"
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow-lg hover:shadow-blue-500/30 transition-shadow flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Send Email
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/sachin_resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 rounded-xl glass border border-slate-600 text-slate-200 font-semibold hover:border-blue-500/50 hover:text-white transition-all flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Resume
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Contact cards grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {contactLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className={`glass rounded-2xl p-5 border ${link.borderColor} ${link.hoverBorder} transition-all duration-300 group flex items-center gap-4`}
              >
                <div
                  className={`w-12 h-12 rounded-xl ${link.bgColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                >
                  <link.icon className={`w-5 h-5 ${link.textColor}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-0.5">
                    {link.label}
                  </p>
                  <p className={`font-semibold ${link.textColor} text-sm truncate`}>
                    {link.value}
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">{link.desc}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-600 ml-auto flex-shrink-0 group-hover:text-slate-400 transition-colors" />
              </motion.a>
            ))}
          </div>

          {/* Location tag */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
          >
            <span className="inline-flex items-center gap-2 text-slate-500 text-sm">
              <MapPin className="w-4 h-4" />
              Based in Pune, India · Open to remote & hybrid opportunities
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
