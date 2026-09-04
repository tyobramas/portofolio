import Reveal from './Reveal';
import type { Skill } from '../types';

const SKILL_DOMAINS = [
  {
    category: 'Mobile Engineering',
    tier: 'Flutter & Dart',
    skills: ['Flutter', 'Dart', 'BLoC State', 'GetX', 'Offline-First', 'Biometrics', 'SQLite'],
  },
  {
    category: 'AI & Automation Agents',
    tier: 'Autonomous Pipelines',
    skills: ['n8n', 'Langflow', 'LangGraph', 'Pinecone RAG', 'ChromaDB', 'FastAPI', 'OpenAI'],
  },
  {
    category: 'Backend & Distributed Cloud',
    tier: 'High Concurrency',
    skills: ['Laravel 11', 'Node.js', 'PostgreSQL', 'MySQL', 'Redis', 'Docker', 'GraphQL'],
  },
  {
    category: 'Modern Web Engineering',
    tier: 'Frontend Architecture',
    skills: ['React 18', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'Zustand'],
  },
  {
    category: 'Data Extraction & Scraping',
    tier: 'Large-scale Pipelines',
    skills: ['Apify Actors', 'Puppeteer', 'Cheerio', 'Crawlee', 'Anti-bot Bypass', 'Proxy Pools'],
  },
  {
    category: 'DevOps & Reliability',
    tier: 'Production CI/CD',
    skills: ['Docker Compose', 'GitHub Actions', 'Linux Ubuntu', 'Nginx', 'Sentry', 'Monitoring'],
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
              Technologies & Frameworks
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_DOMAINS.map((domain, i) => (
            <Reveal key={domain.category} delay={i * 45}>
              <div className="card-dark p-6 h-full flex flex-col justify-between hover:border-gold-500/40 transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#232736]">
                    <h3 className="font-sans text-base font-bold text-white">
                      {domain.category}
                    </h3>
                    <span className="font-sans text-[0.6875rem] font-semibold text-gold-400 uppercase tracking-wider">
                      {domain.tier}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4">
                    {domain.skills.map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-[#262A38] bg-[#161924] px-2.5 py-1 text-xs font-medium text-ink-200 hover:border-gold-500/40 hover:text-gold-300 transition-colors"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

