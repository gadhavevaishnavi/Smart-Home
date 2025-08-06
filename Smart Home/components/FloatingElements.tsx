import React from 'react';
import { motion } from 'motion/react';

interface FloatingElementsProps {
  settingsMode: boolean;
}

export function FloatingElements({ settingsMode }: FloatingElementsProps) {
  const elements = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 40 + 20,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 15,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute rounded-full transition-colors duration-1000 ${
            settingsMode 
              ? 'bg-gradient-to-br from-purple-400/20 to-pink-400/20' 
              : 'bg-gradient-to-br from-blue-400/20 to-purple-400/20'
          }`}
          style={{
            width: element.size,
            height: element.size,
            left: `${element.x}%`,
            top: `${element.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -15, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Geometric shapes */}
      <motion.div
        className={`absolute top-1/4 right-1/4 w-20 h-20 border-2 transition-colors duration-1000 ${
          settingsMode ? 'border-cyan-400/30' : 'border-blue-400/30'
        }`}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <motion.div
        className={`absolute bottom-1/3 left-1/3 w-16 h-16 transition-colors duration-1000 ${
          settingsMode 
            ? 'bg-gradient-to-br from-pink-400/20 to-purple-400/20' 
            : 'bg-gradient-to-br from-purple-400/20 to-blue-400/20'
        }`}
        style={{
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        }}
        animate={{
          rotate: [0, -360],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className={`absolute top-2/3 right-1/3 w-12 h-12 rounded-full border-2 transition-colors duration-1000 ${
          settingsMode ? 'border-emerald-400/40' : 'border-green-400/40'
        }`}
        animate={{
          scale: [1, 2, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}