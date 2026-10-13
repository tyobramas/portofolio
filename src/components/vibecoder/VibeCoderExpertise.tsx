import { useState } from 'react';
import {
  BrainCircuit,
  Smartphone,
  Globe,
  Database,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import type { Skill } from '../../types';

interface VibeCoderExpertiseProps {
  skills: Skill[];
}

type CategoryFilter = 'all' | 'ai' | 'mobile' | 'frontend' | 'backend' | 'infra';

export default function VibeCoderExpertise({ skills }: VibeCoderExpertiseProps) {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');

  const filteredSkills = skills.filter((skill) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'ai') return skill.category === 'ai';
    if (activeFilter === 'mobile') return skill.category === 'mobile';
    if (activeFilter === 'frontend') return skill.category === 'frontend';
    if (activeFilter === 'backend') return skill.category === 'backend';
    if (activeFilter === 'infra') return skill.category === 'database' || skill.category === 'devops' || skill.category === 'tools';
    return true;
  });

  return (
    <section id="expertise" className="py-16 sm:py-24 bg-[#FAF7F2] border-t-2 border-zinc-900/10">
      <div className="shell">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full border-2 border-zinc-900 bg-[#FED7AA] px-4 py-1 text-xs font-black uppercase tracking-wider text-amber-950 shadow-[0_2px_0_0_#18181B]">
            <Sparkles size={13} className="text-amber-950" />
            <span>Technical Mastery</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-5xl font-black text-zinc-950 tracking-tight">
            Core Competencies & Standout Skills
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 font-medium">
            High-impact engineering capabilities focused on architecture, performance, scalability, and measurable execution.
          </p>
        </div>

        {/* 1. Four Core Competency Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Pillar 1: Frontend Web & 3D */}
          <div className="rounded-2xl border-3 border-zinc-900 bg-[#FFE4E6] p-6 shadow-[0_6px_0_0_#18181B] hover:translate-y-[-3px] hover:shadow-[0_10px_0_0_#18181B] transition-all flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 rounded-xl border-2 border-zinc-900 bg-white shadow-[0_2px_0_0_#18181B] flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-pink-700" />
              </div>
              <h3 className="font-sans text-xl font-black text-zinc-950 mb-2">
                Frontend Web & 3D Visualization
              </h3>
              <p className="text-xs font-semibold text-zinc-700 leading-relaxed mb-4">
                High-performance interactive web apps using React 18, TypeScript, Next.js, and WebGL Three.js simulations.
              </p>
            </div>
            <ul className="space-y-1.5 pt-3 border-t border-zinc-900/15">
              {[
                'React 18 & TypeScript Ecosystem',
                'Next.js Full-Stack App Router',
                'Three.js & WebGL 3D Rendering',
                'Responsive UI & State Machines',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-xs font-bold text-zinc-900">
                  <CheckCircle2 size={13} className="text-pink-700 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pillar 2: Backend Architecture & APIs */}
          <div className="rounded-2xl border-3 border-zinc-900 bg-[#DCFCE7] p-6 shadow-[0_6px_0_0_#18181B] hover:translate-y-[-3px] hover:shadow-[0_10px_0_0_#18181B] transition-all flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 rounded-xl border-2 border-zinc-900 bg-white shadow-[0_2px_0_0_#18181B] flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-emerald-700" />
              </div>
              <h3 className="font-sans text-xl font-black text-zinc-950 mb-2">
                Backend & API Architecture
              </h3>
              <p className="text-xs font-semibold text-zinc-700 leading-relaxed mb-4">
                High-concurrency enterprise services built with Laravel, Node.js, relational database optimization, and Redis queues.
              </p>
            </div>
            <ul className="space-y-1.5 pt-3 border-t border-zinc-900/15">
              {[
                'Laravel Enterprise & PHP Engines',
                'Node.js & Express RESTful APIs',
                'PostgreSQL, MySQL & Redis Queues',
                'Docker Containers & CI/CD Pipelines',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-xs font-bold text-zinc-900">
                  <CheckCircle2 size={13} className="text-emerald-700 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pillar 3: Cross-Platform Mobile */}
          <div className="rounded-2xl border-3 border-zinc-900 bg-[#E0F2FE] p-6 shadow-[0_6px_0_0_#18181B] hover:translate-y-[-3px] hover:shadow-[0_10px_0_0_#18181B] transition-all flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 rounded-xl border-2 border-zinc-900 bg-white shadow-[0_2px_0_0_#18181B] flex items-center justify-center mb-4">
                <Smartphone className="h-6 w-6 text-sky-700" />
              </div>
              <h3 className="font-sans text-xl font-black text-zinc-950 mb-2">
                Cross-Platform Mobile Apps
              </h3>
              <p className="text-xs font-semibold text-zinc-700 leading-relaxed mb-4">
                Production-grade Flutter engineering with rock-solid reactive state, native device bridging, and zero-loss offline sync.
              </p>
            </div>
            <ul className="space-y-1.5 pt-3 border-t border-zinc-900/15">
              {[
                'Flutter & Dart (60fps Native UI)',
                'Clean State (BLoC / Riverpod)',
                'Offline-First SQLite AES-256',
                'Biometrics & GPS Geofencing',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-xs font-bold text-zinc-900">
                  <CheckCircle2 size={13} className="text-sky-700 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pillar 4: Enterprise AI & Autonomous LLMs */}
          <div className="rounded-2xl border-3 border-zinc-900 bg-[#F3E8FF] p-6 shadow-[0_6px_0_0_#18181B] hover:translate-y-[-3px] hover:shadow-[0_10px_0_0_#18181B] transition-all flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 rounded-xl border-2 border-zinc-900 bg-white shadow-[0_2px_0_0_#18181B] flex items-center justify-center mb-4">
                <BrainCircuit className="h-6 w-6 text-purple-700" />
              </div>
              <h3 className="font-sans text-xl font-black text-zinc-950 mb-2">
                Enterprise AI & Autonomous LLMs
              </h3>
              <p className="text-xs font-semibold text-zinc-700 leading-relaxed mb-4">
                Specialized in multi-agent orchestration, RAG pipelines, contextual reasoning, and automated workflow intelligence.
              </p>
            </div>
            <ul className="space-y-1.5 pt-3 border-t border-zinc-900/15">
              {[
                'RAG & Vector Retrieval Systems',
                'Multi-Agent Workflows (LangGraph)',
                'Prompt Engineering & Fine-tuning',
                'Automation (n8n & Puppeteer)',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-xs font-bold text-zinc-900">
                  <CheckCircle2 size={13} className="text-purple-700 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 2. Engineering Benchmarks / Proven Production Metrics */}
        <div className="rounded-3xl border-3 border-zinc-900 bg-[#FFFBEB] p-6 sm:p-8 shadow-[0_8px_0_0_#18181B] mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b-2 border-zinc-900/15">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-900 bg-[#FEF08A] px-2.5 py-0.5 rounded-md border border-zinc-900">
                PROVEN BENCHMARKS
              </span>
              <h3 className="font-sans text-2xl font-black text-zinc-950 mt-1">
                Architecture & Performance Standards
              </h3>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-zinc-600 max-w-md">
              Demonstrated capability across mission-critical systems and production environments.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl border-2 border-zinc-900 bg-white p-4 text-center shadow-[0_3px_0_0_#18181B]">
              <span className="font-sans text-3xl font-black text-pink-700 block">&lt; 100ms</span>
              <span className="text-xs font-black uppercase tracking-wider text-zinc-900 mt-1 block">
                API Response Time
              </span>
              <span className="text-[11px] font-semibold text-zinc-500">Cached backend RESTful endpoints</span>
            </div>

            <div className="rounded-2xl border-2 border-zinc-900 bg-white p-4 text-center shadow-[0_3px_0_0_#18181B]">
              <span className="font-sans text-3xl font-black text-sky-700 block">60 FPS</span>
              <span className="text-xs font-black uppercase tracking-wider text-zinc-900 mt-1 block">
                Frontend & 3D WebGL
              </span>
              <span className="text-[11px] font-semibold text-zinc-500">Smooth React & Three.js animations</span>
            </div>

            <div className="rounded-2xl border-2 border-zinc-900 bg-white p-4 text-center shadow-[0_3px_0_0_#18181B]">
              <span className="font-sans text-3xl font-black text-purple-700 block">&lt; 250ms</span>
              <span className="text-xs font-black uppercase tracking-wider text-zinc-900 mt-1 block">
                Face Anti-Spoofing
              </span>
              <span className="text-[11px] font-semibold text-zinc-500">Live 3D depth & landmark latency</span>
            </div>

            <div className="rounded-2xl border-2 border-zinc-900 bg-white p-4 text-center shadow-[0_3px_0_0_#18181B]">
              <span className="font-sans text-3xl font-black text-emerald-700 block">75%</span>
              <span className="text-xs font-black uppercase tracking-wider text-zinc-900 mt-1 block">
                Cycle Reduction
              </span>
              <span className="text-[11px] font-semibold text-zinc-500">Autonomous LLM screening efficiency</span>
            </div>
          </div>
        </div>

        {/* 3. Interactive Technical Stack Matrix */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-sans text-2xl sm:text-3xl font-black text-zinc-950">
                Detailed Technology Matrix
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 font-medium">
                Comprehensive toolchain and proficiency verified across real-world enterprise deployments.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'All Stack' },
                { id: 'frontend', label: 'Frontend' },
                { id: 'backend', label: 'Backend' },
                { id: 'mobile', label: 'Mobile' },
                { id: 'ai', label: 'AI & LLM' },
                { id: 'infra', label: 'Cloud & DB' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as CategoryFilter)}
                  className={`rounded-xl border-2 border-zinc-900 px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    activeFilter === tab.id
                      ? 'bg-zinc-900 text-white shadow-[0_2px_0_0_#E11D48]'
                      : 'bg-white text-zinc-800 shadow-[0_2px_0_0_#18181B] hover:bg-zinc-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of skills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                className="rounded-2xl border-2 border-zinc-900 bg-white p-4 shadow-[0_4px_0_0_#18181B] hover:translate-y-[-2px] hover:shadow-[0_6px_0_0_#18181B] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-sans text-sm font-black text-zinc-950 leading-tight">
                      {skill.name}
                    </span>
                    <span className="rounded-md border border-zinc-900/30 bg-zinc-100 px-1.5 py-0.5 text-[10px] font-black uppercase text-zinc-700">
                      {skill.level}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-bold text-zinc-500 mb-1.5">
                    <span className="uppercase tracking-wider">{skill.category}</span>
                    <span>{skill.years ? `${skill.years} yrs` : 'Production'}</span>
                  </div>
                </div>

                <div>
                  {/* Proficiency Meter Bar */}
                  <div className="h-2 w-full rounded-full border border-zinc-900 bg-zinc-100 overflow-hidden mb-1">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        skill.proficiency >= 90
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                          : skill.proficiency >= 80
                          ? 'bg-gradient-to-r from-sky-500 to-blue-400'
                          : 'bg-gradient-to-r from-amber-500 to-orange-400'
                      }`}
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-extrabold text-zinc-600">
                    <span>Proficiency</span>
                    <span>{skill.proficiency}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
