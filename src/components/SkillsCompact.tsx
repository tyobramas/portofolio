import Reveal from './Reveal';
import SpotlightCard from './SpotlightCard';
import type { Skill } from '../types';

const SKILL_DOMAINS = [
  {
    category: 'Mobile Engineering',
    tier: 'Flutter & Dart',
    skills: ['Flutter', 'Dart', 'BLoC State', 'GetX', 'Offline-First SQLite', 'Biometrics', 'App Store / Play Store CI'],
  },
  {
    category: 'AI & Automation Agents',
    tier: 'Autonomous Pipelines',
    skills: ['n8n Orchestration', 'Langflow', 'LangGraph', 'Pinecone RAG', 'ChromaDB', 'FastAPI Vector DB', 'OpenAI Agents'],
  },
  {
    category: 'Backend & Distributed Cloud',
    tier: 'High Concurrency',
    skills: ['Laravel 11', 'Node.js', 'PostgreSQL', 'MySQL', 'Redis Cache', 'Docker Compose', 'GraphQL'],
  },
  {
    category: 'Modern Web Engineering',
    tier: 'Frontend Architecture',
    skills: ['React 18', 'Next.js 14', 'TypeScript', 'Tailwind CSS', 'Vite', 'Zustand State', 'RESTful Hydration'],
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
    <section id="skills" className="py-16 sm:py-20 relative">
      <div className="mx-auto max-w-shell px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <span className="font-sans text-[0.6875rem] font-bold text-gold-400 uppercase tracking-wider bg-gold-500/10 px-2 py-0.5 rounded border border-gold-500/20">
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
