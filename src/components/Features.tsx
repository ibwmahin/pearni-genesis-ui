import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/*
  Features.apple.style.tsx (updated)
  - Removed horizontal scrollbar by allowing tabs to wrap instead of overflow scrolling.
  - Removed the active underline indicator beneath the tabs as requested.
  - Kept Apple-like visual style and accessibility features.
*/

type Feature = {
  id: string;
  title: string;
  icon: string;
  description: string;
  details: string[];
  color: string;
};

const features: Feature[] = [
  {
    id: "discovery",
    title: "Scientific Discovery",
    icon: "bx-brain",
    description:
      "Accelerate research breakthroughs with AI-powered hypothesis generation and experiment design.",
    details: [
      "Automated literature review and synthesis",
      "Hypothesis generation from complex datasets",
      "Experimental design optimization",
      "Real-time research collaboration tools",
    ],
    color: "from-purple-400 to-blue-500",
  },
  {
    id: "automation",
    title: "Knowledge Automation",
    icon: "bx-cog",
    description:
      "Transform information processing with intelligent automation and knowledge extraction.",
    details: [
      "Intelligent document processing",
      "Automated knowledge graph creation",
      "Multi-source data integration",
      "Continuous learning systems",
    ],
    color: "from-blue-400 to-teal-400",
  },
  {
    id: "global",
    title: "Global Solutions",
    icon: "bx-world",
    description:
      "Address planetary challenges through coordinated AI systems and predictive modeling.",
    details: [
      "Climate change mitigation strategies",
      "Resource optimization algorithms",
      "Global health monitoring systems",
      "Sustainable development planning",
    ],
    color: "from-teal-400 to-green-400",
  },
  {
    id: "collaboration",
    title: "Human Collaboration",
    icon: "bx-group",
    description:
      "Enhance human capabilities through seamless AI-human partnership and augmentation.",
    details: [
      "Intuitive human-AI interfaces",
      "Collaborative decision making",
      "Skill augmentation platforms",
      "Ethical AI governance frameworks",
    ],
    color: "from-green-400 to-cyan-400",
  },
  {
    id: "creation",
    title: "AI Creation",
    icon: "bx-chip",
    description:
      "Pioneer the next generation of AI systems with self-improving and adaptive architectures.",
    details: [
      "Self-modifying neural architectures",
      "Automated AI system design",
      "Cross-domain knowledge transfer",
      "Emergent capability development",
    ],
    color: "from-cyan-400 to-purple-400",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const panelVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.35 } },
};

