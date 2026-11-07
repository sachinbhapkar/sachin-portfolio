"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";
import { SectionHeader } from "./About";

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="relative py-24 md:py-32 bg-[#0d1521]">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          tag="Academic Background"
          title="Education"
          subtitle="The foundation that fueled my passion for software engineering."
        />

        <div ref={ref} className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 blur-xl" />

            <div className="relative glass rounded-3xl p-8 md:p-10 border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 overflow-hidden group">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-3xl" />
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-gradient-to-tr from-cyan-500/5 to-transparent rounded-full" />

              <div className="relative">
                {/* Icon and degree */}
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0 group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-all">
                    <GraduationCap className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                      Bachelor of Technology
                    </h3>
                    <p className="gradient-text font-semibold text-lg">
                      Computer Science & Engineering
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="section-divider mb-6" />

                {/* Details */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Award className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                          Institution
                        </p>
                        <p className="text-slate-200 font-medium leading-snug">
                          G H Raisoni College of Engineering and Management
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                          Location
                        </p>
                        <p className="text-slate-200 font-medium">Pune, India</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Calendar className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                          Graduation
                        </p>
                        <p className="text-slate-200 font-medium">May 2020</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <GraduationCap className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                          Specialization
                        </p>
                        <p className="text-slate-200 font-medium">
                          Software Engineering
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Coursework tags */}
                <div className="mt-6 pt-5 border-t border-slate-800">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">
                    Key Coursework
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Data Structures & Algorithms",
                      "Operating Systems",
                      "Database Management",
                      "Computer Networks",
                      "Software Engineering",
                      "Object-Oriented Programming",
                      "Distributed Systems",
                    ].map((course) => (
                      <span
                        key={course}
                        className="px-3 py-1 rounded-lg text-xs bg-slate-800/60 text-slate-400 border border-slate-700/50"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
