// ─── Core Domain Types ──────────────────────────────────────────────────────

export type ProjectStatus = 'live' | 'archived' | 'wip' | 'private';
export type ProjectCategory = 'web' | 'mobile' | 'api' | 'saas' | 'oss';
export type SkillLevel = 'expert' | 'proficient' | 'familiar';
export type SkillCategory = 'frontend' | 'backend' | 'devops' | 'database' | 'tools' | 'mobile' | 'ai';
export type MilestoneType = 'role' | 'education' | 'achievement' | 'project';

// ─── Project ────────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  status: ProjectStatus;
  techStack: string[];
  tech?: string[];
  year: number;
  metrics: ProjectMetric[];
  links: ProjectLinks;
  link?: string;
  image?: string;
  impact?: string;
  featured: boolean;
  color: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectLinks {
  live?: string;
  github?: string;
  caseStudy?: string;
}

// ─── Milestone / Career Timeline ────────────────────────────────────────────

export interface Milestone {
  id: string;
  type: MilestoneType;
  title: string;
  organisation: string;
  period: string;
  description: string;
  highlights: string[];
  location: string;
  current: boolean;
}

// ─── Skill ──────────────────────────────────────────────────────────────────

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  proficiency: number; // 0-100
  years: number;
  icon?: string;
}

export interface SkillGroup {
  category: SkillCategory;
  label: string;
  skills: Skill[];
}

// ─── Admin / System Config ───────────────────────────────────────────────────

export interface SystemConfig {
  ownerName: string;
  ownerTitle: string;
  ownerEmail: string;
  ownerGithub: string;
  ownerLinkedIn: string;
  ownerLocation: string;
  ownerBio: string;
  heroTagline: string;
  ownerAvatar?: string;
  availableForWork: boolean;
  updatedAt: string;
}

export interface AdminSession {
  authenticated: boolean;
  expiresAt: number; // unix ms
  token: string;
}

// ─── Certificate & Credentials ──────────────────────────────────────────────

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
  category: 'ai' | 'cloud' | 'mobile' | 'backend' | 'academic';
  featured?: boolean;
}

export interface AdminStore {
  projects: Project[];
  milestones: Milestone[];
  skills: Skill[];
  certificates?: Certificate[];
  config: SystemConfig;
  version?: number;
}

// ─── UI State ────────────────────────────────────────────────────────────────

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export interface FilterOption {
  value: string;
  label: string;
}

export type ProjectFilter = ProjectCategory | 'all';
