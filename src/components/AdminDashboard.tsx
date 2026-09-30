import React, { useState } from 'react';
import {
  Shield, LogOut, LayoutDashboard, FolderOpen, Clock, Cpu,
  Settings, Plus, Pencil, Trash2, RefreshCw, Save, X, BookOpen,
  Eye, EyeOff, Paperclip,
} from 'lucide-react';
import GoldButton from './GoldButton';
import Modal from './Modal';
import StatusBadge from './StatusBadge';
import type {
  AdminStore, Project, Milestone, Skill, SystemConfig,
  ProjectStatus, ProjectCategory, SkillCategory, SkillLevel,
  Article, ArticleAttachment,
} from '../types';

type AdminTab = 'overview' | 'projects' | 'articles' | 'timeline' | 'skills' | 'config';

interface AdminDashboardProps {
  store: AdminStore;
  onLogout: () => void;
  onUpdateConfig: (patch: Partial<SystemConfig>) => void;
  onAddProject: (p: Project) => void;
  onUpdateProject: (id: string, patch: Partial<Project>) => void;
  onDeleteProject: (id: string) => void;
  onAddMilestone: (m: Milestone) => void;
  onUpdateMilestone: (id: string, patch: Partial<Milestone>) => void;
  onDeleteMilestone: (id: string) => void;
  onAddSkill: (s: Skill) => void;
  onUpdateSkill: (id: string, patch: Partial<Skill>) => void;
  onDeleteSkill: (id: string) => void;
  onAddArticle?: (a: Omit<Article, 'id'>) => void;
  onUpdateArticle?: (id: string, patch: Partial<Article>) => void;
  onDeleteArticle?: (id: string) => void;
  onReset: () => void;
}
import type { LucideIcon } from 'lucide-react';

const TABS: { id: AdminTab; label: string; icon: LucideIcon }[] = [
  { id: 'overview',  label: 'Overview',  icon: LayoutDashboard },
  { id: 'projects',  label: 'Projects',  icon: FolderOpen },
  { id: 'articles',  label: 'Articles',  icon: BookOpen },
  { id: 'timeline',  label: 'Timeline',  icon: Clock },
  { id: 'skills',    label: 'Skills',    icon: Cpu },
  { id: 'config',    label: 'Config',    icon: Settings },
];

// ─── Config Tab ──────────────────────────────────────────────
const ConfigTab: React.FC<{ config: SystemConfig; onSave: (p: Partial<SystemConfig>) => void }> = ({ config, onSave }) => {
  const [draft, setDraft] = useState<SystemConfig>({ ...config });
  const fields: { key: keyof SystemConfig; label: string; type?: string; multi?: boolean }[] = [
    { key: 'ownerName',     label: 'Full Name' },
    { key: 'ownerTitle',    label: 'Title' },
    { key: 'ownerEmail',    label: 'Email',    type: 'email' },
    { key: 'ownerAvatar',   label: 'Avatar / Photo URL' },
    { key: 'ownerGithub',   label: 'GitHub URL' },
    { key: 'ownerLinkedIn', label: 'LinkedIn URL' },
    { key: 'ownerLocation', label: 'Location' },
    { key: 'heroTagline',   label: 'Hero Tagline' },
    { key: 'ownerBio',      label: 'Bio',      multi: true },
  ];

  const inputClass = 'w-full bg-graphite-800/50 border border-graphite-600/30 rounded-sm px-3 py-2 font-mono text-xs text-cream-200 placeholder-graphite-500 focus:outline-none focus:border-gold-500/50 transition-colors';

  return (
    <div className="space-y-4">
      {fields.map(f => (
        <div key={f.key}>
          <label className="block font-mono text-[10px] text-graphite-400 tracking-widest mb-1">{f.label.toUpperCase()}</label>
          {f.multi ? (
            <textarea
              rows={3}
              value={String(draft[f.key])}
              onChange={e => setDraft(d => ({ ...d, [f.key]: e.target.value }))}
              className={[inputClass, 'resize-none'].join(' ')}
            />
          ) : (
            <input
              type={f.type ?? 'text'}
              value={String(draft[f.key])}
              onChange={e => setDraft(d => ({ ...d, [f.key]: e.target.value }))}
              className={inputClass}
            />
          )}
        </div>
      ))}
      <div className="flex items-center gap-3">
        <label className="font-mono text-[10px] text-graphite-400 tracking-widest">AVAILABLE FOR WORK</label>
        <button
          onClick={() => setDraft(d => ({ ...d, availableForWork: !d.availableForWork }))}
          role="switch"
          aria-checked={draft.availableForWork}
          className={['w-10 h-5 rounded-full transition-colors relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-400', draft.availableForWork ? 'bg-emerald-600' : 'bg-graphite-600'].join(' ')}
        >
          <span className={['absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform', draft.availableForWork ? 'translate-x-5' : 'translate-x-0.5'].join(' ')} />
        </button>
      </div>
      <GoldButton size="sm" icon={<Save size={13} />} onClick={() => onSave(draft)}>Save Changes</GoldButton>
    </div>
  );
};

