"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

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

const contacts = [
  { icon: "📧", label: "Email",    value: "sachbhapkar@gmail.com",        href: "mailto:sachbhapkar@gmail.com" },
  { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/sachinbhapkar", href: "https://linkedin.com/in/sachinbhapkar" },
  { icon: "🐙", label: "GitHub",   value: "github.com/sachinbhapkar",     href: "https://github.com/sachinbhapkar" },
  { icon: "📱", label: "Phone",    value: "+91 9022093206",               href: "tel:+919022093206" },
  { icon: "📍", label: "Location", value: "Pune, India",                  href: null },
];

export default function TerminalContact() {
  const { ref, displayed, done, isInView } = useTypeOnView("./contact.sh --verbose", 55);

  return (
    <section id="contact" className="py-8 px-4 md:px-8 max-w-5xl mx-auto border-t border-slate-800/60">
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
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="font-mono text-sm pl-2"
        >
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-green-400 mb-1">Initializing contact channels...</motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-slate-600 mb-4">{"─".repeat(50)}</motion.p>

          {contacts.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.12 }}
              className="flex gap-3 mb-2 items-center"
            >
              <span className="text-base">{c.icon}</span>
              <span className="text-blue-400 w-10 flex-shrink-0">{c.label}</span>
              <span className="text-slate-500">:</span>
              {c.href ? (
                <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="term-link">
                  {c.value}
                </a>
              ) : (
                <span className="text-slate-300">{c.value}</span>
              )}
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-6 border border-slate-800 p-4 rounded"
          >
            <p className="text-slate-600 text-xs mb-2">// Preferred contact method</p>
            <p className="text-slate-400">Looking for a backend engineer? Let&apos;s talk.</p>
            <p className="text-slate-600 mt-1 text-xs">I&apos;m actively exploring new opportunities — full-time, remote or hybrid.</p>
            <p className="mt-3">
              <a href="mailto:sachbhapkar@gmail.com" className="term-link text-xs">$ echo &quot;hello&quot; | mail -s &quot;Let&apos;s connect&quot; sachbhapkar@gmail.com</a>
            </p>
          </motion.div>
        </motion.div>
      )}

      {done && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="text-sm mt-6">
          <p>
            <span className="text-green-400">sachin@portfolio</span>
            <span className="text-slate-500">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-slate-500">$ </span>
            <span className="cursor" />
          </p>
        </motion.div>
      )}
    </section>
  );
}
