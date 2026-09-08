import { Smartphone, Server, Bot, Layout, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import SpotlightCard from './SpotlightCard';

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  deliverables: string[];
}

const SERVICES: ServiceItem[] = [
  {
    icon: <Smartphone className="h-6 w-6 text-gold-400" />,
    title: 'Mobile App Engineering',
    description:
      'High-throughput, offline-first iOS & Android applications using Flutter, Clean Architecture, SQLite sync, and biometric authentication.',
    deliverables: ['Cross-Platform Apps', 'Offline Sync Engine', 'Biometric Security'],
  },
  {
    icon: <Server className="h-6 w-6 text-gold-400" />,
    title: 'Distributed Backend & APIs',
    description:
      'Resilient microservices and RESTful/GraphQL APIs built with Laravel 11 and Node.js, backed by Redis caching and PostgreSQL indexing.',
    deliverables: ['High Concurrency APIs', 'Redis Caching & Queues', 'Docker Containers'],
  },
  {
    icon: <Bot className="h-6 w-6 text-gold-400" />,
    title: 'AI Engineering, LLM & Automation',
    description:
      'Production LLM integration, advanced prompt engineering, custom RAG knowledge engines, autonomous agent orchestration, and automated workflow pipelines.',
    deliverables: ['LLMs & Prompt Engineering', 'Enterprise RAG Knowledge', 'End-to-End Automation'],
  },
  {
    icon: <Layout className="h-6 w-6 text-gold-400" />,
    title: 'Enterprise Web Platforms',
    description:
      'Responsive, high-performance web applications and executive dashboards with React, Next.js, TypeScript, and multi-tenant architectures.',
    deliverables: ['Executive Dashboards', 'Multi-Tenant SaaS', 'Sub-second UX'],
  },
];

export default function ServicesSection() {
  const handleConsultClick = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="relative py-12 sm:py-14">
      <div className="shell">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-7">
          <Reveal>
            <span className="font-sans text-xs font-bold uppercase tracking-widest text-gold-400">
              MY SERVICES
            </span>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              What I Can Build For You
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => (
            <Reveal key={service.title} delay={index * 60}>
              <SpotlightCard
                className="p-7 h-full flex flex-col justify-between group relative"
                spotlightColor="rgba(229, 169, 60, 0.15)"
                borderColor="rgba(245, 200, 105, 0.4)"
              >
                <div>
                  {/* Icon Squircle */}
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-500/15 to-gold-500/5 border border-gold-500/25 group-hover:scale-110 group-hover:bg-gold-500/20 group-hover:border-gold-400/50 transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
                    {service.icon}
                  </div>

                    {/* Title */}
                    <h3 className="font-sans text-lg font-bold text-white group-hover:text-gold-300 transition-colors">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 text-sm text-ink-300 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Deliverables Checklist */}
                    <div className="mt-5 pt-4 border-t border-[#232736]/70 space-y-2">
                      {service.deliverables.map((d) => (
                        <div key={d} className="flex items-center gap-2 text-xs text-ink-300">
                          <span className="font-mono text-[10px] text-gold-400 font-bold shrink-0">❯</span>
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom interactive link */}
                  <div className="pt-6 mt-2">
                  <button
                    onClick={handleConsultClick}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-400 group-hover:text-gold-200 transition-colors"
                  >
                    Consult On This <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
