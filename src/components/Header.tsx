
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();

  const leftNavItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Features', href: '#features' }
  ];

  const rightNavItems = [
    { name: 'Demo', href: '#demo' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' }
  ];

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = ['hero', 'about', 'features', 'demo', 'blog', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navLinkVariants = {
    initial: { opacity: 0.8 },
    hover: {
      opacity: 1,
      y: -2,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  const underlineVariants = {
    initial: { scaleX: 0, originX: 0 },
    hover: {
      scaleX: 1,
      transition: { duration: 0.3 }
    }
  };

  const notchVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  const mobileMenuVariants = {
    hidden: {
      y: '100%',
      opacity: 0,
      transition: { duration: 0.3 }
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          height: isScrolled ? '72px' : '80px'
        }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 backdrop-blur-2xl bg-black/20 border-b border-white/20 shadow-xl"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
          {/* Left Navigation Items - Desktop */}
          <div className="hidden md:flex gap-8 text-sm font-medium rounded-full">
            {leftNavItems.map(item => (
              <motion.button
                key={item.name}
                variants={navLinkVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={() => scrollToSection(item.href)}
                className={`relative transition-colors duration-300 ${
                  activeSection === item.href.slice(1)
                    ? 'text-cyan-300 font-semibold'
                    : 'text-white hover:text-cyan-200'
                }`}
              >
                {item.name}
                <motion.div
                  variants={underlineVariants}
                  className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full"
                />
                {activeSection === item.href.slice(1) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Center Notch / Brand */}
          <motion.button
            variants={notchVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={() => scrollToSection('#hero')}
            className="bg-white/20 backdrop-blur-lg rounded-full px-6 py-3 flex items-center gap-3 shadow-xl ring-1 ring-white/30 cursor-pointer border border-white/10"
          >
            <motion.i
              className='bx bxs-pear text-cyan-400 text-2xl'
              animate={{
                textShadow: [
                  '0 0 10px rgba(34, 211, 238, 0.5)',
                  '0 0 20px rgba(34, 211, 238, 0.8)',
                  '0 0 10px rgba(34, 211, 238, 0.5)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            />
            <span className="text-white font-bold tracking-wide hidden sm:block text-shadow">
              pearNI
            </span>
          </motion.button>

          {/* Right Navigation Items - Desktop */}
          <div className="hidden md:flex gap-8 text-sm font-medium">
            {rightNavItems.map(item => (
              <motion.button
                key={item.name}
                variants={navLinkVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={() => scrollToSection(item.href)}
                className={`relative transition-colors duration-300 ${
                  activeSection === item.href.slice(1)
                    ? 'text-cyan-300 font-semibold'
                    : 'text-white hover:text-cyan-200'
                }`}
              >
                {item.name}
                <motion.div
                  variants={underlineVariants}
                  className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full"
                />
                {activeSection === item.href.slice(1) && (
                  <motion.div
                    layoutId="activeIndicatorRight"
                    className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden bg-white/20 backdrop-blur-lg rounded-full p-3 ring-1 ring-white/30 border border-white/10"
          >
            <motion.i
              className={`bx ${isMenuOpen ? 'bx-x' : 'bx-menu'} text-xl text-white`}
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Modal */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
            >
              <div className="bg-white/20 backdrop-blur-2xl rounded-t-3xl p-6 shadow-2xl ring-1 ring-white/20">
                <div className="w-12 h-1 bg-white/40 rounded-full mx-auto mb-6" />
                
                <div className="space-y-4">
                  {[...leftNavItems, ...rightNavItems].map(item => (
                    <motion.button
                      key={item.name}
                      whileHover={{ x: 8 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => scrollToSection(item.href)}
                      className={`block w-full text-left py-4 px-6 rounded-2xl transition-all duration-300 ${
                        activeSection === item.href.slice(1)
                          ? 'bg-cyan-400/20 text-cyan-400 font-semibold'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          activeSection === item.href.slice(1) ? 'bg-cyan-400' : 'bg-white/30'
                        }`} />
                        {item.name}
                      </div>
                    </motion.button>
                  ))}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection('#demo')}
                  className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-teal-500 text-white py-4 rounded-2xl font-semibold shadow-lg"
                >
                  Try Demo
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
