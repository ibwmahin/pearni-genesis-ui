
import React from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowUpRight } from 'lucide-react';

const Header = () => {
  const navItems = [
    { name: 'Docs', href: '/docs' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-6 left-0 right-0 z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Left spacer for desktop to center the nav pill */}
          <div className="hidden lg:flex flex-1" />

          {/* Centered Nav Pill */}
          <div className="flex w-full lg:w-auto justify-between items-center bg-white/80 backdrop-blur-md rounded-full shadow-lg ring-1 ring-black/5 p-2">
            <div className="flex items-center">
              {/* Brand */}
              <a href="/" className="flex items-center gap-2 text-gray-800 font-semibold pl-2 pr-4">
                <Search className="w-5 h-5 text-gray-600" />
                <span className="text-base">eco</span>
              </a>
              {/* Divider */}
              <div className="w-px h-6 bg-gray-200 hidden md:block" />

              {/* Nav Items */}
              <nav className="hidden md:flex items-center">
                {navItems.map((item, index) => (
                  <React.Fragment key={item.name}>
                    <a
                      href={item.href}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {item.name}
                    </a>
                    {index < navItems.length - 1 && <div className="w-px h-4 bg-gray-200" />}
                  </React.Fragment>
                ))}
              </nav>
            </div>

            {/* Early Access Button */}
            <a href="#" className="ml-2 bg-gray-800 text-white text-sm px-4 py-2.5 rounded-full hover:bg-gray-900 transition-colors font-medium whitespace-nowrap">
              Early Access
            </a>
          </div>

          {/* Social Links on right */}
          <div className="hidden lg:flex flex-1 justify-end items-center gap-4">
             <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors font-medium">
              DISCORD
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors font-medium">
              X
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
