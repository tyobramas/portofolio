import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles, BrainCircuit, Smartphone, Server,
  ShieldCheck, Zap, Globe2, Award, CheckCircle2
} from 'lucide-react';
import type { SystemConfig } from '../types';

interface AboutSectionProps {
  config: SystemConfig;
}

const STRATEGIC_PILLARS = [
  {
    icon: Sparkles,
    badge: 'AUTOMATION & AGENTS',
    title: 'Enterprise AI Automation & Agent Workflows',
    description:
      'Designing mission-critical autonomous operational pipelines with n8n and Langflow. Integrating customized LLM tool calling, CRM webhooks, and asynchronous message queues to eliminate manual friction and drive exponential operational efficiency.',
    tags: ['n8n Orchestration', 'Langflow', 'Autonomous Tool Calling', 'Webhook Automation'],
  },
  {
    icon: BrainCircuit,
    badge: 'REASONING & RAG',
    title: 'Autonomous Multi-Agents & RAG Architecture',
    description:
      'Architecting intelligent multi-agent systems (Nous Hermes, LangGraph) featuring stateful memory, adaptive reasoning trees, and production-grade RAG over vector databases (Pinecone, ChromaDB) with zero hallucination risk.',
    tags: ['Nous Hermes Engine', 'LangGraph Multi-Agent', 'Vector Search', 'Hybrid Retrieval'],
  },
  {
    icon: Smartphone,
    badge: 'MOBILE ENGINEERING',
    title: 'High-Performance Mobile Systems',
    description:
      'Engineering fluid, 60fps native-quality cross-platform applications with Flutter and Dart. Implementing clean state management, offline-first data caching, biometric security, and realtime cloud synchronization.',
    tags: ['Flutter & Dart', 'iOS & Android', 'Offline-First', 'Clean BLoC/Provider'],
  },
  {
    icon: Server,
    badge: 'FULL-STACK & SAAS',
    title: 'Scalable Full-Stack & Cloud Architecture',
    description:
      'Building robust multi-tenant SaaS platforms and low-latency REST/GraphQL APIs with Laravel 11+ and React 18/TypeScript. Engineered for high concurrency, rock-solid security, and automated CI/CD containerized deployments.',
    tags: ['Laravel 11+', 'React 18 & TypeScript', 'Multi-Tenant SaaS', 'Sub-100ms APIs'],
  },
];

const LEADERSHIP_METRICS = [
  { icon: ShieldCheck, label: 'Engineering Standards', value: 'Clean Architecture & Strict Type Safety' },
  { icon: Zap, label: 'Execution Speed', value: 'Rapid Concept to Enterprise Production' },
  { icon: Globe2, label: 'Global Compliance', value: 'Built for International Scale & Security' },
  { icon: Award, label: 'Strategic Alignment', value: 'Direct Technical Advisory for C-Levels & Founders' },
];

const AboutSection: React.FC<AboutSectionProps> = ({ config }) => {
  return (
    <section id="about" aria-label="Executive Dossier" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 font-sans text-xs font-semibold tracking-wider uppercase mb-3">
            <Award size={13} className="text-cyan-400" />
            <span>Executive Leadership & Engineering Dossier</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Strategic Technical Capabilities
          </h2>
          <p className="text-slate-300 font-sans text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
            13+ years transforming complex enterprise challenges into high-value AI automation pipelines, mobile applications, and resilient cloud architectures.
          </p>
        </motion.div>

        {/* Executive Bio & Vision Card */}
        <motion.div
          className="glass-panel p-6 sm:p-8 mb-8 border border-slate-700/60 shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-sans text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span>Proven Engineering Track Record (Since 2013)</span>
              </div>
              <h3 className="font-display font-bold text-white text-xl sm:text-2xl">
                Engineering High-Impact Systems with Precision & Business Alignment
              </h3>
              <p className="text-slate-200 font-sans text-sm sm:text-[15px] leading-relaxed">
                {config.ownerBio}
              </p>
            </div>

            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-slate-700/60 pt-4 lg:pt-0 lg:pl-6 space-y-3">
              <div className="bg-slate-900/80 border border-slate-700/70 rounded-xl p-3.5">
                <p className="text-cyan-300 font-display font-bold text-2xl">13+ Years</p>
                <p className="text-slate-300 font-sans text-xs mt-0.5">Continuous Active Production Software Engineering</p>
              </div>
              <div className="bg-slate-900/80 border border-slate-700/70 rounded-xl p-3.5">
                <p className="text-emerald-300 font-display font-bold text-2xl">40+ Delivered</p>
                <p className="text-slate-300 font-sans text-xs mt-0.5">Enterprise Mobile, AI & Web SaaS Solutions</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 4 Strategic Pillars Grid */}
        <div className="grid md:grid-cols-2 gap-5 mb-8">
          {STRATEGIC_PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                className="glass-panel p-6 border border-slate-700/60 hover:border-cyan-400/50 transition-all duration-200 shadow-lg flex flex-col justify-between group"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="font-sans text-[11px] font-bold text-cyan-400 tracking-wider bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded-md uppercase">
                      {pillar.badge}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon size={20} className="text-cyan-300" />
                    </div>
                  </div>

                  <h4 className="font-display font-bold text-white text-lg sm:text-xl mb-2 group-hover:text-cyan-300 transition-colors">
                    {pillar.title}
                  </h4>

                  <p className="text-slate-300 font-sans text-xs sm:text-sm leading-relaxed mb-4">
                    {pillar.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-700/50">
                  {pillar.tags.map(tag => (
                    <span
                      key={tag}
                      className="font-sans text-[11px] px-2.5 py-0.5 rounded-md bg-slate-900/80 border border-slate-700/70 text-slate-300 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Leadership Values Banner */}
        <motion.div
          className="glass-panel p-5 sm:p-6 border border-slate-700/60 rounded-xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LEADERSHIP_METRICS.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={16} className="text-cyan-300" />
                  </div>
                  <div>
                    <p className="font-sans text-xs font-bold text-white">{item.label}</p>
                    <p className="font-sans text-[11px] text-slate-300 mt-0.5 leading-snug">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;


