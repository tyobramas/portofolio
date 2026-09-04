import { useState, useEffect, useCallback } from 'react';
import type { AdminStore, AdminSession, SystemConfig, Project, Milestone, Skill } from '../types';
import { defaultConfig, defaultProjects, defaultMilestones, defaultSkills, defaultCertificates } from '../data';

const STORE_KEY = 'portfolio_admin_store';
const SESSION_KEY = 'portfolio_admin_session';
const SESSION_TTL_MS = 4 * 60 * 60 * 1000; // 4 hours

function loadStore(): AdminStore {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AdminStore;

      // Force update config with fresh owner location, email, and empty social links
      const updatedConfig: SystemConfig = {
        ...parsed.config,
        ownerName: defaultConfig.ownerName,
        ownerTitle: defaultConfig.ownerTitle,
        ownerEmail: defaultConfig.ownerEmail,
        ownerGithub: '',
        ownerLinkedIn: '',
        ownerLocation: defaultConfig.ownerLocation,
        ownerBio: defaultConfig.ownerBio,
        heroTagline: defaultConfig.heroTagline,
        updatedAt: new Date().toISOString(),
      };

      // Force update milestones: Ensure Education (ms-004) and Locations are set to Universitas BSI (Bekasi 2010-2013)
      const updatedMilestones = parsed.milestones.map(m => {
        if (m.id === 'ms-004' || m.type === 'education' || m.organisation.includes('Brawijaya') || m.organisation.includes('BSI')) {
          return defaultMilestones.find(dm => dm.id === 'ms-004') || m;
        }
        return {
          ...m,
          location: m.location.replace(/Malang/g, 'Bekasi'),
        };
      });

      // Merge skills: Ensure defaultSkills and icons are present
      const existingIds = new Set(parsed.skills.map(s => s.id));
      const missingSkills = defaultSkills.filter(s => !existingIds.has(s.id));

      const updatedSkills = [
        ...parsed.skills.map(s => {
          const match = defaultSkills.find(ds => ds.id === s.id);
          return {
            ...s,
            icon: s.icon || match?.icon,
          };
        }),
        ...missingSkills,
      ];

      return {
        ...parsed,
        projects: defaultProjects,
        config: updatedConfig,
        milestones: updatedMilestones,
        skills: updatedSkills,
        certificates: parsed.certificates && parsed.certificates.length > 0 ? parsed.certificates : defaultCertificates,
      };
    }
  } catch {
    // ignore
  }
  return {
    projects: defaultProjects,
    milestones: defaultMilestones,
    skills: defaultSkills,
    certificates: defaultCertificates,
    config: defaultConfig,
  };
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
      config: defaultConfig,
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
