
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SearchSpotlight from './SearchSpotlight';
import { Link } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  
  const navItems = [
    { name: 'Home', href: '/', iconClass: 'bx-home-alt' },
    { name: 'About', href: '#about', iconClass: 'bx-info-circle' },
    { name: 'Features', href: '#features', iconClass: 'bx-category' },
    { name: 'Solar System', href: '/dashboard', iconClass: 'bx-planet' },
    { name: 'Mission Planner', href: '/mission-planner', iconClass: 'bx-rocket' },
    { name: 'Pricing', href: '/pricing', iconClass: 'bx-dollar-circle' },
    { name: 'Contact', href: '#contact', iconClass: 'bx-envelope' },
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
                  <i className='bx bx-search text-xl text-gray-700'></i>
                  <span className="text-base">search</span>
                </button>
                {/* Divider */}
                <div className="w-px h-6 bg-black/10 hidden md:block" />

                {/* Nav Items */}
                <TooltipProvider>
                  <nav className="hidden md:flex items-center">
                    {navItems.map((item, index) => (
                      <React.Fragment key={item.name}>
                        <Tooltip delayDuration={0}>
                          <TooltipTrigger asChild>
                            {item.href.startsWith('/') ? (
                              <Link
                                to={item.href}
                                className="p-3 text-gray-800 hover:text-gray-950 transition-colors flex items-center justify-center w-11 h-11"
                              >
                                <i className={`bx ${item.iconClass} text-2xl`} aria-label={item.name}></i>
                              </Link>
                            ) : (
                              <a
                                href={item.href}
                                className="p-3 text-gray-800 hover:text-gray-950 transition-colors flex items-center justify-center w-11 h-11"
                              >
                                <i className={`bx ${item.iconClass} text-2xl`} aria-label={item.name}></i>
                              </a>
                            )}
                          </TooltipTrigger>
                          <TooltipContent className="bg-black text-white">
                            <p>{item.name}</p>
                          </TooltipContent>
                        </Tooltip>
                        {index < navItems.length - 1 && <div className="w-px h-4 bg-black/10" />}
                      </React.Fragment>
                    ))}
                  </nav>
                </TooltipProvider>
              </div>

              {/* Early Access Button - Now leads to NASA Chat */}
              <Link to="/nasa-chat" className="ml-2 bg-gray-900 text-white text-sm px-4 py-2.5 rounded-full hover:bg-black transition-colors font-medium whitespace-nowrap">
                Early Access
              </Link>
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
