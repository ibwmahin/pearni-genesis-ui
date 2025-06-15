
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Features = () => {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      id: 'discovery',
      title: 'Scientific Discovery',
      icon: 'bx-brain',
      description: 'Accelerate research breakthroughs with AI-powered hypothesis generation and experiment design.',
      details: [
        'Automated literature review and synthesis',
        'Hypothesis generation from complex datasets',
        'Experimental design optimization',
        'Real-time research collaboration tools'
      ],
      color: 'from-purple-500 to-blue-500'
    },
    {
      id: 'automation',
      title: 'Knowledge Automation',
      icon: 'bx-cog',
      description: 'Transform information processing with intelligent automation and knowledge extraction.',
      details: [
        'Intelligent document processing',
        'Automated knowledge graph creation',
        'Multi-source data integration',
        'Continuous learning systems'
      ],
      color: 'from-blue-500 to-teal-500'
    },
    {
      id: 'global',
      title: 'Global Solutions',
      icon: 'bx-world',
      description: 'Address planetary challenges through coordinated AI systems and predictive modeling.',
      details: [
        'Climate change mitigation strategies',
        'Resource optimization algorithms',
        'Global health monitoring systems',
        'Sustainable development planning'
      ],
      color: 'from-teal-500 to-green-500'
    },
    {
      id: 'collaboration',
      title: 'Human Collaboration',
      icon: 'bx-group',
      description: 'Enhance human capabilities through seamless AI-human partnership and augmentation.',
      details: [
        'Intuitive human-AI interfaces',
        'Collaborative decision making',
        'Skill augmentation platforms',
        'Ethical AI governance frameworks'
      ],
      color: 'from-green-500 to-cyan-500'
    },
    {
      id: 'creation',
      title: 'AI Creation',
      icon: 'bx-chip',
      description: 'Pioneer the next generation of AI systems with self-improving and adaptive architectures.',
      details: [
        'Self-modifying neural architectures',
        'Automated AI system design',
        'Cross-domain knowledge transfer',
        'Emergent capability development'
      ],
      color: 'from-cyan-500 to-purple-500'
    }
  ];

  return (
    <section id="features" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-readable mb-6">
            Core <span className="gradient-text font-bold">Features</span>
          </h2>
          <p className="text-xl text-readable-muted max-w-3xl mx-auto font-medium">
            Discover how pearNI transforms industries and accelerates human progress through advanced AGI capabilities.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {features.map((feature, index) => (
            <motion.button
              key={feature.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(index)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-bold transition-all duration-300 ${
                activeTab === index
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg'
                  : 'glass text-readable hover:bg-white/30'
              }`}
            >
              <i className={`bx ${feature.icon} text-lg`}></i>
              <span className="hidden sm:inline">{feature.title}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Feature Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="glass-card max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${features[activeTab].color} rounded-2xl flex items-center justify-center`}>
                    <i className={`bx ${features[activeTab].icon} text-white text-2xl`}></i>
                  </div>
                  <h3 className="text-3xl font-bold text-readable">{features[activeTab].title}</h3>
                </div>
                
                <p className="text-lg text-readable-light mb-8 leading-relaxed font-medium">
                  {features[activeTab].description}
                </p>

                <div className="space-y-3">
                  {features[activeTab].details.map((detail, index) => (
                    <motion.div
                      key={detail}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
                      <span className="text-readable-muted font-medium">{detail}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="glass rounded-2xl p-8 text-center"
                >
                  <div className={`w-32 h-32 mx-auto bg-gradient-to-r ${features[activeTab].color} rounded-3xl flex items-center justify-center mb-6`}>
                    <i className={`bx ${features[activeTab].icon} text-white text-6xl`}></i>
                  </div>
                  <h4 className="text-xl font-bold text-readable mb-4">
                    {features[activeTab].title} Engine
                  </h4>
                  <p className="text-readable-muted font-medium">
                    Advanced AI algorithms working seamlessly to deliver unprecedented capabilities in {features[activeTab].title.toLowerCase()}.
                  </p>
                </motion.div>

                {/* Floating particles */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-teal-400/30 to-cyan-400/30 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Features;
