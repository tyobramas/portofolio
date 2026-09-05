import { useState, useEffect, useCallback } from 'react';
import type { AdminStore, AdminSession, SystemConfig, Project, Milestone, Skill } from '../types';
import { defaultConfig, defaultProjects, defaultMilestones, defaultSkills, defaultCertificates } from '../data';

const STORE_KEY = 'portfolio_admin_store';
const SESSION_KEY = 'portfolio_admin_session';
const SESSION_TTL_MS = 4 * 60 * 60 * 1000; // 4 hours
const STORE_VERSION = 4;

function loadStore(): AdminStore {
  const fresh: AdminStore = {
    projects: defaultProjects,
    milestones: defaultMilestones,
    skills: defaultSkills,
    certificates: defaultCertificates,
    config: defaultConfig,
    version: STORE_VERSION,
  };
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return fresh;
    const parsed = JSON.parse(raw) as AdminStore;

    const projectMap = new Map(defaultProjects.map((p) => [p.id, p]));
    const updatedProjects = (parsed.projects || []).map((p) => {
      const def = projectMap.get(p.id);
      if (def) {
        return {
          ...def,
          ...p,
          image: p.image || def.image,
          metrics: p.metrics && p.metrics.length > 0 ? p.metrics : def.metrics,
          impact: p.impact || def.impact,
          longDescription: p.longDescription || def.longDescription,
        };
      }
      return p;
    });

    const migrated: AdminStore = {
      ...fresh,
      ...parsed,
      projects: updatedProjects.length ? updatedProjects : defaultProjects,
      certificates: parsed.certificates?.length ? parsed.certificates : defaultCertificates,
      version: STORE_VERSION,
    };
    saveStore(migrated);
    return migrated;
  } catch {
    return fresh;
  }
}

function saveStore(store: AdminStore): void {
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
}

function loadSession(): AdminSession {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) {
      const s = JSON.parse(raw) as AdminSession;
      if (s.authenticated && s.expiresAt > Date.now()) return s;
    }
  } catch {
    // ignore
  }
  return { authenticated: false, expiresAt: 0, token: '' };
}

export function useAdminStore() {
  const [store, setStore] = useState<AdminStore>(loadStore);
  const [session, setSession] = useState<AdminSession>(loadSession);

  useEffect(() => {
    saveStore(store);
  }, [store]);

  const login = useCallback((password: string): boolean => {
    const input = (password || '').trim().toLowerCase();
    const allowed = ['exec2024!', 'exec2024', 'admin', 'admin123'];
    if (!allowed.includes(input)) return false;

    const s: AdminSession = {
      authenticated: true,
      expiresAt: Date.now() + SESSION_TTL_MS,
      token: btoa(`admin:${Date.now()}`),
    };
    setSession(s);
    localStorage.setItem(SESSION_KEY, JSON.stringify(s));
    return true;
  }, []);

  const logout = useCallback(() => {
    setSession({ authenticated: false, expiresAt: 0, token: '' });
    localStorage.removeItem(SESSION_KEY);
  }, []);

  const updateConfig = useCallback((cfg: Partial<SystemConfig>) => {
    setStore(prev => ({
      ...prev,
      config: { ...prev.config, ...cfg, updatedAt: new Date().toISOString() },
    }));
  }, []);

  // ── Project CRUD ──────────────────────────────────────────
  const addProject = useCallback((project: Omit<Project, 'id'>) => {
    const newId = `proj-${String(Date.now()).slice(-4)}`;
    setStore(prev => ({
      ...prev,
      projects: [{ ...project, id: newId }, ...prev.projects],
    }));
  }, []);

  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    setStore(prev => ({
      ...prev,
      projects: prev.projects.map(p => (p.id === id ? { ...p, ...updates } : p)),
    }));
  }, []);

  const deleteProject = useCallback((id: string) => {
    setStore(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id),
    }));
  }, []);

  // ── Milestone CRUD ────────────────────────────────────────
  const addMilestone = useCallback((milestone: Omit<Milestone, 'id'>) => {
    const newId = `ms-${String(Date.now()).slice(-4)}`;
    setStore(prev => ({
      ...prev,
      milestones: [{ ...milestone, id: newId }, ...prev.milestones],
    }));
  }, []);

  const updateMilestone = useCallback((id: string, updates: Partial<Milestone>) => {
    setStore(prev => ({
      ...prev,
      milestones: prev.milestones.map(m => (m.id === id ? { ...m, ...updates } : m)),
    }));
  }, []);

  const deleteMilestone = useCallback((id: string) => {
    setStore(prev => ({
      ...prev,
      milestones: prev.milestones.filter(m => m.id !== id),
    }));
  }, []);

  // ── Skill CRUD ────────────────────────────────────────────
  const addSkill = useCallback((skill: Omit<Skill, 'id'>) => {
    const newId = `sk-${String(Date.now()).slice(-4)}`;
    setStore(prev => ({
      ...prev,
      skills: [...prev.skills, { ...skill, id: newId }],
    }));
  }, []);

  const updateSkill = useCallback((id: string, updates: Partial<Skill>) => {
    setStore(prev => ({
      ...prev,
      skills: prev.skills.map(s => (s.id === id ? { ...s, ...updates } : s)),
    }));
  }, []);

  const deleteSkill = useCallback((id: string) => {
    setStore(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id),
    }));
  }, []);

  const resetStore = useCallback(() => {
    const fresh: AdminStore = {
      projects: defaultProjects,
      milestones: defaultMilestones,
      skills: defaultSkills,
      certificates: defaultCertificates,
      config: defaultConfig,
      version: STORE_VERSION,
    };
    setStore(fresh);
    saveStore(fresh);
  }, []);

  return {
    store,
    session,
    login,
    logout,
    updateConfig,
    addProject,
    updateProject,
    deleteProject,
    addMilestone,
    updateMilestone,
    deleteMilestone,
    addSkill,
    updateSkill,
    deleteSkill,
    resetStore,
  };
}
