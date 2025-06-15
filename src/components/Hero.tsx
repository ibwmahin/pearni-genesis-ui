
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
    setShowDemo(false);
  };

  const demoModal = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.5
      } 
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
    hover: { 
      scale: 1.05, 
      y: -2,
      boxShadow: '0 10px 40px rgba(34, 211, 238, 0.3)',
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20
      }
    },
    tap: { scale: 0.95 }
  };

  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-32 pb-20">
        {/* Enhanced Floating Background Elements with AI themes */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            variants={floatingVariants}
            animate="float"
            className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-teal-400/20 to-cyan-400/20 top-20 left-10 blur-3xl"
          />
          <motion.div
            variants={floatingVariants}
            animate="float"
            transition={{ delay: 2 }}
            className="absolute w-48 h-48 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-400/20 top-40 right-20 blur-3xl"
          />
          <motion.div
            variants={floatingVariants}
            animate="float"
            transition={{ delay: 4 }}
            className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 bottom-40 left-1/4 blur-3xl"
          />
          
          {/* AI-themed floating elements */}
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute top-1/4 right-1/4 w-8 h-8 border-2 border-cyan-400/30 rounded-full"
          />
          <motion.div
            animate={{ 
              rotate: -360,
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ 
              rotate: { duration: 15, repeat: Infinity, ease: "linear" },
              opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute bottom-1/3 right-1/3 w-6 h-6 bg-gradient-to-r from-teal-400/40 to-cyan-400/40 rounded-full"
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-card max-w-5xl mx-auto"
          >
            {/* Enhanced Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
              className="w-24 h-24 mx-auto mb-8 glass rounded-3xl flex items-center justify-center relative overflow-hidden"
            >
              <motion.div
                animate={{ 
                  background: [
                    'linear-gradient(45deg, #14b8a6, #06b6d4)',
                    'linear-gradient(45deg, #06b6d4, #3b82f6)',
                    'linear-gradient(45deg, #3b82f6, #14b8a6)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 opacity-20"
              />
              <i className='bx bxs-pear text-5xl gradient-text relative z-10'></i>
            </motion.div>

            {/* Main Headline with AI focus */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold mb-6 text-gray-800 leading-tight"
            >
              pearNI
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-light mb-8 text-gray-700">
                AI-Powered <span className="gradient-text font-semibold">Sustainable</span> Innovation
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Revolutionizing the future with AI-driven sustainable practices, interactive 3D experiences, and cutting-edge environmental solutions for a greener tomorrow.
            </motion.p>

            {/* Enhanced CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleDemoClick}
                className="relative bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-10 py-5 rounded-full font-semibold text-xl shadow-2xl overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center">
                  <i className='bx bx-play mr-3 text-2xl'></i>
                  Explore AI Demo
                </div>
              </motion.button>

              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
                className="glass-button text-gray-700 font-semibold text-xl px-10 py-5"
              >
                <i className='bx bx-leaf mr-3 text-2xl text-green-500'></i>
                Sustainable Tech
              </motion.button>
            </motion.div>

            {/* Feature highlights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                { icon: 'bx-brain', title: 'AI-Powered', desc: 'Advanced machine learning' },
                { icon: 'bx-leaf', title: 'Sustainable', desc: 'Eco-friendly solutions' },
                { icon: 'bx-cube', title: '3D Interactive', desc: 'Immersive experiences' }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 + index * 0.2 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass p-6 rounded-2xl"
                >
                  <i className={`bx ${feature.icon} text-3xl gradient-text mb-3 block`}></i>
                  <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="glass rounded-full p-4 cursor-pointer"
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <i className='bx bx-chevron-down text-2xl text-gray-600'></i>
          </motion.div>
        </motion.div>
      </section>

      {/* Fixed Demo Modal - properly centered */}
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
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                variants={demoModal}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="w-full max-w-2xl"
              >
                <div className="glass-card relative">
                  <button
                    onClick={() => setShowDemo(false)}
                    className="absolute top-4 right-4 w-10 h-10 glass rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 z-10"
                  >
                    <i className='bx bx-x text-2xl'></i>
                  </button>
                  
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 glass rounded-2xl flex items-center justify-center">
                      <i className='bx bxs-pear text-3xl gradient-text'></i>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">AI-Powered Demo</h3>
                    <p className="text-gray-600 text-lg">Experience the future of sustainable AI technology</p>
                  </div>

                  <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 mb-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <i className='bx bxs-pear text-white text-xl'></i>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-800 text-lg">pearNI Assistant</span>
                        <div className="text-green-500 text-sm flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                          AI Active
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                      Hello! I'm pearNI, your AI-powered assistant for sustainable innovation. I can help you discover eco-friendly solutions, analyze environmental data, and create interactive 3D visualizations for a greener future.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['🌱 Sustainability', '🤖 AI Analysis', '🌍 3D Visualization'].map((tag) => (
                        <span key={tag} className="bg-white/60 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={scrollToDemo}
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <i className='bx bx-rocket mr-2'></i>
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
