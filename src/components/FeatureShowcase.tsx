
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  color: string;
}

const FeatureShowcase = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features: FeatureCard[] = [
    {
      id: 'shortcuts',
      title: 'Keyboard shortcuts',
      description: 'Work efficiently with instant access to common actions.',
      icon: 'bx-command',
      image: '/lovable-uploads/81ca961c-0935-4ccb-8d72-80aaf675707b.png',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'planner',
      title: 'Team Planner',
      description: 'Keep track of the bigger picture by viewing all individual tasks in one centralized team calendar.',
      icon: 'bx-calendar',
      image: '/lovable-uploads/81ca961c-0935-4ccb-8d72-80aaf675707b.png',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'timeblocking',
      title: 'Time-blocking',
      description: 'Transform daily tasks into structured time blocks for focused productivity.',
      icon: 'bx-time',
      image: '/lovable-uploads/81ca961c-0935-4ccb-8d72-80aaf675707b.png',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Keep up to date with any changes by receiving instant notifications.',
      icon: 'bx-bell',
      image: '/lovable-uploads/81ca961c-0935-4ccb-8d72-80aaf675707b.png',
      color: 'from-teal-500 to-green-500'
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  const featureImageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="feature-showcase" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Experience pearNI in <span className="gradient-text">Action</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how pearNI transforms your workflow with intelligent features designed for the future.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Feature Cards */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`glass-card cursor-pointer transition-all duration-300 hover:scale-105 ${
                  activeFeature === index ? 'ring-2 ring-cyan-400 bg-white/30' : 'hover:bg-white/20'
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center flex-shrink-0`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className={`bx ${feature.icon} text-white text-xl`}></i>
                  </motion.div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  
                  {activeFeature === index && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3 h-3 bg-cyan-400 rounded-full"
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Feature Preview */}
          <div className="relative">
            <motion.div
              className="glass-card p-8 h-[600px] overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  variants={featureImageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="relative h-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200"
                >
                  {/* Feature Preview Content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <motion.div
                        className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${features[activeFeature].color} flex items-center justify-center`}
                        animate={{ 
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        <i className={`bx ${features[activeFeature].icon} text-white text-3xl`}></i>
                      </motion.div>
                      
                      <h4 className="text-2xl font-bold text-gray-800 mb-4">
                        {features[activeFeature].title}
                      </h4>
                      
                      <p className="text-gray-600 max-w-sm mx-auto">
                        Interactive demo coming soon. Experience the full power of pearNI's {features[activeFeature].title.toLowerCase()}.
                      </p>
                      
                      <motion.button
                        className="mt-6 bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-6 py-3 rounded-full font-semibold"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Try Demo
                      </motion.button>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <motion.div
                    className="absolute top-4 right-4 w-4 h-4 bg-cyan-400 rounded-full opacity-60"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute bottom-8 left-8 w-6 h-6 bg-teal-400 rounded-full opacity-40"
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  />
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
