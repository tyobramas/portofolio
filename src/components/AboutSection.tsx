import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import type { SystemConfig } from '../types';

const PILLARS = [
  {
    area: 'Otomasi & AI Agent',
    detail:
      'Merancang pipeline operasional dengan n8n dan Langflow: integrasi LLM tool calling, webhook CRM, dan message queue asinkron untuk memangkas kerja manual.',
    stack: ['n8n', 'Langflow', 'LangGraph', 'Webhook'],
  },
  {
    area: 'RAG & Sistem Retrieval',
    detail:
      'Membangun RAG tingkat produksi di atas vector database (Pinecone, ChromaDB) dengan hybrid retrieval, evaluasi jawaban, dan sitasi sumber.',
    stack: ['Pinecone', 'ChromaDB', 'Hybrid Search'],
  },
  {
    area: 'Rekayasa Mobile',
    detail:
      'Aplikasi lintas platform dengan Flutter: state management rapi, cache offline-first, autentikasi biometrik, dan sinkronisasi realtime.',
    stack: ['Flutter', 'Dart', 'BLoC', 'Offline-first'],
  },
  {
    area: 'Full-Stack & Cloud',
    detail:
      'Platform SaaS multi-tenant dan REST/GraphQL API dengan Laravel 11 dan React 18 TypeScript, dilengkapi CI/CD terkontainerisasi.',
    stack: ['Laravel 11', 'React 18', 'PostgreSQL', 'Docker'],
  },
];

export default function AboutSection({ config }: { config: SystemConfig }) {
  return (
    <section id="about" className="pb-section">
      <SectionHeading index="01" title="Ringkasan" note="13+ tahun · 40+ sistem produksi" />

      <Reveal>
        <p className="max-w-prose text-lead text-ink-700">{config.ownerBio}</p>
      </Reveal>

      <div className="mt-8 panel">
        {PILLARS.map((p, i) => (
          <Reveal key={p.area} delay={i * 60}>
            <div className="row grid gap-1 px-5 py-4 sm:grid-cols-[210px_1fr] sm:gap-6">
              <div>
                <h3 className="font-display text-h3 text-ink-900">{p.area}</h3>
              </div>
              <div>
                <p className="text-body text-ink-700">{p.detail}</p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="tag">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
