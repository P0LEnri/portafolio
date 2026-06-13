import React from 'react';
import TradingBotPreview from '@/app/components/previews/TradingBotPreview';
import TumorClassifierPreview from '@/app/components/previews/TumorClassifierPreview';
import SemanticSearchPreview from '@/app/components/previews/SemanticSearchPreview';
import PineAssistantPreview from '@/app/components/previews/PineAssistantPreview';

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  technologies: string[];
  keyFeatures: string[];
  Preview: React.ComponentType;
}

export const projects: Project[] = [
  {
    id: 'trading-system',
    title: 'Automated Trading System with Web Scraping',
    category: 'Automation',
    description:
      'Automated trading system integrating TradingView with Quantfury through advanced web scraping techniques.',
    longDescription:
      'Designed and developed a trading automation system using Python and Flask, integrating TradingView alerts and executing Quantfury commands through web scraping to overcome API limitations. The system enables seamless automated trading operations while maintaining high precision and rapid execution times.',
    technologies: ['Python', 'Flask', 'Web Scraping', 'Trading'],
    keyFeatures: [
      'TradingView alerts integration',
      'Automated Quantfury operations',
      'Risk management system',
      'Real-time trade execution',
    ],
    Preview: TradingBotPreview,
  },
  {
    id: 'tumor-classifier',
    title: 'Machine Learning Tumor Classifier',
    category: 'Machine Learning',
    description: 'Advanced ML system for classifying benign and malignant tumors with high accuracy.',
    longDescription:
      'Developed a sophisticated tumor classification system addressing challenging database issues including missing values, class imbalance, and outliers through advanced preprocessing techniques. Implemented k-fold cross-validation to compare and select the most effective classification algorithm, achieving exceptional accuracy metrics.',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'ML'],
    keyFeatures: [
      'Advanced data preprocessing',
      'K-fold cross-validation',
      'Hyperparameter optimization',
      'Model validation and testing',
    ],
    Preview: TumorClassifierPreview,
  },
  {
    id: 'semantic-search',
    title: 'Academic Advisor Matching System',
    category: 'NLP',
    description: 'Full-stack semantic search system for matching students with academic advisors using NLP.',
    longDescription:
      'Developed a full-stack web system to facilitate academic advisor assignment, featuring a semantic search engine based on Sentence-BERT. The system generates vector embeddings from student project descriptions and compares them with professor profiles (built from taught courses and areas of expertise), automatically identifying the best-qualified faculty for each specific project. This NLP-based approach overcomes traditional keyword search limitations.',
    technologies: ['NLP', 'Sentence-BERT', 'Python', 'Vector Similarity'],
    keyFeatures: [
      'Semantic search engine',
      'Vector embeddings generation',
      'Profile matching algorithm',
      'Full-stack implementation',
    ],
    Preview: SemanticSearchPreview,
  },
  {
    id: 'pine-script-assistant',
    title: 'Pine Script AI Development Assistant',
    category: 'AI & Automation',
    description: 'AI-powered assistant for Pine Script development with advanced code analysis capabilities.',
    longDescription:
      'Developed an AI assistant specialized in Pine Script, utilizing web scraping with Python and Selenium to collect and analyze trading scripts. Implemented comprehensive data cleaning processes and leveraged prompt engineering to generate accurate syntax summaries and usage guidelines, optimizing token utilization and improving assistant effectiveness.',
    technologies: ['Python', 'Selenium', 'NLP', 'Web Scraping'],
    keyFeatures: [
      'Automated script collection',
      'Data cleaning and preprocessing',
      'Intelligent syntax analysis',
      'Token optimization',
    ],
    Preview: PineAssistantPreview,
  },
];
