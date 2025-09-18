import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  const [showDemo, setShowDemo] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);

  // Prevent background scroll when modal open
  useEffect(() => {
    document.body.style.overflow = showDemo ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showDemo]);

  // Close modal on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowDemo(false);
    };
    if (showDemo) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showDemo]);

  // Scroll to demo target (keeps previous behavior)
  const scrollToDemo = () => {
    const el = document.querySelector("#demo");
    if (el) {
      (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
    }
    setShowDemo(false);
  };

  // Respect prefers-reduced-motion (framer-motion will check this too)
  const prefersReduced =
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  // motion variants
  const demoModal = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.5,
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.25 } },
  };

  const buttonHover = {
    hover: {
      scale: 1.03,
      y: -2,
      boxShadow: "0 8px 30px rgba(34,211,238,0.18)",
    },
    tap: { scale: 0.98 },
  };

  const floating = {
    float: {
      y: [-8, 8, -8],
      rotate: [-1.5, 1.5, -1.5],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <>
      <section
        id="hero"
        className="min-h-screen flex items-start md:items-center justify-center relative overflow-hidden pt-24 md:pt-32 pb-16"
        aria-label="Hero section"
      >
        {/* Floating background elements (reduced motion controls) */}
        <div className="absolute inset-0 pointer-events-none">
          {!prefersReduced && (
            <>
              <motion.div
                variants={floating}
                animate="float"
                className="absolute w-56 h-56 rounded-full bg-gradient-to-r from-teal-400/20 to-cyan-400/20 top-16 left-6 blur-3xl"
              />
              <motion.div
                variants={floating}
                animate="float"
                transition={{ delay: 2 }}
                className="absolute w-44 h-44 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-400/20 top-36 right-12 blur-3xl"
              />
              <motion.div
                variants={floating}
                animate="float"
                transition={{ delay: 4 }}
                className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 bottom-36 left-1/4 blur-3xl"
              />
            </>
          )}
          {/* small rotating accents */}
          <motion.div
            animate={
              !prefersReduced ? { rotate: 360, scale: [1, 1.08, 1] } : {}
            }
            transition={
              !prefersReduced
                ? {
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity },
                  }
                : {}
            }
            className="absolute top-1/4 right-1/4 w-8 h-8 border-2 border-cyan-400/30 rounded-full"
          />
          <motion.div
            animate={
              !prefersReduced ? { rotate: -360, opacity: [0.3, 0.8, 0.3] } : {}
            }
            transition={
              !prefersReduced
                ? {
                    rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                    opacity: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }
                : {}
            }
            className="absolute bottom-1/3 right-1/3 w-6 h-6 bg-gradient-to-r from-teal-400/40 to-cyan-400/40 rounded-full"
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="glass-card mx-auto px-6 py-10 sm:py-12 rounded-3xl"
            role="region"
            aria-labelledby="hero-heading"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
              className="w-20 h-20 mx-auto mb-6 sm:mb-8 bg-transparent rounded-2xl flex items-center justify-center relative overflow-hidden"
              aria-hidden
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{ background: "linear-gradient(45deg,#14b8a6,#06b6d4)" }}
              />
              <i className="bx bxs-pear text-3xl sm:text-4xl gradient-text relative z-10" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-3 md:mb-4 leading-tight"
            >
              pearNI
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg sm:text-2xl md:text-3xl font-light mb-6 text-readable-light max-w-3xl mx-auto"
            >
              AI-Powered{" "}
              <span className="gradient-text font-semibold">Sustainable</span>{" "}
              Innovation
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="text-base sm:text-lg text-readable-muted mb-8 max-w-2xl mx-auto"
            >
              Revolutionizing the future with AI-driven sustainable practices,
              interactive 3D experiences, and cutting-edge environmental
              solutions for a greener tomorrow.
            </motion.p>

            {/* CTAs: stacked on mobile, inline on md+ */}
            <motion.div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-6">
              <motion.button
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 rounded-full text-lg font-semibold shadow-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white focus:outline-none focus:ring-4 focus:ring-cyan-200"
                variants={buttonHover}
                whileHover="hover"
                whileTap="tap"
                onClick={() => setShowDemo(true)}
                aria-haspopup="dialog"
                aria-expanded={showDemo}
              >
                <i className="bx bx-play mr-3 text-xl" aria-hidden />
                Explore AI Demo
              </motion.button>

              <motion.button
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 rounded-full text-lg font-semibold glass-button text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
                variants={buttonHover}
                whileHover="hover"
                whileTap="tap"
                onClick={() =>
                  document
                    .querySelector("#about")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <i
                  className="bx bx-leaf mr-3 text-2xl text-green-500"
                  aria-hidden
                />
                Sustainable Tech
              </motion.button>
            </motion.div>

            {/* Feature cards (stack on small devices) */}
            <motion.div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: "bx-brain",
                  title: "AI-Powered",
                  desc: "Advanced machine learning",
                },
                {
                  icon: "bx-leaf",
                  title: "Sustainable",
                  desc: "Eco-friendly solutions",
                },
                {
                  icon: "bx-cube",
                  title: "3D Interactive",
                  desc: "Immersive experiences",
                },
              ].map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + idx * 0.12 }}
                  whileHover={!prefersReduced ? { scale: 1.03, y: -4 } : {}}
                  className="glass p-4 rounded-2xl flex flex-col items-start text-left"
                >
                  <i
                    className={`bx ${feature.icon} text-2xl gradient-text mb-3`}
                    aria-hidden
                  />
                  <h3 className="font-bold text-readable mb-1 text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-readable-muted">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator - slightly smaller on mobile */}
        <motion.div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-20">
          <motion.div
            animate={!prefersReduced ? { y: [0, 8, 0] } : {}}
            transition={
              !prefersReduced ? { duration: 2, repeat: Infinity } : {}
            }
            className="glass rounded-full p-3 cursor-pointer"
            onClick={() =>
              document
                .querySelector("#about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            aria-hidden
          >
            <i className="bx bx-chevron-down text-xl text-gray-600" />
          </motion.div>
        </motion.div>
      </section>

      {/* Demo Modal */}
      <AnimatePresence>
        {showDemo && (
          <>
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
              onClick={() => setShowDemo(false)}
              aria-hidden
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                ref={modalRef}
                variants={demoModal}
                initial="hidden"
                animate="visible"
                exit="hidden"
                role="dialog"
                aria-modal="true"
                aria-label="AI demo dialog"
                className="w-full max-w-2xl"
                onClick={(e) => e.stopPropagation()} // prevent backdrop click from closing when clicking modal content
              >
                <div className="glass-card relative p-6 rounded-2xl">
                  <button
                    onClick={() => setShowDemo(false)}
                    className="absolute top-4 right-4 w-9 h-9 glass rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800"
                    aria-label="Close demo"
                  >
                    <i className="bx bx-x text-lg" />
                  </button>

                  <div className="text-center mb-6">
                    <div className="w-14 h-14 mx-auto mb-3 glass rounded-lg flex items-center justify-center">
                      <i className="bx bxs-pear text-2xl gradient-text" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                      AI-Powered Demo
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Experience the future of sustainable AI technology
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 mb-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <i className="bx bxs-pear text-white text-lg" />
                      </div>
                      <div className="text-left">
                        <span className="font-semibold text-gray-800 text-sm sm:text-base">
                          pearNI Assistant
                        </span>
                        <div className="text-green-500 text-xs sm:text-sm flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                          AI Active
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-3">
                      Hello! I'm pearNI, your AI-powered assistant for
                      sustainable innovation. I can help you discover
                      eco-friendly solutions, analyze environmental data, and
                      create interactive 3D visualizations for a greener future.
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {[
                        "🌱 Sustainability",
                        "🤖 AI Analysis",
                        "🌍 3D Visualization",
                      ].map((tag) => (
                        <span
                          key={tag}
                          className="bg-white/70 px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileHover={!prefersReduced ? { scale: 1.02 } : {}}
                    whileTap={{ scale: 0.98 }}
                    onClick={scrollToDemo}
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <i className="bx bx-rocket mr-2" />
                    Launch Full AI Experience
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Hero;
