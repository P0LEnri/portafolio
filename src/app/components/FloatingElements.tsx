import React from 'react';
import { motion } from 'framer-motion';

const FloatingElements = () => {
  const elements = [
    { icon: '🧠', text: 'ML Models', delay: 0 },
    { icon: '🔄', text: 'Neural Networks', delay: 0.2 },
    { icon: '📊', text: 'Data Analysis', delay: 0.4 },
    { icon: '🤖', text: 'AI Agents', delay: 0.6 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.1, 1],
            x: [0, 10, 0],
            y: [0, -10, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: element.delay,
          }}
          style={{
            left: `${25 + (index * 25)}%`,
            top: `${20 + (index * 20)}%`,
          }}
        >
          <div className="flex items-center space-x-2 bg-surface-glass backdrop-blur-sm rounded-full px-4 py-2">
            <span className="text-2xl">{element.icon}</span>
            <span className="text-text-light text-sm font-medium">{element.text}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;