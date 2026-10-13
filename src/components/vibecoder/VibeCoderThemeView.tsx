import { useState } from 'react';
import {
  Briefcase,
  Users,
  Award,
  Smile,
  ArrowRight,
  CheckCircle2,
  Code2,
  Smartphone,
  BrainCircuit,
  Cloud,
  Send,
  Sparkles,
  MapPin,
  Laptop,
  Mail,
  Copy,
  Check,
  ShieldCheck,
  Globe,
  ArrowUpRight,
  Linkedin,
  Github
} from 'lucide-react';
import VibeCoderTopBar from './VibeCoderTopBar';
import VibeCoderHero from './VibeCoderHero';
import VibeCoderExpertise from './VibeCoderExpertise';
import ProjectModal from '../ProjectModal';
import { useCountUp } from '../../hooks/useCountUp';
import type { AdminStore, Project } from '../../types';

interface VibeCoderThemeViewProps {
  store: AdminStore;
  onAdminClick: () => void;
  onNavigate: (path: string) => void;
}

// ── Playful Stat Card ──────────────────────────────────────────
function PlayfulStatCard({
  value,
  label,
  sublabel,
  bgColor,
  icon,
}: {
  value: string;
  label: string;
  sublabel: string;
  bgColor: string;
  icon: React.ReactNode;
}) {
  const { displayValue, elementRef } = useCountUp(value, { duration: 1800 });

  return (
    <div
      className={`flex flex-col items-center justify-between rounded-2xl border-3 border-zinc-900 ${bgColor} p-3.5 sm:p-5 text-center shadow-[0_5px_0_0_#18181B] sm:shadow-[0_6px_0_0_#18181B] hover:translate-y-[-2px] hover:shadow-[0_8px_0_0_#18181B] transition-all`}
    >
      <div className="mb-2 sm:mb-3 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl border-2 border-zinc-900 bg-white shadow-[0_2px_0_0_#18181B]">
        {icon}
      </div>
      <span
        ref={elementRef}
        className="font-sans text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-950 tracking-tight leading-none mb-1"
      >
        {displayValue}
      </span>
      <span className="text-xs font-black uppercase tracking-wider text-zinc-900 mb-0.5">
        {label}
      </span>
      <span className="text-[11px] font-semibold text-zinc-700">{sublabel}</span>
    </div>
  );
}

