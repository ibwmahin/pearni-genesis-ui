import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const Features = () => {
  const [activeTab, setActiveTab] = useState(0);
  const reduce = useReducedMotion();
  const tabRefs = useRef([]);
  const features = [
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
      color: "from-purple-500 to-blue-500",
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
      color: "from-blue-500 to-teal-500",
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
      color: "from-teal-500 to-green-500",
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
      color: "from-green-500 to-cyan-500",
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
      color: "from-cyan-500 to-purple-500",
    },
  ];

  // keyboard nav for tabs (Left/Right/Home/End)
  useEffect(() => {
    const handleKey = (e) => {
      if (
        document.activeElement &&
        tabRefs.current.includes(document.activeElement)
      ) {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          setActiveTab((s) => (s + 1) % features.length);
          const next =
            (tabRefs.current.indexOf(document.activeElement) + 1) %
            features.length;
          tabRefs.current[next]?.focus();
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          setActiveTab((s) => (s - 1 + features.length) % features.length);
          const prev =
            (tabRefs.current.indexOf(document.activeElement) -
              1 +
              features.length) %
            features.length;
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
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [features.length]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const panelVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
    exit: { opacity: 0, y: -12, transition: { duration: 0.35 } },
  };

  return (
    <section id="features" className="py-12 md:py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={containerVariants}
          className="text-center mb-10 md:mb-14 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-readable mb-3 leading-tight">
            Core <span className="gradient-text">Features</span>
          </h2>
          <p className="text-base sm:text-lg text-readable-muted font-medium">
            Discover how pearNI transforms industries and accelerates human
            progress through advanced AGI capabilities.
          </p>
        </motion.div>

        {/* Tab Navigation (scrollable on small screens) */}
        <div className="mb-8">
          <div
            role="tablist"
            aria-label="Feature tabs"
            className="flex gap-3 overflow-x-auto no-scrollbar px-2 sm:px-0 py-1 justify-start sm:justify-center"
          >
            {features.map((feature, idx) => {
              const isActive = idx === activeTab;
              return (
                <button
                  key={feature.id}
                  ref={(el) => (tabRefs.current[idx] = el)}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls={`feature-panel-${feature.id}`}
                  id={`feature-tab-${feature.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                    isActive
                      ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg"
                      : "glass text-readable hover:bg-white/10"
                  }`}
                >
                  <i className={`bx ${feature.icon} text-lg`} aria-hidden />
                  <span className="hidden sm:inline">{feature.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active indicator for larger screens */}
          <div className="hidden sm:block mt-3 h-1 relative">
            <div className="h-1 bg-white/6 rounded-full" />
            <motion.div
              layout
              initial={false}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-0 left-0 h-1 rounded-full"
              style={{
                width: `${100 / features.length}%`,
                transform: `translateX(${(activeTab * 100) / features.length}%)`,
                background: "linear-gradient(90deg,#06b6d4,#14b8a6)",
              }}
            />
          </div>
        </div>

        {/* Feature Content */}
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
              transition={{ duration: 0.45 }}
              className="glass-card p-6 md:p-8 rounded-2xl shadow-md"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-r ${features[activeTab].color}`}
                      aria-hidden
                    >
                      <i
                        className={`bx ${features[activeTab].icon} text-white text-2xl`}
                      />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-readable">
                      {features[activeTab].title}
                    </h3>
                  </div>

                  <p className="text-base sm:text-lg text-readable-light mb-6 leading-relaxed font-medium">
                    {features[activeTab].description}
                  </p>

                  <div className="space-y-3">
                    {features[activeTab].details.map((d, i) => (
                      <motion.div
                        key={d}
                        initial={reduce ? {} : { opacity: 0, x: -12 }}
                        animate={reduce ? {} : { opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06, duration: 0.35 }}
                        className="flex items-start gap-3"
                      >
                        <span className="mt-1 w-3 h-3 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex-shrink-0" />
                        <p className="text-sm sm:text-base text-readable-muted font-medium">
                          {d}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Visual card */}
                <div className="relative">
                  <motion.div
                    initial={reduce ? {} : { scale: 0.95, opacity: 0 }}
                    animate={reduce ? {} : { scale: 1, opacity: 1 }}
                    transition={{ duration: 0.45 }}
                    className="glass rounded-2xl p-6 text-center"
                  >
                    <div
                      className={`w-28 h-28 mx-auto ${reduce ? "" : "transform-gpu"} bg-gradient-to-r ${features[activeTab].color} rounded-3xl flex items-center justify-center mb-6`}
                      aria-hidden
                    >
                      <i
                        className={`bx ${features[activeTab].icon} text-white text-5xl`}
                      />
                    </div>
                    <h4 className="text-lg font-semibold text-readable mb-3">
                      {features[activeTab].title} Engine
                    </h4>
                    <p className="text-sm sm:text-base text-readable-muted">
                      Advanced AI algorithms working seamlessly to deliver
                      unprecedented capabilities in{" "}
                      {features[activeTab].title.toLowerCase()}.
                    </p>
                  </motion.div>

                  {/* Decorative floating accents (reduced motion respects) */}
                  {!reduce && (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-r from-teal-400/30 to-cyan-400/30 rounded-full"
                        aria-hidden
                      />
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{
                          duration: 15,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute -bottom-3 -left-3 w-5 h-5 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full"
                        aria-hidden
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
};

export default Features;
