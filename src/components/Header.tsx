import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SearchSpotlight from "./SearchSpotlight";
import { Link, useLocation } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", href: "/", iconClass: "bx-home-alt" },
    { name: "About", href: "#about", iconClass: "bx-info-circle" },
    { name: "Features", href: "#features", iconClass: "bx-category" },
    { name: "Solar System", href: "/dashboard", iconClass: "bx-planet" },
    {
      name: "Mission Planner",
      href: "/mission-planner",
      iconClass: "bx-rocket",
    },
    { name: "Pricing", href: "/pricing", iconClass: "bx-dollar-circle" },
    // { name: 'Contact', href: '#contact', iconClass: 'bx-envelope' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname === href;
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          scale: scrolled ? 0.95 : 1,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-6 left-0 right-0 z-50"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center">
            <motion.div
              className={`flex w-full lg:w-auto justify-between items-center rounded-full p-2 transition-all duration-300 ${
                scrolled ? "glass backdrop-blur-3xl shadow-2xl" : "glass"
              }`}
              animate={{
                backdropFilter: scrolled ? "blur(20px)" : "blur(10px)",
                boxShadow: scrolled
                  ? "0 20px 40px rgba(0, 0, 0, 0.15)"
                  : "0 8px 32px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="flex items-center">
                <motion.button
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center gap-2 text-gray-900 font-semibold pl-2 pr-4 hover:text-gray-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.i
                    className="bx bx-search text-xl text-gray-700"
                    animate={{ rotate: searchOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="text-base">search</span>
                </motion.button>

                <div className="w-px h-6 bg-black/10 hidden md:block" />

                <TooltipProvider>
                  <nav className="hidden md:flex items-center">
                    {navItems.map((item, index) => (
                      <React.Fragment key={item.name}>
                        <Tooltip delayDuration={0}>
                          <TooltipTrigger asChild>
                            {item.href.startsWith("/") ? (
                              <Link
                                to={item.href}
                                className={`p-3 transition-all duration-300 flex items-center justify-center w-11 h-11 rounded-full ${
                                  isActiveRoute(item.href)
                                    ? "text-blue-600 bg-blue-50 scale-110"
                                    : "text-gray-800 hover:text-gray-950 hover:bg-gray-50 hover:scale-105"
                                }`}
                              >
                                <motion.i
                                  className={`bx ${item.iconClass} text-2xl`}
                                  aria-label={item.name}
                                  animate={{
                                    rotate: isActiveRoute(item.href) ? 360 : 0,
                                  }}
                                  transition={{ duration: 0.5 }}
                                />
                              </Link>
                            ) : (
                              <a
                                href={item.href}
                                className="p-3 text-gray-800 hover:text-gray-950 hover:bg-gray-50 hover:scale-105 transition-all duration-300 flex items-center justify-center w-11 h-11 rounded-full"
                              >
                                <i
                                  className={`bx ${item.iconClass} text-2xl`}
                                  aria-label={item.name}
                                ></i>
                              </a>
                            )}
                          </TooltipTrigger>
                          <TooltipContent className="bg-black text-white border-none shadow-lg">
                            <p className="font-medium">{item.name}</p>
                          </TooltipContent>
                        </Tooltip>
                        {index < navItems.length - 1 && (
                          <div className="w-px h-4 bg-black/10" />
                        )}
                      </React.Fragment>
                    ))}
                  </nav>
                </TooltipProvider>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/nasa-chat"
                  className="ml-2 bg-gradient-to-r from-gray-900 to-gray-700 text-white text-sm px-4 py-2.5 rounded-full hover:from-black hover:to-gray-800 transition-all duration-300 font-medium whitespace-nowrap shadow-lg"
                >
                  Early Access
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <SearchSpotlight open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
};

export default Header;
