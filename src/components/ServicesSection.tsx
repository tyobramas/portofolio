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
    title: 'AI Agents & Automation',
    description:
      'Autonomous AI agent pipelines, custom Langflow & n8n orchestration, enterprise RAG knowledge bases, and anti-bot scraper clusters.',
    deliverables: ['Autonomous AI Agents', 'Vector Search & RAG', 'n8n Workflow Automation'],
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
    <section id="services" className="py-16 sm:py-20 relative">
      <div className="mx-auto max-w-shell px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <Reveal>
            <span className="font-sans text-xs font-bold uppercase tracking-widest text-gold-400">
              MY SERVICES
            </span>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Executive Engineering Capabilities
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => (
            <Reveal key={service.title} delay={index * 60}>
              <SpotlightCard
                className="p-7 h-full flex flex-col justify-between group"
                spotlightColor="rgba(229, 169, 60, 0.15)"
                borderColor="rgba(245, 200, 105, 0.4)"
              >
                <div>
                  {/* Subtle top gold accent line on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Icon Squircle */}
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500/10 border border-gold-500/25 group-hover:scale-110 group-hover:bg-gold-500/20 group-hover:border-gold-400/50 transition-all duration-300 shadow-sm">
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
                        <span className="h-1.5 w-1.5 rounded-full bg-gold-400 shrink-0" />
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
