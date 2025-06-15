import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ParallaxBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 100, 
        y: (e.clientY / window.innerHeight) * 100 
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Enhanced gradient background with mouse interaction */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(20, 184, 166, 0.1) 0%, 
            rgba(6, 182, 212, 0.08) 25%, 
            rgba(59, 130, 246, 0.06) 50%, 
            rgba(147, 51, 234, 0.04) 75%, 
            rgba(248, 250, 252, 0.02) 100%)`,
        }}
      />
      
      {/* AI-themed floating geometric shapes */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-30"
        style={{
          background: 'conic-gradient(from 0deg, rgba(20, 184, 166, 0.2), rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2), rgba(20, 184, 166, 0.2))',
          top: '10%',
          left: '10%',
          filter: 'blur(40px)',
        }}
      />
      
      <motion.div
        className="absolute w-80 h-80 rounded-full opacity-25"
        style={{
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(147, 51, 234, 0.15))',
          top: '60%',
          right: '10%',
          filter: 'blur(35px)',
        }}
      />
      
      <motion.div
        className="absolute w-64 h-64 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.2), rgba(20, 184, 166, 0.2))',
          bottom: '20%',
          left: '30%',
          filter: 'blur(30px)',
        }}
      />
      
      {/* Interactive neural network pattern */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + (i * 8)}%`,
              top: `${20 + Math.sin(i) * 30}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            <div className="w-2 h-2 bg-cyan-400 rounded-full" />
            <motion.div
              className="absolute top-1 left-1 w-8 h-px bg-gradient-to-r from-cyan-400 to-transparent"
              animate={{ scaleX: [0, 1, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          </motion.div>
        ))}
      </div>
      
      {/* Enhanced floating particles with sustainability theme */}
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0 
              ? 'rgba(34, 197, 94, 0.4)' // Green for sustainability
              : i % 3 === 1 
              ? 'rgba(34, 211, 238, 0.4)' // Cyan for AI
              : 'rgba(59, 130, 246, 0.4)', // Blue for tech
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
            x: [0, Math.sin(i) * 20, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* 3D-like rotating elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 opacity-20"
        animate={{
          rotateX: 360,
          rotateY: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          width: '60px',
          height: '60px',
          background: 'linear-gradient(45deg, rgba(20, 184, 166, 0.3), rgba(6, 182, 212, 0.3))',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          filter: 'blur(2px)',
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/4 opacity-15"
        animate={{
          rotateZ: -360,
          scale: [0.8, 1.3, 0.8],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          width: '40px',
          height: '40px',
          background: 'conic-gradient(from 0deg, rgba(34, 197, 94, 0.4), rgba(59, 130, 246, 0.4), rgba(147, 51, 234, 0.4))',
          borderRadius: '50%',
          filter: 'blur(1px)',
        }}
      />
    </div>
  );
};

export default ParallaxBackground;
