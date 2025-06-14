
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Features', href: '#features' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const linkVariants = {
    initial: { opacity: 0.7 },
    hover: { 
      opacity: 1,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  const underlineVariants = {
    initial: { scaleX: 0, originX: 0 },
    hover: { 
      scaleX: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => scrollToSection('#hero')}
          >
            <div className="w-10 h-10 glass rounded-xl flex items-center justify-center">
              <i className='bx bxs-pear text-2xl gradient-text'></i>
            </div>
            <span className="text-xl font-bold text-gray-800">pearNI</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                variants={linkVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => scrollToSection(item.href)}
                className="relative text-gray-700 font-medium overflow-hidden"
              >
                {item.name}
                <motion.div
                  variants={underlineVariants}
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500"
                />
              </motion.button>
            ))}
          </nav>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('#demo')}
            className="hidden md:block bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Try Demo
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden glass rounded-lg p-2"
          >
            <i className={`bx ${isMenuOpen ? 'bx-x' : 'bx-menu'} text-xl`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 glass rounded-xl p-4"
          >
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left py-3 px-4 text-gray-700 hover:text-teal-600 hover:bg-white/20 rounded-lg transition-colors duration-300"
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('#demo')}
              className="w-full mt-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 rounded-lg font-semibold"
            >
              Try Demo
            </button>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
