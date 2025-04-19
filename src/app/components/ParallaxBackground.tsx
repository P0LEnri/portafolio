// ParallaxBackground.tsx
import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const NeuralBackground = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const connections = useRef([]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const initCanvas = () => {
      canvas.width = width;
      canvas.height = height;
      particles.current = Array(35).fill().map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 1.5 + 1
      }));
    };

    const connectParticles = () => {
      connections.current = [];
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const dx = particles.current[i].x - particles.current[j].x;
          const dy = particles.current[i].y - particles.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 250) {
            connections.current.push({
              start: particles.current[i],
              end: particles.current[j],
              opacity: 1 - distance / 250
            });
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.current.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fill();
      });
      
      connectParticles();
      connections.current.forEach(connection => {
        ctx.beginPath();
        ctx.moveTo(connection.start.x, connection.start.y);
        ctx.lineTo(connection.end.x, connection.end.y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${connection.opacity * 0.2})`;
        ctx.lineWidth = 0.3;
        ctx.stroke();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      initCanvas();
    };

    window.addEventListener('resize', handleResize);
    initCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden">
      {/* Base gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#0A2540] to-[#0F2D4A]"
      />
      
      {/* Accent gradient overlay */}
      <div
        className="absolute inset-0 opacity-40 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10"
      />
      
      {/* Neural network canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />

      {/* Dot pattern overlay */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          opacity: 0.3
        }} 
      />
    </div>
  );
};

export default NeuralBackground;