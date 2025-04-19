import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    year: '2024 - present',
    title: 'Microsoft 365 Copilot Solutions Developer',
    company: 'Suri services',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    description: 'Strategic implementation of Microsoft Copilot use cases for enterprises, developing customized solutions and optimizing business processes through AI integration.',
    achievements: [
      'Documentation of Copilot use cases',
      'Development of customized enterprise solutions',
      'Business process optimization through AI integration'
    ]
  },
  {
    year: '2024',
    title: 'Enterprise Architecture',
    company: 'Citibanamex Summer Program',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    description: 'Implemented GitHub repository for architecture diagrams in ArchiMate and developed an innovative RAG-based solution for improving banking information access.',
    achievements: [
      'Implemented GitHub repository from scratch for ArchiMate architecture diagrams',
      'Established master branch rules including mandatory reviewers for Pull requests',
      'Documented entire process and rules in Confluence',
      'Proposed AI-based solution using RAG for quick access to bank information'
    ]
  },
  {
    year: '2023-2024',
    title: 'QA Tester',
    company: 'CTIN',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    description: 'Test automation and quality assurance using agile methodologies, including automation with Ruby, Selenium and Cucumber, test management with Jira and Zephyr, and comprehensive QA process documentation.',
    achievements: [
      'Participated in agile Scrum methodology, collaborating with development team',
      'Used Jira, Zephyr and Bitbucket for project management and version control',
      'Created and tracked incident tickets and improvements',
      'Implemented automated tests using Ruby, Appium, Selenium and Cucumber',
      'Developed comprehensive documentation for test automation'
    ]
  },
  {
    year: '2021-2022',
    title: 'PineScript Developer',
    company: 'Freelance',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
    description: 'Development and optimization of trading scripts with focus on client needs and quality assurance.',
    achievements: [
      'Optimized existing scripts to improve efficiency and results',
      'Collaborated with clients to identify needs and provide effective coding solutions',
      'Performed quality tests and debugging of scripts to ensure proper operation'
    ]
  }
];

interface Experience {
  year: string;
  title: string;
  company: string;
  icon: React.ReactNode;
  description: string;
  achievements: string[];
}

const ExperienceCard = ({ experience, index }: { experience: Experience; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
  >
    {/* Timeline dot and line */}
    <div className="hidden md:flex flex-col items-center relative">
      <div className="w-px h-24 bg-gradient-to-b from-indigo-500/30 to-purple-500/30" />
      <div className="relative flex items-center justify-center w-12 h-12 rounded-full 
        bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/20 text-white z-10">
        {experience.icon}
      </div>
      <div className="w-px h-24 bg-gradient-to-b from-purple-500/30 to-indigo-500/30" />
    </div>

    {/* Experience card */}
    <div className="flex-1 bg-gradient-to-br from-white/5 to-white/10 p-6 rounded-xl 
      border border-white/10 hover:border-white/20 transition-all duration-300 group
      backdrop-blur-sm relative overflow-hidden">
      
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-indigo-200 
            transition-colors duration-300">
            {experience.title}
          </h3>
          <p className="text-white/80">{experience.company}</p>
        </div>
        <span className="px-3 py-1 text-sm font-semibold bg-indigo-500/20 
          border border-indigo-500/30 text-white rounded-full">
          {experience.year}
        </span>
      </div>
      
      <p className="text-white/90 mb-4">{experience.description}</p>
      
      <ul className="space-y-2">
        {experience.achievements.map((achievement, i) => (
          <li key={i} className="flex items-start space-x-2 text-white/80">
            <span className="text-indigo-400 mt-1">•</span>
            <span>{achievement}</span>
          </li>
        ))}
      </ul>

      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full 
        blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full 
        blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
  </motion.div>
);

const Experience = () => (
  <section className="py-20 relative">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-white to-indigo-200 
          bg-clip-text text-transparent mb-4">
          My Journey
        </h2>
        <p className="text-xl text-white/80">
        Exploring the frontiers of technology and innovation
        </p>
      </motion.div>

      <div className="space-y-12">
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={experience.year + experience.title}
            experience={experience}
            index={index}
          />
        ))}
      </div>
    </div>
  </section>
);

export default Experience;