export default function Features(): JSX.Element {
  const [activeTab, setActiveTab] = useState(0);
  const reduce = useReducedMotion();
  const tabRefs = useRef<HTMLButtonElement[]>([]);

  // keyboard nav for tabs
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const idx = tabRefs.current.indexOf(
        document.activeElement as HTMLButtonElement,
      );
      if (idx === -1) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        const next = (idx + 1) % features.length;
        setActiveTab(next);
        tabRefs.current[next]?.focus();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prev = (idx - 1 + features.length) % features.length;
        setActiveTab(prev);
        tabRefs.current[prev]?.focus();
      }
      if (e.key === "Home") {
        e.preventDefault();
        setActiveTab(0);
        tabRefs.current[0]?.focus();
      }
      if (e.key === "End") {
        e.preventDefault();
        setActiveTab(features.length - 1);
        tabRefs.current[features.length - 1]?.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <section id="features" className="py-16 md:py-24 bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="text-center mb-12 md:mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 leading-tight">
            Core <span className="gradient-text">Features</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-medium">
            Discover how pearNI transforms industries and accelerates human
            progress through advanced AI capabilities.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8">
          <div
            role="tablist"
            aria-label="Feature tabs"
            // Tabs now wrap instead of scrolling to avoid a horizontal scrollbar
            className="flex flex-wrap gap-3 px-2 sm:px-0 py-2 items-center justify-center"
          >
            {features.map((feature, idx) => {
              const isActive = idx === activeTab;
              return (
                <button
                  key={feature.id}
                  ref={(el) => (tabRefs.current[idx] = el as HTMLButtonElement)}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls={`feature-panel-${feature.id}`}
                  id={`feature-tab-${feature.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-3 whitespace-nowrap px-4 py-2 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 ${
                    isActive
                      ? "bg-white text-gray-900 shadow-md border border-gray-100"
                      : "bg-white/60 backdrop-blur-sm text-gray-700 hover:bg-white/80"
                  }`}
                >
                  <span
                    className={`inline-flex items-center justify-center w-9 h-9 rounded-lg shadow-sm bg-gradient-to-r ${feature.color} text-white`}
                    aria-hidden
                  >
                    <i className={`bx ${feature.icon} text-lg`} />
                  </span>
                  <span className="hidden sm:inline">{feature.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active underline removed as requested */}
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.section
              key={features[activeTab].id}
              id={`feature-panel-${features[activeTab].id}`}
              role="tabpanel"
              aria-labelledby={`feature-tab-${features[activeTab].id}`}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={panelVariants}
              className="bg-white/60 backdrop-blur-sm border border-gray-100 rounded-3xl p-6 md:p-8 shadow-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Left: text */}
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-r ${features[activeTab].color} shadow-inner`}
                    >
                      <i
                        className={`bx ${features[activeTab].icon} text-white text-2xl`}
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                        {features[activeTab].title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {features[activeTab].description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mt-4">
                    {features[activeTab].details.map((d, i) => (
                      <motion.div
                        key={d}
                        initial={reduce ? {} : { opacity: 0, x: -8 }}
                        animate={reduce ? {} : { opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.35 }}
                        className="flex items-start gap-3"
                      >
                        <span className="mt-1 flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 bg-white">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20 6L9 17L4 12"
                              stroke="#06b6d4"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <p className="text-sm text-gray-600 font-medium">{d}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Right: visual */}
                <div className="relative flex justify-center md:justify-end">
                  <motion.div
                    initial={reduce ? {} : { scale: 0.98, opacity: 0 }}
                    animate={reduce ? {} : { scale: 1, opacity: 1 }}
                    transition={{ duration: 0.45 }}
                    className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl border border-gray-50"
                  >
                    <div
                      className="w-28 h-28 mx-auto bg-gradient-to-r rounded-3xl flex items-center justify-center mb-5"
                      style={{
                        backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))`,
                      }}
                    >
                      <div
                        className={`w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-r ${features[activeTab].color}`}
                      >
                        <i
                          className={`bx ${features[activeTab].icon} text-white text-4xl`}
                        />
                      </div>
                    </div>

                    <h4 className="text-lg font-semibold text-gray-900 text-center mb-2">
                      {features[activeTab].title} Engine
                    </h4>
                    <p className="text-sm text-gray-500 text-center">
                      Advanced AI algorithms working seamlessly to deliver
                      unprecedented capabilities.
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-gray-50 text-center text-sm font-medium text-gray-700 border border-gray-100">
                        Low latency
                      </div>
                      <div className="p-3 rounded-lg bg-gray-50 text-center text-sm font-medium text-gray-700 border border-gray-100">
                        Secure
                      </div>
                      <div className="p-3 rounded-lg bg-gray-50 text-center text-sm font-medium text-gray-700 border border-gray-100">
                        Scalable
                      </div>
                      <div className="p-3 rounded-lg bg-gray-50 text-center text-sm font-medium text-gray-700 border border-gray-100">
                        Explainable
                      </div>
                    </div>
                  </motion.div>

                  {/* soft accents */}
                  {!reduce && (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 30,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute -top-4 -right-8 w-8 h-8 bg-gradient-to-r from-purple-200/30 to-blue-200/30 rounded-full"
                      />
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{
                          duration: 22,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute -bottom-4 -left-8 w-6 h-6 bg-gradient-to-r from-cyan-200/30 to-green-200/30 rounded-full"
                      />
                    </>
                  )}
                </div>
              </div>
            </motion.section>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
