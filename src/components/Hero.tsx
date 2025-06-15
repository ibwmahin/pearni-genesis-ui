

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
  const [showDemo, setShowDemo] = useState(false);

  const handleDemoClick = () => {
    setShowDemo(true);
  };

  const scrollToDemo = () => {
    const element = document.querySelector('#demo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const demoModal = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4 } 
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
    hover: { scale: 1.05, y: -2 },
    tap: { scale: 0.95 }
  };

  return (
    <>
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-20">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="floating-blob w-64 h-64 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 top-20 left-10"
          />
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="floating-blob w-48 h-48 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 top-40 right-20"
          />
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            className="floating-blob w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 bottom-40 left-1/4"
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-card max-w-4xl mx-auto"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
              className="w-20 h-20 mx-auto mb-8 glass rounded-2xl flex items-center justify-center"
            >
              <i className='bx bxs-pear text-4xl gradient-text'></i>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6 text-gray-800 leading-tight"
            >
              pearNI
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <h2 className="text-2xl md:text-3xl font-light mb-8 text-gray-700">
                The <span className="gradient-text font-semibold">Last-Gen AGI</span> for Humanity's Next Leap
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Empowering scientific discovery, automating knowledge creation, and solving global challenges through advanced artificial general intelligence.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleDemoClick}
                className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <i className='bx bx-play mr-2'></i>
                Explore Demo
              </motion.button>

              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
                className="glass-button text-gray-700 font-semibold text-lg"
              >
                <i className='bx bx-info-circle mr-2'></i>
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator - Positioned at very bottom of section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="glass rounded-full p-3 cursor-pointer"
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <i className='bx bx-chevron-down text-xl text-gray-600'></i>
          </motion.div>
        </motion.div>
      </section>

      <AnimatePresence>
        {showDemo && (
          <>
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
              onClick={() => setShowDemo(false)}
            />
            <motion.div
              variants={demoModal}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl mx-4"
            >
              <div className="glass-card relative">
                <button
                  onClick={() => setShowDemo(false)}
                  className="absolute top-4 right-4 w-8 h-8 glass rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800"
                >
                  <i className='bx bx-x text-xl'></i>
                </button>
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">pearNI Demo</h3>
                  <p className="text-gray-600">Experience the future of AGI interaction</p>
                </div>

                <div className="bg-white/10 rounded-xl p-4 mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <i className='bx bxs-pear text-white text-sm'></i>
                    </div>
                    <span className="font-medium text-gray-800">pearNI Assistant</span>
                  </div>
                  <p className="text-gray-700 mb-3">Hello! I'm pearNI. I can help you with scientific research, complex problem-solving, and knowledge automation. What would you like to explore?</p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={scrollToDemo}
                  className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 rounded-xl font-semibold"
                >
                  Try Full Demo Below
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Hero;

