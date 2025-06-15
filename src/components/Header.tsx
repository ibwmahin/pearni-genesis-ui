
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Features', href: '#features' },
    { name: 'Demo', href: '#demo' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
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

  const liquidNavVariants = {
    initial: { 
      backdropFilter: 'blur(0px)',
      background: 'rgba(255, 255, 255, 0)',
      borderRadius: '0px',
    },
    scrolled: { 
      backdropFilter: 'blur(20px)',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '24px',
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.6
      }
    }
  };

  const navItemVariants = {
    initial: { 
      scale: 1,
      backgroundColor: 'rgba(255, 255, 255, 0)',
      color: 'rgba(255, 255, 255, 0.8)'
    },
    hover: { 
      scale: 1.05,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      color: 'rgba(255, 255, 255, 1)',
      borderRadius: '16px',
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 25,
        duration: 0.3
      }
    },
    active: {
      backgroundColor: 'rgba(34, 211, 238, 0.3)',
      color: 'rgba(34, 211, 238, 1)',
      borderRadius: '16px',
      scale: 1.02,
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const logoVariants = {
    initial: { rotate: 0, scale: 1 },
    hover: { 
      rotate: 10,
      scale: 1.1,
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 20
      }
    },
    tap: { scale: 0.9 }
  };

  return (
    <motion.nav
      variants={liquidNavVariants}
      initial="initial"
      animate={isScrolled ? "scrolled" : "initial"}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 border border-white/20 shadow-2xl"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      }}
    >
      <div className="flex items-center justify-center space-x-8">
        {/* Logo */}
        <motion.button
          variants={logoVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={() => scrollToSection('#hero')}
          className="flex items-center space-x-2 px-3 py-2"
        >
          <motion.i 
            className='bx bxs-pear text-cyan-400 text-2xl'
            animate={{ 
              filter: [
                'drop-shadow(0 0 5px rgba(34, 211, 238, 0.5))',
                'drop-shadow(0 0 15px rgba(34, 211, 238, 0.8))',
                'drop-shadow(0 0 5px rgba(34, 211, 238, 0.5))'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-white font-bold tracking-wide hidden sm:block">
            pearNI
          </span>
        </motion.button>

        {/* Navigation Items - Desktop */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <motion.button
              key={item.name}
              variants={navItemVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              animate={activeSection === item.href.slice(1) ? "active" : "initial"}
              onClick={() => scrollToSection(item.href)}
              className="relative px-4 py-2 text-sm font-medium transition-all duration-300"
            >
              {item.name}
              {activeSection === item.href.slice(1) && (
                <motion.div
                  layoutId="liquidIndicator"
                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full"
                  style={{
                    boxShadow: '0 0 10px rgba(34, 211, 238, 0.8)'
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-full bg-white/20 backdrop-blur-lg border border-white/30"
        >
          <motion.i 
            className={`bx ${isMenuOpen ? 'bx-x' : 'bx-menu'} text-xl text-white`}
            animate={{ rotate: isMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ 
              type: "spring",
              stiffness: 400,
              damping: 30
            }}
            className="absolute top-full left-0 right-0 mt-2 p-4 rounded-2xl backdrop-blur-2xl bg-black/60 border border-white/20 md:hidden"
          >
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 8, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left py-3 px-4 rounded-xl text-white/90 hover:text-white transition-all duration-300"
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Header;
