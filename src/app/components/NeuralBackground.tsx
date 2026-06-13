import React, { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hue: number;
};

const NeuralBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const initCanvas = () => {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles.current = Array(40)
        .fill(undefined)
        .map(() => ({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: Math.random() * 1.5 + 1,
          // indigo (230) to violet (270)
          hue: 230 + Math.random() * 40,
        }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.current.forEach((particle) => {
        // gentle attraction toward the cursor
        if (mouse.current) {
          const dx = mouse.current.x - particle.x;
          const dy = mouse.current.y - particle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180 && dist > 1) {
            particle.vx += (dx / dist) * 0.004;
            particle.vy += (dy / dist) * 0.004;
          }
        }

        // keep velocity bounded so attraction never accelerates forever
        particle.vx = Math.max(-0.4, Math.min(0.4, particle.vx));
        particle.vy = Math.max(-0.4, Math.min(0.4, particle.vy));

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 85%, 78%, 0.55)`;
        ctx.fill();
      });

      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const a = particles.current[i];
          const b = particles.current[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 220) {
            const opacity = (1 - distance / 220) * 0.18;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `hsla(245, 80%, 80%, ${opacity})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      initCanvas();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouse.current = null;
    };

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else if (!reducedMotion) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibility);
    initCanvas();

    if (reducedMotion) {
      // draw a single static frame
      animate();
      cancelAnimationFrame(animationFrameId);
    } else {
      animate();
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden">
      {/* Base gradient: deep navy into purple */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#060B1A] via-[#0B1B3A] to-[#1A1040]" />

      {/* Accent gradient overlay */}
      <div className="absolute inset-0 opacity-40 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10" />

      {/* Neural network canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          opacity: 0.3,
        }}
      />
    </div>
  );
};

export default NeuralBackground;
