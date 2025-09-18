import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
  color: string;
}

const FeatureShowcase: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLDivElement | null>(null);
  const featureRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const features: FeatureCard[] = [
    {
      id: "shortcuts",
      title: "Keyboard shortcuts",
      description: "Work efficiently with instant access to common actions.",
      icon: "bx-command",
      image: "/lovable-uploads/81ca961c-0935-4ccb-8d72-80aaf675707b.png",
      color: "from-orange-500 to-red-500",
    },
    {
      id: "planner",
      title: "Team Planner",
      description:
        "Keep track of the bigger picture by viewing all individual tasks in one centralized team calendar.",
      icon: "bx-calendar",
      image: "/lovable-uploads/81ca961c-0935-4ccb-8d72-80aaf675707b.png",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "timeblocking",
      title: "Time-blocking",
      description:
        "Transform daily tasks into structured time blocks for focused productivity.",
      icon: "bx-time",
      image: "/lovable-uploads/81ca961c-0935-4ccb-8d72-80aaf675707b.png",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "notifications",
      title: "Notifications",
      description:
        "Keep up to date with any changes by receiving instant notifications.",
      icon: "bx-bell",
      image: "/lovable-uploads/81ca961c-0935-4ccb-8d72-80aaf675707b.png",
      color: "from-teal-500 to-green-500",
    },
  ];

  // keyboard navigation for feature list (Up/Down/Home/End)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (featureRefs.current.includes(activeEl as HTMLButtonElement)) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          const idx = featureRefs.current.indexOf(
            activeEl as HTMLButtonElement,
          );
          const next = (idx + 1) % features.length;
          featureRefs.current[next]?.focus();
          setActiveFeature(next);
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          const idx = featureRefs.current.indexOf(
            activeEl as HTMLButtonElement,
          );
          const prev = (idx - 1 + features.length) % features.length;
          featureRefs.current[prev]?.focus();
          setActiveFeature(prev);
        }
        if (e.key === "Home") {
          e.preventDefault();
          featureRefs.current[0]?.focus();
          setActiveFeature(0);
        }
        if (e.key === "End") {
          e.preventDefault();
          featureRefs.current[features.length - 1]?.focus();
          setActiveFeature(features.length - 1);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [features.length]);

  // keep focused tab visible in horizontal list (mobile)
  useEffect(() => {
    const btn = featureRefs.current[activeFeature];
    if (btn && listRef.current) {
      const btnRect = btn.getBoundingClientRect();
      const listRect = listRef.current.getBoundingClientRect();
      if (btnRect.left < listRect.left || btnRect.right > listRect.right) {
        btn.scrollIntoView({ behavior: "smooth", inline: "center" });
      }
    }
  }, [activeFeature]);

  const cardVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.06, duration: 0.36 },
    }),
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.45 } },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.28 } },
  };

  return (
    <section id="feature-showcase" className="py-12 px-4 md:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
            Experience pearNI in <span className="gradient-text">Action</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Discover how pearNI transforms your workflow with intelligent
            features designed for the future.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Feature list (left) */}
          <div className="space-y-4">
            <div
              ref={listRef}
              role="list"
              aria-label="Feature list"
              className="flex gap-3 overflow-x-auto no-scrollbar pb-1 sm:overflow-visible sm:block"
            >
              {/* Horizontal compact pills for small screens */}
              {features.map((f, idx) => (
                <button
                  key={f.id + "-pill"}
                  onClick={() => setActiveFeature(idx)}
                  className={`sm:hidden flex items-center gap-2 whitespace-nowrap px-3 py-2 rounded-full text-sm font-semibold transition ${
                    idx === activeFeature
                      ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow"
                      : "glass text-gray-800 hover:bg-white/10"
                  }`}
                  aria-pressed={idx === activeFeature}
                >
                  <i className={`bx ${f.icon}`} aria-hidden />
                  <span>{f.title}</span>
                </button>
              ))}
            </div>

            {/* Vertical card list on sm+ */}
            <div className="hidden sm:block space-y-4">
              {features.map((feature, index) => {
                const active = index === activeFeature;
                return (
                  <motion.button
                    key={feature.id}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={cardVariants}
                    onClick={() => setActiveFeature(index)}
                    ref={(el) => (featureRefs.current[index] = el)}
                    role="button"
                    aria-pressed={active}
                    className={`w-full text-left p-4 rounded-xl transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                      active
                        ? "ring-2 ring-cyan-300 bg-white/30 scale-100 shadow-md"
                        : "glass hover:scale-[1.02]"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <motion.div
                        whileHover={!reduce ? { scale: 1.06 } : {}}
                        whileTap={!reduce ? { scale: 0.98 } : {}}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-r ${feature.color}`}
                        aria-hidden
                      >
                        <i
                          className={`bx ${feature.icon} text-white text-xl`}
                        />
                      </motion.div>

                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {feature.description}
                        </p>
                      </div>

                      <div className="flex items-center">
                        {active && (
                          <span
                            className="w-3 h-3 rounded-full bg-cyan-400 ml-3"
                            aria-hidden
                          />
                        )}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Compact stacked list for xs devices (under sm) */}
            <div className="sm:hidden mt-2">
              {features.map((f, i) => (
                <div
                  key={f.id + "-stack"}
                  className={`p-3 rounded-lg mb-2 transition ${i === activeFeature ? "bg-white/20 ring-1 ring-cyan-300" : "glass"}`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-r ${f.color}`}
                    >
                      <i className={`bx ${f.icon} text-white`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm">{f.title}</h4>
                        <button
                          onClick={() => setActiveFeature(i)}
                          className="text-xs px-2 py-1 rounded-full bg-white/10"
                          aria-label={`Activate ${f.title}`}
                        >
                          Show
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {f.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview (right) */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-4 md:p-6 h-[420px] md:h-[520px] lg:h-[560px] overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={features[activeFeature].id}
                  variants={imageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="relative h-full w-full rounded-xl overflow-hidden flex flex-col md:flex-row items-center justify-center"
                >
                  {/* Left: visual */}
                  {/* If you have real images, use <img> or Next/Image; fallback to gradient */}
                  {/* Right: copy & CTA */}
                  <div className="w-full md:w-1/2 px-4 md:px-6 py-4 md:py-6 text-center md:text-left">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                      {features[activeFeature].title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 mb-4">
                      {features[activeFeature].description}
                    </p>

                    <p className="text-sm text-gray-500 mb-5 max-w-md mx-auto md:mx-0">
                      Interactive demo coming soon — experience the full power
                      of pearNI's{" "}
                      <strong className="text-gray-700">
                        {features[activeFeature].title.toLowerCase()}
                      </strong>
                      .
                    </p>

                    <div className="flex justify-center md:justify-start gap-3">
                      <button
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                        aria-label={`Try demo for ${features[activeFeature].title}`}
                      >
                        <i className="bx bx-play" aria-hidden />
                        Try Demo
                      </button>

                      <button
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/6 text-gray-800 font-medium hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
                        onClick={() => alert("More info coming soon")}
                      >
                        Learn more
                      </button>
                    </div>
                  </div>

                  {/* Decorative floating dots (reduced-motion friendly) */}
                  {!reduce && (
                    <>
                      <motion.div
                        className="absolute -top-3 -right-3 w-4 h-4 rounded-full bg-cyan-300/50"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3.8, repeat: Infinity }}
                        aria-hidden
                      />
                      <motion.div
                        className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-teal-300/40"
                        animate={{ y: [0, 10, 0] }}
                        transition={{
                          duration: 4.4,
                          repeat: Infinity,
                          delay: 0.8,
                        }}
                        aria-hidden
                      />
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