export default function VibeCoderThemeView({ store, onAdminClick, onNavigate }: VibeCoderThemeViewProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const { config, projects = [], skills = [], certificates = [] } = store;
  const email = config.ownerEmail || 'bramastyodevops@gmail.com';

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-zinc-900 selection:bg-pink-300 selection:text-zinc-950">
      {/* 1. Vibe Coder TopBar */}
      <VibeCoderTopBar onAdminClick={onAdminClick} onNavigate={onNavigate} />

      <main className="relative">
        {/* 2. Hero Section with Interactive 3D Keyboard */}
        <VibeCoderHero config={config} />

        {/* 3. Stats Section */}
        <section className="pt-1 pb-8 sm:pt-2 sm:pb-12">
          <div className="shell">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
              <PlayfulStatCard
                icon={<Briefcase className="h-6 w-6 text-purple-600" />}
                value="50+"
                label="PROJECTS COMPLETED"
                sublabel="Enterprise & Production Systems"
                bgColor="bg-[#EDE9FE]"
              />
              <PlayfulStatCard
                icon={<Users className="h-6 w-6 text-emerald-600" />}
                value="30+"
                label="CLIENT ENGAGEMENTS"
                sublabel="High-Impact Technical Delivery"
                bgColor="bg-[#D1FAE5]"
              />
              <PlayfulStatCard
                icon={<Award className="h-6 w-6 text-amber-600" />}
                value="13+"
                label="YEARS CRAFTSMANSHIP"
                sublabel="Deep Architectural Mastery"
                bgColor="bg-[#FEF3C7]"
              />
              <PlayfulStatCard
                icon={<Smile className="h-6 w-6 text-sky-600" />}
                value="100%"
                label="DELIVERY INTEGRITY"
                sublabel="SLA Adherence & Code Quality"
                bgColor="bg-[#E0F2FE]"
              />
            </div>
          </div>
        </section>

        {/* 4. Professional Focus & Architectural Philosophy */}
        <section id="about" className="py-14 sm:py-16">
          <div className="shell">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-1.5 rounded-full border-2 border-zinc-900 bg-[#E879F9]/20 px-3 py-0.5 text-xs font-black uppercase tracking-wider text-purple-900 shadow-[0_2px_0_0_#18181B]">
                  <Sparkles size={13} />
                  <span>Engineering Focus</span>
                </div>

                <h2 className="font-sans text-3xl sm:text-5xl font-black text-zinc-950 tracking-tight leading-tight">
                  Full-Stack Web (<span className="underline decoration-pink-500 decoration-wavy decoration-2">Frontend & Backend</span>), Mobile & AI.
                </h2>

                <p className="text-base text-zinc-700 leading-relaxed font-normal">
                  {config.ownerBio ||
                    'Senior Software Engineer and Systems Architect focused on delivering resilient, high-concurrency solutions. With deep specialization across scalable Frontend interfaces, robust Backend API architectures, production-grade mobile ecosystems, and autonomous enterprise AI systems.'}
                </p>

                {/* Core Competency Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    'Frontend Web (React, Next.js, TypeScript)',
                    'Backend Architecture (Laravel, Node.js, APIs)',
                    'Cross-Platform Mobile (Flutter & Native)',
                    'Enterprise AI & Autonomous Multi-Agent LLMs',
                    'High-Concurrency Databases (Postgres, MySQL, Redis)',
                    'Interactive 3D Web & Three.js WebGL Graphics',
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 rounded-xl border-2 border-zinc-900 bg-white p-3 shadow-[0_3px_0_0_#18181B]"
                    >
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                      <span className="text-xs font-bold text-zinc-800 leading-tight">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Workstation / Profile visual */}
              <div className="lg:col-span-5">
                <div className="relative rounded-3xl border-3 border-zinc-900 bg-[#FFF7ED] p-6 shadow-[0_10px_0_0_#18181B]">
                  <div className="aspect-square rounded-2xl border-2 border-zinc-900 bg-white overflow-hidden relative shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center p-6 text-center">
                    <img
                      src={config.ownerAvatar || '/images/profile-hud.png'}
                      alt={config.ownerName}
                      className="w-36 h-36 rounded-full border-3 border-zinc-900 object-cover shadow-[0_6px_0_0_#18181B] mb-4"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <h3 className="font-sans text-xl font-black text-zinc-950">{config.ownerName}</h3>
                    <p className="text-xs font-bold text-pink-600 mt-1">{config.ownerSubtitle || 'Senior Software Engineer'}</p>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-zinc-600 font-semibold">
                      <MapPin size={13} className="text-zinc-500" />
                      <span>{config.ownerLocation || 'Jakarta, Indonesia'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Services Section */}
        <section id="services" className="py-14 sm:py-16 bg-[#F4EFE6]/60 border-y-2 border-zinc-900/10">
          <div className="shell">
            <div className="text-center max-w-xl mx-auto space-y-3 mb-10">
              <span className="inline-block rounded-full border-2 border-zinc-900 bg-[#FED7AA] px-3.5 py-0.5 text-xs font-black uppercase tracking-wider text-amber-950 shadow-[0_2px_0_0_#18181B]">
                Services
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
                What I Build & Deliver
              </h2>
              <p className="text-sm text-zinc-600">
                End-to-end engineering from system design to high-throughput deployment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  icon: <Code2 className="h-6 w-6 text-pink-600" />,
                  title: 'Frontend & Backend Web',
                  desc: 'Scalable React, TypeScript & Next.js frontend paired with robust Laravel & Node.js backend RESTful microservices.',
                  color: 'bg-[#FFE4E6]',
                },
                {
                  icon: <Smartphone className="h-6 w-6 text-sky-600" />,
                  title: 'Flutter Mobile',
                  desc: 'Cross-platform iOS & Android apps with clean state management, offline sync, and native performance.',
                  color: 'bg-[#E0F2FE]',
                },
                {
                  icon: <BrainCircuit className="h-6 w-6 text-purple-600" />,
                  title: 'Enterprise AI & LLM',
                  desc: 'Retrieval-Augmented Generation (RAG), autonomous agent pipelines, vector databases, and custom AI tools.',
                  color: 'bg-[#F3E8FF]',
                },
                {
                  icon: <Cloud className="h-6 w-6 text-emerald-600" />,
                  title: 'Cloud & DevOps',
                  desc: 'Dockerized microservices, CI/CD automated deployments, Firestore, PostgreSQL, and scalable architectures.',
                  color: 'bg-[#DCFCE7]',
                },
              ].map((svc, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border-3 border-zinc-900 ${svc.color} p-6 shadow-[0_6px_0_0_#18181B] hover:translate-y-[-3px] hover:shadow-[0_10px_0_0_#18181B] transition-all flex flex-col justify-between`}
                >
                  <div>
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border-2 border-zinc-900 bg-white shadow-[0_2px_0_0_#18181B]">
                      {svc.icon}
                    </div>
                    <h3 className="font-sans text-lg font-black text-zinc-950 mb-2">{svc.title}</h3>
                    <p className="text-xs font-medium text-zinc-700 leading-relaxed">{svc.desc}</p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-zinc-900/15 flex items-center text-xs font-black text-zinc-900">
                    <span>In Production</span>
                    <Sparkles size={12} className="ml-1 text-zinc-800" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Featured Projects */}
        <section id="projects" className="py-16 sm:py-20">
          <div className="shell">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <span className="inline-block rounded-full border-2 border-zinc-900 bg-[#BBF7D0] px-3.5 py-0.5 text-xs font-black uppercase tracking-wider text-emerald-950 shadow-[0_2px_0_0_#18181B]">
                  Portfolio
                </span>
                <h2 className="mt-2 font-sans text-3xl sm:text-5xl font-black text-zinc-950 tracking-tight">
                  Featured Case Studies
                </h2>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {['all', 'web', 'mobile', 'api'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-xl border-2 border-zinc-900 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-zinc-900 text-white shadow-[0_2px_0_0_#E11D48]'
                        : 'bg-white text-zinc-800 shadow-[0_2px_0_0_#18181B] hover:bg-zinc-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="group flex flex-col justify-between rounded-2xl border-3 border-zinc-900 bg-white p-5 shadow-[0_8px_0_0_#18181B] hover:translate-y-[-4px] hover:shadow-[0_12px_0_0_#18181B] transition-all cursor-pointer"
                >
                  <div>
                    {/* Project Image Frame */}
                    <div className="relative aspect-video w-full rounded-xl border-2 border-zinc-900 bg-zinc-100 overflow-hidden mb-4 shadow-[0_2px_0_0_#18181B]">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100 text-zinc-400">
                          <Laptop size={32} />
                        </div>
                      )}
                      <span className="absolute top-2.5 right-2.5 rounded-lg border-2 border-zinc-900 bg-[#FFE57F] px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-zinc-950 shadow-[0_2px_0_0_#18181B]">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="font-sans text-xl font-black text-zinc-950 mb-2 group-hover:text-pink-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-medium text-zinc-600 line-clamp-2 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.techStack?.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="rounded-md border border-zinc-900/30 bg-[#F4F4F5] px-2 py-0.5 text-[10px] font-bold text-zinc-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-3 border-t-2 border-zinc-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-700">● In Production</span>
                    <button className="flex items-center gap-1 text-xs font-black text-zinc-900 group-hover:text-pink-600 group-hover:translate-x-1 transition-all">
                      Case Study <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Core Competencies & Standout Skills Showcase */}
        <VibeCoderExpertise skills={skills} />

        {/* 8. Verified Accreditations / Certificates */}
        {certificates && certificates.length > 0 && (
          <section id="certificates" className="py-14 sm:py-16 bg-[#FAF7F2] border-t-2 border-zinc-900/10">
            <div className="shell max-w-5xl">
              <div className="text-center space-y-3 mb-10">
                <span className="inline-block rounded-full border-2 border-zinc-900 bg-[#C7D2FE] px-3.5 py-0.5 text-xs font-black uppercase tracking-wider text-indigo-950 shadow-[0_2px_0_0_#18181B]">
                  Certificates
                </span>
                <h2 className="font-sans text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
                  Industry Accreditations
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="flex flex-col justify-between rounded-2xl border-3 border-zinc-900 bg-white p-4 sm:p-5 shadow-[0_6px_0_0_#18181B] hover:translate-y-[-2px] hover:shadow-[0_8px_0_0_#18181B] transition-all"
                  >
                    <div>
                      {cert.image && (
                        <a
                          href={cert.credentialUrl || cert.image}
                          target="_blank"
                          rel="noreferrer"
                          className="block relative aspect-[16/11] w-full rounded-xl overflow-hidden border-2 border-zinc-900 bg-zinc-100 mb-3 group/thumb shadow-[0_2px_0_0_#18181B]"
                          title={`View ${cert.title}`}
                        >
                          <img
                            src={cert.image}
                            alt={cert.title}
                            loading="lazy"
                            className="h-full w-full object-cover object-center group-hover/thumb:scale-105 transition-transform duration-300"
                          />
                        </a>
                      )}
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 truncate">
                          {cert.issuer}
                        </span>
                        {cert.hours && (
                          <span className="text-[10px] font-mono font-bold text-zinc-600 bg-zinc-100 border border-zinc-900/20 px-2 py-0.5 rounded-full shrink-0">
                            {cert.hours}
                          </span>
                        )}
                      </div>
                      <h4 className="font-sans text-sm font-black text-zinc-950 mt-1 line-clamp-2">
                        {cert.title}
                      </h4>
                      {cert.description && (
                        <p className="text-[11px] text-zinc-600 mt-1.5 line-clamp-2 font-medium">
                          {cert.description}
                        </p>
                      )}
                    </div>
                    <div className="mt-4 pt-3 border-t-2 border-zinc-900/10 flex items-center justify-between text-[11px] font-bold text-zinc-500">
                      <span>{cert.issueDate}</span>
                      <div className="flex items-center gap-2">
                        {cert.credentialUrl && (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-purple-700 hover:text-purple-950 flex items-center gap-1 font-bold text-[11px]"
                          >
                            <span>View</span>
                            <ArrowUpRight size={12} />
                          </a>
                        )}
                        <span className="text-emerald-700 flex items-center gap-1 font-black">
                          <CheckCircle2 size={12} /> Verified
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 9. Let's Work Together! Banner */}
        <section className="relative py-10 sm:py-14 bg-[#FAF7F2] border-t-2 border-zinc-900/10">
          <div className="shell">
            <div className="relative overflow-hidden rounded-3xl border-3 border-zinc-900 bg-gradient-to-r from-[#EDE9FE] via-[#FEF3C7] to-[#DCFCE7] p-6 sm:p-10 shadow-[0_8px_0_0_#18181B]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="flex items-start sm:items-center gap-4 sm:gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-zinc-900 bg-white text-zinc-900 shadow-[0_3px_0_0_#18181B]">
                    <Send className="h-6 w-6 -rotate-12 translate-x-0.5 text-pink-500" />
                  </div>
                  <div>
                    <span className="inline-block rounded-full border-2 border-zinc-900 bg-[#FEE028] px-3 py-0.5 text-[11px] font-black uppercase tracking-wider text-zinc-950 shadow-[0_2px_0_0_#18181B] mb-1">
                      Let's Collaborate
                    </span>
                    <h3 className="font-sans text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
                      Let's Build Something Exceptional
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm font-medium text-zinc-700 max-w-xl">
                      Have a mission-critical AI, LLM, mobile, or intelligent automation project? Let's discuss system architecture and bring your vision to life with precision.
                    </p>
                  </div>
                </div>

                <div className="shrink-0">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-xl border-3 border-zinc-900 bg-[#FEE028] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-zinc-950 shadow-[0_4px_0_0_#18181B] hover:translate-y-[-2px] hover:shadow-[0_6px_0_0_#18181B] active:translate-y-[2px] active:shadow-[0_2px_0_0_#18181B] transition-all cursor-pointer"
                  >
                    <span>START A CONVERSATION</span>
                    <ArrowRight size={15} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. Direct Inquiry & Collaboration Dossier (Non-Form) */}
        <section id="contact" className="py-14 sm:py-20 bg-[#F4EFE6]/70 border-t-2 border-zinc-900/10">
          <div className="shell">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-zinc-900 bg-[#FEE028] px-4 py-1 text-xs font-black uppercase tracking-wider text-zinc-950 shadow-[0_2px_0_0_#18181B]">
                <Sparkles size={13} className="text-pink-600" />
                <span>OPEN OPPORTUNITY · REMOTE & PROJECT-BASED</span>
              </span>
              <h2 className="font-sans text-3xl sm:text-5xl font-black text-zinc-950 tracking-tight">
                Let's Build Something Bold
              </h2>
              <p className="text-xs sm:text-sm font-medium text-zinc-700 max-w-xl mx-auto">
                <strong className="text-zinc-950 font-bold">Actively Open for Opportunities:</strong> High-impact Remote Engineering Contracts, Turnkey Project-Based Delivery, and Fractional AI / Mobile Architecture worldwide.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-12 items-stretch">
              {/* Left Column: Direct Inquiry Channels (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div className="rounded-3xl border-3 border-zinc-900 bg-white p-6 sm:p-7 shadow-[0_8px_0_0_#18181B] h-full flex flex-col justify-between space-y-6">
                  <div className="space-y-5">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b-2 border-zinc-900/10 pb-4">
                      <div>
                        <span className="text-[11px] font-mono font-black uppercase tracking-wider text-purple-700 block">
                          DIRECT INQUIRY CHANNEL
                        </span>
                        <h3 className="font-sans text-xl font-black text-zinc-950 mt-0.5">
                          Get In Touch
                        </h3>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-800 bg-[#DCFCE7] border-2 border-zinc-900 px-3 py-1 rounded-full shadow-[0_2px_0_0_#18181B]">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Available for Hire</span>
                      </div>
                    </div>

                    {/* Email Box & 1-Click Copy */}
                    <div className="rounded-2xl border-2 border-zinc-900 bg-[#FAF7F2] p-4 sm:p-5 space-y-3 shadow-[0_2px_0_0_#18181B]">
                      <span className="text-[10px] font-mono font-black uppercase tracking-wider text-zinc-500 block">
                        PRIMARY EMAIL ADDRESS
                      </span>
                      <p className="font-mono text-sm sm:text-base font-black text-zinc-950 select-all break-all">
                        {email}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <a
                          href={`mailto:${email}`}
                          className="inline-flex items-center gap-1.5 rounded-xl border-2 border-zinc-900 bg-[#FEE028] px-4 py-2 text-xs font-black uppercase tracking-wider text-zinc-950 shadow-[0_2px_0_0_#18181B] hover:translate-y-[-1px] hover:shadow-[0_4px_0_0_#18181B] active:translate-y-[1px] active:shadow-[0_1px_0_0_#18181B] transition-all cursor-pointer"
                        >
                          <Mail size={13} />
                          <span>Send Email</span>
                        </a>
                        <button
                          type="button"
                          onClick={handleCopyEmail}
                          className="inline-flex items-center gap-1.5 rounded-xl border-2 border-zinc-900 bg-white px-3.5 py-2 text-xs font-mono font-bold text-zinc-900 shadow-[0_2px_0_0_#18181B] hover:bg-zinc-100 hover:translate-y-[-1px] hover:shadow-[0_4px_0_0_#18181B] active:translate-y-[1px] active:shadow-[0_1px_0_0_#18181B] transition-all cursor-pointer"
                        >
                          {copiedEmail ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                          <span>{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Metadata: Location & NDA */}
                    <div className="space-y-3 pt-1 text-xs">
                      <div className="flex items-start gap-3 rounded-2xl border-2 border-zinc-900 bg-[#FEF3C7] p-3.5 shadow-[0_2px_0_0_#18181B]">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-zinc-900 bg-white text-amber-700 shadow-[0_1px_0_0_#18181B]">
                          <MapPin size={16} />
                        </div>
                        <div>
                          <p className="font-black text-zinc-950">Location & Timezone</p>
                          <p className="text-zinc-700 text-[11.5px] mt-0.5 font-medium">
                            {config.ownerLocation || 'Jakarta, Indonesia'} (UTC+7) · Remote / Distributed Worldwide
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 rounded-2xl border-2 border-zinc-900 bg-[#E0F2FE] p-3.5 shadow-[0_2px_0_0_#18181B]">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-zinc-900 bg-white text-blue-700 shadow-[0_1px_0_0_#18181B]">
                          <ShieldCheck size={16} />
                        </div>
                        <div>
                          <p className="font-black text-zinc-950">Non-Disclosure & Security</p>
                          <p className="text-zinc-700 text-[11.5px] mt-0.5 font-medium">
                            Proprietary systems, technical roadmaps, and client IP protected under strict mutual NDA.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social Profiles Row */}
                  <div className="pt-4 border-t-2 border-zinc-900/10 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-zinc-600">Professional Networks:</span>
                    <div className="flex items-center gap-2">
                      {config.ownerLinkedIn && (
                        <a
                          href={config.ownerLinkedIn}
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-zinc-900 bg-white text-zinc-900 shadow-[0_2px_0_0_#18181B] hover:bg-[#0077B5] hover:text-white hover:translate-y-[-1px] transition-all"
                          title="LinkedIn Profile"
                        >
                          <Linkedin size={15} />
                        </a>
                      )}
                      {config.ownerGithub && (
                        <a
                          href={config.ownerGithub}
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-zinc-900 bg-white text-zinc-900 shadow-[0_2px_0_0_#18181B] hover:bg-zinc-900 hover:text-white hover:translate-y-[-1px] transition-all"
                          title="GitHub Profile"
                        >
                          <Github size={15} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Global Remote & Project-Based Collaboration (7 cols) */}
              <div className="lg:col-span-7">
                <div className="rounded-3xl border-3 border-zinc-900 bg-white p-6 sm:p-7 shadow-[0_8px_0_0_#18181B] h-full flex flex-col justify-between space-y-5">
                  <div className="space-y-5">
                    {/* Engagement Header Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-zinc-900/10 pb-4">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-zinc-900 bg-[#C7D2FE] text-indigo-950 shadow-[0_2px_0_0_#18181B]">
                          <Globe size={18} />
                        </span>
                        <div>
                          <span className="text-[11px] font-mono font-black uppercase tracking-wider text-purple-700 block">
                            OPEN OPPORTUNITY
                          </span>
                          <h3 className="font-sans text-lg sm:text-xl font-black text-zinc-950 mt-0.5">
                            Remote & Project-Based Engagements
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-800 bg-[#DCFCE7] border-2 border-zinc-900 px-3 py-1 rounded-full shadow-[0_2px_0_0_#18181B]">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Actively Open for Work · 100% WFA</span>
                      </div>
                    </div>

                    {/* Remote Readiness Dossier Inner Container */}
                    <div className="rounded-2xl border-2 border-zinc-900 bg-[#FAF7F2] p-4 sm:p-5 space-y-4 shadow-[0_2px_0_0_#18181B]">
                      {/* Active Opportunity Callout */}
                      <div className="rounded-xl border-2 border-zinc-900 bg-[#DCFCE7] p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-[0_2px_0_0_#18181B]">
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-zinc-900 bg-[#FEE028] text-zinc-950 shrink-0 font-black text-xs">
                            ★
                          </span>
                          <div>
                            <span className="text-xs font-black text-zinc-950 block">
                              Open for Remote & Project Engagements
                            </span>
                            <span className="text-[11px] font-medium text-zinc-700">
                              Available for overseas contracts, turnkey projects, and sprint consulting
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono font-black text-zinc-950 bg-white border border-zinc-900 px-2 py-0.5 rounded-full shrink-0 self-start sm:self-center shadow-[0_1px_0_0_#18181B]">
                          Worldwide Overlap
                        </span>
                      </div>

                      {/* Role Heading */}
                      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-zinc-900/10 pb-2.5">
                        <div>
                          <h4 className="font-sans text-base sm:text-lg font-black text-zinc-950">
                            Senior Engineering & AI Systems Architect
                          </h4>
                          <p className="text-[11px] sm:text-xs font-mono font-bold text-purple-700">
                            Cross-Border Delivery · Async-First · Autonomous Execution
                          </p>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-zinc-900 bg-[#FEE028] border border-zinc-900 px-2 py-0.5 rounded-full shrink-0 shadow-[0_1px_0_0_#18181B]">
                          Zero Timezone Friction
                        </span>
                      </div>

                      {/* Capability Pillars */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
                        <div className="rounded-xl border-2 border-zinc-900 bg-white p-2 text-center shadow-[0_2px_0_0_#18181B]">
                          <span className="text-zinc-950 font-black block">Remote & WFA</span>
                          <span className="text-zinc-600 text-[10px] font-bold">100% Distributed</span>
                        </div>
                        <div className="rounded-xl border-2 border-zinc-900 bg-white p-2 text-center shadow-[0_2px_0_0_#18181B]">
                          <span className="text-zinc-950 font-black block">Project-Based</span>
                          <span className="text-zinc-600 text-[10px] font-bold">Turnkey & MVPs</span>
                        </div>
                        <div className="rounded-xl border-2 border-zinc-900 bg-white p-2 text-center shadow-[0_2px_0_0_#18181B]">
                          <span className="text-zinc-950 font-black block">Flexible Shift</span>
                          <span className="text-zinc-600 text-[10px] font-bold">US / EU / APAC</span>
                        </div>
                        <div className="rounded-xl border-2 border-zinc-900 bg-white p-2 text-center shadow-[0_2px_0_0_#18181B]">
                          <span className="text-zinc-950 font-black block">Contract & Lead</span>
                          <span className="text-zinc-600 text-[10px] font-bold">Sprint / Retainer</span>
                        </div>
                      </div>

                      {/* Narrative */}
                      <p className="text-xs text-zinc-700 leading-relaxed font-medium">
                        <strong className="text-zinc-950 font-bold">Actively seeking and open to remote and project-based opportunities.</strong> Proven tenure delivering enterprise web platforms, production multi-agent AI systems, and flagship mobile applications with zero micromanagement. Timezone differences are never a bottleneck: operating with high-cadence asynchronous execution (clean RFCs, documented PRs, proactive video demos) paired with guaranteed daily synchronous overlap for any global working hours.
                      </p>

                      {/* Engagement Guarantees */}
                      <div className="pt-2 border-t-2 border-zinc-900/10 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-zinc-700">
                        <div className="flex items-start gap-1.5">
                          <CheckCircle2 size={14} className="text-emerald-700 shrink-0 mt-0.5" />
                          <span><strong className="text-zinc-950 font-bold">Open for Remote Roles:</strong> Senior engineering lead integrated directly into your team</span>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <CheckCircle2 size={14} className="text-emerald-700 shrink-0 mt-0.5" />
                          <span><strong className="text-zinc-950 font-bold">Project-Based Delivery:</strong> Turnkey MVPs, AI multi-agent workflows & cross-platform apps</span>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <CheckCircle2 size={14} className="text-emerald-700 shrink-0 mt-0.5" />
                          <span><strong className="text-zinc-950 font-bold">Timezone Agnostic:</strong> Flexible core hours scheduled to match your sprint standups</span>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <CheckCircle2 size={14} className="text-emerald-700 shrink-0 mt-0.5" />
                          <span><strong className="text-zinc-950 font-bold">Enterprise IP Security:</strong> Commercial confidentiality protected under mutual NDA</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Engagement Action Bar */}
                  <div className="pt-4 border-t-2 border-zinc-900/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-[11px] font-mono font-bold text-zinc-600 text-center sm:text-left">
                      <span className="text-purple-700 font-black">Response window:</span> Within 12–24h · Worldwide opportunities welcome
                    </div>

                    <a
                      href={`mailto:${email}?subject=Remote%20Opportunity%20/%20Project%20Inquiry`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border-3 border-zinc-900 bg-[#FEE028] px-5 py-3 text-xs font-black uppercase tracking-wider text-zinc-950 shadow-[0_3px_0_0_#18181B] hover:translate-y-[-2px] hover:shadow-[0_5px_0_0_#18181B] active:translate-y-[1px] active:shadow-[0_1px_0_0_#18181B] transition-all w-full sm:w-auto shrink-0 cursor-pointer"
                    >
                      <Mail size={14} />
                      <span>Discuss Remote / Project Opportunity</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 10. Footer */}
      <footer className="border-t-3 border-zinc-900 bg-[#E8E4DC] py-8">
        <div className="shell flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-sans text-lg font-black tracking-tight text-zinc-950">
              bramastyo<span className="text-pink-500">.</span>
            </span>
            <span className="text-xs font-semibold text-zinc-600">
              © {new Date().getFullYear()} {config.ownerName}. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-900/30 bg-white/80 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-zinc-800 shadow-[0_2px_0_0_#18181B]">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Available for Contracts & Roles
            </span>
          </div>
        </div>
      </footer>

      {/* Project Case Study Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
}
