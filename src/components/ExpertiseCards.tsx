import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe, Server, Cloud, Shield,
  Smartphone, Workflow, Bot, BrainCircuit, Sparkles,
  CheckCircle2, Layers, Cpu, ArrowUpRight, LucideIcon
} from 'lucide-react';

type CategoryType = 'all' | 'ai' | 'mobile' | 'backend' | 'cloud';

interface ExpertiseItem {
  id: string;
  category: CategoryType;
  icon: LucideIcon;
  title: string;
  badge: string;
  description: string;
  metrics: string;
  capabilities: string[];
  tags: string[];
  accent: {
    gradient: string;
    border: string;
    text: string;
    bg: string;
  };
  featured?: boolean;
}

const CATEGORIES: { id: CategoryType; label: string }[] = [
  { id: 'all',     label: 'All Capabilities' },
  { id: 'ai',      label: 'AI & Autonomous Systems' },
  { id: 'mobile',  label: 'Mobile & Frontend' },
  { id: 'backend', label: 'Backend & SaaS' },
  { id: 'cloud',   label: 'Cloud & Infrastructure' },
];

const EXPERTISE_ITEMS: ExpertiseItem[] = [
  {
    id: 'ai-automation',
    category: 'ai',
    icon: Sparkles,
    badge: 'MISSION-CRITICAL AUTOMATION',
    title: 'Enterprise AI Automation & Orchestration',
    description: 'Engineering multi-step automated operational workflows integrating LLM tool calling, CRM webhooks, relational databases, and asynchronous task queues with zero manual intervention.',
    metrics: '95%+ Operational Efficiency Gain',
    capabilities: [
      'n8n & Langflow Production Pipelines',
      'Autonomous Webhook & Event Handlers',
      'LLM Tool Calling & Function Execution',
      'Custom API Integrations & Middleware'
    ],
    tags: ['n8n', 'Langflow', 'Webhooks', 'API Orchestration', 'Zapier', 'Task Queues'],
    accent: {
      gradient: 'from-cyan-500/20 via-sky-500/10 to-transparent',
      border: 'border-cyan-400/40 hover:border-cyan-300',
      text: 'text-cyan-300',
      bg: 'bg-cyan-950/60',
    },
    featured: true,
  },
  {
    id: 'autonomous-agents',
    category: 'ai',
    icon: Bot,
    badge: 'AUTONOMOUS REASONING',
    title: 'Autonomous Multi-Agents & Hermes Engine',
    description: 'Architecting self-orchestrating AI agents with persistent state memory, adaptive reasoning trees, and dynamic tool execution designed for complex, high-stakes decision workflows.',
    metrics: 'Stateful Memory & Multi-Agent Teams',
    capabilities: [
      'Nous Hermes & Open-Weights Reasoning',
      'LangGraph Multi-Agent Workflows',
      'Autonomous Goal Decomposition',
      'MCP (Model Context Protocol) Tools'
    ],
    tags: ['Nous Hermes', 'LangGraph', 'Multi-Agent', 'Tool Calling', 'MCP Protocol', 'Agent AI'],
    accent: {
      gradient: 'from-purple-500/20 via-indigo-500/10 to-transparent',
      border: 'border-purple-400/40 hover:border-purple-300',
      text: 'text-purple-300',
      bg: 'bg-purple-950/60',
    },
    featured: true,
  },
  {
    id: 'rag-vector',
    category: 'ai',
    icon: BrainCircuit,
    badge: 'SEMANTIC KNOWLEDGE',
    title: 'Production RAG & Vector Knowledge Engines',
    description: 'Retrieval-Augmented Generation architectures with intelligent document chunking, hybrid keyword/vector search, and metadata filtering to guarantee zero-hallucination factual precision.',
    metrics: 'Zero-Hallucination Retrieval Accuracy',
    capabilities: [
      'Vector DBs (Pinecone, ChromaDB, Qdrant)',
      'Semantic Chunking & Re-ranking',
      'Hybrid Dense & Sparse Search',
      'Enterprise Document Ingestion Pipelines'
    ],
    tags: ['RAG', 'Vector Search', 'Pinecone', 'ChromaDB', 'Embeddings', 'Semantic Search'],
    accent: {
      gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      border: 'border-emerald-400/40 hover:border-emerald-300',
      text: 'text-emerald-300',
      bg: 'bg-emerald-950/60',
    },
    featured: true,
  },
  {
    id: 'mobile-flutter',
    category: 'mobile',
    icon: Smartphone,
    badge: 'CROSS-PLATFORM ENGINEERING',
    title: 'High-Performance Mobile Applications',
    description: 'Engineering responsive, smooth 60fps native-grade mobile applications with Flutter and Dart. Implementing offline-first local synchronization, biometric security, and clean architecture.',
    metrics: '60fps Native UI · iOS & Android',
    capabilities: [
      'Cross-Platform iOS & Android Deployments',
      'BLoC / Provider Clean State Management',
      'Offline-First SQLite & Hive Caching',
      'Biometric & Cryptographic Security'
    ],
    tags: ['Flutter', 'Dart', 'BLoC', 'GetX', 'iOS', 'Android', 'Offline Caching'],
    accent: {
      gradient: 'from-sky-500/20 via-blue-500/10 to-transparent',
      border: 'border-sky-400/40 hover:border-sky-300',
      text: 'text-sky-300',
      bg: 'bg-sky-950/60',
    },
    featured: true,
  },
  {
    id: 'backend-laravel',
    category: 'backend',
    icon: Server,
    badge: 'ENTERPRISE BACKEND',
    title: 'Backend & High-Throughput API Architecture',
    description: 'High-performance RESTful and GraphQL backend microservices built with Laravel and Node.js. Clean Domain-Driven Design (DDD), Redis caching queues, and OpenAPI compliance.',
    metrics: 'Sub-100ms API Latency at Scale',
    capabilities: [
      'Laravel 11+ & Modern PHP 8.3 Ecosystem',
      'High-Concurrency Redis Queue Systems',
      'Domain-Driven Clean Architecture',
      'Automated OpenAPI / Swagger Documentation'
    ],
    tags: ['Laravel', 'Node.js', 'REST API', 'Redis Queues', 'WebSockets', 'PHP 8.3'],
    accent: {
      gradient: 'from-indigo-500/20 via-cyan-500/10 to-transparent',
      border: 'border-indigo-400/40 hover:border-indigo-300',
      text: 'text-indigo-300',
      bg: 'bg-indigo-950/60',
    },
  },
  {
    id: 'frontend-react',
    category: 'mobile',
    icon: Globe,
    badge: 'MODERN WEB APPS',
    title: 'Full-Stack Web & Reactive Frontends',
    description: 'Fast, responsive, high-contrast web applications built with React 18, TypeScript, and modern CSS systems. Optimized for performance, Lighthouse 95+ scores, and accessibility.',
    metrics: 'Lighthouse 95+ Performance Rating',
    capabilities: [
      'React 18, TypeScript & Next.js Frameworks',
      'Interactive State Machines & Glassmorphism',
      'Real-Time WebSocket State Synchronization',
      'Accessible WCAG & SEO Architecture'
    ],
    tags: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vite', 'State Management'],
    accent: {
      gradient: 'from-cyan-500/20 via-teal-500/10 to-transparent',
      border: 'border-cyan-400/40 hover:border-cyan-300',
      text: 'text-cyan-300',
      bg: 'bg-cyan-950/60',
    },
  },
  {
    id: 'saas-multi-tenant',
    category: 'backend',
    icon: Workflow,
    badge: 'SAAS ARCHITECTURE',
    title: 'Multi-Tenant SaaS & Subscription Engines',
    description: 'Engineering multi-tenant SaaS platforms with granular Role-Based Access Control (RBAC), multi-gateway billing systems, comprehensive audit trails, and tenant isolation.',
    metrics: 'Strict Multi-Tenant Data Isolation',
    capabilities: [
      'Isolated Schema & Shared Database Models',
      'Granular RBAC & Permission Matrices',
      'Stripe / Midtrans Payment Orchestration',
      'Immutable Event Logs & Audit Trails'
    ],
    tags: ['Multi-Tenant SaaS', 'RBAC', 'Stripe', 'Midtrans', 'Audit Logs', 'Tenant Isolation'],
    accent: {
      gradient: 'from-amber-500/20 via-yellow-500/10 to-transparent',
      border: 'border-amber-400/40 hover:border-amber-300',
      text: 'text-amber-300',
      bg: 'bg-amber-950/60',
    },
  },
  {
    id: 'cloud-infrastructure',
    category: 'cloud',
    icon: Cloud,
    badge: 'HIGH AVAILABILITY',
    title: 'Cloud Infrastructure, Docker & DevOps',
    description: 'Automated CI/CD deployment pipelines, containerized Docker microservices, reverse proxies, and cloud infrastructure engineered for 99.9% uptime and zero-downtime releases.',
    metrics: '99.9% Production SLA Uptime',
    capabilities: [
      'Docker & Containerized Microservices',
      'Automated GitHub Actions CI/CD',
      'Nginx Reverse Proxy & SSL Automation',
      'Proactive Server Health & Telemetry'
    ],
    tags: ['Docker', 'CI/CD', 'GitHub Actions', 'AWS', 'Nginx', 'Linux'],
    accent: {
      gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
      border: 'border-blue-400/40 hover:border-blue-300',
      text: 'text-blue-300',
      bg: 'bg-blue-950/60',
    },
  },
  {
    id: 'security-hardening',
    category: 'cloud',
    icon: Shield,
    badge: 'SECURITY & GOVERNANCE',
    title: 'Enterprise Security & Authentication Hardening',
    description: 'Implementing defense-in-depth security architectures, OAuth2/JWT token rotation, OWASP Top 10 mitigation, payload encryption, and proactive API rate limiting.',
    metrics: 'OWASP Top 10 & OAuth2 Hardened',
    capabilities: [
      'OAuth2 & JWT Token Rotation Security',
      'Zero-Trust API Protection & Rate Limiting',
      'Encrypted Data at Rest & in Transit',
      'Comprehensive Vulnerability Auditing'
    ],
    tags: ['OAuth2', 'JWT', 'OWASP Top 10', 'Data Encryption', 'Rate Limiting', 'Zero-Trust'],
    accent: {
      gradient: 'from-rose-500/20 via-purple-500/10 to-transparent',
      border: 'border-rose-400/40 hover:border-rose-300',
      text: 'text-rose-300',
      bg: 'bg-rose-950/60',
    },
  },
];

