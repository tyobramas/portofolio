import type { Project, Milestone, Skill, SystemConfig, Certificate } from '../types';

// ─── System Config ───────────────────────────────────────────────────────────

export const defaultConfig: SystemConfig = {
  ownerName: 'Bramastyo Kusumo',
  ownerTitle: 'Senior Full-Stack · Mobile · AI Automation & Agent Engineer',
  ownerEmail: 'bramastyodevops@gmail.com',
  ownerGithub: '',
  ownerLinkedIn: '',
  ownerLocation: 'Bekasi, West Java, Indonesia',
  ownerAvatar: '',
  ownerBio:
    'Senior engineer with 13+ years of active development experience (since 2013). Specialist in Enterprise AI Automation (n8n, Langflow), Global Autonomous AI Agents (Hermes Agent, LangChain), Production RAG Knowledge Engines, High-Scale Web Scraping Pipelines, and Full-Stack Mobile & Web Architecture (Flutter, Laravel, React).',
  heroTagline:
    'Architecting mission-critical Enterprise AI Automation (n8n & Langflow), Autonomous Agent Systems (Hermes, Multi-Agent), Production RAG Engines, High-Volume Web Scraping Pipelines, and Scalable Mobile (Flutter) & SaaS Platforms (Laravel & React). Backed by 13+ years of engineering leadership — let’s build and scale your next high-impact system together.',
  availableForWork: true,
  updatedAt: new Date().toISOString(),
};

// ─── Projects ────────────────────────────────────────────────────────────────

