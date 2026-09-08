import Reveal from './Reveal';
import SpotlightCard from './SpotlightCard';
import type { Skill } from '../types';

const SKILL_DOMAINS = [
  {
    category: 'Mobile Engineering',
    tier: 'Flutter & Dart (Early Adopter)',
    skills: ['Flutter (Early Adopter)', 'Dart', 'BLoC State', 'GetX', 'Offline-First SQLite', 'Biometrics & Anti-Spoofing', 'App Store / Play Store CI'],
  },
  {
    category: 'AI Engineering & LLMs',
    tier: 'LLM · Prompt · Automation',
    skills: ['AI Engineering', 'LLM Fine-Tuning', 'Prompt Engineering', 'LangChain & LangGraph', 'Pinecone RAG', 'Autonomous Agents', 'Workflow Automation (n8n)'],
  },
  {
    category: 'Backend & Distributed Cloud',
    tier: 'High Concurrency',
    skills: ['Laravel 11', 'Node.js', 'PostgreSQL', 'MySQL', 'Redis Cache', 'Docker Compose', 'GraphQL'],
  },
  {
    category: 'Modern Web Engineering',
    tier: 'JavaScript & Full-Stack',
    skills: ['Full-Stack Web Dev', 'JavaScript (ES6+)', 'Node.js', 'Three.js (WebGL 3D)', 'Vanilla JS', 'React 18', 'Next.js 14', 'TypeScript', 'Tailwind CSS', 'Vite'],
  },
  {
    category: 'Data Extraction & Scraping',
    tier: 'Large-scale Pipelines',
    skills: ['Apify Actors', 'Puppeteer Cluster', 'Cheerio', 'Crawlee', 'Anti-bot Bypass', 'Residential Proxy Pools'],
  },
  {
    category: 'DevOps & Reliability',
    tier: 'Production CI/CD',
    skills: ['Docker', 'GitHub Actions CI/CD', 'Linux Ubuntu', 'Nginx Reverse Proxy', 'Sentry APM', 'Prometheus'],
  },
];

export default function SkillsCompact({ skills: _skills }: { skills?: Skill[] }) {
  return (
    <section id="skills" className="relative py-12 sm:py-14">
      <div className="shell">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-7">
          <Reveal>
            <span className="font-sans text-xs font-bold uppercase tracking-widest text-gold-400">
              CORE COMPETENCIES
            </span>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Technologies & System Architecture
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-6">
          {SKILL_DOMAINS.map((domain, i) => (
            <Reveal key={domain.category} delay={i * 45}>
              <SpotlightCard
                className="p-6 h-full flex flex-col justify-between group hover:border-gold-500/50"
                spotlightColor="rgba(229, 169, 60, 0.14)"
                borderColor="rgba(245, 200, 105, 0.35)"
              >
                <div>
                  <div className="flex items-center justify-between pb-3.5 border-b border-[#232736]">
                    <h3 className="font-sans text-base font-bold text-white group-hover:text-gold-200 transition-colors">
                      {domain.category}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 font-sans text-[0.6875rem] font-bold text-gold-400 uppercase tracking-wider bg-gold-500/10 px-2.5 py-1 rounded-md border border-gold-500/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold-400/80 shrink-0" />
                      {domain.tier}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4">
                    {domain.skills.map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-[#262A38] bg-[#161924] px-2.5 py-1 text-xs font-medium text-ink-200 hover:border-gold-400/60 hover:bg-gold-500/10 hover:text-gold-200 transition-all cursor-default"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
