import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  technologies: string[];
  keyFeatures: string[];
  image: string;
}

// Definir los proyectos fuera del componente
const projectsData: Project[] = [
  {
    id: 'trading-system',
    title: 'Automated Trading System with Web Scraping',
    category: 'Automation',
    description: 'Automated trading system integrating TradingView with Quantfury through advanced web scraping techniques.',
    longDescription: `Designed and developed a trading automation system using Python and Flask, integrating TradingView alerts and executing Quantfury commands through web scraping to overcome API limitations. The system enables seamless automated trading operations while maintaining high precision and rapid execution times.`,
    technologies: ['Python', 'Flask', 'Web Scraping', 'Trading'],
    keyFeatures: [
      'TradingView alerts integration',
      'Automated Quantfury operations',
      'Risk management system',
      'Real-time trade execution'
    ],

    image: '/portafolio/assets/botTradingview4.gif'
  },
  {
    id: 'tumor-classifier',
    title: 'Machine Learning Tumor Classifier',
    category: 'Machine Learning',
    description: 'Advanced ML system for classifying benign and malignant tumors with high accuracy.',
    longDescription: `Developed a sophisticated tumor classification system addressing challenging database issues including missing values, class imbalance, and outliers through advanced preprocessing techniques. Implemented k-fold cross-validation to compare and select the most effective classification algorithm, achieving exceptional accuracy metrics.`,
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'ML'],
    keyFeatures: [
      'Advanced data preprocessing',
      'K-fold cross-validation',
      'Hyperparameter optimization',
      'Model validation and testing'
    ],
    image: '/portafolio/assets/ml.gif'
  },
  {
    id: 'semantic-search',
    title: 'Academic Advisor Matching System',
    category: 'NLP',
    description: 'Full-stack semantic search system for matching students with academic advisors using NLP.',
    longDescription: `Developed a full-stack web system to facilitate academic advisor assignment, featuring a semantic search engine based on Sentence-BERT. The system generates vector embeddings from student project descriptions and compares them with professor profiles (built from taught courses and areas of expertise), automatically identifying the best-qualified faculty for each specific project. This NLP-based approach overcomes traditional keyword search limitations.`,
    technologies: ['NLP', 'Sentence-BERT', 'Python', 'Vector Similarity'],
    keyFeatures: [
      'Semantic search engine',
      'Vector embeddings generation',
      'Profile matching algorithm',
      'Full-stack implementation'
    ],
   
    image: '/portafolio/assets/sgitt.gif'
  },
  {
    id: 'pine-script-assistant',
    title: 'Pine Script AI Development Assistant',
    category: 'AI & Automation',
    description: 'AI-powered assistant for Pine Script development with advanced code analysis capabilities.',
    longDescription: `Developed an AI assistant specialized in Pine Script, utilizing web scraping with Python and Selenium to collect and analyze trading scripts. Implemented comprehensive data cleaning processes and leveraged prompt engineering to generate accurate syntax summaries and usage guidelines, optimizing token utilization and improving assistant effectiveness.`,
    technologies: ['Python', 'Selenium', 'NLP', 'Web Scraping'],
    keyFeatures: [
      'Automated script collection',
      'Data cleaning and preprocessing',
      'Intelligent syntax analysis',
      'Token optimization'
    ],
    
    image: '/portafolio/assets/rag.gif'
  }
];