export const defaultProjects: Project[] = [
  {
    id: 'proj-001',
    title: 'Noor Smart Islamic Apps',
    description: 'Full-featured Islamic mobile app: Al-Quran, Qibla AR, Adzan, Dzikir, Tasbih, Zakat Calculator, AI Islamic Assistant agent.',
    longDescription:
      'Comprehensive Flutter-based Islamic lifestyle app (nuur_moeslem_apps) with 20+ modules: Quran recitation with audio, Adzan settings, AR Qibla compass, Dzikir & Tasbih counter, Islamic calendar, Hadith database, Yasin & Tahlil, Maulid, Ratib, Sholawat, Zakat & Waris calculators, Ibadah tracker, Imsakiyah, and an AI Islamic agent for fatwa and learning. Built for Android & iOS via Flutter.',
    category: 'mobile',
    status: 'live',
    techStack: ['Flutter', 'Dart', 'GetX', 'AI Agent', 'FastAPI', 'Vector DB', 'Laravel API'],
    year: 2024,
    metrics: [
      { label: 'Modules', value: '20+ Features' },
      { label: 'AI Engine', value: 'Islamic RAG' },
      { label: 'Platform', value: 'Android / iOS' },
    ],
    links: { live: '#' },
    featured: true,
    color: '#22d3ee',
  },
  {
    id: 'proj-002',
    title: 'Lunad — LinkedIn AI Automation Agent',
    description: 'AI SaaS platform automating LinkedIn lead generation, recruitment campaigns, and social media outreach.',
    longDescription:
      'Lunad is a Next.js + Prisma SaaS platform powering autonomous LinkedIn AI Agents for sales and recruitment. Manages Campaign pipelines (Sales/Recruitment), Lead & Candidate CRM with stateful tracking (New → Contacted → Replied → Converted/Hired), AI-generated personalized outreach sequences (Connection Request, InMail, Follow-up), and LinkedIn message automation with delivery analytics.',
    category: 'api',
    status: 'live',
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'MySQL', 'AI Agents', 'LangChain', 'LinkedIn API'],
    year: 2024,
    metrics: [
      { label: 'Target', value: 'LinkedIn Automation' },
      { label: 'Agents', value: 'Sales & Recruitment' },
      { label: 'Pipeline', value: 'Lead → Hire CRM' },
    ],
    links: { live: '#' },
    featured: true,
    color: '#4ade80',
  },
  {
    id: 'proj-003',
    title: 'HRMS + Face Recognition Attendance',
    description: 'Enterprise HR Management System with AI face recognition attendance, payroll, leave management & employee tracking.',
    longDescription:
      'Full-stack HRMS built with Laravel and Flutter, featuring AI-powered facial recognition for biometric attendance check-in/out, real-time payroll calculation, leave & absence management, employee performance tracking, warning letter generation, salary slip automation, and shift scheduling. Includes Flutter mobile app for field employees and web admin dashboard.',
    category: 'saas',
    status: 'live',
    techStack: ['Flutter', 'Dart', 'Laravel', 'PHP', 'Face Recognition', 'TensorFlow Lite', 'MySQL'],
    year: 2024,
    metrics: [
      { label: 'Attendance', value: 'Face Recognition' },
      { label: 'Modules', value: 'Payroll · Leave · Shift' },
      { label: 'Platform', value: 'Mobile + Web' },
    ],
    links: { live: '#' },
    featured: true,
    color: '#38bdf8',
  },
  {
    id: 'proj-004',
    title: 'Prime Stock',
    description: 'Enterprise inventory management platform built for mid-scale retail chains.',
    longDescription:
      'A full-featured inventory and warehouse management system (prime_stock) handling real-time stock tracking, multi-warehouse logistics, automated reorder workflows, and advanced analytics dashboards. Processes 50k+ daily transactions with sub-100ms response times.',
    category: 'saas',
    status: 'live',
    techStack: ['Laravel', 'React', 'MySQL', 'Redis', 'Docker', 'Inertia.js'],
    year: 2024,
    metrics: [
      { label: 'Daily TX', value: '50k+' },
      { label: 'Uptime', value: '99.98%' },
      { label: 'Response', value: '<80ms' },
    ],
    links: { live: 'https://primestock.id' },
    featured: false,
    color: '#06b6d4',
  },
  {
    id: 'proj-005',
    title: 'Masjid Management System',
    description: 'Multi-tenant SaaS platform for mosque management: display boards, Taklim schedules, digital media, and public landing pages.',
    longDescription:
      'Full-stack multi-tenant masjid management platform built with Laravel + Flutter. SuperAdmin manages multiple mosques, each with their own Admin panel for display token management, Taklim schedules, digital media library, and a Flutter-based Masjid Display Board system showing prayer times, announcements, and Taklim content on public screens.',
    category: 'saas',
    status: 'live',
    techStack: ['Laravel', 'Flutter', 'Dart', 'MySQL', 'Multi-Tenant', 'Livewire'],
    year: 2024,
    metrics: [
      { label: 'Tenants', value: 'Multi-Masjid SaaS' },
      { label: 'Display', value: 'Flutter Board' },
      { label: 'Features', value: 'Taklim · Media · Sched' },
    ],
    links: { live: '#' },
    featured: false,
    color: '#86efac',
  },
  {
    id: 'proj-006',
    title: 'MBtech e-Catalog & Merchant App',
    description: 'Flutter mobile e-catalog for MBtech with product browser, dealer locator, pricing, chat support, and merchant portal.',
    longDescription:
      'Enterprise Flutter mobile application (ecatalog_v02) for MBtech automotive accessories brand. Features: product inspiration gallery, interactive price list, dealer/outlet locator with map, live chat support, and a separate merchant-facing app (mbmerchant) for dealer management, chat communication, and sales dashboard.',
    category: 'mobile',
    status: 'live',
    techStack: ['Flutter', 'Dart', 'Laravel API', 'GetX', 'Google Maps', 'Firebase Chat'],
    year: 2023,
    metrics: [
      { label: 'Brand', value: 'MBtech' },
      { label: 'Features', value: 'Catalog · Locator · Chat' },
      { label: 'Platform', value: 'Android / iOS' },
    ],
    links: { live: '#' },
    featured: false,
    color: '#67e8f9',
  },
  {
    id: 'proj-007',
    title: 'Kerja Nasional Sales & HR Portal',
    description: 'Multi-platform sales tracking, commission management, HR, and ticket management system for field sales teams.',
    longDescription:
      'Comprehensive enterprise portal for Kerja Nasional & Prakarsa AI covering sales performance tracking, leaderboard analytics, commission calculation, HR/HumanResource module, attendance, warning letter management, salary system, ticketing, and merchant onboarding forms. Includes Laravel web admin and Flutter mobile app for field agents.',
    category: 'saas',
    status: 'live',
    techStack: ['Laravel', 'Flutter', 'React', 'TypeScript', 'MySQL', 'Chart.js'],
    year: 2023,
    metrics: [
      { label: 'Active Reps', value: '500+' },
      { label: 'Modules', value: 'Sales · HR · Ticket' },
      { label: 'Platform', value: 'Web + Mobile' },
    ],
    links: { live: 'https://sales.kerjanasional.id' },
    featured: false,
    color: '#a78bfa',
  },
  {
    id: 'proj-008',
    title: 'Reflexo POS — AI Reflexology Outlet System',
    description: 'Smart POS for reflexology/spa outlet with AI scheduling agent, WhatsApp bot, and AI patient detection & contraindication screening.',
    longDescription:
      'Full-stack Laravel POS platform for reflexology & wellness outlets powered by AI Agents. Manages bookings, therapist scheduling, room allocation, and patient health records. Features an AI Patient Detection system that screens patient medical profiles and automatically flags contraindications against available treatments and products. WhatsApp Agent handles automated appointment reminders, booking confirmations, and post-treatment follow-ups. Includes Payroll, Commission, Attendance, Customer Satisfaction scoring, Promo Codes, and multi-outlet support.',
    category: 'saas',
    status: 'live',
    techStack: ['Laravel', 'Filament', 'PHP', 'AI Agent', 'WhatsApp API', 'MySQL', 'LangChain'],
    year: 2024,
    metrics: [
      { label: 'AI Detection', value: 'Patient Screening' },
      { label: 'WA Agent', value: 'Booking + Reminder' },
      { label: 'Modules', value: 'POS · Payroll · CRM' },
    ],
    links: { live: '#' },
    featured: true,
    color: '#c084fc',
  },
  {
    id: 'proj-009',
    title: 'Diamond Miner — N-Queen Puzzle Game',
    description: 'Flutter puzzle game featuring N-Queen algorithm AI logic for strategic diamond mining placement across a dynamic board.',
    longDescription:
      'Diamond Miner is a Flutter-based strategic puzzle game powered by the N-Queens algorithm — a classic computer science constraint satisfaction problem. Players must place diamonds on a mining grid following non-attacking queen rules (no two diamonds share the same row, column, or diagonal). Features progressive difficulty levels (4×4 → 12×12 boards), animated mining drill UI, hint system using backtracking solver, and a score leaderboard. Demonstrates applied algorithm engineering in an interactive mobile game format.',
    category: 'mobile',
    status: 'live',
    techStack: ['Flutter', 'Dart', 'N-Queens Algorithm', 'Backtracking', 'GetX'],
    year: 2023,
    metrics: [
      { label: 'Algorithm', value: 'N-Queens / Backtrack' },
      { label: 'Board Sizes', value: '4×4 → 12×12' },
      { label: 'Platform', value: 'Android / iOS' },
    ],
    links: { live: '#' },
    featured: false,
    color: '#fbbf24',
  },
  {
    id: 'proj-010',
    title: 'OmniScrape Data Pipeline',
    description: 'High-volume web scraping & data extraction engine for maps, e-commerce marketplaces & social media.',
    longDescription:
      'Automated multi-threaded data extraction pipeline scraping product pricing, store locations from Google Maps, and e-commerce trends across major marketplaces. Implements proxy rotation, headless browser clusters, and anti-bot bypass.',
    category: 'api',
    status: 'live',
    techStack: ['Python', 'Puppeteer', 'Scrapy', 'Redis', 'ClickHouse', 'Docker'],
    year: 2024,
    metrics: [
      { label: 'Pages Scraped', value: '5M+/mo' },
      { label: 'Success Rate', value: '99.2%' },
      { label: 'Proxy Pool', value: '10k+ IPs' },
    ],
    links: {},
    featured: false,
    color: '#fb923c',
  },
];

