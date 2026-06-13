import React from 'react';

export interface ExperienceEntry {
  year: string;
  title: string;
  company: string;
  icon: React.ReactNode;
  description: string;
  achievements: string[];
  current?: boolean;
}

export const experiences: ExperienceEntry[] = [
  {
    year: '2024 — Present',
    title: 'AI Consultant — Generative AI & Agents',
    company: 'Suri services',
    current: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
    description:
      'Leading secure Microsoft Copilot adoption and building production generative AI agents for enterprise clients — from governance and enablement to custom Copilot Studio and Azure AI Foundry solutions.',
    achievements: [
      'Drive secure Microsoft 365 Copilot adoption end to end, assessing data exposure risks and defining the security baseline before rollout',
      'Implement Copilot security and governance policies — sensitivity labels, DLP rules and Purview-aligned information protection — to keep AI access compliant',
      'Deliver end-user training and enablement programs that turn Copilot licenses into measurable day-to-day productivity',
      'Design and ship Copilot Studio agents for multiple clients, from RAG-grounded knowledge assistants to agents with custom actions calling external APIs',
      'Build generative AI agents and solutions on Azure AI Foundry, covering prompt engineering, orchestration and evaluation',
      'Advise clients on agent architecture and use-case prioritization, translating business processes into deployable AI workflows',
    ],
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
    description:
      'Implemented GitHub repository for architecture diagrams in ArchiMate and developed an innovative RAG-based solution for improving banking information access.',
    achievements: [
      'Implemented GitHub repository from scratch for ArchiMate architecture diagrams',
      'Established master branch rules including mandatory reviewers for Pull requests',
      'Documented entire process and rules in Confluence',
      'Proposed AI-based solution using RAG for quick access to bank information',
    ],
  },
  {
    year: '2023 — 2024',
    title: 'QA Tester',
    company: 'CTIN',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    description:
      'Test automation and quality assurance using agile methodologies, including automation with Ruby, Selenium and Cucumber, test management with Jira and Zephyr, and comprehensive QA process documentation.',
    achievements: [
      'Participated in agile Scrum methodology, collaborating with development team',
      'Used Jira, Zephyr and Bitbucket for project management and version control',
      'Created and tracked incident tickets and improvements',
      'Implemented automated tests using Ruby, Appium, Selenium and Cucumber',
      'Developed comprehensive documentation for test automation',
    ],
  },
  {
    year: '2021 — 2022',
    title: 'PineScript Developer',
    company: 'Freelance',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
    description:
      'Development and optimization of trading scripts with focus on client needs and quality assurance.',
    achievements: [
      'Optimized existing scripts to improve efficiency and results',
      'Collaborated with clients to identify needs and provide effective coding solutions',
      'Performed quality tests and debugging of scripts to ensure proper operation',
    ],
  },
];
