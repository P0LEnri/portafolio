import React, { useEffect, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'framer-motion';
import { site } from '@/app/data/site';
import { asset } from '@/app/lib/paths';
import { useLanguage } from '@/app/i18n/LanguageProvider';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const RoleRotator = () => {
  const { t } = useLanguage();
  const rotations = t.hero.roleRotations;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % rotations.length), 3000);
    return () => clearInterval(id);
  }, [rotations.length]);

  // Reset to the first rotation when the language changes so we never index
  // stale content during the swap.
  const safeIndex = index % rotations.length;

  return (
    <h2 className="text-2xl md:text-4xl lg:text-[2.6rem] font-bold leading-tight">
      <span className="text-white">{t.hero.rolePrefix}</span>
      <span className="text-white/40 mx-3">·</span>
      <span className="inline-grid text-left align-bottom">
        <AnimatePresence mode="wait">
          <motion.span
            key={`${t.hero.rolePrefix}-${safeIndex}`}
            initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
            transition={{ type: 'spring', stiffness: 250, damping: 24 }}
            className="col-start-1 row-start-1 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400 whitespace-nowrap"
          >
            {rotations[safeIndex]}
          </motion.span>
        </AnimatePresence>
      </span>
    </h2>
  );
};

const Intro = () => {
  const { t } = useLanguage();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(450px circle at ${springX}px ${springY}px, rgba(129, 140, 248, 0.12), transparent 70%)`;

  const { scrollY } = useScroll();
  const scrollCueOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }}
    >
      {/* Mouse spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: spotlight, mixBlendMode: 'screen' }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto text-center"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <h1
            className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent animate-shimmer
              bg-gradient-to-r from-white via-indigo-200 to-white"
            style={{ backgroundSize: '200% auto' }}
          >
            {site.name}
          </h1>
          <div className="flex justify-center space-x-2">
            <motion.span
              className="h-1 w-12 bg-indigo-500 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            />
            <motion.span
              className="h-1 w-12 bg-purple-500 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.75, duration: 0.4 }}
            />
            <motion.span
              className="h-1 w-12 bg-pink-500 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6 mb-12">
          <RoleRotator />
          <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light max-w-3xl mx-auto">
            {t.hero.description.map((seg, i) =>
              seg.highlight ? (
                <span
                  key={i}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400 font-medium"
                >
                  {seg.text}
                </span>
              ) : (
                <React.Fragment key={i}>{seg.text}</React.Fragment>
              )
            )}
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href={asset('/cv.pdf')}
            download
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 bg-white text-gray-900 rounded-full font-medium text-lg
              hover:bg-indigo-50 transition-colors duration-300 flex items-center gap-2 animate-pulse-glow"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {t.hero.downloadCV}
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 bg-transparent border-2 border-white/20 text-white
              rounded-full font-medium text-lg hover:bg-white/10 hover:border-indigo-400/50
              transition-colors duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {t.hero.talk}
          </motion.a>
        </motion.div>

        {/* Decorative blurs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: scrollCueOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
      >
        <span className="text-xs uppercase tracking-[0.2em]">{t.hero.scroll}</span>
        <motion.svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </motion.svg>
      </motion.div>
    </div>
  );
};

export default Intro;
