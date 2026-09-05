import type { Project, Milestone, Skill, SystemConfig, Certificate } from '../types';

// ─── System Config ───────────────────────────────────────────────────────────

export const defaultConfig: SystemConfig = {
  ownerName: 'Tyo Bramas',
  ownerTitle: 'Principal Software Engineer',
  ownerEmail: 'bramastyodevops@gmail.com',
  ownerGithub: 'https://github.com/tyobramas',
  ownerLinkedIn: 'https://linkedin.com/in/bramastyokusumo',
  ownerLocation: 'Bekasi, West Java, Indonesia',
  ownerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=500&q=80',
  ownerBio:
    'Principal Software Engineer dengan 13+ tahun pengalaman membangun dan mengoperasikan sistem berskala produksi di Indonesia. Berfokus pada rekayasa platform mobile lintas platform (Flutter), arsitektur backend terdistribusi (Laravel, Node.js), dan pipeline otomasi alur kerja AI (n8n, Langflow, RAG tingkat lanjut).',
  heroTagline:
    '13 tahun membangun sistem mobile, backend, dan otomasi untuk perusahaan di Indonesia.',
  availableForWork: true,
  updatedAt: new Date().toISOString(),
};

// ─── Projects ────────────────────────────────────────────────────────────────

export const defaultProjects: Project[] = [
  {
    id: 'proj-001',
    title: 'Noor Smart Islamic Apps',
    description: 'Aplikasi mobile komprehensif berbasis Flutter: Al-Quran audio, Qibla AR, kalkulator Zakat & Waris, serta asisten AI interaktif.',
    longDescription:
      'Aplikasi mobile Flutter (nuur_moeslem_apps) dengan 20+ modul: tilawah Al-Quran dengan audio resolusi tinggi, AR Qibla compass, penghitung Dzikir & Tasbih, kalender Hijriah, basis data hadis, serta asisten AI interaktif.',
    category: 'mobile',
    status: 'live',
    techStack: ['Flutter', 'Dart', 'GetX', 'FastAPI', 'Vector DB', 'Laravel API'],
    tech: ['Flutter', 'Dart', 'GetX', 'FastAPI', 'Vector DB', 'Laravel API'],
    year: 2024,
    image: '/images/noor_islamic.jpg',
    impact: 'Mendukung 20+ modul ibadah terintegrasi dengan latensi respons asisten RAG sub-detik.',
    link: 'https://github.com/tyobramas',
    metrics: [
      { label: 'Modules', value: '20+ Fitur' },
      { label: 'AI Engine', value: 'Islamic RAG' },
      { label: 'Platform', value: 'Android / iOS' },
    ],
    links: { live: 'https://github.com/tyobramas' },
    featured: true,
    color: '#9C7B45',
  },
  {
    id: 'proj-002',
    title: 'Lunad — LinkedIn AI Automation Agent',
    description: 'Platform SaaS otomatisasi pipeline penjangkauan B2B dan rekrutmen berbasis agen otonom dan analisis metrik.',
    longDescription:
      'Platform SaaS Next.js + Prisma yang menggerakkan AI Agent untuk alur kerja penjualan dan rekrutmen. Mengelola pipeline prospek secara terstruktur dari kontak awal hingga konversi.',
    category: 'api',
    status: 'live',
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'MySQL', 'LangChain', 'LinkedIn API'],
    tech: ['Next.js', 'TypeScript', 'Prisma', 'MySQL', 'LangChain', 'LinkedIn API'],
    year: 2024,
    image: '/images/lunad_ai.jpg',
    impact: 'Pipeline CRM otomatis memproses 10k+ prospek dengan peningkatan conversion rate 3.2x.',
    link: 'https://github.com/tyobramas',
    metrics: [
      { label: 'Otomasi', value: 'LinkedIn Pipeline' },
      { label: 'Agen', value: 'Sales & Recruitment' },
      { label: 'Alur', value: 'Lead → Convert' },
    ],
    links: { live: 'https://github.com/tyobramas' },
    featured: true,
    color: '#9C7B45',
  },
  {
    id: 'proj-003',
    title: 'HRMS + Face Recognition Attendance',
    description: 'Sistem manajemen SDM enterprise dengan presensi biometrik pengenalan wajah, kalkulasi payroll instan, dan shift scheduling.',
    longDescription:
      'Solusi terintegrasi Laravel dan Flutter dengan pengenalan wajah di perangkat mobile untuk presensi karyawan lapangan, otomatisasi slip gaji, dan rekap kepatuhan kerja.',
    category: 'saas',
    status: 'live',
    techStack: ['Flutter', 'Dart', 'Laravel', 'PHP', 'TensorFlow Lite', 'MySQL'],
    tech: ['Flutter', 'Dart', 'Laravel', 'PHP', 'TensorFlow Lite', 'MySQL'],
    year: 2024,
    image: '/images/hrms_biometric.jpg',
    impact: 'Rekap payroll dan presensi biometrik 1.200+ karyawan otomatis turun dari 3 hari ke 4 jam.',
    link: 'https://github.com/tyobramas',
    metrics: [
      { label: 'Presensi', value: 'Pengenalan Wajah' },
      { label: 'Modul', value: 'Payroll · Cuti · Shift' },
      { label: 'Platform', value: 'Mobile + Web' },
    ],
    links: { live: 'https://github.com/tyobramas' },
    featured: true,
    color: '#9C7B45',
  },
  {
    id: 'proj-004',
    title: 'Prime Stock',
    description: 'Platform manajemen inventaris multi-gudang untuk jaringan ritel skala menengah dengan audit real-time.',
    longDescription:
      'Sistem pergudangan dan inventaris (prime_stock) yang menangani pelacakan stok multi-lokasi, alur pemesanan otomatis, dan dasbor analitik respon cepat.',
    category: 'saas',
    status: 'live',
    techStack: ['Laravel', 'React', 'MySQL', 'Redis', 'Docker'],
    tech: ['Laravel', 'React', 'MySQL', 'Redis', 'Docker'],
    year: 2024,
    image: '/images/primestock.jpg',
    impact: 'Memproses 50k+ transaksi inventaris harian lintas multi-gudang dengan respon <80ms.',
    link: 'https://primestock.id',
    metrics: [
      { label: 'Transaksi', value: '50k+ / Hari' },
      { label: 'Uptime', value: '99.98%' },
      { label: 'Respon', value: '<80ms' },
    ],
    links: { live: 'https://primestock.id' },
    featured: false,
    color: '#9C7B45',
  },
  {
    id: 'proj-005',
    title: 'Masjid Management System',
    description: 'Platform SaaS multi-tenant untuk tata kelola masjid, jadwal taklim, media digital, dan papan display informasi publik.',
    longDescription:
      'Platform tata kelola masjid terpusat berbasis Laravel dan Flutter Display Board untuk penayangan jadwal salat, agenda kajian, dan laporan transparansi kas.',
    category: 'saas',
    status: 'live',
    techStack: ['Laravel', 'Flutter', 'Dart', 'MySQL', 'Livewire'],
    tech: ['Laravel', 'Flutter', 'Dart', 'MySQL', 'Livewire'],
    year: 2024,
    image: '/images/masjid_system.jpg',
    impact: 'Sistem multi-tenant terdistribusi menghubungkan puluhan display digital secara tersentral.',
    link: 'https://github.com/tyobramas',
    metrics: [
      { label: 'Arsitektur', value: 'Multi-Tenant' },
      { label: 'Display', value: 'Flutter TV Board' },
      { label: 'Fitur', value: 'Taklim · Media · Kas' },
    ],
    links: { live: 'https://github.com/tyobramas' },
    featured: false,
    color: '#9C7B45',
  },
  {
    id: 'proj-006',
    title: 'MBtech e-Catalog & Merchant App',
    description: 'Aplikasi e-katalog otomotif Flutter dengan pencari dealer terdekat, galeri inspirasi produk, dan portal mitra bisnis.',
    longDescription:
      'Aplikasi mobile resmi MBtech untuk eksplorasi varian produk kulit sintetis, penentu lokasi toko dan bengkel resmi dengan peta, serta portal pedagang terpisah.',
    category: 'mobile',
    status: 'live',
    techStack: ['Flutter', 'Dart', 'Laravel API', 'GetX', 'Google Maps'],
    tech: ['Flutter', 'Dart', 'Laravel API', 'GetX', 'Google Maps'],
    year: 2023,
    image: '/images/mbtech_catalog.jpg',
    impact: 'Menghubungkan ratusan dealer dan ribuan katalog bahan secara instan dengan offline-first caching.',
    link: 'https://github.com/tyobramas',
    metrics: [
      { label: 'Brand', value: 'MBtech' },
      { label: 'Fitur', value: 'Katalog · Lokator · Chat' },
      { label: 'Platform', value: 'Android / iOS' },
    ],
    links: { live: 'https://github.com/tyobramas' },
    featured: false,
    color: '#9C7B45',
  },
  {
    id: 'proj-007',
    title: 'Kerja Nasional Sales & HR Portal',
    description: 'Portal pemantauan produktivitas armada sales lapangan, otomasi kalkulasi komisi berjenjang, dan tata kelola absensi.',
    longDescription:
      'Portal operasional tenaga kerja terpadu untuk Kerja Nasional, mencakup papan peringkat penjualan, sistem persetujuan klaim komisi, dan modul tiket layanan internal.',
    category: 'saas',
    status: 'live',
    techStack: ['Laravel', 'Flutter', 'React', 'TypeScript', 'MySQL'],
    tech: ['Laravel', 'Flutter', 'React', 'TypeScript', 'MySQL'],
    year: 2023,
    image: '/images/kerjanasional_portal.jpg',
    impact: 'Sentralisasi pelacakan komisi dan performa 500+ agen lapangan secara realtime.',
    link: 'https://sales.kerjanasional.id',
    metrics: [
      { label: 'Armada', value: '500+ Agen' },
      { label: 'Modul', value: 'Sales · HR · Tiket' },
      { label: 'Platform', value: 'Web + Mobile' },
    ],
    links: { live: 'https://sales.kerjanasional.id' },
    featured: false,
    color: '#9C7B45',
  },
  {
    id: 'proj-008',
    title: 'Reflexo POS — AI Reflexology Outlet System',
    description: 'Sistem POS dan operasional klinik kebugaran dengan bot asisten reservasi WhatsApp dan skrining kontraindikasi kesehatan.',
    longDescription:
      'Platform POS klinik terpadu berbasis Laravel untuk alokasi ruang terapi, penjadwalan terapis, dan penapisan rekam medis pasien sebelum tindakan.',
    category: 'saas',
    status: 'live',
    techStack: ['Laravel', 'Filament', 'PHP', 'WhatsApp API', 'MySQL', 'LangChain'],
    tech: ['Laravel', 'Filament', 'PHP', 'WhatsApp API', 'MySQL', 'LangChain'],
    year: 2024,
    image: '/images/reflexo_pos.jpg',
    impact: 'Otomasi reservasi WhatsApp dan skrining kontraindikasi pasien memangkas waktu tunggu 40%.',
    link: 'https://github.com/tyobramas',
    metrics: [
      { label: 'Skrining', value: 'Penapisan Riwayat' },
      { label: 'Bot Reservasi', value: 'WhatsApp API' },
      { label: 'Modul', value: 'POS · Komisi · CRM' },
    ],
    links: { live: 'https://github.com/tyobramas' },
    featured: true,
    color: '#9C7B45',
  },
  {
    id: 'proj-009',
    title: 'Diamond Miner — N-Queen Puzzle Game',
    description: 'Game logika penempatan bidak strategis berbasis algoritma pemecahan kendala N-Queens dengan solver backtracking dinamis.',
    longDescription:
      'Eksplorasi algoritma constraint satisfaction dalam format game mobile Flutter. Menampilkan visualisasi penempatan non-attacking queens pada papan dinamis.',
    category: 'mobile',
    status: 'live',
    techStack: ['Flutter', 'Dart', 'Backtracking Algorithm', 'GetX'],
    tech: ['Flutter', 'Dart', 'Backtracking Algorithm', 'GetX'],
    year: 2023,
    image: '/images/diamond_miner.jpg',
    impact: 'Implementasi algoritma backtracking presisi dengan 60fps animasi pada layar mobile.',
    link: 'https://github.com/tyobramas',
    metrics: [
      { label: 'Algoritma', value: 'N-Queens / Backtrack' },
      { label: 'Ukuran Papan', value: '4×4 → 12×12' },
      { label: 'Platform', value: 'Android / iOS' },
    ],
    links: { live: 'https://github.com/tyobramas' },
    featured: false,
    color: '#9C7B45',
  },
  {
    id: 'proj-010',
    title: 'OmniScrape Data Pipeline',
    description: 'Arsitektur pipeline ekstraksi data berskala tinggi untuk inventarisasi e-commerce, geolokasi bisnis, dan analisis tren.',
    longDescription:
      'Pipeline ekstraksi data multi-threaded dengan rotasi proxy, cluster peramban headless, dan manajemen antrean data terstruktur untuk pemrosesan jutaan rekaman bulanan.',
    category: 'api',
    status: 'live',
    techStack: ['Python', 'Puppeteer', 'Scrapy', 'Redis', 'ClickHouse', 'Docker'],
    tech: ['Python', 'Puppeteer', 'Scrapy', 'Redis', 'ClickHouse', 'Docker'],
    year: 2024,
    impact: 'Ekstraksi 5M+ data marketplace dan geolokasi bulanan dengan success rate 99.2%.',
    link: 'https://github.com/tyobramas',
    metrics: [
      { label: 'Throughput', value: '5M+ / Bulan' },
      { label: 'Keberhasilan', value: '99.2%' },
      { label: 'Arsitektur', value: 'Distributed Cluster' },
    ],
    links: { live: 'https://github.com/tyobramas' },
    featured: false,
    color: '#9C7B45',
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
