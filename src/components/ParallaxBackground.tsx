
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ParallaxBackground = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />
      
      {/* Floating geometric shapes */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-cyan-400/10 to-teal-400/10 blur-3xl"
        style={{
          top: '10%',
          left: '10%',
          transform: `translateY(${scrollY * 0.2}px) rotate(${scrollY * 0.1}deg)`,
        }}
      />
      
      <motion.div
        className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-blue-400/10 to-purple-400/10 blur-3xl"
        style={{
          top: '60%',
          right: '10%',
          transform: `translateY(${scrollY * -0.15}px) rotate(${scrollY * -0.05}deg)`,
        }}
      />
      
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-teal-400/10 to-green-400/10 blur-3xl"
        style={{
          bottom: '20%',
          left: '20%',
          transform: `translateY(${scrollY * 0.25}px) rotate(${scrollY * 0.15}deg)`,
        }}
      />
      
      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cyan-400/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `translateY(${scrollY * (0.1 + Math.random() * 0.3)}px)`,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export default ParallaxBackground;
