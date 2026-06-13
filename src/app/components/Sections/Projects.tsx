import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projects, ProjectMeta } from '@/app/data/projects';
import { useLanguage } from '@/app/i18n/LanguageProvider';

const wrap = (index: number, length: number) => ((index % length) + length) % length;

const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;
const SWIPE_THRESHOLD = 8000;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '60%' : '-60%',
    opacity: 0,
    scale: 0.9,
    rotateY: direction * 8,
  }),
  center: { x: 0, opacity: 1, scale: 1, rotateY: 0 },
  exit: (direction: number) => ({
    x: direction > 0 ? '-60%' : '60%',
    opacity: 0,
    scale: 0.9,
    rotateY: direction * -8,
  }),
};

const slideTransition = {
  x: { type: 'spring', stiffness: 300, damping: 30 },
  opacity: { duration: 0.25 },
  scale: { duration: 0.3 },
};

const ProjectCard = ({ project, onOpen }: { project: ProjectMeta; onOpen: () => void }) => {
  const { t } = useLanguage();
  const content = t.projects.items[project.id];

  return (
    <div
      onClick={onOpen}
      className="glass-card overflow-hidden cursor-pointer group h-full
        hover:border-indigo-400/40 transition-colors duration-300"
    >
      <div className="p-3 pb-0">
        <project.Preview />
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between gap-2">
          <span className="px-3 py-1 text-xs sm:text-sm bg-indigo-500/20 border border-indigo-500/30 rounded-full text-indigo-200">
            {content.category}
          </span>
          <span className="text-xs sm:text-sm text-white/40 group-hover:text-indigo-300 transition-colors flex items-center gap-1">
            {t.projects.viewDetails}
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-white mt-3">{content.title}</h3>
        <p className="text-sm sm:text-base text-white/70 mt-2 line-clamp-2">{content.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.technologies.map((tech) => (
            <span key={tech} className="px-2 py-0.5 text-xs bg-white/5 border border-white/10 rounded-full text-white/60">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectModal = ({ project, onClose }: { project: ProjectMeta; onClose: () => void }) => {
  const { t } = useLanguage();
  const content = t.projects.items[project.id];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 12 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-card relative p-5 sm:p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white/80 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <project.Preview />

        <h3 className="text-xl sm:text-2xl font-bold text-white mt-6 mb-2">{content.title}</h3>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span key={tech} className="px-3 py-1 text-sm bg-indigo-500/20 border border-indigo-500/30 rounded-full text-white/90">
              {tech}
            </span>
          ))}
        </div>

        <p className="text-white/80 mb-6">{content.longDescription}</p>

        <h4 className="text-lg font-semibold text-white mb-2">{t.projects.keyFeatures}</h4>
        <ul className="space-y-2">
          {content.keyFeatures.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-white/80">
              <svg className="w-4 h-4 mt-1 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const { t } = useLanguage();
  const [[page, direction], setPage] = useState([0, 0]);
  const [modalProject, setModalProject] = useState<ProjectMeta | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { ref: sectionRef, inView } = useInView({ threshold: 0.2 });

  const activeIndex = wrap(page, projects.length);
  const project = projects[activeIndex];

  const paginate = useCallback((dir: number) => {
    setPage(([p]) => [p + dir, dir]);
  }, []);

  useEffect(() => {
    if (isHovered || modalProject || !inView) return;
    const id = setInterval(() => paginate(1), 7000);
    return () => clearInterval(id);
  }, [isHovered, modalProject, inView, paginate]);

  return (
    <section ref={sectionRef} className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-white to-indigo-200 bg-clip-text text-transparent mb-4">
            {t.projects.title}
          </h2>
          <p className="text-xl text-white/80">{t.projects.subtitle}</p>
        </motion.div>

        <div
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Side ghosts: dimmed neighbors for depth */}
          <div className="hidden lg:block absolute -left-24 top-1/2 -translate-y-1/2 w-48 h-[70%] pointer-events-none">
            <div className="glass-card w-full h-full opacity-30 blur-[2px] scale-90 flex items-end p-4">
              <p className="text-sm text-white/60 font-medium line-clamp-2">
                {t.projects.items[projects[wrap(page - 1, projects.length)].id].title}
              </p>
            </div>
          </div>
          <div className="hidden lg:block absolute -right-24 top-1/2 -translate-y-1/2 w-48 h-[70%] pointer-events-none">
            <div className="glass-card w-full h-full opacity-30 blur-[2px] scale-90 flex items-end p-4">
              <p className="text-sm text-white/60 font-medium line-clamp-2">
                {t.projects.items[projects[wrap(page + 1, projects.length)].id].title}
              </p>
            </div>
          </div>

          {/* Stage */}
          <div
            className="relative z-10 outline-none"
            style={{ perspective: 1200 }}
            tabIndex={0}
            role="region"
            aria-label="Projects carousel"
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') paginate(-1);
              if (e.key === 'ArrowRight') paginate(1);
            }}
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={slideTransition}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                onDragEnd={(_, { offset, velocity }) => {
                  const power = swipePower(offset.x, velocity.x);
                  if (power < -SWIPE_THRESHOLD) paginate(1);
                  else if (power > SWIPE_THRESHOLD) paginate(-1);
                }}
              >
                <ProjectCard project={project} onOpen={() => setModalProject(project)} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Arrows */}
          <button
            onClick={() => paginate(-1)}
            aria-label="Previous project"
            className="absolute -left-4 sm:-left-14 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20
              p-2 rounded-full backdrop-blur-sm border border-white/20 transition-colors"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => paginate(1)}
            aria-label="Next project"
            className="absolute -right-4 sm:-right-14 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20
              p-2 rounded-full backdrop-blur-sm border border-white/20 transition-colors"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {projects.map((p, index) => (
              <button
                key={p.id}
                aria-label={`Go to project ${index + 1}`}
                onClick={() => setPage([page + (index - activeIndex), index > activeIndex ? 1 : -1])}
                className="relative h-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors w-2"
              >
                {index === activeIndex && (
                  <motion.span
                    layoutId="activeDot"
                    className="absolute inset-0 -left-2 -right-2 rounded-full bg-gradient-to-r from-indigo-400 to-violet-400"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {modalProject && <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