const ExpertiseCards: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');

  const filteredItems = activeCategory === 'all'
    ? EXPERTISE_ITEMS
    : EXPERTISE_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="expertise" aria-label="Core Technical Expertise" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 font-sans text-xs font-semibold tracking-wider uppercase mb-3">
            <Cpu size={14} className="text-cyan-400" />
            <span>Technical Mastery & Architecture</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Core Technical Domains
          </h2>
          <p className="text-slate-300 font-sans text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
            Battle-tested engineering competencies across AI automation, autonomous reasoning agents, mobile ecosystems, and high-scale cloud platforms.
          </p>
        </motion.div>

        {/* Interactive Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={[
                  'px-4 py-2 rounded-xl font-sans text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer',
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white shadow-[0_0_16px_rgba(56,189,248,0.3)] border border-cyan-300/50 scale-[1.02]'
                    : 'bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-white hover:border-slate-500 hover:bg-slate-850',
                ].join(' ')}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic & Attractive Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                  className={`glass-panel p-6 flex flex-col justify-between border ${item.accent.border} relative overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-200`}
                >
                  {/* Subtle top ambient glow */}
                  <div className={`absolute top-0 right-0 left-0 h-28 bg-gradient-to-b ${item.accent.gradient} pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity`} />

                  <div className="relative z-10">
                    {/* Badge & Icon */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className={`font-sans text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded-md border ${item.accent.bg} ${item.accent.text} ${item.accent.border} uppercase`}>
                        {item.badge}
                      </span>
                      <div className={`w-10 h-10 rounded-xl ${item.accent.bg} border ${item.accent.border} flex items-center justify-center group-hover:scale-110 transition-transform shadow-md`}>
                        <Icon size={20} className={item.accent.text} />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-white text-lg sm:text-xl mb-2 group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-300 font-sans text-xs sm:text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Capability Checklist */}
                    <div className="space-y-1.5 mb-5 bg-slate-950/60 border border-slate-800/80 rounded-xl p-3">
                      <p className="font-sans text-[11px] font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Layers size={13} className="text-cyan-400" /> Core Capabilities:
                      </p>
                      {item.capabilities.map((cap, j) => (
                        <div key={j} className="flex items-start gap-2 text-xs font-sans text-slate-300">
                          <CheckCircle2 size={13} className="text-cyan-400 shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Metric & Tech Stack Tags */}
                  <div className="relative z-10 pt-3 border-t border-slate-700/60">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="font-sans text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                        <ArrowUpRight size={13} className="text-cyan-400" /> {item.metrics}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map(tag => (
                        <span
                          key={tag}
                          className="font-sans text-[11px] px-2 py-0.5 rounded-md bg-slate-900/90 border border-slate-700/70 text-slate-300 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default ExpertiseCards;


