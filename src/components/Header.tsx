
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import SearchSpotlight from './SearchSpotlight';

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Features', href: '#features' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Mission Planner', href: '/mission-planner' },
    { name: 'Demo', href: '#demo' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-6 left-0 right-0 z-50"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center">
            {/* Centered Nav Pill with liquid glass effect */}
            <div className="flex w-full lg:w-auto justify-between items-center glass rounded-full p-2">
              <div className="flex items-center">
                {/* Brand with Search Icon */}
                <button 
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center gap-2 text-gray-900 font-semibold pl-2 pr-4 hover:text-gray-700 transition-colors"
                >
                  <Search className="w-5 h-5 text-gray-700" />
                  <span className="text-base">search</span>
                </button>
                {/* Divider */}
                <div className="w-px h-6 bg-black/10 hidden md:block" />

                {/* Nav Items */}
                <nav className="hidden md:flex items-center">
                  {navItems.map((item, index) => (
                    <React.Fragment key={item.name}>
                      <a
                        href={item.href}
                        className="px-3 py-2 text-sm text-gray-800 font-medium hover:text-gray-950 transition-colors"
                      >
                        {item.name}
                      </a>
                      {index < navItems.length - 1 && <div className="w-px h-4 bg-black/10" />}
                    </React.Fragment>
                  ))}
                </nav>
              </div>

              {/* Early Access Button - Now leads to NASA Chat */}
              <a href="/nasa-chat" className="ml-2 bg-gray-900 text-white text-sm px-4 py-2.5 rounded-full hover:bg-black transition-colors font-medium whitespace-nowrap">
                Early Access
              </a>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Search Spotlight */}
      <SearchSpotlight open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
};

export default Header;