// ─── Milestones ───────────────────────────────────────────────────────────────

export const defaultMilestones: Milestone[] = [
  {
    id: 'ms-001',
    type: 'role',
    title: 'Senior Full-Stack & AI Engineer',
    organisation: 'Prakarsa AI',
    period: '2024 — Present',
    description:
      'Lead engineer building AI-integrated SaaS products: Lunad LinkedIn AI Agent, HRMS with Face Recognition, Noor Islamic App, data automation pipelines, and enterprise web & mobile platforms.',
    highlights: [
      'Built Lunad — LinkedIn AI SaaS automation agent platform',
      'Developed HRMS with AI Face Recognition attendance system',
      'Built Noor Islamic App with 20+ modules & AI Islamic agent',
    ],
    location: 'Bekasi, Indonesia (Remote)',
    current: true,
  },
  {
    id: 'ms-002',
    type: 'role',
    title: 'Full-Stack & Mobile Developer',
    organisation: 'Kerja Nasional',
    period: '2022 — 2024',
    description:
      'Built and maintained enterprise-grade Laravel/React & Flutter applications: Sales Portal, MBtech e-Catalog, Merchant App, Masjid Management System, and Inventory systems.',
    highlights: [
      'Delivered MBtech Flutter e-Catalog & Merchant App (Android / iOS)',
      'Built multi-tenant Masjid Management System with Flutter Display Board',
      'Architected Kerja Nasional Sales & HR portal (500+ users)',
    ],
    location: 'Bekasi, Indonesia',
    current: false,
  },
  {
    id: 'ms-003',
    type: 'role',
    title: 'Web & Scraping Developer',
    organisation: 'Freelance / Agency',
    period: '2013 — 2022',
    description:
      'Engineered custom web applications, e-commerce stores, Flutter mobile apps, and data extraction scrapers for Indonesian and international clients.',
    highlights: [
      'Scraped market data across Shopee, Tokopedia, Google Maps, LinkedIn & Instagram',
      'Launched 30+ client web applications, POS & payment integrations',
      'Active full-stack & mobile software development since 2013',
    ],
    location: 'Bekasi, Indonesia',
    current: false,
  },
  {
    id: 'ms-004',
    type: 'education',
    title: 'Informatics Engineering Student',
    organisation: 'Universitas BSI (Bina Sarana Informatika)',
    period: '2010 — 2013',
    description:
      'Completed computer science and software development degree at Universitas BSI (Bekasi, 2010 — 2013). Active in programming and software architecture.',
    highlights: [
      'Universitas BSI Bekasi Graduate (2010 — 2013)',
      'Specialized in Software Engineering & Database Systems',
      'Active Full-Stack Developer since 2013',
    ],
    location: 'Bekasi, West Java',
    current: false,
  },
];

