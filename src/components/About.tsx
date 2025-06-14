
import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const pillars = [
    {
      icon: 'bx-brain',
      title: 'Scientific Discovery',
      description: 'Accelerating research and breakthrough innovations'
    },
    {
      icon: 'bx-cog',
      title: 'Knowledge Automation',
      description: 'Streamlining information processing and analysis'
    },
    {
      icon: 'bx-world',
      title: 'Global Solutions',
      description: 'Addressing humanity\'s most pressing challenges'
    },
    {
      icon: 'bx-group',
      title: 'Human Collaboration',
      description: 'Enhancing human potential through AI partnership'
    },
    {
      icon: 'bx-chip',
      title: 'AI Creation',
      description: 'Building next-generation artificial intelligence'
    }
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About <span className="gradient-text">pearNI</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pioneering the future of artificial general intelligence with human-centered design and ethical innovation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-card"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Mission</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              pearNI represents the culmination of artificial general intelligence research, designed to amplify human potential while maintaining ethical guardrails and collaborative principles.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              We believe AGI should serve as humanity's partner in creating a better future, not as a replacement for human creativity and wisdom.
            </p>
            
            <div className="mt-8 flex items-center space-x-4">
              <div className="w-12 h-12 glass rounded-xl flex items-center justify-center">
                <i className='bx bx-target-lock text-xl gradient-text'></i>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Next-Gen AGI Platform</p>
                <p className="text-gray-600 text-sm">Empowering tomorrow's breakthroughs today</p>
              </div>
            </div>
          </motion.div>

          {/* Five Pillars */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-card"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-8">Five Core Pillars</h3>
            <div className="space-y-4">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-4 p-4 glass rounded-xl hover:bg-white/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className={`bx ${pillar.icon} text-white text-xl`}></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{pillar.title}</h4>
                    <p className="text-gray-600 text-sm">{pillar.description}</p>
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
