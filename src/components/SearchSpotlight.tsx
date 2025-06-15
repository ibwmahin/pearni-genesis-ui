
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, ArrowRight, Clock, Star } from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface SearchSpotlightProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchSpotlight = ({ open, onOpenChange }: SearchSpotlightProps) => {
  const [searchValue, setSearchValue] = useState("");

  // Sample search suggestions
  const suggestions = [
    { icon: Star, title: "pearNI AI Chat", description: "Explore space with AI", href: "/nasa-chat" },
    { icon: ArrowRight, title: "Pricing", description: "View our plans", href: "/pricing" },
    { icon: Clock, title: "Recent Searches", description: "NASA missions", href: "#" },
    { icon: Search, title: "Mars Exploration", description: "Latest rover updates", href: "#" },
    { icon: Search, title: "SpaceX Launches", description: "Upcoming missions", href: "#" },
    { icon: Search, title: "International Space Station", description: "Live tracking", href: "#" },
  ];

  const filteredSuggestions = suggestions.filter(item =>
    item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.description.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="glass rounded-3xl border-2 shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 100%)',
          backdropFilter: 'blur(40px)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
        }}
      >
        <div className="flex items-center gap-3 px-6 py-4 border-b border-white/20">
          <Search className="w-5 h-5 text-gray-600" />
          <input
            placeholder="Search anything..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="flex-1 bg-transparent text-gray-900 placeholder-gray-500 text-lg outline-none"
            autoFocus
          />
          <div className="flex items-center gap-1 text-xs text-gray-500 bg-white/20 px-2 py-1 rounded-lg">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {filteredSuggestions.length > 0 ? (
            <div className="p-2">
              {filteredSuggestions.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    if (item.href !== "#") {
                      window.location.href = item.href;
                    }
                    onOpenChange(false);
                  }}
                  className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/20 cursor-pointer transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/30 flex items-center justify-center group-hover:bg-white/40 transition-colors">
                    <item.icon className="w-5 h-5 text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{item.title}</div>
                    <div className="text-sm text-gray-600">{item.description}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          ) : searchValue ? (
            <div className="p-8 text-center text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <div className="font-medium">No results found</div>
              <div className="text-sm">Try searching for something else</div>
            </div>
          ) : (
            <div className="p-2">
              <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quick Actions
              </div>
              {suggestions.slice(0, 4).map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    if (item.href !== "#") {
                      window.location.href = item.href;
                    }
                    onOpenChange(false);
                  }}
                  className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/20 cursor-pointer transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/30 flex items-center justify-center group-hover:bg-white/40 transition-colors">
                    <item.icon className="w-5 h-5 text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{item.title}</div>
                    <div className="text-sm text-gray-600">{item.description}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </CommandDialog>
  );
};

export default SearchSpotlight;