const ProjectModal: React.FC<{ project: Project; isOpen: boolean; onClose: () => void }> = ({ 
  project, 
  isOpen, 
  onClose 
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/20 
          p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        <h3 className="text-2xl font-bold text-white mt-6 mb-2">{project.title}</h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-sm bg-indigo-500/20 border border-indigo-500/30 
                rounded-full text-white/90"
            >
              {tech}
            </span>
          ))}
        </div>

        <p className="text-white/80 mb-6">{project.longDescription}</p>

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-white mb-2"> Key Features
            </h4>
            <ul className="list-disc list-inside text-white/80 space-y-1">
              {project.keyFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const autoPlayInterval = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Modificar esta línea para tener el último proyecto al inicio y el primero al final
  // Esto crea el efecto infinito visual
  const extendedProjects = [
    projectsData[projectsData.length - 1], 
    ...projectsData, 
    projectsData[0]
  ];
  
  // Actualizar la lógica de navegación
  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    if (currentIndex === 0) {
      // Si estamos en el primer índice (que es visualmente el último proyecto real)
      setCurrentIndex(projectsData.length);
      // Aplicar un pequeño retraso para que el usuario no vea el salto
      setTimeout(() => {
        setIsAnimating(false);
        setCurrentIndex(projectsData.length - 1);
      }, 0);
    } else {
      setCurrentIndex(currentIndex - 1);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    if (currentIndex === projectsData.length) {
      // Si estamos en el último índice (que es visualmente el primer proyecto real)
      setCurrentIndex(0);
      // Aplicar un pequeño retraso para que el usuario no vea el salto
      setTimeout(() => {
        setIsAnimating(false);
        setCurrentIndex(1);
      }, 0);
    } else {
      setCurrentIndex(currentIndex + 1);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  // El resto del código para autoplay
  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayInterval.current = setInterval(() => {
      if (!isHovered && !modalOpen) {
        handleNext();
      }
    }, 4000);
  };

  const stopAutoPlay = () => {
    if (autoPlayInterval.current) {
      clearInterval(autoPlayInterval.current);
    }
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [isHovered, modalOpen]);

  // También necesitamos inicializar el carrusel en el primer proyecto real (índice 1)
  useEffect(() => {
    setCurrentIndex(1);
  }, []);
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
          Featured Projects
          </h2>
          <p className="text-xl text-white/80">
          Innovative solutions in AI and automation
          </p>
        </motion.div>

        <div className="relative flex justify-center">
          {/* Contenedor del carrusel con ancho fijo y overflow visible */}
          <div 
            className="w-full max-w-3xl mx-auto relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Botones de navegación */}
            <button
              onClick={handlePrevious}
              className="absolute -left-12 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 
                p-2 rounded-full backdrop-blur-sm border border-white/20"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={handleNext}
              className="absolute -right-12 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 
                p-2 rounded-full backdrop-blur-sm border border-white/20"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Contenedor con overflow visible para mostrar proyectos laterales */}
            <div className="overflow-visible">
            <motion.div
        className="flex"
        animate={{
          x: `calc(-${currentIndex * 100}%)`
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {extendedProjects.map((project, index) => (
          <div
            key={`${project.id}-${index}`}
            className="w-full flex-none"
            style={{ paddingLeft: '12px', paddingRight: '12px' }}
          >
            <motion.div
              className={`transform transition-all duration-300 ${
                index === currentIndex ? 'opacity-100 scale-100' : 'opacity-40 scale-95 blur-sm'
              }`}
            >
                      <div 
                        onClick={() => {
                          setSelectedProject(project);
                          setModalOpen(true);
                        }}
                        className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl 
                          border border-white/10 overflow-hidden cursor-pointer group"
                      >
                        <div className="relative w-full aspect-video">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <span className="px-3 py-1 text-sm bg-indigo-500/30 border 
                            border-indigo-500/40 rounded-full text-white/90">
                            {project.category}
                          </span>
                          <h3 className="text-xl font-bold text-white mt-3">{project.title}</h3>
                          <p className="text-white/80 mt-2">{project.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Indicadores de página */}
            <div className="flex justify-center mt-8 gap-2">
        {projectsData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index + 1)} // +1 porque ahora los proyectos reales empiezan en índice 1
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              (currentIndex === 0 && index === projectsData.length - 1) || // Caso especial para el primero clonado
              (currentIndex === projectsData.length + 1 && index === 0) || // Caso especial para el último clonado
              currentIndex === index + 1 ? 
              'bg-white w-6' : 
              'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && selectedProject && (
          <ProjectModal
            project={selectedProject}
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;