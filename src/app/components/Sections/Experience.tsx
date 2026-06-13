import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { experiences, ExperienceEntry } from '@/app/data/experience';

const ExperienceCard = ({ experience, index }: { experience: ExperienceEntry; index: number }) => {
  const isLeft = index % 2 === 0;

  return (
    <div className="relative pl-14 md:pl-0">
      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        className="absolute left-5 md:left-1/2 top-8 -translate-x-1/2 z-10
          flex items-center justify-center w-10 h-10 rounded-full
          bg-[#0B1120] border border-indigo-400/40 text-indigo-300
          shadow-[0_0_18px_rgba(129,140,248,0.35)]"
      >
        {experience.icon}
      </motion.div>

      <div className={`md:grid md:grid-cols-2 md:gap-16 ${isLeft ? '' : ''}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ y: -4 }}
          className={`glass-card p-6 group relative overflow-hidden
            hover:border-indigo-400/30 transition-colors duration-300
            ${isLeft ? 'md:col-start-1' : 'md:col-start-2'}`}
        >
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-indigo-200 transition-colors duration-300">
                {experience.title}
              </h3>
              <p className="text-white/70">{experience.company}</p>
            </div>
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <span className="px-3 py-1 text-xs sm:text-sm font-semibold bg-indigo-500/20 border border-indigo-500/30 text-white rounded-full whitespace-nowrap">
                {experience.year}
              </span>
              {experience.current && (
                <span className="flex items-center gap-1.5 px-2 py-0.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wide bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 rounded-full">
                  <span className="relative flex w-1.5 h-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-emerald-400" />
                  </span>
                  Current
                </span>
              )}
            </div>
          </div>

          <p className="text-white/85 mb-4">{experience.description}</p>

          <ul className="space-y-2">
            {experience.achievements.map((achievement, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.07 }}
                className="flex items-start gap-2 text-sm sm:text-base text-white/75"
              >
                <span className="text-indigo-400 mt-0.5">▸</span>
                <span>{achievement}</span>
              </motion.li>
            ))}
          </ul>

          <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </motion.div>
      </div>
    </div>
  );
};

const Experience = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-white to-indigo-200 bg-clip-text text-transparent mb-4">
            My Journey
          </h2>
          <p className="text-xl text-white/80">Exploring the frontiers of technology and innovation</p>
        </motion.div>

        <div ref={timelineRef} className="relative">
          {/* Static rail */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/10" />
          {/* Scroll-drawn gradient line */}
          <motion.div
            style={{ scaleY: lineProgress }}
            className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 origin-top
              bg-gradient-to-b from-indigo-400 via-violet-400 to-fuchsia-400
              shadow-[0_0_12px_rgba(129,140,248,0.6)]"
          />

          <div className="space-y-14">
            {experiences.map((experience, index) => (
              <ExperienceCard key={experience.year + experience.title} experience={experience} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
