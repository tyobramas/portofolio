import { Smartphone, Server, Bot, Layout } from 'lucide-react';
import Reveal from './Reveal';

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SERVICES: ServiceItem[] = [
  {
    icon: <Smartphone className="h-6 w-6 text-gold-400" />,
    title: 'Mobile App Development',
    description:
      'Building fast, offline-first, and native-grade iOS & Android applications using Flutter, Clean Architecture, and biometric security.',
  },
  {
    icon: <Server className="h-6 w-6 text-gold-400" />,
    title: 'Distributed Backend & APIs',
    description:
      'Architecting resilient RESTful & GraphQL APIs with Laravel and Node.js, optimized with Redis caching, PostgreSQL indexing, and Docker.',
  },
  {
    icon: <Bot className="h-6 w-6 text-gold-400" />,
    title: 'AI Agents & Automation',
    description:
      'Deploying autonomous AI agents, enterprise RAG knowledge bases, n8n orchestration pipelines, and scalable web scraping infrastructure.',
  },
  {
    icon: <Layout className="h-6 w-6 text-gold-400" />,
    title: 'Enterprise Web Platforms',
    description:
      'Creating responsive, high-performance web applications and executive dashboards with React, Next.js, and TypeScript.',
  },
];

export default function ServicesSection() {
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
              What I Do
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => (
            <Reveal key={service.title} delay={index * 60}>
              <div className="card-dark group p-7 h-full flex flex-col justify-between relative overflow-hidden">
                {/* Subtle top gold accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Icon Squircle */}
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500/10 border border-gold-500/25 group-hover:scale-110 group-hover:bg-gold-500/20 group-hover:border-gold-400/50 transition-all duration-300">
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
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
