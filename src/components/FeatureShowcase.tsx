// FeatureShowcase.fixed.tsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * Fixed FeatureShowcase
 * - Ensures both columns stretch to the same height and the preview doesn't collapse.
 * - Clean, image-free preview and responsive behavior.
 */

interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const FEATURES: FeatureCard[] = [
  {
    id: "shortcuts",
    title: "Keyboard shortcuts",
    description: "Work efficiently with instant access to common actions.",
    icon: "bx-command",
    color: "from-orange-400 to-red-400",
  },
  {
    id: "planner",
    title: "Team Planner",
    description: "View all tasks in a centralized team calendar.",
    icon: "bx-calendar",
    color: "from-blue-400 to-cyan-400",
  },
  {
    id: "timeblocking",
    title: "Time-blocking",
    description: "Turn tasks into focused time blocks for better productivity.",
    icon: "bx-time",
    color: "from-purple-400 to-pink-400",
  },
  {
    id: "notifications",
    title: "Notifications",
    description: "Receive instant updates on important changes.",
    icon: "bx-bell",
    color: "from-teal-400 to-green-400",
  },
];

const listCardVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.32 },
  }),
};

const previewVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -8, scale: 0.99, transition: { duration: 0.25 } },
};

export default function FeatureShowcaseFixed(): JSX.Element {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const activeEl = document.activeElement as HTMLButtonElement | null;
      const idx = itemRefs.current.indexOf(activeEl);
      if (idx === -1) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = (idx + 1) % FEATURES.length;
        setActiveIndex(next);
        itemRefs.current[next]?.focus();
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = (idx - 1 + FEATURES.length) % FEATURES.length;
        setActiveIndex(prev);
        itemRefs.current[prev]?.focus();
      }
      if (e.key === "Home") {
        e.preventDefault();
        setActiveIndex(0);
        itemRefs.current[0]?.focus();
      }
      if (e.key === "End") {
        e.preventDefault();
        setActiveIndex(FEATURES.length - 1);
        itemRefs.current[FEATURES.length - 1]?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // keep active pill visible on small screens
  useEffect(() => {
    const btn = itemRefs.current[activeIndex];
    if (!btn || !listRef.current) return;
    const btnRect = btn.getBoundingClientRect();
    const listRect = listRef.current.getBoundingClientRect();
    if (btnRect.left < listRect.left || btnRect.right > listRect.right) {
      btn.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  }, [activeIndex]);

  return (
    <section id="feature-showcase" className="py-12 px-4 md:py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
            Experience pearNI in <span className="gradient-text">Action</span>
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Intelligent features, cleanly presented for faster decision-making.
          </p>
        </motion.div>

        {/* IMPORTANT: items-stretch ensures both columns have the same height */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Left: list */}
          <div className="flex flex-col justify-start">
            <div
              ref={listRef}
              role="list"
              aria-label="Feature list"
              className="flex gap-3 overflow-x-auto no-scrollbar pb-1 sm:block sm:overflow-visible"
            >
              {FEATURES.map((f, idx) => (
                <button
                  key={f.id + "-pill"}
                  onClick={() => setActiveIndex(idx)}
                  aria-pressed={idx === activeIndex}
                  className={`sm:hidden inline-flex items-center gap-2 whitespace-nowrap px-3 py-2 rounded-full text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${idx === activeIndex ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow" : "bg-white/6 text-gray-800 hover:bg-white/10"}`}
                >
                  <i className={`bx ${f.icon} text-lg`} aria-hidden />
                  <span>{f.title}</span>
                </button>
              ))}
            </div>

            <div className="hidden sm:block mt-4 space-y-3 h-full">
              {FEATURES.map((f, idx) => {
                const active = idx === activeIndex;
                return (
                  <motion.button
                    key={f.id}
                    ref={(el) => (itemRefs.current[idx] = el)}
                    onClick={() => setActiveIndex(idx)}
                    role="button"
                    aria-pressed={active}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={listCardVariants}
                    custom={idx}
                    className={`w-full text-left p-4 rounded-xl transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${active ? "bg-white shadow-md ring-1 ring-gray-100" : "bg-white/40 backdrop-blur-sm hover:scale-[1.01]"}`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-r ${f.color} text-white shadow-sm`}
                        aria-hidden
                      >
                        <i className={`bx ${f.icon} text-xl`} />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-4">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {f.title}
                          </h3>
                          <div className="text-sm text-gray-400">
                            {idx + 1}/{FEATURES.length}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {f.description}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right: clean preview (no image). h-full so it fills the column. */}
          <div className="flex items-center justify-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={previewVariants}
              className="bg-white/60 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 h-full w-full flex items-center justify-center"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={FEATURES[activeIndex].id}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={previewVariants}
                  className="w-full h-full flex flex-col items-center justify-center gap-4 px-4"
                >
                  <div
                    className={`w-28 h-28 rounded-2xl flex items-center justify-center bg-gradient-to-r ${FEATURES[activeIndex].color} text-white shadow-md`}
                    aria-hidden
                  >
                    <i
                      className={`bx ${FEATURES[activeIndex].icon} text-4xl`}
                    />
                  </div>

                  <div className="max-w-xl text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {FEATURES[activeIndex].title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {FEATURES[activeIndex].description}
                    </p>

                    <ul className="text-sm text-gray-700 space-y-2 inline-block text-left">
                      <li>• Fast & intuitive interactions</li>
                      <li>• Secure by design</li>
                      <li>• Seamless team collaboration</li>
                    </ul>

                    <div className="mt-5 flex gap-3 justify-center">
                      <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
                        <i className="bx bx-play" /> Try demo
                      </button>
                      <button
                        onClick={() => alert("More info coming soon")}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/6 text-gray-800 font-medium hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
                      >
                        Learn more
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
