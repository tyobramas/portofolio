import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import type { Skill } from '../types';

const GROUPS: Record<string, string[]> = {
  'Bahasa': ['TypeScript', 'Dart', 'PHP', 'Python', 'SQL'],
  'Frontend': ['React 18', 'Next.js', 'Tailwind CSS', 'Vite'],
  'Mobile': ['Flutter', 'BLoC', 'Firebase', 'SQLite', 'Offline-first'],
  'Backend': ['Laravel 11', 'Node.js', 'PostgreSQL', 'Redis', 'GraphQL', 'REST API'],
  'AI & Otomasi': ['n8n', 'Langflow', 'LangGraph', 'Pinecone', 'ChromaDB', 'Tool Calling'],
  'Infra': ['Docker', 'GitHub Actions', 'Nginx', 'Linux', 'CI/CD'],
};

export default function SkillsCompact({ skills: _skills }: { skills?: Skill[] }) {
  return (
    <section id="skills" className="pb-section">
      <SectionHeading index="04" title="Keahlian Teknis" note="Stack produksi teruji" />
      <div className="panel">
        {Object.entries(GROUPS).map(([group, items], i) => (
          <Reveal key={group} delay={i * 40}>
            <div className="row grid gap-2 px-5 py-3.5 sm:grid-cols-[150px_1fr] sm:gap-6">
              <p className="eyebrow sm:pt-1">{group}</p>
              <div className="flex flex-wrap gap-1.5">
                {items.map((s) => (
                  <span key={s} className="tag">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
