import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const pillars = [
  {
    icon: "bx-brain",
    title: "Scientific Discovery",
    description: "Accelerating research and breakthrough innovations",
  },
  {
    icon: "bx-cog",
    title: "Knowledge Automation",
    description: "Streamlining information processing and analysis",
  },
  {
    icon: "bx-world",
    title: "Global Solutions",
    description: "Addressing humanity's most pressing challenges",
  },
  {
    icon: "bx-group",
    title: "Human Collaboration",
    description: "Enhancing human potential through AI partnership",
  },
  {
    icon: "bx-chip",
    title: "AI Creation",
    description: "Building next-generation artificial intelligence",
  },
];

const About = () => {
  const reduce = useReducedMotion();

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  const cardVariants = (delay = 0) => ({
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay } },
  });

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-16 md:py-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="text-center mb-10 md:mb-14 max-w-3xl mx-auto"
        >
          <h2
            id="about-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-readable mb-3 leading-tight"
          >
            About <span className="gradient-text">pearNI</span>
          </h2>
          <p className="text-base sm:text-lg text-readable-muted font-medium">
            Pioneering the future of artificial general intelligence with
            human-centered design and ethical innovation.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Mission Statement */}
          <motion.article
            role="article"
            aria-label="Our mission"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants(0)}
            className="glass-card p-6 md:p-8 rounded-2xl shadow-md"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-readable mb-4">
              Our Mission
            </h3>
            <p className="text-sm sm:text-base text-readable-light leading-relaxed mb-4 font-medium">
              pearNI represents the culmination of artificial general
              intelligence research, designed to amplify human potential while
              maintaining ethical guardrails and collaborative principles.
            </p>

            <p className="text-sm sm:text-base text-readable-light leading-relaxed font-medium">
              We believe AGI should serve as humanity's partner in creating a
              better future — not as a replacement for human creativity and
              wisdom.
            </p>

            <div className="mt-6 flex items-center gap-4">
              <div
                className="w-12 h-12 glass rounded-lg flex items-center justify-center flex-shrink-0"
                aria-hidden
              >
                <i className="bx bx-target-lock text-xl gradient-text" />
              </div>
              <div>
                <p className="font-semibold text-readable text-sm md:text-base">
                  Next-Gen AGI Platform
                </p>
                <p className="text-xs md:text-sm text-readable-muted font-medium">
                  Empowering tomorrow's breakthroughs today
                </p>
              </div>
            </div>
          </motion.article>

          {/* Five Pillars */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants(0.05)}
            className="glass-card p-4 md:p-6 rounded-2xl shadow-md"
            role="region"
            aria-label="Five core pillars"
          >
            <h3 className="text-lg sm:text-xl font-bold text-readable mb-4">
              Five Core Pillars
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pillars.map((pillar, idx) => (
                <motion.div
                  key={pillar.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={cardVariants(0.08 + idx * 0.05)}
                  whileHover={!reduce ? { scale: 1.02 } : {}}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/6 transition-colors duration-200 focus-within:ring-2 focus-within:ring-cyan-200"
                  tabIndex={0}
                >
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-r from-teal-500 to-cyan-500">
                    <i
                      className={`bx ${pillar.icon} text-white text-lg`}
                      aria-hidden
                    />
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-sm sm:text-base font-semibold text-readable truncate">
                      {pillar.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-readable-muted font-medium leading-snug">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
