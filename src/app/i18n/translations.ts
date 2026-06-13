import { Locale } from './config';

export interface Segment {
  text: string;
  highlight?: boolean;
}

export interface ExperienceEntryT {
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface ProjectT {
  title: string;
  category: string;
  description: string;
  longDescription: string;
  keyFeatures: string[];
}

export interface SkillT {
  name: string;
  subskills: string[];
}

export interface SkillCategoryT {
  title: string;
  skills: SkillT[];
}

export interface Translation {
  nav: { home: string; experience: string; projects: string; skills: string; contact: string };
  hero: {
    rolePrefix: string;
    roleRotations: string[];
    description: Segment[];
    downloadCV: string;
    talk: string;
    scroll: string;
  };
  experience: { title: string; subtitle: string; current: string; entries: ExperienceEntryT[] };
  projects: {
    title: string;
    subtitle: string;
    viewDetails: string;
    keyFeatures: string;
    items: Record<string, ProjectT>;
  };
  skills: { title: string; subtitle: string; categories: Record<string, SkillCategoryT> };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    message: string;
    send: string;
    sending: string;
    sent: string;
    error: string;
    social: string;
    location: string;
    locationValue: string;
    remote: string;
  };
}

const en: Translation = {
  nav: { home: 'Home', experience: 'Experience', projects: 'Projects', skills: 'Skills', contact: 'Contact' },
  hero: {
    rolePrefix: 'AI Consultant',
    roleRotations: ['Generative AI & Agents', 'Intelligent AI Workflows', 'Copilot Studio & Azure AI Foundry'],
    description: [
      { text: 'I design ' },
      { text: 'AI agents and intelligent workflows', highlight: true },
      {
        text:
          ' that automate real business processes — from RAG-grounded assistants to agents connected to your APIs with Copilot Studio and Azure AI Foundry. I also lead secure Microsoft Copilot adoption so teams can ',
      },
      { text: 'rely on AI with confidence', highlight: true },
      { text: '.' },
    ],
    downloadCV: 'Download CV',
    talk: "Let's talk about your ideas",
    scroll: 'Scroll',
  },
  experience: {
    title: 'My Journey',
    subtitle: 'Exploring the frontiers of technology and innovation',
    current: 'Current',
    entries: [
      {
        title: 'AI Consultant — Generative AI & Agents',
        company: 'Suri services',
        period: '2024 — Present',
        description:
          'Designing and deploying generative AI agents and intelligent workflows for enterprise clients — and leading secure Microsoft Copilot adoption end to end.',
        achievements: [
          'Design and ship Copilot Studio agents for multiple clients, from RAG-grounded knowledge assistants to agents with custom actions calling external APIs',
          'Build generative AI agents and solutions on Azure AI Foundry, covering prompt engineering, orchestration and evaluation',
          'Translate business processes into deployable AI workflows, advising clients on agent architecture and use-case prioritization',
          'Deliver end-user training and enablement programs that turn Copilot licenses into measurable day-to-day productivity',
          'Drive secure Microsoft 365 Copilot adoption end to end, assessing data exposure risks before rollout',
          'Implement Copilot security and governance policies — sensitivity labels, DLP and Purview-aligned information protection',
        ],
      },
      {
        title: 'Enterprise Architecture',
        company: 'Citibanamex Summer Program',
        period: '2024',
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
        title: 'QA Tester',
        company: 'CTIN',
        period: '2023 — 2024',
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
        title: 'PineScript Developer',
        company: 'Freelance',
        period: '2021 — 2022',
        description:
          'Development and optimization of trading scripts with focus on client needs and quality assurance.',
        achievements: [
          'Optimized existing scripts to improve efficiency and results',
          'Collaborated with clients to identify needs and provide effective coding solutions',
          'Performed quality tests and debugging of scripts to ensure proper operation',
        ],
      },
    ],
  },
  projects: {
    title: 'Featured Projects',
    subtitle: 'Innovative solutions in AI and automation',
    viewDetails: 'View details',
    keyFeatures: 'Key Features',
    items: {
      'trading-system': {
        title: 'Automated Trading System with Web Scraping',
        category: 'Automation',
        description:
          'Automated trading system integrating TradingView with Quantfury through advanced web scraping techniques.',
        longDescription:
          'Designed and developed a trading automation system using Python and Flask, integrating TradingView alerts and executing Quantfury commands through web scraping to overcome API limitations. The system enables seamless automated trading operations while maintaining high precision and rapid execution times.',
        keyFeatures: [
          'TradingView alerts integration',
          'Automated Quantfury operations',
          'Risk management system',
          'Real-time trade execution',
        ],
      },
      'tumor-classifier': {
        title: 'Machine Learning Tumor Classifier',
        category: 'Machine Learning',
        description: 'Advanced ML system for classifying benign and malignant tumors with high accuracy.',
        longDescription:
          'Developed a sophisticated tumor classification system addressing challenging database issues including missing values, class imbalance, and outliers through advanced preprocessing techniques. Implemented k-fold cross-validation to compare and select the most effective classification algorithm, achieving exceptional accuracy metrics.',
        keyFeatures: [
          'Advanced data preprocessing',
          'K-fold cross-validation',
          'Hyperparameter optimization',
          'Model validation and testing',
        ],
      },
      'semantic-search': {
        title: 'Academic Advisor Matching System',
        category: 'NLP',
        description: 'Full-stack semantic search system for matching students with academic advisors using NLP.',
        longDescription:
          'Developed a full-stack web system to facilitate academic advisor assignment, featuring a semantic search engine based on Sentence-BERT. The system generates vector embeddings from student project descriptions and compares them with professor profiles (built from taught courses and areas of expertise), automatically identifying the best-qualified faculty for each specific project. This NLP-based approach overcomes traditional keyword search limitations.',
        keyFeatures: [
          'Semantic search engine',
          'Vector embeddings generation',
          'Profile matching algorithm',
          'Full-stack implementation',
        ],
      },
      'pine-script-assistant': {
        title: 'Pine Script AI Development Assistant',
        category: 'AI & Automation',
        description: 'AI-powered assistant for Pine Script development with advanced code analysis capabilities.',
        longDescription:
          'Developed an AI assistant specialized in Pine Script, utilizing web scraping with Python and Selenium to collect and analyze trading scripts. Implemented comprehensive data cleaning processes and leveraged prompt engineering to generate accurate syntax summaries and usage guidelines, optimizing token utilization and improving assistant effectiveness.',
        keyFeatures: [
          'Automated script collection',
          'Data cleaning and preprocessing',
          'Intelligent syntax analysis',
          'Token optimization',
        ],
      },
    },
  },
  skills: {
    title: 'Skills & Expertise',
    subtitle: 'From secure Copilot rollouts to production AI agents',
    categories: {
      genai: {
        title: 'Generative AI & Agents',
        skills: [
          { name: 'Copilot Studio', subskills: ['RAG agents', 'Custom actions & API integration', 'Multi-client deployments'] },
          { name: 'Azure AI Foundry', subskills: ['Agent design & orchestration', 'Prompt engineering', 'Evaluation & grounding'] },
          { name: 'Copilot Adoption', subskills: ['Security policies & DLP', 'Sensitivity labels / Purview', 'End-user training & enablement'] },
          { name: 'LLM Engineering', subskills: ['RAG pipelines', 'Embeddings & vector search', 'Token / cost optimization'] },
        ],
      },
      ml: {
        title: 'Machine Learning & Data',
        skills: [
          { name: 'Machine Learning', subskills: ['Classification', 'K-fold cross-validation', 'Model optimization'] },
          { name: 'NLP', subskills: ['Sentence-BERT / semantic search', 'Text preprocessing', 'Sentiment analysis'] },
          { name: 'Data Science', subskills: ['Feature engineering', 'Data cleaning', 'Analysis & visualization'] },
        ],
      },
      engineering: {
        title: 'Engineering & Quality',
        skills: [
          { name: 'Python', subskills: ['Automation', 'Web scraping / Selenium', 'Flask'] },
          { name: 'Web', subskills: ['React / Next.js', 'TypeScript', 'Tailwind CSS'] },
          { name: 'QA & Automation', subskills: ['Selenium / Appium / Cucumber', 'Jira & Zephyr', 'ISTQB practices'] },
        ],
      },
    },
  },
  contact: {
    title: 'Contact Me',
    subtitle: "Have a project in mind? Let's talk!",
    name: 'Name',
    email: 'Email',
    message: 'Message',
    send: 'Send Message',
    sending: 'Sending...',
    sent: 'Sent!',
    error: 'Error. Try again.',
    social: 'Social Media',
    location: 'Location',
    locationValue: 'Mexico City, Mexico',
    remote: 'Remote-friendly',
  },
};

