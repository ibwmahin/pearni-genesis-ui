
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();

  const navItems = [
    { name: 'Docs', href: '#about' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
    { name: 'NASA Chat', href: '/nasa-chat' }
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
    if (href.startsWith('/')) {
      window.location.href = href;
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
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
        type: "tween",
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
          opacity: 1
        }}
        transition={{ duration: 0.6 }}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl px-4"
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl">
          <div className="flex justify-between items-center py-3 px-6">
            {/* Brand Logo */}
            <motion.button
              initial={{ scale: 1 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection('#hero')}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 flex items-center justify-center">
                <motion.i
                  className='bx bxs-pear text-white text-lg'
                  animate={{
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </div>
              <span className="text-white font-bold text-lg tracking-wide">
                eco
              </span>
            </motion.button>

            {/* Navigation Items - Desktop */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map(item => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0.8 }}
                  whileHover={{
                    opacity: 1,
                    y: -1,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.href)}
                  className="relative text-white/80 hover:text-white transition-colors duration-300 text-sm font-medium"
                >
                  {item.name}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileHover={{
                      scaleX: 1,
                      transition: { duration: 0.3 }
                    }}
                    className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full origin-left"
                  />
                </motion.button>
              ))}
            </div>

            {/* Early Access Button */}
            <div className="hidden md:flex items-center gap-4">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection('#demo')}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-lg border border-white/30 transition-all duration-300"
              >
                Early Access
              </motion.button>
              
              {/* Discord and X Icons */}
              <div className="flex items-center gap-2">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300"
                >
                  <i className='bx bxl-discord text-white text-sm'></i>
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300"
                >
                  <i className='bx bxl-twitter text-white text-sm'></i>
                </motion.a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden bg-white/20 backdrop-blur-lg rounded-full p-2 ring-1 ring-white/30 border border-white/10"
            >
              <motion.i
                className={`bx ${isMenuOpen ? 'bx-x' : 'bx-menu'} text-lg text-white`}
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
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
                  {navItems.map(item => (
                    <motion.button
                      key={item.name}
                      whileHover={{ x: 8 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => scrollToSection(item.href)}
                      className="block w-full text-left py-4 px-6 rounded-2xl transition-all duration-300 text-white/80 hover:bg-white/10 hover:text-white"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-white/30" />
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
                  Early Access
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
