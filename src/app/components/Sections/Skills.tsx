import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const skillCategories = {
  ai_ml: {
    name: 'Artificial Intelligence and Machine Learning',
    skills: [
      {
        name: 'Copilot & Development',
        subskills: ['Autonomous agents', 'Prompt engineering', 'Copilot adoption']
      },
      {
        name: 'Machine Learning',
        subskills: ['Classification', 'K-fold cross-validation', 'Model optimization']
      },
      {
        name: 'NLP',
        subskills: ['Sentiment analysis', 'Text preprocessing', 'Corpus analysis']
      },
      {
        name: 'Data Science',
        subskills: ['Data analysis', 'Feature engineering', 'Data cleaning']
      }
    ]
  },
  development: {
    name: 'Software Development',
    skills: [
      {
        name: 'Python',
        subskills: ['Web scraping', 'Selenium', 'Automation']
      },
      {
        name: 'JavaScript & React',
        subskills: ['Frontend', 'React', 'Tailwind CSS']
      },
      {
        name: 'Java',
        subskills: ['OOP', 'App development']
      }
    ]
  },
  testing: {
    name: 'Testing and QA',
    skills: [
      {
        name: 'Automation',
        subskills: ['Selenium', 'Appium', 'Cucumber']
      },
      {
        name: 'QA Tools',
        subskills: ['Jira', 'Zephyr', 'ISTQB']
      },
      {
        name: 'Processes',
        subskills: ['Planning', 'Bug tracking', 'Documentation']
      }
    ]
  }
};


interface Skill {
  name: string;
  subskills: string[];
}

interface SkillNodeProps {
  skill: Skill;
  index: number;
  total: number;
  radius?: number;
  onClick: (skill: Skill) => void;
  isSelected: boolean;
}

const SkillNode: React.FC<SkillNodeProps> = ({ 
  skill, 
  index, 
  total, 
  radius = 150, 
  onClick, 
  isSelected 
}) => {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => onClick(skill)}
      style={{ cursor: 'pointer' }}
    >
      <motion.circle
        cx={x}
        cy={y}
        r={isSelected ? 45 : 40}
        className={`
          ${isSelected 
            ? 'fill-indigo-500/20 stroke-indigo-400' 
            : 'fill-white/10 stroke-white/30'} 
          stroke-2 transition-all duration-300
        `}
        whileHover={{ scale: 1.1 }}
      />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        className={`text-sm font-medium ${isSelected ? 'fill-white' : 'fill-white/80'}`}
        style={{ pointerEvents: 'none' }}
      >
        {skill.name}
      </text>
    </motion.g>
  );
};

const SubskillCloud: React.FC<{ subskills: string[] }> = ({ subskills }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-wrap gap-2 justify-center mt-6"
  >
    {subskills.map((subskill, index) => (
      <motion.span
        key={subskill}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="px-4 py-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 
          border border-white/10 rounded-full text-sm text-white/90"
      >
        {subskill}
      </motion.span>
    ))}
  </motion.div>
);

const SkillCategory: React.FC<{
  categoryKey: string;
  category: {
    name: string;
    skills: Skill[];
  };
  categoryIndex: number;
}> = ({ categoryKey, category, categoryIndex }) => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [autoSelectedIndex, setAutoSelectedIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setAutoSelectedIndex((prev) => {
          const nextIndex = (prev + 1) % category.skills.length;
          setSelectedSkill(category.skills[nextIndex]);
          return nextIndex;
        });
      }, 5000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [category.skills, isAutoPlaying]);

  const handleSkillClick = (skill: Skill) => {
    setIsAutoPlaying(false);
    setSelectedSkill(skill);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: categoryIndex * 0.2 }}
    >
      <div className="relative bg-gradient-to-br from-white/5 to-white/10 
        backdrop-blur-sm rounded-2xl p-8 h-full border border-white/10
        hover:border-white/20 transition-all duration-300"
      >
        <h3 className="text-xl font-bold text-white mb-8 text-center">
          {category.name}
        </h3>
        <div className="relative h-[400px] flex items-center justify-center">
          <svg viewBox="-200 -200 400 400" className="w-full h-full">
            <circle
              r="150"
              className="fill-none stroke-white/10 stroke-2"
            />
            {category.skills.map((skill, index) => (
              <SkillNode
                key={skill.name}
                skill={skill}
                index={index}
                total={category.skills.length}
                onClick={handleSkillClick}
                isSelected={selectedSkill?.name === skill.name}
              />
            ))}
          </svg>
        </div>
        {selectedSkill && (
          <SubskillCloud subskills={selectedSkill.subskills} />
        )}

        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl" />
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/10 rounded-full blur-xl" />
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-white to-indigo-200 
            bg-clip-text text-transparent mb-4">
            Technical Skills
          </h2>
          <p className="text-xl text-white/80">
          Knowledge Domains and Technical Capabilities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {Object.entries(skillCategories).map(([key, category], index) => (
            <SkillCategory
              key={key}
              categoryKey={key}
              category={category}
              categoryIndex={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;