export interface Skill {
  name: string;
  subskills: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  hero?: boolean;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'genai',
    title: 'Generative AI & Agents',
    hero: true,
    skills: [
      {
        name: 'Copilot Studio',
        subskills: ['RAG agents', 'Custom actions & API integration', 'Multi-client deployments'],
      },
      {
        name: 'Azure AI Foundry',
        subskills: ['Agent design & orchestration', 'Prompt engineering', 'Evaluation & grounding'],
      },
      {
        name: 'Copilot Adoption',
        subskills: ['Security policies & DLP', 'Sensitivity labels / Purview', 'End-user training & enablement'],
      },
      {
        name: 'LLM Engineering',
        subskills: ['RAG pipelines', 'Embeddings & vector search', 'Token / cost optimization'],
      },
    ],
  },
  {
    id: 'ml',
    title: 'Machine Learning & Data',
    skills: [
      {
        name: 'Machine Learning',
        subskills: ['Classification', 'K-fold cross-validation', 'Model optimization'],
      },
      {
        name: 'NLP',
        subskills: ['Sentence-BERT / semantic search', 'Text preprocessing', 'Sentiment analysis'],
      },
      {
        name: 'Data Science',
        subskills: ['Feature engineering', 'Data cleaning', 'Analysis & visualization'],
      },
    ],
  },
  {
    id: 'engineering',
    title: 'Engineering & Quality',
    skills: [
      {
        name: 'Python',
        subskills: ['Automation', 'Web scraping / Selenium', 'Flask'],
      },
      {
        name: 'Web',
        subskills: ['React / Next.js', 'TypeScript', 'Tailwind CSS'],
      },
      {
        name: 'QA & Automation',
        subskills: ['Selenium / Appium / Cucumber', 'Jira & Zephyr', 'ISTQB practices'],
      },
    ],
  },
];
