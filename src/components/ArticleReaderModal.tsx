import React, { useEffect, useState, useRef } from 'react';
import {
  X,
  Clock,
  Eye,
  Calendar,
  Paperclip,
  Download,
  Share2,
  Check,
  ChevronLeft,
  Copy,
  FileText,
  UserCheck,
} from 'lucide-react';
import type { Article } from '../types';

interface ArticleReaderModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
  onIncrementRead?: (id: string) => void;
}

export default function ArticleReaderModal({
  article,
  isOpen,
  onClose,
  onIncrementRead,
}: ArticleReaderModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  // Record telemetry view (once per browser session per article)
  useEffect(() => {
    if (!isOpen || !article) return;
    const sessionKey = `viewed_art_${article.id}`;
    if (!sessionStorage.getItem(sessionKey)) {
      sessionStorage.setItem(sessionKey, '1');
      if (onIncrementRead) {
        onIncrementRead(article.id);
      }
    }
  }, [isOpen, article, onIncrementRead]);

  // Track scroll progress inside reader container
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !isOpen) return;

    const handleScroll = () => {
      const maxScroll = el.scrollHeight - el.clientHeight;
      if (maxScroll > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (el.scrollTop / maxScroll) * 100)));
      }
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [isOpen, article]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setScrollProgress(0);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !article) return null;

  const handleShare = () => {
    const url = window.location.origin + '#articles';
    navigator.clipboard.writeText(`${article.title} — ${url}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const copyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(idx);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  // Helper to render markdown content with code blocks & headings
  const renderMarkdownContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBuffer: string[] = [];
    let codeLanguage = '';
    let codeBlockCount = 0;

    lines.forEach((line, index) => {
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          // Closing code block
          const codeText = codeBuffer.join('\n');
          const currentIdx = codeBlockCount++;
          elements.push(
            <div key={`code-${index}`} className="my-5 rounded-lg border border-[#232736] bg-[#0A0B10] overflow-hidden shadow-lg">
              <div className="flex items-center justify-between px-4 py-2 border-b border-[#1E2230] bg-[#121520]">
                <span className="font-mono text-[11px] text-gold-400 font-semibold tracking-wider uppercase">
                  {codeLanguage || 'CODE'}
                </span>
                <button
                  type="button"
                  onClick={() => copyCode(codeText, currentIdx)}
                  className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-mono text-ink-300 hover:text-white rounded transition-colors"
                >
                  {copiedCodeIndex === currentIdx ? (
                    <>
                      <Check size={12} className="text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto font-mono text-xs text-cream-200 leading-relaxed">
                <code>{codeText}</code>
              </pre>
            </div>
          );
          codeBuffer = [];
          inCodeBlock = false;
        } else {
          // Opening code block
          inCodeBlock = true;
          codeLanguage = line.trim().slice(3).trim();
        }
        return;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      const trimmed = line.trim();

      if (trimmed.startsWith('### ')) {
        elements.push(
          <h4 key={`h4-${index}`} className="font-sans text-base sm:text-lg font-bold text-white mt-6 mb-2">
            {trimmed.slice(4)}
          </h4>
        );
      } else if (trimmed.startsWith('## ')) {
        elements.push(
          <div key={`h2-${index}`} className="mt-8 mb-3.5 pb-2 border-b border-[#232736]">
            <h3 className="font-sans text-lg sm:text-xl font-extrabold text-gold-300 tracking-tight">
              {trimmed.slice(3)}
            </h3>
          </div>
        );
      } else if (trimmed.startsWith('# ')) {
        elements.push(
          <h2 key={`h1-${index}`} className="font-sans text-xl sm:text-2xl font-black text-white mt-6 mb-3">
            {trimmed.slice(2)}
          </h2>
        );
      } else if (trimmed.startsWith('> ')) {
        elements.push(
          <blockquote
            key={`quote-${index}`}
            className="my-4 pl-4 border-l-2 border-gold-500/80 bg-gold-500/5 py-2 pr-3 text-ink-200 italic font-sans text-sm rounded-r"
          >
            {trimmed.slice(2)}
          </blockquote>
        );
      } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        elements.push(
          <li key={`li-${index}`} className="ml-5 list-disc text-ink-200 text-sm leading-relaxed mb-1 marker:text-gold-500">
            {trimmed.slice(2)}
          </li>
        );
      } else if (trimmed === '---') {
        elements.push(<hr key={`hr-${index}`} className="my-6 border-[#232736]" />);
      } else if (trimmed.length > 0) {
        elements.push(
          <p key={`p-${index}`} className="font-sans text-sm text-ink-200 leading-relaxed mb-4">
            {trimmed}
          </p>
        );
      }
    });

    return elements;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9990] flex items-center justify-center p-2 sm:p-4 md:p-6"
    >
      {/* Dimmed Backdrop */}
      <div
        className="fixed inset-0 bg-[#07080C]/85 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Reader Container */}
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-2xl border border-[#232736] bg-[#0E1017] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_35px_rgba(229,169,60,0.12)] z-10 overflow-hidden">
        {/* Glowing Top Reading Progress Bar */}
        <div className="relative w-full h-[3px] bg-[#161922] shrink-0 z-30">
          <div
            className="h-full bg-gradient-to-r from-gold-600 via-gold-400 to-amber-300 shadow-[0_0_8px_rgba(245,200,105,0.7)] transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Modal TopBar */}
        <header className="flex items-center justify-between px-5 py-3.5 border-b border-[#1E2230] bg-[#121520]/90 backdrop-blur-md shrink-0 z-20">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1 text-xs font-mono text-ink-300 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft size={16} />
              <span>Back</span>
            </button>
            <span className="text-graphite-600">|</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider text-gold-300 bg-gold-500/10 border border-gold-500/20">
              {article.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              title="Share / Copy Link"
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-ink-300 hover:text-white border border-[#282D3E] hover:border-gold-500/40 rounded-lg bg-[#161924] transition-colors cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check size={12} className="text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Share2 size={12} />
                  <span>Share</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="p-1.5 text-ink-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </header>

        {/* Scrollable Reader Body */}
        <div ref={containerRef} className="flex-1 overflow-y-auto px-6 sm:px-10 py-8 space-y-6">
          {/* Article Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-ink-400">
              <span className="inline-flex items-center gap-1 text-gold-400">
                <Calendar size={12} />
                {article.publishedAt || 'Recent'}
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Clock size={12} className="text-gold-400" />
                {article.readTime}
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 text-cyan-300">
                <Eye size={12} className="text-cyan-400" />
                {article.readCount || 0} Telemetry Reads
              </span>
            </div>

            <h1 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              {article.title}
            </h1>

            <p className="font-sans text-base text-ink-200 leading-relaxed font-normal border-l-2 border-gold-500/50 pl-3 italic">
              {article.excerpt}
            </p>

            {/* Author Byline */}
            <div className="flex items-center gap-2.5 pt-2 text-xs font-sans text-ink-300 border-t border-[#1C202C]">
              <div className="w-7 h-7 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 font-bold text-xs">
                BK
              </div>
              <div>
                <span className="text-white font-medium">Bramastyo Kusumo</span>
                <span className="text-ink-400 text-[11px] block">Senior Full-Stack & AI Systems Engineer</span>
              </div>
            </div>
          </div>

          {/* Downloadable Attachment Card (If Available) */}
          {article.attachments && article.attachments.length > 0 && (
            <div className="rounded-xl border border-gold-500/30 bg-gradient-to-r from-gold-500/10 via-[#151824] to-[#12141F] p-4 shadow-[0_4px_20px_-5px_rgba(229,169,60,0.15)] space-y-3">
              <div className="flex items-center gap-2">
                <Paperclip size={15} className="text-gold-400" />
                <span className="font-mono text-xs font-bold text-gold-300 uppercase tracking-wider">
                  Supporting Document Attachment
                </span>
              </div>
              <div className="space-y-2">
                {article.attachments.map((att) => (
                  <div
                    key={att.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg bg-[#0A0B10]/80 border border-[#232736]"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-2 rounded bg-gold-500/10 text-gold-400 shrink-0">
                        <FileText size={16} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-sans text-xs font-semibold text-white truncate">{att.name}</p>
                        <p className="font-mono text-[10px] text-ink-400">{att.size || 'PDF Document'}</p>
                      </div>
                    </div>

                    <a
                      href={att.url && att.url !== '#' ? att.url : undefined}
                      download={att.name}
                      onClick={(e) => {
                        if (!att.url || att.url === '#') {
                          e.preventDefault();
                          alert(`File attachment "${att.name}" siap diunduh saat file production telah terhubung.`);
                        }
                      }}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-canvas bg-gold-400 hover:bg-gold-300 transition-colors shadow-sm cursor-pointer shrink-0"
                    >
                      <Download size={13} />
                      <span>Download PDF</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Article Main Markdown Content */}
          <div className="pt-2 text-ink-200">
            {renderMarkdownContent(article.content)}
          </div>

          {/* End of Article Footer */}
          <div className="pt-8 border-t border-[#1E2230] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-ink-400">
              <UserCheck size={13} className="text-gold-400" />
              <span>Published by Bramastyo Kusumo</span>
            </div>
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-mono font-bold text-white bg-[#161924] hover:bg-[#1E2333] border border-[#282D3E] rounded-lg transition-colors cursor-pointer"
            >
              <span>Done Reading</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