const es: Translation = {
  nav: { home: 'Inicio', experience: 'Experiencia', projects: 'Proyectos', skills: 'Habilidades', contact: 'Contacto' },
  hero: {
    rolePrefix: 'Consultor de IA',
    roleRotations: ['IA Generativa y Agentes', 'Flujos de Trabajo con IA', 'Copilot Studio y Azure AI Foundry'],
    description: [
      { text: 'Diseño ' },
      { text: 'agentes de IA y flujos de trabajo inteligentes', highlight: true },
      {
        text:
          ' que automatizan procesos reales de negocio — desde asistentes con RAG hasta agentes conectados a tus APIs con Copilot Studio y Azure AI Foundry. También lidero la adopción segura de Microsoft Copilot para que los equipos ',
      },
      { text: 'confíen en la IA', highlight: true },
      { text: '.' },
    ],
    downloadCV: 'Descargar CV',
    talk: 'Hablemos de tus ideas',
    scroll: 'Desliza',
  },
  experience: {
    title: 'Mi Trayectoria',
    subtitle: 'Explorando las fronteras de la tecnología y la innovación',
    current: 'Actual',
    entries: [
      {
        title: 'Consultor de IA — IA Generativa y Agentes',
        company: 'Suri services',
        period: '2024 — Presente',
        description:
          'Diseño y despliegue de agentes de IA generativa y flujos de trabajo inteligentes para clientes enterprise — y liderazgo en la adopción segura de Microsoft Copilot de inicio a fin.',
        achievements: [
          'Diseño y despliegue de agentes en Copilot Studio para múltiples clientes, desde asistentes de conocimiento con RAG hasta agentes con acciones personalizadas que consumen APIs externas',
          'Construcción de agentes y soluciones de IA generativa en Azure AI Foundry, abarcando prompt engineering, orquestación y evaluación',
          'Traducción de procesos de negocio en flujos de trabajo con IA desplegables, asesorando a clientes en arquitectura de agentes y priorización de casos de uso',
          'Programas de capacitación y habilitación de usuarios finales que convierten las licencias de Copilot en productividad medible del día a día',
          'Liderazgo en la adopción segura de Microsoft 365 Copilot de inicio a fin, evaluando riesgos de exposición de datos antes del despliegue',
          'Implementación de políticas de seguridad y gobernanza para Copilot — etiquetas de confidencialidad, DLP y protección de información alineada con Purview',
        ],
      },
      {
        title: 'Arquitectura Empresarial',
        company: 'Programa de Verano Citibanamex',
        period: '2024',
        description:
          'Implementación de un repositorio de GitHub para diagramas de arquitectura en ArchiMate y desarrollo de una solución innovadora basada en RAG para mejorar el acceso a la información bancaria.',
        achievements: [
          'Implementación desde cero de un repositorio de GitHub para diagramas de arquitectura ArchiMate',
          'Establecimiento de reglas en la rama principal, incluyendo revisores obligatorios para los Pull Requests',
          'Documentación de todo el proceso y las reglas en Confluence',
          'Propuesta de una solución basada en IA usando RAG para el acceso rápido a información del banco',
        ],
      },
      {
        title: 'QA Tester',
        company: 'CTIN',
        period: '2023 — 2024',
        description:
          'Automatización de pruebas y aseguramiento de calidad con metodologías ágiles, incluyendo automatización con Ruby, Selenium y Cucumber, gestión de pruebas con Jira y Zephyr, y documentación integral de procesos de QA.',
        achievements: [
          'Participación en metodología ágil Scrum, colaborando con el equipo de desarrollo',
          'Uso de Jira, Zephyr y Bitbucket para la gestión de proyectos y el control de versiones',
          'Creación y seguimiento de tickets de incidencias y mejoras',
          'Implementación de pruebas automatizadas con Ruby, Appium, Selenium y Cucumber',
          'Desarrollo de documentación integral para la automatización de pruebas',
        ],
      },
      {
        title: 'Desarrollador PineScript',
        company: 'Independiente',
        period: '2021 — 2022',
        description:
          'Desarrollo y optimización de scripts de trading con enfoque en las necesidades del cliente y el aseguramiento de calidad.',
        achievements: [
          'Optimización de scripts existentes para mejorar la eficiencia y los resultados',
          'Colaboración con clientes para identificar necesidades y brindar soluciones de código efectivas',
          'Realización de pruebas de calidad y depuración de scripts para garantizar su correcto funcionamiento',
        ],
      },
    ],
  },
  projects: {
    title: 'Proyectos Destacados',
    subtitle: 'Soluciones innovadoras en IA y automatización',
    viewDetails: 'Ver detalles',
    keyFeatures: 'Características Clave',
    items: {
      'trading-system': {
        title: 'Sistema de Trading Automatizado con Web Scraping',
        category: 'Automatización',
        description:
          'Sistema de trading automatizado que integra TradingView con Quantfury mediante técnicas avanzadas de web scraping.',
        longDescription:
          'Diseñé y desarrollé un sistema de automatización de trading con Python y Flask, integrando alertas de TradingView y ejecutando operaciones en Quantfury mediante web scraping para superar las limitaciones de su API. El sistema permite operaciones de trading automatizadas con alta precisión y tiempos de ejecución rápidos.',
        keyFeatures: [
          'Integración de alertas de TradingView',
          'Operaciones automatizadas en Quantfury',
          'Sistema de gestión de riesgo',
          'Ejecución de operaciones en tiempo real',
        ],
      },
      'tumor-classifier': {
        title: 'Clasificador de Tumores con Machine Learning',
        category: 'Machine Learning',
        description: 'Sistema avanzado de ML para clasificar tumores benignos y malignos con alta precisión.',
        longDescription:
          'Desarrollé un sofisticado sistema de clasificación de tumores que aborda problemas complejos de la base de datos como valores faltantes, desbalance de clases y valores atípicos mediante técnicas avanzadas de preprocesamiento. Implementé validación cruzada k-fold para comparar y seleccionar el algoritmo de clasificación más efectivo, logrando métricas de precisión excepcionales.',
        keyFeatures: [
          'Preprocesamiento avanzado de datos',
          'Validación cruzada k-fold',
          'Optimización de hiperparámetros',
          'Validación y prueba del modelo',
        ],
      },
      'semantic-search': {
        title: 'Sistema de Asignación de Asesores Académicos',
        category: 'NLP',
        description: 'Sistema full-stack de búsqueda semántica para emparejar estudiantes con asesores académicos usando NLP.',
        longDescription:
          'Desarrollé un sistema web full-stack para facilitar la asignación de asesores académicos, con un motor de búsqueda semántica basado en Sentence-BERT. El sistema genera embeddings vectoriales a partir de las descripciones de proyectos de los estudiantes y los compara con los perfiles de los profesores (construidos a partir de las materias impartidas y áreas de especialización), identificando automáticamente al profesorado mejor calificado para cada proyecto. Este enfoque basado en NLP supera las limitaciones de la búsqueda tradicional por palabras clave.',
        keyFeatures: [
          'Motor de búsqueda semántica',
          'Generación de embeddings vectoriales',
          'Algoritmo de emparejamiento de perfiles',
          'Implementación full-stack',
        ],
      },
      'pine-script-assistant': {
        title: 'Asistente de Desarrollo de Pine Script con IA',
        category: 'IA y Automatización',
        description: 'Asistente impulsado por IA para el desarrollo en Pine Script con capacidades avanzadas de análisis de código.',
        longDescription:
          'Desarrollé un asistente de IA especializado en Pine Script, usando web scraping con Python y Selenium para recopilar y analizar scripts de trading. Implementé procesos integrales de limpieza de datos y aproveché el prompt engineering para generar resúmenes de sintaxis precisos y guías de uso, optimizando el uso de tokens y mejorando la efectividad del asistente.',
        keyFeatures: [
          'Recopilación automatizada de scripts',
          'Limpieza y preprocesamiento de datos',
          'Análisis inteligente de sintaxis',
          'Optimización de tokens',
        ],
      },
    },
  },
  skills: {
    title: 'Habilidades y Experiencia',
    subtitle: 'Desde despliegues seguros de Copilot hasta agentes de IA en producción',
    categories: {
      genai: {
        title: 'IA Generativa y Agentes',
        skills: [
          { name: 'Copilot Studio', subskills: ['Agentes con RAG', 'Acciones personalizadas e integración con APIs', 'Despliegues multi-cliente'] },
          { name: 'Azure AI Foundry', subskills: ['Diseño y orquestación de agentes', 'Prompt engineering', 'Evaluación y grounding'] },
          { name: 'Adopción de Copilot', subskills: ['Políticas de seguridad y DLP', 'Etiquetas de confidencialidad / Purview', 'Capacitación y habilitación de usuarios'] },
          { name: 'Ingeniería de LLM', subskills: ['Pipelines de RAG', 'Embeddings y búsqueda vectorial', 'Optimización de tokens / costos'] },
        ],
      },
      ml: {
        title: 'Machine Learning y Datos',
        skills: [
          { name: 'Machine Learning', subskills: ['Clasificación', 'Validación cruzada k-fold', 'Optimización de modelos'] },
          { name: 'NLP', subskills: ['Sentence-BERT / búsqueda semántica', 'Preprocesamiento de texto', 'Análisis de sentimiento'] },
          { name: 'Ciencia de Datos', subskills: ['Feature engineering', 'Limpieza de datos', 'Análisis y visualización'] },
        ],
      },
      engineering: {
        title: 'Ingeniería y Calidad',
        skills: [
          { name: 'Python', subskills: ['Automatización', 'Web scraping / Selenium', 'Flask'] },
          { name: 'Web', subskills: ['React / Next.js', 'TypeScript', 'Tailwind CSS'] },
          { name: 'QA y Automatización', subskills: ['Selenium / Appium / Cucumber', 'Jira y Zephyr', 'Prácticas ISTQB'] },
        ],
      },
    },
  },
  contact: {
    title: 'Contáctame',
    subtitle: '¿Tienes un proyecto en mente? ¡Hablemos!',
    name: 'Nombre',
    email: 'Correo',
    message: 'Mensaje',
    send: 'Enviar Mensaje',
    sending: 'Enviando...',
    sent: '¡Enviado!',
    error: 'Error. Inténtalo de nuevo.',
    social: 'Redes Sociales',
    location: 'Ubicación',
    locationValue: 'Ciudad de México, México',
    remote: 'Disponible en remoto',
  },
};

export const translations: Record<Locale, Translation> = { en, es };