// ─── Projects Tab ─────────────────────────────────────────────
const ProjectsTab: React.FC<{
  projects: Project[];
  onAdd: (p: Project) => void;
  onUpdate: (id: string, patch: Partial<Project>) => void;
  onDelete: (id: string) => void;
}> = ({ projects, onAdd, onUpdate, onDelete }) => {
  const [editTarget, setEditTarget] = useState<Project | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const blankProject = (): Project => ({
    id: `proj-${Date.now()}`,
    title: '', description: '', longDescription: '',
    category: 'web' as ProjectCategory, status: 'wip' as ProjectStatus,
    techStack: [], year: new Date().getFullYear(),
    metrics: [], links: {}, featured: false, color: '#c4a350',
  });

  const [draft, setDraft] = useState<Project>(blankProject());

  const openAdd = () => { setDraft(blankProject()); setShowAdd(true); };
  const openEdit = (p: Project) => { setDraft({ ...p }); setEditTarget(p); };
  const closeModal = () => { setShowAdd(false); setEditTarget(null); };

  const handleSave = () => {
    if (editTarget) {
      onUpdate(editTarget.id, draft);
    } else {
      onAdd(draft);
    }
    closeModal();
  };

  const inputClass = 'w-full bg-graphite-800/50 border border-graphite-600/30 rounded-sm px-3 py-2 font-mono text-xs text-cream-200 focus:outline-none focus:border-gold-500/50 transition-colors';

  const ProjectForm = () => (
    <div className="space-y-3">
      {(['title', 'description'] as const).map(field => (
        <div key={field}>
          <label className="block font-mono text-[10px] text-graphite-400 tracking-widest mb-1">{field.toUpperCase()}</label>
          <input value={draft[field]} onChange={e => setDraft(d => ({ ...d, [field]: e.target.value }))} className={inputClass} />
        </div>
      ))}
      <div>
        <label className="block font-mono text-[10px] text-graphite-400 tracking-widest mb-1">LONG DESCRIPTION</label>
        <textarea rows={3} value={draft.longDescription} onChange={e => setDraft(d => ({ ...d, longDescription: e.target.value }))} className={[inputClass, 'resize-none'].join(' ')} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block font-mono text-[10px] text-graphite-400 tracking-widest mb-1">CATEGORY</label>
          <select value={draft.category} onChange={e => setDraft(d => ({ ...d, category: e.target.value as ProjectCategory }))} className={inputClass}>
            {(['web','saas','api','mobile','oss'] as ProjectCategory[]).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block font-mono text-[10px] text-graphite-400 tracking-widest mb-1">STATUS</label>
          <select value={draft.status} onChange={e => setDraft(d => ({ ...d, status: e.target.value as ProjectStatus }))} className={inputClass}>
            {(['live','wip','archived','private'] as ProjectStatus[]).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block font-mono text-[10px] text-graphite-400 tracking-widest mb-1">YEAR</label>
          <input type="number" value={draft.year} onChange={e => setDraft(d => ({ ...d, year: Number(e.target.value) }))} className={inputClass} />
        </div>
        <div>
          <label className="block font-mono text-[10px] text-graphite-400 tracking-widest mb-1">ACCENT COLOR</label>
          <input type="color" value={draft.color} onChange={e => setDraft(d => ({ ...d, color: e.target.value }))} className={[inputClass, 'h-9 px-2 cursor-pointer'].join(' ')} />
        </div>
      </div>
      <div>
        <label className="block font-mono text-[10px] text-graphite-400 tracking-widest mb-1">TECH STACK (comma-separated)</label>
        <input value={draft.techStack.join(', ')} onChange={e => setDraft(d => ({ ...d, techStack: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))} className={inputClass} />
      </div>
      <div>
        <label className="block font-mono text-[10px] text-graphite-400 tracking-widest mb-1">LIVE URL</label>
        <input value={draft.links.live ?? ''} onChange={e => setDraft(d => ({ ...d, links: { ...d.links, live: e.target.value } }))} className={inputClass} />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <GoldButton variant="outline" size="sm" icon={<X size={12} />} onClick={closeModal}>Cancel</GoldButton>
        <GoldButton size="sm" icon={<Save size={12} />} onClick={handleSave}>
          {editTarget ? 'Update' : 'Add Project'}
        </GoldButton>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs text-graphite-400">{projects.length} projects</p>
        <GoldButton size="sm" icon={<Plus size={13} />} onClick={openAdd}>Add Project</GoldButton>
      </div>
      <div className="space-y-2">
        {projects.map(p => (
          <div key={p.id} className="glass-panel pixel-border rounded-sm p-3 flex items-center gap-3">
            <div className="w-1 self-stretch rounded-full shrink-0" style={{ backgroundColor: p.color }} />
            <div className="flex-1 min-w-0">
              <p className="font-display text-sm font-medium text-cream-100 truncate">{p.title}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <StatusBadge status={p.status} />
                <span className="font-mono text-[10px] text-graphite-500">{p.year}</span>
              </div>
            </div>
            <div className="flex gap-1.5 shrink-0">
              <button
                onClick={() => openEdit(p)}
                aria-label={`Edit ${p.title}`}
                className="p-1.5 text-graphite-400 hover:text-gold-400 hover:bg-gold-500/10 rounded-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-400"
              >
                <Pencil size={13} />
              </button>
              <button
                onClick={() => setDeleteId(p.id)}
                aria-label={`Delete ${p.title}`}
                className="p-1.5 text-graphite-400 hover:text-red-400 hover:bg-red-500/10 rounded-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-400"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={showAdd || !!editTarget} onClose={closeModal} title={editTarget ? 'Edit Project' : 'Add Project'}>
        <ProjectForm />
      </Modal>
      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Confirm Delete">
        <div className="space-y-4">
          <p className="text-graphite-200 text-sm">Are you sure you want to delete this project? This action cannot be undone.</p>
          <div className="flex gap-3 justify-end">
            <GoldButton variant="outline" size="sm" onClick={() => setDeleteId(null)}>Cancel</GoldButton>
            <GoldButton size="sm" className="!bg-red-700 !border-red-600" onClick={() => { if (deleteId) { onDelete(deleteId); setDeleteId(null); } }}>
              Delete
            </GoldButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// ─── Skills Tab ───────────────────────────────────────────────
const SkillsTab: React.FC<{
  skills: Skill[];
  onAdd: (s: Skill) => void;
  onUpdate: (id: string, patch: Partial<Skill>) => void;
  onDelete: (id: string) => void;
}> = ({ skills, onAdd, onUpdate, onDelete }) => {
  const [editTarget, setEditTarget] = useState<Skill | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const blank = (): Skill => ({
    id: `sk-${Date.now()}`, name: '', category: 'frontend', level: 'proficient', proficiency: 70, years: 1,
  });
  const [draft, setDraft] = useState<Skill>(blank());
  const openAdd = () => { setDraft(blank()); setShowAdd(true); };
  const openEdit = (s: Skill) => { setDraft({ ...s }); setEditTarget(s); };
  const closeModal = () => { setShowAdd(false); setEditTarget(null); };

  const handleSave = () => {
    if (editTarget) { onUpdate(editTarget.id, draft); }
    else { onAdd(draft); }
    closeModal();
  };

  const inputClass = 'w-full bg-graphite-800/50 border border-graphite-600/30 rounded-sm px-3 py-2 font-mono text-xs text-cream-200 focus:outline-none focus:border-gold-500/50 transition-colors';

  const SkillForm = () => (
    <div className="space-y-3">
      <div>
        <label className="block font-mono text-[10px] text-graphite-400 tracking-widest mb-1">SKILL NAME</label>
        <input value={draft.name} onChange={e => setDraft(d => ({ ...d, name: e.target.value }))} className={inputClass} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block font-mono text-[10px] text-graphite-400 tracking-widest mb-1">CATEGORY</label>
          <select value={draft.category} onChange={e => setDraft(d => ({ ...d, category: e.target.value as SkillCategory }))} className={inputClass}>
            {(['frontend','backend','mobile','ai','database','devops','tools'] as SkillCategory[]).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block font-mono text-[10px] text-graphite-400 tracking-widest mb-1">LEVEL</label>
          <select value={draft.level} onChange={e => setDraft(d => ({ ...d, level: e.target.value as SkillLevel }))} className={inputClass}>
            {(['expert','proficient','familiar'] as SkillLevel[]).map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block font-mono text-[10px] text-graphite-400 tracking-widest mb-1">PROFICIENCY ({draft.proficiency}%)</label>
          <input type="range" min={0} max={100} value={draft.proficiency} onChange={e => setDraft(d => ({ ...d, proficiency: Number(e.target.value) }))} className="w-full accent-gold-500" />
        </div>
        <div>
          <label className="block font-mono text-[10px] text-graphite-400 tracking-widest mb-1">YEARS EXP.</label>
          <input type="number" min={0} max={30} value={draft.years} onChange={e => setDraft(d => ({ ...d, years: Number(e.target.value) }))} className={inputClass} />
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <GoldButton variant="outline" size="sm" onClick={closeModal}>Cancel</GoldButton>
        <GoldButton size="sm" icon={<Save size={12} />} onClick={handleSave}>
          {editTarget ? 'Update' : 'Add Skill'}
        </GoldButton>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs text-graphite-400">{skills.length} skills</p>
        <GoldButton size="sm" icon={<Plus size={13} />} onClick={openAdd}>Add Skill</GoldButton>
      </div>
      <div className="space-y-2">
        {skills.map(s => (
          <div key={s.id} className="glass-panel pixel-border rounded-sm p-3 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-mono text-sm text-cream-100">{s.name}</p>
                <span className="font-mono text-[9px] text-graphite-500 tracking-widest uppercase">{s.category}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="skill-bar-track h-1 w-24 rounded-sm overflow-hidden">
                  <div className="h-full skill-bar-fill rounded-sm" style={{ width: `${s.proficiency}%` }} />
                </div>
                <span className="font-mono text-[10px] text-gold-400">{s.proficiency}%</span>
              </div>
            </div>
            <div className="flex gap-1.5 shrink-0">
              <button onClick={() => openEdit(s)} aria-label={`Edit ${s.name}`} className="p-1.5 text-graphite-400 hover:text-gold-400 hover:bg-gold-500/10 rounded-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-400">
                <Pencil size={13} />
              </button>
              <button onClick={() => setDeleteId(s.id)} aria-label={`Delete ${s.name}`} className="p-1.5 text-graphite-400 hover:text-red-400 hover:bg-red-500/10 rounded-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-400">
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={showAdd || !!editTarget} onClose={closeModal} title={editTarget ? 'Edit Skill' : 'Add Skill'}>
        <SkillForm />
      </Modal>
      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Confirm Delete">
        <div className="space-y-4">
          <p className="text-graphite-200 text-sm">Delete this skill entry?</p>
          <div className="flex gap-3 justify-end">
            <GoldButton variant="outline" size="sm" onClick={() => setDeleteId(null)}>Cancel</GoldButton>
            <GoldButton size="sm" className="!bg-red-700 !border-red-600" onClick={() => { if (deleteId) { onDelete(deleteId); setDeleteId(null); } }}>Delete</GoldButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// ─── Timeline Tab ─────────────────────────────────────────────
const TimelineTab: React.FC<{
  milestones: Milestone[];
  onAdd: (m: Milestone) => void;
  onUpdate: (id: string, patch: Partial<Milestone>) => void;
  onDelete: (id: string) => void;
}> = ({ milestones, onAdd, onUpdate, onDelete }) => {
  const [editTarget, setEditTarget] = useState<Milestone | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const blank = (): Milestone => ({
    id: `ms-${Date.now()}`, type: 'role', title: '', organisation: '',
    period: '', description: '', highlights: [], location: '', current: false,
  });
  const [draft, setDraft] = useState<Milestone>(blank());

  const openAdd = () => { setDraft(blank()); setShowAdd(true); };
  const openEdit = (m: Milestone) => { setDraft({ ...m }); setEditTarget(m); };
  const closeModal = () => { setShowAdd(false); setEditTarget(null); };

  const handleSave = () => {
    if (editTarget) { onUpdate(editTarget.id, draft); }
    else { onAdd(draft); }
    closeModal();
  };

  const inputClass = 'w-full bg-graphite-800/50 border border-graphite-600/30 rounded-sm px-3 py-2 font-mono text-xs text-cream-200 focus:outline-none focus:border-gold-500/50 transition-colors';

  const MilestoneForm = () => (
    <div className="space-y-3">
      {(['title','organisation','period','location'] as const).map(field => (
        <div key={field}>
          <label className="block font-mono text-[10px] text-graphite-400 tracking-widest mb-1">{field.toUpperCase()}</label>
          <input value={draft[field]} onChange={e => setDraft(d => ({ ...d, [field]: e.target.value }))} className={inputClass} />
        </div>
      ))}
      <div>
        <label className="block font-mono text-[10px] text-graphite-400 tracking-widest mb-1">DESCRIPTION</label>
        <textarea rows={3} value={draft.description} onChange={e => setDraft(d => ({ ...d, description: e.target.value }))} className={[inputClass, 'resize-none'].join(' ')} />
      </div>
      <div>
        <label className="block font-mono text-[10px] text-graphite-400 tracking-widest mb-1">HIGHLIGHTS (one per line)</label>
        <textarea rows={3} value={draft.highlights.join('\n')} onChange={e => setDraft(d => ({ ...d, highlights: e.target.value.split('\n').filter(Boolean) }))} className={[inputClass, 'resize-none'].join(' ')} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block font-mono text-[10px] text-graphite-400 tracking-widest mb-1">TYPE</label>
          <select value={draft.type} onChange={e => setDraft(d => ({ ...d, type: e.target.value as Milestone['type'] }))} className={inputClass}>
            {(['role','education','achievement','project'] as Milestone['type'][]).map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="flex items-end pb-2">
          <label className="flex items-center gap-2 font-mono text-xs text-graphite-300 cursor-pointer">
            <input type="checkbox" checked={draft.current} onChange={e => setDraft(d => ({ ...d, current: e.target.checked }))} className="accent-gold-500" />
            Current Position
          </label>
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <GoldButton variant="outline" size="sm" onClick={closeModal}>Cancel</GoldButton>
        <GoldButton size="sm" icon={<Save size={12} />} onClick={handleSave}>
          {editTarget ? 'Update' : 'Add Milestone'}
        </GoldButton>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs text-graphite-400">{milestones.length} milestones</p>
        <GoldButton size="sm" icon={<Plus size={13} />} onClick={openAdd}>Add Milestone</GoldButton>
      </div>
      <div className="space-y-2">
        {milestones.map(m => (
          <div key={m.id} className="glass-panel pixel-border rounded-sm p-3 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="font-display text-sm font-medium text-cream-100 truncate">{m.title}</p>
              <p className="font-mono text-[10px] text-gold-400 mt-0.5">{m.organisation} — {m.period}</p>
            </div>
            <div className="flex gap-1.5 shrink-0">
              <button onClick={() => openEdit(m)} aria-label={`Edit ${m.title}`} className="p-1.5 text-graphite-400 hover:text-gold-400 hover:bg-gold-500/10 rounded-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-400">
                <Pencil size={13} />
              </button>
              <button onClick={() => setDeleteId(m.id)} aria-label={`Delete ${m.title}`} className="p-1.5 text-graphite-400 hover:text-red-400 hover:bg-red-500/10 rounded-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-400">
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={showAdd || !!editTarget} onClose={closeModal} title={editTarget ? 'Edit Milestone' : 'Add Milestone'}>
        <MilestoneForm />
      </Modal>
      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Confirm Delete">
        <div className="space-y-4">
          <p className="text-graphite-200 text-sm">Delete this milestone?</p>
          <div className="flex gap-3 justify-end">
            <GoldButton variant="outline" size="sm" onClick={() => setDeleteId(null)}>Cancel</GoldButton>
            <GoldButton size="sm" className="!bg-red-700 !border-red-600" onClick={() => { if (deleteId) { onDelete(deleteId); setDeleteId(null); } }}>Delete</GoldButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// ─── Articles Tab ─────────────────────────────────────────────
const ArticlesTab: React.FC<{
  articles: Article[];
  onAdd?: (a: Omit<Article, 'id'>) => void;
  onUpdate?: (id: string, patch: Partial<Article>) => void;
  onDelete?: (id: string) => void;
}> = ({ articles = [], onAdd, onUpdate, onDelete }) => {
  const [editTarget, setEditTarget] = useState<Article | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editorTab, setEditorTab] = useState<'write' | 'preview'>('write');

  const blankArticle = (): Article => ({
    id: `art-${Date.now()}`,
    title: '',
    slug: '',
    excerpt: '',
    content: `## Ringkasan Eksekutif\n\nTulis pendahuluan atau latar belakang masalah di sini...\n\n### 1. Desain Arsitektur & Problem Solving\n\nJelaskan solusi arsitektur atau implementasi teknis:\n\n\`\`\`typescript\n// Contoh cuplikan kode implementasi\nexport function solveProblem() {\n  return 'High throughput & reliable';\n}\n\`\`\`\n\n### 2. Hasil & Pembelajaran\n\n- Poin hasil 1\n- Poin hasil 2\n`,
    coverImage: '/cert/cert2.png',
    category: 'System Architecture',
    tags: ['Architecture', 'Backend'],
    readTime: '5 min read',
    readCount: 1,
    published: true,
    featured: false,
    publishedAt: new Date().toISOString().split('T')[0],
    attachments: [],
  });

  const [draft, setDraft] = useState<Article>(blankArticle());
  const [newAttName, setNewAttName] = useState('');
  const [newAttUrl, setNewAttUrl] = useState('');
  const [newAttSize, setNewAttSize] = useState('1.5 MB');

  const openAdd = () => {
    setDraft(blankArticle());
    setEditorTab('write');
    setShowAdd(true);
  };

  const openEdit = (a: Article) => {
    setDraft({ ...a, attachments: a.attachments || [] });
    setEditorTab('write');
    setEditTarget(a);
  };

  const closeModal = () => {
    setShowAdd(false);
    setEditTarget(null);
  };

  const handleTitleChange = (val: string) => {
    const slug = val
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setDraft(d => ({
      ...d,
      title: val,
      slug: d.slug === '' || d.slug === d.title.toLowerCase().replace(/[\s_-]+/g, '-') ? slug : d.slug,
    }));
  };

  const handleContentChange = (content: string) => {
    const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
    const estMinutes = Math.max(1, Math.ceil(wordCount / 180));
    setDraft(d => ({
      ...d,
      content,
      readTime: `${estMinutes} min read`,
    }));
  };

  const addAttachment = () => {
    if (!newAttName.trim()) return;
    const newAtt: ArticleAttachment = {
      id: `att-${Date.now()}`,
      name: newAttName.trim(),
      url: newAttUrl.trim() || '#',
      size: newAttSize.trim() || '1.0 MB',
      type: 'pdf',
    };
    setDraft(d => ({ ...d, attachments: [...(d.attachments || []), newAtt] }));
    setNewAttName('');
    setNewAttUrl('');
  };

  const removeAttachment = (attId: string) => {
    setDraft(d => ({ ...d, attachments: (d.attachments || []).filter(a => a.id !== attId) }));
  };

  const handleSave = () => {
    if (!draft.title.trim()) return;
    if (editTarget) {
      if (onUpdate) onUpdate(editTarget.id, draft);
    } else {
      if (onAdd) onAdd(draft);
    }
    closeModal();
  };

  const inputClass = 'w-full bg-graphite-800/50 border border-graphite-600/30 rounded-sm px-3 py-2 font-mono text-xs text-cream-200 focus:outline-none focus:border-gold-500/50 transition-colors';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-xs text-graphite-400">
            {articles.length} article{articles.length === 1 ? '' : 's'} managed
          </p>
        </div>
        <GoldButton size="sm" icon={<Plus size={13} />} onClick={openAdd}>
          New Article
        </GoldButton>
      </div>

      {articles.length === 0 ? (
        <div className="glass-panel pixel-border rounded-sm p-8 text-center text-graphite-400 font-mono text-xs">
          Belum ada artikel. Klik "New Article" untuk menulis artikel pertama Anda.
        </div>
      ) : (
        <div className="space-y-2">
          {articles.map(art => (
            <div key={art.id} className="glass-panel pixel-border rounded-sm p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-10 h-10 rounded-sm bg-graphite-800/80 border border-gold-500/20 flex items-center justify-center shrink-0 overflow-hidden">
                  {art.coverImage ? (
                    <img src={art.coverImage} alt={art.title} className="w-full h-full object-cover" />
                  ) : (
                    <BookOpen size={16} className="text-gold-400" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-display text-sm font-semibold text-cream-100 truncate">{art.title}</p>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono tracking-wider ${art.published ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'}`}>
                      {art.published ? 'PUBLISHED' : 'DRAFT'}
                    </span>
                    {art.featured && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono tracking-wider bg-gold-500/15 text-gold-300 border border-gold-500/30">
                        FEATURED
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1 font-mono text-[10px] text-graphite-400 flex-wrap">
                    <span className="text-gold-400">{art.category}</span>
                    <span>•</span>
                    <span>{art.readTime}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-cyan-300">
                      <Eye size={10} /> {art.readCount || 0} reads
                    </span>
                    {art.attachments && art.attachments.length > 0 && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-gold-300/80">
                          <Paperclip size={10} /> {art.attachments.length} attachment{art.attachments.length > 1 ? 's' : ''}
                        </span>
                      </>
                    )}
                    <span>•</span>
                    <span>{art.publishedAt}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                <button
                  type="button"
                  onClick={() => onUpdate && onUpdate(art.id, { published: !art.published })}
                  title={art.published ? 'Unpublish to Draft' : 'Publish Article'}
                  className={`p-1.5 rounded-sm transition-colors text-xs font-mono flex items-center gap-1 border ${art.published ? 'border-graphite-600 text-graphite-300 hover:text-amber-400 hover:border-amber-500/40' : 'border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10'}`}
                >
                  {art.published ? <EyeOff size={13} /> : <Eye size={13} />}
                </button>
                <button
                  type="button"
                  onClick={() => openEdit(art)}
                  aria-label={`Edit ${art.title}`}
                  className="p-1.5 text-graphite-400 hover:text-gold-400 hover:bg-gold-500/10 rounded-sm transition-colors"
                >
                  <Pencil size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteId(art.id)}
                  aria-label={`Delete ${art.title}`}
                  className="p-1.5 text-graphite-400 hover:text-red-400 hover:bg-red-500/10 rounded-sm transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      <Modal isOpen={showAdd || !!editTarget} onClose={closeModal} title={editTarget ? 'Edit Article' : 'Compose New Article'}>
        <div className="space-y-3.5 max-h-[75vh] overflow-y-auto pr-1">
          <div>
            <label className="block font-mono text-[10px] text-graphite-400 tracking-widest mb-1">TITLE</label>
            <input
              type="text"
              placeholder="e.g. Arsitektur Multi-Agent System pada Production Backend"
              value={draft.title}
              onChange={e => handleTitleChange(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-mono text-[10px] text-graphite-400 tracking-widest mb-1">SLUG (URL KEY)</label>
              <input
                type="text"
                value={draft.slug}
                onChange={e => setDraft(d => ({ ...d, slug: e.target.value }))}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] text-graphite-400 tracking-widest mb-1">CATEGORY</label>
              <select
                value={draft.category}
                onChange={e => setDraft(d => ({ ...d, category: e.target.value }))}
                className={inputClass}
              >
                <option value="System Architecture">System Architecture</option>
                <option value="AI & Automation">AI & Automation</option>
                <option value="Mobile & Flutter">Mobile & Flutter</option>
                <option value="Web & Backend">Web & Backend</option>
                <option value="Engineering Culture">Engineering Culture</option>
                <option value="DevOps & Cloud">DevOps & Cloud</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-mono text-[10px] text-graphite-400 tracking-widest mb-1">EXCERPT / RINGKASAN</label>
            <textarea
              rows={2}
              placeholder="1-2 kalimat ringkasan tentang isi artikel untuk preview kartu..."
              value={draft.excerpt}
              onChange={e => setDraft(d => ({ ...d, excerpt: e.target.value }))}
              className={[inputClass, 'resize-none'].join(' ')}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block font-mono text-[10px] text-graphite-400 tracking-widest mb-1">COVER IMAGE URL / PATH</label>
              <input
                type="text"
                placeholder="/cert/cert2.png or https://..."
                value={draft.coverImage || ''}
                onChange={e => setDraft(d => ({ ...d, coverImage: e.target.value }))}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] text-graphite-400 tracking-widest mb-1">READ TIME</label>
              <input
                type="text"
                value={draft.readTime}
                onChange={e => setDraft(d => ({ ...d, readTime: e.target.value }))}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-mono text-[10px] text-graphite-400 tracking-widest mb-1">TAGS (comma-separated)</label>
              <input
                type="text"
                placeholder="AI Agents, Python, FastAPI"
                value={(draft.tags || []).join(', ')}
                onChange={e => setDraft(d => ({ ...d, tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] text-graphite-400 tracking-widest mb-1">INITIAL / TELEMETRY READS</label>
              <input
                type="number"
                value={draft.readCount || 0}
                onChange={e => setDraft(d => ({ ...d, readCount: Number(e.target.value) || 0 }))}
                className={inputClass}
              />
            </div>
          </div>

          {/* Attachments Section */}
          <div className="p-3 rounded-sm border border-graphite-700/50 bg-graphite-900/30 space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-mono text-[10px] text-gold-400 tracking-widest flex items-center gap-1.5">
                <Paperclip size={11} /> ATTACHED DOCUMENTS / PDF ({(draft.attachments || []).length})
              </label>
            </div>
            {(draft.attachments || []).map(att => (
              <div key={att.id} className="flex items-center justify-between bg-graphite-800/40 p-2 rounded text-xs font-mono text-cream-200">
                <span className="truncate">{att.name} ({att.size || 'PDF'})</span>
                <button
                  type="button"
                  onClick={() => removeAttachment(att.id)}
                  className="text-red-400 hover:text-red-300 ml-2"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
            <div className="flex gap-2 items-center pt-1">
              <input
                type="text"
                placeholder="Document Name (e.g. Blueprint.pdf)"
                value={newAttName}
                onChange={e => setNewAttName(e.target.value)}
                className={[inputClass, 'flex-1'].join(' ')}
              />
              <input
                type="text"
                placeholder="URL / File Link"
                value={newAttUrl}
                onChange={e => setNewAttUrl(e.target.value)}
                className={[inputClass, 'w-32'].join(' ')}
              />
              <input
                type="text"
                placeholder="Size (e.g. 2.4 MB)"
                value={newAttSize}
                onChange={e => setNewAttSize(e.target.value)}
                className={[inputClass, 'w-24'].join(' ')}
              />
              <GoldButton size="sm" type="button" onClick={addAttachment}>Add</GoldButton>
            </div>
          </div>

          {/* Markdown Content Editor & Live Preview */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between border-b border-graphite-700 pb-1.5">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setEditorTab('write')}
                  className={`px-2.5 py-1 rounded text-xs font-mono ${editorTab === 'write' ? 'bg-gold-500/20 text-gold-300 border border-gold-500/40' : 'text-graphite-400 hover:text-cream-200'}`}
                >
                  Write (Markdown)
                </button>
                <button
                  type="button"
                  onClick={() => setEditorTab('preview')}
                  className={`px-2.5 py-1 rounded text-xs font-mono ${editorTab === 'preview' ? 'bg-gold-500/20 text-gold-300 border border-gold-500/40' : 'text-graphite-400 hover:text-cream-200'}`}
                >
                  Live Preview
                </button>
              </div>
              <span className="font-mono text-[10px] text-graphite-500">Supports Headings, Code Blocks, Quotes</span>
            </div>

            {editorTab === 'write' ? (
              <textarea
                rows={10}
                value={draft.content}
                onChange={e => handleContentChange(e.target.value)}
                className={[inputClass, 'font-mono text-xs leading-relaxed resize-y'].join(' ')}
                placeholder="Tulis artikel dengan format Markdown..."
              />
            ) : (
              <div className="bg-[#0e1017] border border-graphite-700/50 rounded p-4 text-xs font-sans text-ink-200 leading-relaxed max-h-72 overflow-y-auto space-y-3">
                <p className="font-mono text-[10px] text-gold-400 mb-2 uppercase tracking-widest">// PREVIEW MODE</p>
                <div className="whitespace-pre-wrap">{draft.content}</div>
              </div>
            )}
          </div>

          {/* Switches */}
          <div className="flex items-center justify-between pt-2 border-t border-graphite-800">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 font-mono text-xs text-graphite-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={draft.published}
                  onChange={e => setDraft(d => ({ ...d, published: e.target.checked }))}
                  className="accent-gold-500"
                />
                Published to Website
              </label>
              <label className="flex items-center gap-2 font-mono text-xs text-graphite-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={draft.featured || false}
                  onChange={e => setDraft(d => ({ ...d, featured: e.target.checked }))}
                  className="accent-gold-500"
                />
                Featured
              </label>
            </div>
            <div className="flex gap-2">
              <GoldButton variant="outline" size="sm" onClick={closeModal}>Cancel</GoldButton>
              <GoldButton size="sm" icon={<Save size={12} />} onClick={handleSave}>
                {editTarget ? 'Update Article' : 'Publish Article'}
              </GoldButton>
            </div>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Article">
        <div className="space-y-4">
          <p className="text-graphite-200 text-sm">Hapus artikel ini secara permanen?</p>
          <div className="flex gap-3 justify-end">
            <GoldButton variant="outline" size="sm" onClick={() => setDeleteId(null)}>Cancel</GoldButton>
            <GoldButton
              size="sm"
              className="!bg-red-700 !border-red-600"
              onClick={() => {
                if (deleteId && onDelete) onDelete(deleteId);
                setDeleteId(null);
              }}
            >
              Delete Article
            </GoldButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// ─── Main Admin Dashboard ─────────────────────────────────────
const AdminDashboard: React.FC<AdminDashboardProps> = ({
  store, onLogout, onUpdateConfig,
  onAddProject, onUpdateProject, onDeleteProject,
  onAddMilestone, onUpdateMilestone, onDeleteMilestone,
  onAddSkill, onUpdateSkill, onDeleteSkill,
  onAddArticle, onUpdateArticle, onDeleteArticle, onReset,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <div className="fixed inset-0 z-[9980] bg-obsidian-950/95 backdrop-blur-md overflow-auto">
      <div className="min-h-full flex flex-col max-w-5xl mx-auto px-4 py-8">
        {/* Admin Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gold-700/20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-gold-900/30 border border-gold-700/30 flex items-center justify-center">
              <Shield size={16} className="text-gold-400" />
            </div>
            <div>
              <p className="font-display font-semibold text-cream-100 text-base">Admin Dashboard</p>
              <p className="font-mono text-[10px] text-graphite-400 tracking-widest">PORTFOLIO CONTROL PANEL</p>
            </div>
          </div>
          <div className="flex gap-2">
            <GoldButton
              variant="ghost"
              size="sm"
              icon={<RefreshCw size={13} />}
              onClick={() => setConfirmReset(true)}
              className="!text-red-400 hover:!bg-red-500/10"
            >
              Reset
            </GoldButton>
            <GoldButton variant="outline" size="sm" icon={<LogOut size={13} />} onClick={onLogout}>
              Logout
            </GoldButton>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav aria-label="Admin tabs" className="flex flex-wrap gap-1 mb-6">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              aria-current={activeTab === id ? 'page' : undefined}
              className={[
                'flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs rounded-sm border transition-all duration-200',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-400',
                activeTab === id
                  ? 'bg-gold-500/15 border-gold-500/40 text-gold-300'
                  : 'bg-transparent border-graphite-600/20 text-graphite-300 hover:border-graphite-500/40 hover:text-cream-200',
              ].join(' ')}
            >
              <Icon size={12} /> {label}
            </button>
          ))}
        </nav>

        {/* Tab Panels */}
        <div key={activeTab} className="flex-1">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { label: 'Projects', value: store.projects.length, color: 'text-gold-400' },
                { label: 'Live Projects', value: store.projects.filter(p => p.status === 'live').length, color: 'text-emerald-400' },
                { label: 'Articles', value: (store.articles || []).length, color: 'text-amber-400' },
                { label: 'Total Reads', value: (store.articles || []).reduce((acc, a) => acc + (a.readCount || 0), 0), color: 'text-cyan-400' },
                { label: 'Milestones', value: store.milestones.length, color: 'text-blue-300' },
                { label: 'Skills', value: store.skills.length, color: 'text-purple-300' },
              ].map(stat => (
                <div key={stat.label} className="glass-panel pixel-border rounded-sm p-4 text-center">
                  <p className={['font-mono text-2xl font-bold', stat.color].join(' ')}>{stat.value}</p>
                  <p className="font-mono text-[10px] text-graphite-400 mt-1 tracking-widest">{stat.label.toUpperCase()}</p>
                </div>
              ))}
              <div className="col-span-2 sm:col-span-3 lg:col-span-6 glass-panel pixel-border rounded-sm p-4">
                <p className="font-mono text-[10px] text-graphite-400 tracking-widest mb-2">SYSTEM STATUS</p>
                <div className="flex flex-wrap gap-4 text-xs font-mono">
                  <span className="text-graphite-300">Config updated: <span className="text-gold-400">{new Date(store.config.updatedAt).toLocaleDateString()}</span></span>
                  <span className="text-graphite-300">Available for work: <span className={store.config.availableForWork ? 'text-emerald-400' : 'text-red-400'}>{store.config.availableForWork ? 'YES' : 'NO'}</span></span>
                  <span className="text-graphite-300">Articles CMS: <span className="text-emerald-400">ACTIVE</span></span>
                  <span className="text-graphite-300">Storage: <span className="text-gold-400">localStorage + Sync</span></span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <ProjectsTab
              projects={store.projects}
              onAdd={onAddProject}
              onUpdate={onUpdateProject}
              onDelete={onDeleteProject}
            />
          )}

          {activeTab === 'articles' && (
            <ArticlesTab
              articles={store.articles || []}
              onAdd={onAddArticle}
              onUpdate={onUpdateArticle}
              onDelete={onDeleteArticle}
            />
          )}

          {activeTab === 'timeline' && (
            <TimelineTab
              milestones={store.milestones}
              onAdd={onAddMilestone}
              onUpdate={onUpdateMilestone}
              onDelete={onDeleteMilestone}
            />
          )}

          {activeTab === 'skills' && (
            <SkillsTab
              skills={store.skills}
              onAdd={onAddSkill}
              onUpdate={onUpdateSkill}
              onDelete={onDeleteSkill}
            />
          )}

          {activeTab === 'config' && (
            <ConfigTab config={store.config} onSave={onUpdateConfig} />
          )}
        </div>
      </div>

      {/* Reset confirm */}
      <Modal isOpen={confirmReset} onClose={() => setConfirmReset(false)} title="Reset All Data">
        <div className="space-y-4">
          <p className="text-graphite-200 text-sm">This will reset all projects, milestones, skills and config to defaults. This cannot be undone.</p>
          <div className="flex gap-3 justify-end">
            <GoldButton variant="outline" size="sm" onClick={() => setConfirmReset(false)}>Cancel</GoldButton>
            <GoldButton size="sm" className="!bg-red-700 !border-red-600" onClick={() => { onReset(); setConfirmReset(false); }}>
              Reset Everything
            </GoldButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
