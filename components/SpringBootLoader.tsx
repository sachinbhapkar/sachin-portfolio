"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SpringBootLoaderProps {
  onComplete: () => void;
}

type LogLevel = "white" | "gray" | "yellow" | "green" | "brightgreen";

interface LogLine {
  text: string;
  level: LogLevel;
  delay: number; // cumulative delay in ms
}

const SPRING_LOGO = `  .   ____          _            __ _ _
 /\\\\ / ___'_ __ _ _(_)_ __  __ _ \\ \\ \\ \\
( ( )\\___ | '_ | '_| | '_ \\/ _\` | \\ \\ \\ \\
 \\\\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::               (v3.4.5)`;

const LOG_LINES: Omit<LogLine, "delay">[] = [
  {
    text: "2026-11-11 18:47:01.342  INFO 1 --- [main] c.s.portfolio.PortfolioApplication       : Starting PortfolioApplication v1.0.0",
    level: "gray",
  },
  {
    text: "2026-11-11 18:47:01.891  INFO 1 --- [main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port(s): 8080 (http)",
    level: "gray",
  },
  {
    text: "2026-11-11 18:47:02.102  INFO 1 --- [main] o.s.web.servlet.DispatcherServlet        : Initializing Servlet 'dispatcherServlet'",
    level: "gray",
  },
  {
    text: "2026-11-11 18:47:02.341  INFO 1 --- [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping : Mapped endpoints: GET /api/profile, GET /api/experience, GET /api/skills",
    level: "gray",
  },
  {
    text: "2026-11-11 18:47:02.567  INFO 1 --- [main] o.s.b.a.e.web.EndpointLinksResolver      : Exposing 3 endpoint(s) beneath base path '/actuator'",
    level: "gray",
  },
  {
    text: "2026-11-11 18:47:02.788  WARN 1 --- [main] JpaBaseConfiguration                      : spring.jpa.open-in-view is enabled by default",
    level: "yellow",
  },
  {
    text: "2026-11-11 18:47:03.012  INFO 1 --- [main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path ''",
    level: "gray",
  },
  {
    text: "2026-11-11 18:47:03.198  INFO 1 --- [main] c.s.portfolio.PortfolioApplication       : Started PortfolioApplication in 1.856 seconds (JVM running for 2.341)",
    level: "green",
  },
];

const STATUS_LINES = [
  "> Application is RUNNING. Serving portfolio on http://localhost:8080",
  '> Status: UP | Threads: 42 | Memory: 256MB / 512MB',
];

function getTextColor(level: LogLevel): string {
  switch (level) {
    case "white":
      return "text-green-400";
    case "gray":
      return "text-slate-400";
    case "yellow":
      return "text-yellow-400";
    case "green":
      return "text-green-400 font-bold";
    case "brightgreen":
      return "text-green-300 font-semibold";
    default:
      return "text-slate-400";
  }
}

export default function SpringBootLoader({ onComplete }: SpringBootLoaderProps) {
  const [visible, setVisible] = useState(false);
  const [logoShown, setLogoShown] = useState(false);
  const [shownLines, setShownLines] = useState(0);
  const [shownStatus, setShownStatus] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const triggerExit = useCallback(() => {
    setExiting(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  }, [onComplete]);

  useEffect(() => {
    setVisible(true);

    // Show logo after 200ms
    const logoTimer = setTimeout(() => {
      setLogoShown(true);
    }, 200);

    // Show log lines one by one, starting after logo (600ms)
    let cumulativeDelay = 700;
    const lineTimers: ReturnType<typeof setTimeout>[] = [];

    LOG_LINES.forEach((_, index) => {
      const delay = cumulativeDelay + Math.floor(Math.random() * 40 + 80);
      cumulativeDelay = delay;
      lineTimers.push(
        setTimeout(() => {
          setShownLines((prev) => prev + 1);
        }, delay)
      );
    });

    // Status lines after all log lines
    const statusDelay1 = cumulativeDelay + 200;
    const statusDelay2 = statusDelay1 + 150;

    const st1 = setTimeout(() => setShownStatus(1), statusDelay1);
    const st2 = setTimeout(() => setShownStatus(2), statusDelay2);

    // Auto-transition after 1.5s from last line
    const exitTimer = setTimeout(() => {
      triggerExit();
    }, statusDelay2 + 1500);

    // Blinking cursor interval
    const cursorInterval = setInterval(() => {
      setShowCursor((v) => !v);
    }, 500);

    return () => {
      clearTimeout(logoTimer);
      lineTimers.forEach(clearTimeout);
      clearTimeout(st1);
      clearTimeout(st2);
      clearTimeout(exitTimer);
      clearInterval(cursorInterval);
    };
  }, [onComplete, triggerExit]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="spring-loader"
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] bg-[#0a0e1a] flex flex-col justify-center items-start px-6 md:px-16 overflow-hidden"
        >
          <div className="w-full max-w-4xl mx-auto font-mono text-sm md:text-base leading-relaxed">
            {/* Spring Boot Logo */}
            <AnimatePresence>
              {logoShown && (
                <motion.pre
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-green-400 text-xs md:text-sm mb-4 whitespace-pre overflow-x-auto"
                >
                  {SPRING_LOGO}
                </motion.pre>
              )}
            </AnimatePresence>

            {/* Log lines */}
            <div className="space-y-0.5">
              {LOG_LINES.slice(0, shownLines).map((line, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className={`${getTextColor(line.level)} text-xs md:text-sm truncate`}
                >
                  {line.text}
                </motion.div>
              ))}
            </div>

            {/* Status lines */}
            {shownStatus >= 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="mt-3 text-green-300 font-semibold text-xs md:text-sm"
              >
                {STATUS_LINES[0]}
              </motion.div>
            )}
            {shownStatus >= 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="text-green-300 font-semibold text-xs md:text-sm"
              >
                {STATUS_LINES[1]}
              </motion.div>
            )}

            {/* Blinking cursor */}
            <span
              className={`inline-block w-2 h-4 bg-green-400 ml-1 mt-1 align-middle transition-opacity duration-100 ${
                showCursor ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Press Enter hint */}
            {shownStatus >= 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-6 text-slate-600 text-xs"
              >
                Press Enter to continue or wait...
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