// ─── Skills ───────────────────────────────────────────────────────────────────

export const defaultSkills: Skill[] = [
  // AI & Automation
  { id: 'sk-026', name: 'AI Automation', category: 'ai', level: 'expert', proficiency: 95, years: 3, icon: 'https://cdn.simpleicons.org/zapier' },
  { id: 'sk-027', name: 'n8n', category: 'ai', level: 'expert', proficiency: 94, years: 3, icon: 'https://cdn.simpleicons.org/n8n' },
  { id: 'sk-028', name: 'Langflow', category: 'ai', level: 'expert', proficiency: 91, years: 2, icon: 'https://cdn.simpleicons.org/langchain' },
  { id: 'sk-029', name: 'RAG Architecture', category: 'ai', level: 'expert', proficiency: 93, years: 2, icon: 'https://cdn.simpleicons.org/pinecone' },
  { id: 'sk-030', name: 'Autonomous Agent AI', category: 'ai', level: 'expert', proficiency: 94, years: 2, icon: 'https://cdn.simpleicons.org/openai' },
  { id: 'sk-031', name: 'Hermes Agent', category: 'ai', level: 'expert', proficiency: 90, years: 2, icon: 'https://cdn.simpleicons.org/huggingface' },
  { id: 'sk-032', name: 'Web Scraping', category: 'ai', level: 'expert', proficiency: 95, years: 7, icon: 'https://cdn.simpleicons.org/python' },
  { id: 'sk-033', name: 'Puppeteer / Playwright', category: 'ai', level: 'expert', proficiency: 92, years: 5, icon: 'https://cdn.simpleicons.org/puppeteer' },
  { id: 'sk-034', name: 'LangChain & LangGraph', category: 'ai', level: 'expert', proficiency: 90, years: 2, icon: 'https://cdn.simpleicons.org/langchain' },
  { id: 'sk-035', name: 'Face Recognition', category: 'ai', level: 'proficient', proficiency: 80, years: 2, icon: 'https://cdn.simpleicons.org/tensorflow' },

  // Mobile
  { id: 'sk-022', name: 'Flutter', category: 'mobile', level: 'expert', proficiency: 92, years: 4, icon: 'https://cdn.simpleicons.org/flutter' },
  { id: 'sk-023', name: 'Dart', category: 'mobile', level: 'expert', proficiency: 90, years: 4, icon: 'https://cdn.simpleicons.org/dart' },
  { id: 'sk-024', name: 'React Native', category: 'mobile', level: 'proficient', proficiency: 76, years: 2, icon: 'https://cdn.simpleicons.org/react' },
  { id: 'sk-025', name: 'Kotlin', category: 'mobile', level: 'proficient', proficiency: 72, years: 2, icon: 'https://cdn.simpleicons.org/kotlin' },

  // Frontend
  { id: 'sk-001', name: 'React', category: 'frontend', level: 'expert', proficiency: 92, years: 4, icon: 'https://cdn.simpleicons.org/react' },
  { id: 'sk-002', name: 'TypeScript', category: 'frontend', level: 'expert', proficiency: 88, years: 3, icon: 'https://cdn.simpleicons.org/typescript' },
  { id: 'sk-003', name: 'Next.js', category: 'frontend', level: 'proficient', proficiency: 82, years: 2, icon: 'https://cdn.simpleicons.org/nextdotjs' },
  { id: 'sk-004', name: 'Tailwind CSS', category: 'frontend', level: 'expert', proficiency: 95, years: 4, icon: 'https://cdn.simpleicons.org/tailwindcss' },

  // Backend
  { id: 'sk-006', name: 'Laravel', category: 'backend', level: 'expert', proficiency: 96, years: 6, icon: 'https://cdn.simpleicons.org/laravel' },
  { id: 'sk-007', name: 'Node.js', category: 'backend', level: 'proficient', proficiency: 80, years: 3, icon: 'https://cdn.simpleicons.org/nodedotjs' },
  { id: 'sk-008', name: 'PHP', category: 'backend', level: 'expert', proficiency: 94, years: 6, icon: 'https://cdn.simpleicons.org/php' },
  { id: 'sk-009', name: 'REST API Design', category: 'backend', level: 'expert', proficiency: 92, years: 5, icon: 'https://cdn.simpleicons.org/postman' },

  // Database
  { id: 'sk-011', name: 'MySQL', category: 'database', level: 'expert', proficiency: 90, years: 6, icon: 'https://cdn.simpleicons.org/mysql' },
  { id: 'sk-012', name: 'PostgreSQL', category: 'database', level: 'proficient', proficiency: 82, years: 3, icon: 'https://cdn.simpleicons.org/postgresql' },
  { id: 'sk-013', name: 'Redis', category: 'database', level: 'proficient', proficiency: 78, years: 3, icon: 'https://cdn.simpleicons.org/redis' },
  { id: 'sk-014', name: 'Prisma ORM', category: 'database', level: 'proficient', proficiency: 75, years: 1, icon: 'https://cdn.simpleicons.org/prisma' },

  // DevOps
  { id: 'sk-015', name: 'Docker', category: 'devops', level: 'proficient', proficiency: 80, years: 3, icon: 'https://cdn.simpleicons.org/docker' },
  { id: 'sk-016', name: 'AWS', category: 'devops', level: 'proficient', proficiency: 74, years: 2, icon: 'https://cdn.simpleicons.org/amazonaws' },
  { id: 'sk-017', name: 'CI/CD', category: 'devops', level: 'proficient', proficiency: 76, years: 3, icon: 'https://cdn.simpleicons.org/githubactions' },

  // Tools
  { id: 'sk-019', name: 'Git / GitHub', category: 'tools', level: 'expert', proficiency: 95, years: 6, icon: 'https://cdn.simpleicons.org/github' },
  { id: 'sk-020', name: 'Figma', category: 'tools', level: 'proficient', proficiency: 72, years: 3, icon: 'https://cdn.simpleicons.org/figma' },
  { id: 'sk-021', name: 'Postman', category: 'tools', level: 'expert', proficiency: 90, years: 5, icon: 'https://cdn.simpleicons.org/postman' },
];

