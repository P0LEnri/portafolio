import React from 'react';
import TradingBotPreview from '@/app/components/previews/TradingBotPreview';
import TumorClassifierPreview from '@/app/components/previews/TumorClassifierPreview';
import SemanticSearchPreview from '@/app/components/previews/SemanticSearchPreview';
import PineAssistantPreview from '@/app/components/previews/PineAssistantPreview';

// Non-translatable metadata. Textual content (title, category, description,
// longDescription, keyFeatures) lives in the i18n translations, keyed by id.
export interface ProjectMeta {
  id: string;
  technologies: string[];
  Preview: React.ComponentType;
}

export const projects: ProjectMeta[] = [
  {
    id: 'trading-system',
    technologies: ['Python', 'Flask', 'Web Scraping', 'Trading'],
    Preview: TradingBotPreview,
  },
  {
    id: 'tumor-classifier',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'ML'],
    Preview: TumorClassifierPreview,
  },
  {
    id: 'semantic-search',
    technologies: ['NLP', 'Sentence-BERT', 'Python', 'Vector Similarity'],
    Preview: SemanticSearchPreview,
  },
  {
    id: 'pine-script-assistant',
    technologies: ['Python', 'Selenium', 'NLP', 'Web Scraping'],
    Preview: PineAssistantPreview,
  },
];
