import { useEffect } from 'react';
import { X, Download, Printer, FileText, CheckCircle2, ArrowUpRight, Award, Briefcase, GraduationCap, Code } from 'lucide-react';
import { downloadCvPdf } from '../utils/generateCvPdf';
import { defaultCertificates, defaultMilestones, defaultProjects, defaultConfig } from '../data';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CvModal({ isOpen, onClose }: CvModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const careerMilestones = defaultMilestones.filter((m) => m.type !== 'education');
  const cleanCerts = defaultCertificates.filter(
    (c) => c.id !== 'cert-005' && !c.issuer.includes('Bina Sarana Informatika')
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      {/* Deep Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl border border-gold-500/40 bg-[#0C0E14] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_40px_rgba(229,169,60,0.15)] z-10 custom-scrollbar">
        {/* Top Gold Accent Bar */}
        <div className="sticky top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#F5C869] to-transparent z-30" />

        {/* Modal Toolbar Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#232736] bg-[#0C0E14]/95 px-5 py-3.5 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gold-500/15 border border-gold-500/30 text-gold-accent">
              <FileText size={15} />
            </span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-white block leading-tight">
                Curriculum Vitae Preview
              </span>
              <span className="text-[11px] font-mono text-ink-400 block leading-tight">
                Bramastyo Kusumo — Senior Systems & AI Architect
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={downloadCvPdf}
              className="btn-gold inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-canvas shadow-gold-sm cursor-pointer"
              title="Download PDF directly"
            >
              <Download size={13} />
              <span className="hidden sm:inline">Download PDF</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#232736] bg-[#141722] text-ink-300 hover:border-gold-500/50 hover:text-white transition-colors cursor-pointer"
              title="Print Document"
            >
              <Printer size={15} />
            </button>

            <button
              onClick={onClose}
              aria-label="Close CV Preview"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#232736] bg-[#141722] text-ink-300 hover:border-gold-500 hover:text-white transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* CV Document Body (Styled A4 Sheet Simulation) */}
        <div className="p-4 sm:p-8 bg-[#090A0F]">
          <div className="max-w-3xl mx-auto rounded-xl border border-[#232736] bg-[#0E1017] p-6 sm:p-9 text-ink-200 shadow-2xl space-y-7">
            {/* CV Document Header */}
            <div className="border-b border-[#232736] pb-5">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                  <h1 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                    BRAMASTYO KUSUMO
                  </h1>
                  <p className="font-mono text-xs sm:text-sm font-semibold text-gold-400 mt-1">
                    Senior Full-Stack & Autonomous AI Systems Engineer · Lead Mobile Architect
                  </p>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-md shrink-0 self-start sm:self-auto">
                  Available for Senior / Architect Roles
                </span>
              </div>

              {/* Contact Meta */}
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-mono text-ink-400">
                <span>{defaultConfig.ownerEmail || 'bramastyodevops@gmail.com'}</span>
                <span>•</span>
                <span>{defaultConfig.ownerLocation || 'Jakarta, Indonesia'} (UTC+7)</span>
                <span>•</span>
                <a
                  href="https://github.com/bramastyokusumo"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gold-400/90 hover:underline inline-flex items-center gap-0.5"
                >
                  github.com/bramastyokusumo <ArrowUpRight size={11} />
                </a>
                <span>•</span>
                <span className="text-ink-300">We Build Solutions</span>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="space-y-2">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-gold-400 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400" /> Executive Summary
              </h2>
              <p className="text-xs sm:text-sm text-ink-200 leading-relaxed">
                Senior Systems Engineer & AI Architect with 10+ years of full-lifecycle engineering excellence. Full-stack web developer since 2013, early Flutter pioneer, and seasoned remote architect for PT Passion Abadi, PT 3D, and PT Rekayasa Digital. Specialized in Autonomous AI Agent workflows, LLM orchestration (ReAct / tool calling), multi-agent swarms, cross-platform mobile architectures, and resilient enterprise backends.
              </p>
            </div>

            {/* Core Competencies Matrix */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-gold-400 flex items-center gap-2">
                <Code size={13} className="text-gold-accent" /> Core Technical Competencies
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="rounded-lg border border-[#232736] bg-[#121520] p-3 space-y-1">
                  <span className="font-mono text-gold-300 font-bold block text-[11px]">Autonomous AI & LLMs</span>
                  <p className="text-ink-300 leading-relaxed text-[11.5px]">
                    Multi-Agent Architectures, LangChain, Tool Calling (ReAct), Prompt Engineering, RAG, OpenAI / Gemini / Claude API Orchestration.
                  </p>
                </div>
                <div className="rounded-lg border border-[#232736] bg-[#121520] p-3 space-y-1">
                  <span className="font-mono text-gold-300 font-bold block text-[11px]">Mobile & Cross-Platform</span>
                  <p className="text-ink-300 leading-relaxed text-[11.5px]">
                    Flutter (Dart), BLoC / Riverpod, Native iOS/Android Bridges, Offline-First Sync, Biometric Auth, Face Liveness, Sales Field Geolocation.
                  </p>
                </div>
                <div className="rounded-lg border border-[#232736] bg-[#121520] p-3 space-y-1">
                  <span className="font-mono text-gold-300 font-bold block text-[11px]">Web & Frontend</span>
                  <p className="text-ink-300 leading-relaxed text-[11.5px]">
                    React 18, TypeScript, TailwindCSS, Next.js, Vite, WebGL / Three.js 3D Shaders, State Management, Responsive Design Systems.
                  </p>
                </div>
                <div className="rounded-lg border border-[#232736] bg-[#121520] p-3 space-y-1">
                  <span className="font-mono text-gold-300 font-bold block text-[11px]">Backend & Cloud DevOps</span>
                  <p className="text-ink-300 leading-relaxed text-[11.5px]">
                    Node.js, Python (FastAPI), Laravel/PHP, PostgreSQL, MySQL, Redis, Docker, RESTful & GraphQL APIs, CI/CD Pipelines.
                  </p>
                </div>
              </div>
            </div>

            {/* Flagship Projects */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-gold-400 flex items-center gap-2">
                <CheckCircle2 size={13} className="text-gold-accent" /> Flagship Engineering Projects
              </h2>
              <div className="space-y-3">
                {defaultProjects.slice(0, 4).map((p) => (
                  <div key={p.id} className="rounded-lg border border-[#202534] bg-[#10121A] p-3 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-white text-xs sm:text-sm">{p.title}</span>
                      <span className="text-[10px] font-mono text-gold-400 truncate">
                        {(p.techStack || []).slice(0, 3).join(' • ')}
                      </span>
                    </div>
                    <p className="text-xs text-ink-300 leading-relaxed">{p.description}</p>
                    {p.impact && (
                      <p className="text-[11px] text-ink-400 italic font-mono pt-0.5">
                        Impact: {p.impact}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Career Timeline */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-gold-400 flex items-center gap-2">
                <Briefcase size={13} className="text-gold-accent" /> Professional Experience
              </h2>
              <div className="space-y-3">
                {careerMilestones.map((m) => (
                  <div key={m.id} className="border-l-2 border-gold-500/40 pl-3.5 space-y-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-xs font-bold text-white">{m.title}</span>
                      <span className="text-[11px] font-mono text-gold-400 shrink-0">{m.period}</span>
                    </div>
                    <span className="text-[11px] font-mono text-ink-400 block">{m.organisation}</span>
                    <p className="text-xs text-ink-300 leading-relaxed">{m.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-gold-400 flex items-center gap-2">
                <Award size={13} className="text-gold-accent" /> Industry Certifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {cleanCerts.map((c) => (
                  <div key={c.id} className="rounded-md border border-[#202534] bg-[#121520] p-2.5 space-y-0.5">
                    <span className="font-bold text-white block text-[11.5px] truncate">{c.title}</span>
                    <span className="text-[10px] font-mono text-gold-400 block">{c.issuer} • {c.issueDate}</span>
                    <span className="text-[9.5px] font-mono text-ink-400 block truncate">ID: {c.credentialId}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="space-y-2 border-t border-[#232736] pt-4">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-gold-400 flex items-center gap-2">
                <GraduationCap size={13} className="text-gold-accent" /> Formal Education
              </h2>
              <div className="flex items-baseline justify-between text-xs">
                <span className="font-bold text-white">Informatics Engineering Graduate Diploma</span>
                <span className="font-mono text-gold-400 text-[11px]">2010 — 2013</span>
              </div>
              <p className="text-xs text-ink-300">
                Universitas Bina Sarana Informatika (BSI) — Jakarta, Indonesia
              </p>
            </div>

            {/* Bottom Modal CTA */}
            <div className="pt-4 border-t border-[#232736] flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-mono text-ink-400">
                Ready to review offline?
              </span>
              <button
                onClick={downloadCvPdf}
                className="btn-gold inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-canvas shadow-gold-glow cursor-pointer"
              >
                <Download size={14} /> Download Official CV (PDF)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