// ─── Certificates & Credentials ───────────────────────────────────────────────

export const defaultCertificates: Certificate[] = [
  {
    id: 'cert-001',
    title: 'AI Automation & Multi-Agent Workflow Architect',
    issuer: 'DeepLearning.AI & LangChain',
    issueDate: '2024',
    credentialId: 'DLAI-AGNT-88492',
    credentialUrl: 'https://www.deeplearning.ai',
    skills: ['n8n', 'Langflow', 'Autonomous Agents', 'LangGraph', 'Tool Calling'],
    category: 'ai',
    featured: true,
  },
  {
    id: 'cert-002',
    title: 'Production RAG & Vector Search Mastery',
    issuer: 'Pinecone Vector Academy',
    issueDate: '2024',
    credentialId: 'PINECONE-VEC-99201',
    credentialUrl: 'https://www.pinecone.io',
    skills: ['RAG Architecture', 'Vector Search', 'Embeddings', 'ChromaDB', 'Hybrid Retrieval'],
    category: 'ai',
    featured: true,
  },
  {
    id: 'cert-003',
    title: 'Professional Flutter & Cross-Platform Mobile Engineer',
    issuer: 'Google Developer Community',
    issueDate: '2023',
    credentialId: 'GDC-FLUTTER-77182',
    credentialUrl: 'https://flutter.dev',
    skills: ['Flutter', 'Dart', 'BLoC State Management', 'Cross-Platform', 'Mobile Security'],
    category: 'mobile',
    featured: true,
  },
  {
    id: 'cert-004',
    title: 'Senior Enterprise Full-Stack & Laravel Architecture',
    issuer: 'Laravel Enterprise Solutions',
    issueDate: '2022',
    credentialId: 'LARAVEL-ARCH-44129',
    credentialUrl: 'https://laravel.com',
    skills: ['Laravel', 'REST APIs', 'Multi-Tenant SaaS', 'Redis Caching', 'Database Optimization'],
    category: 'backend',
    featured: true,
  },
  {
    id: 'cert-005',
    title: 'Cloud Infrastructure & Containerized DevOps',
    issuer: 'Docker & AWS Certified Specialist',
    issueDate: '2022',
    credentialId: 'DOCKER-OPS-66230',
    credentialUrl: 'https://www.docker.com',
    skills: ['Docker', 'CI/CD Pipelines', 'AWS', 'Nginx', 'High Availability'],
    category: 'cloud',
    featured: false,
  },
  {
    id: 'cert-006',
    title: 'Informatics Engineering Graduate Diploma',
    issuer: 'Universitas BSI (Bina Sarana Informatika)',
    issueDate: '2013',
    credentialId: 'BSI-TI-2013-0988',
    credentialUrl: 'https://bsi.ac.id',
    skills: ['Computer Science', 'Software Architecture', 'Data Structures', 'Database Systems'],
    category: 'academic',
    featured: true,
  },
];
