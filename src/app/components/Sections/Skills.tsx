import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillMeta } from '@/app/data/skills';
import { useLanguage } from '@/app/i18n/LanguageProvider';
import { SkillCategoryT } from '@/app/i18n/translations';

const categoryIcons: Record<string, React.ReactNode> = {
  genai: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
  ),
  ml: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
    </svg>
  ),
  engineering: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  ),
};

const CategoryCard = ({
  id,
  hero,
  category,
  index,
}: {
  id: string;
  hero?: boolean;
  category: SkillCategoryT;
  index: number;
}) => {
  const [expanded, setExpanded] = useState(0);
  const activeIndex = expanded % category.skills.length;
  const activeSkill = category.skills[activeIndex];

  const inner = (
    <div className="relative h-full bg-[#0B1120]/90 backdrop-blur-md rounded-2xl p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-5">
        <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-indigo-500/15 border border-indigo-400/30 text-indigo-300">
          {categoryIcons[id]}
        </span>
        <h3 className="text-lg sm:text-xl font-bold text-white">{category.title}</h3>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {category.skills.map((skill, i) => (
          <motion.button
            key={skill.name}
            onClick={() => setExpanded(i)}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.08 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors duration-300 ${
              i === activeIndex
                ? 'bg-gradient-to-r from-indigo-500/40 to-violet-500/40 border-indigo-400/50 text-white'
                : 'bg-white/5 border-white/10 text-white/65 hover:border-white/25 hover:text-white'
            }`}
          >
            {skill.name}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSkill.name}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden"
        >
          <div className="flex flex-wrap gap-2 pt-1">
            {activeSkill.subskills.map((sub, i) => (
              <motion.span
                key={sub}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.07 }}
                className="px-3 py-1 text-xs sm:text-sm rounded-lg bg-indigo-400/10 border border-indigo-400/20 text-indigo-200"
              >
                {sub}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover={{ y: -4 }}
      className={hero ? 'lg:col-span-2' : ''}
    >
      {hero ? (
        // Animated conic-gradient border ring on the hero card
        <div className="relative rounded-2xl p-px overflow-hidden h-full">
          <div
            className="absolute -inset-[150%] animate-spin-slow"
            style={{
              background:
                'conic-gradient(from 0deg, transparent 0%, rgba(129,140,248,0.7) 12%, rgba(192,132,252,0.7) 22%, transparent 35%, transparent 100%)',
            }}
          />
          {inner}
        </div>
      ) : (
        <div className="relative rounded-2xl p-px bg-white/10 hover:bg-white/20 transition-colors duration-300 h-full">
          {inner}
        </div>
      )}
    </motion.div>
  );
};

const Skills = () => {
  const { t } = useLanguage();

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
            {t.skills.title}
          </h2>
          <p className="text-xl text-white/80">{t.skills.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {skillMeta.map((meta, index) => (
            <CategoryCard
              key={meta.id}
              id={meta.id}
              hero={meta.hero}
              category={t.skills.categories[meta.id]}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
