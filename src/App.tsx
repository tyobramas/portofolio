import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Terminal, Heart, Cpu } from 'lucide-react';

import ParallaxBackground from './components/ParallaxBackground';
import CRTOverlay from './components/CRTOverlay';
import CodeBackground from './components/CodeBackground';
import Navbar from './components/Navbar';
import TerminalCard from './components/TerminalCard';
import AboutSection from './components/AboutSection';
import ExpertiseCards from './components/ExpertiseCards';
import InteractiveTimeline from './components/InteractiveTimeline';
import ProjectsSection from './components/ProjectsSection';
import SkillsMatrix from './components/SkillsMatrix';
import CertificatesSection from './components/CertificatesSection';
import ContactSection from './components/ContactSection';
import AdminDashboard from './components/AdminDashboard';
import LinkedInScraperDashboard from './components/LinkedInScraperDashboard';
import Modal from './components/Modal';
import GoldButton from './components/GoldButton';

import { useAdminStore } from './hooks/useAdminStore';

// ─── Admin Login Modal ────────────────────────────────────────
interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (password: string) => boolean;
}

const AdminLoginModal: React.FC<AdminLoginProps> = ({ isOpen, onClose, onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const ok = onLogin(password);
    setLoading(false);
    if (!ok) { setError(true); setPassword(''); }
  };

  const handleClose = () => { setPassword(''); setError(false); onClose(); };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Admin Access">
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="font-mono text-xs text-graphite-300 leading-relaxed">
          Enter the admin passphrase to access the control panel. <span className="text-cyan-400 font-semibold">(Default: admin atau exec2024!)</span>
        </p>
        <div>
          <label htmlFor="admin-password" className="block font-mono text-[10px] text-graphite-400 tracking-widest mb-1.5">
            PASSPHRASE
          </label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(false); }}
            autoComplete="current-password"
            className={[
              'w-full bg-graphite-800/50 border rounded-sm px-4 py-3 font-mono text-sm text-cream-200',
              'focus:outline-none transition-colors',
              error
                ? 'border-red-500/60 focus:border-red-400'
                : 'border-graphite-600/30 focus:border-gold-500/60',
            ].join(' ')}
            placeholder="••••••••••"
            aria-describedby={error ? 'login-error' : undefined}
            aria-invalid={error}
          />
          {error && (
            <p id="login-error" role="alert" className="mt-1.5 font-mono text-xs text-red-400">
              Incorrect passphrase. Access denied.
            </p>
          )}
        </div>
        <div className="flex justify-end gap-2 pt-1">
          <GoldButton type="button" variant="outline" size="sm" onClick={handleClose}>Cancel</GoldButton>
          <GoldButton type="submit" size="sm" loading={loading}>Authenticate</GoldButton>
        </div>
      </form>
    </Modal>
  );
};

// ─── Section Divider ──────────────────────────────────────────
const SectionDivider: React.FC = () => (
  <div className="section-divider mx-4 sm:mx-8 max-w-5xl lg:mx-auto" role="separator" aria-hidden="true" />
);

// ─── App ──────────────────────────────────────────────────────
const App: React.FC = () => {
  const {
    store, session, login, logout,
    updateConfig,
    addProject, updateProject, deleteProject,
    addMilestone, updateMilestone, deleteMilestone,
    addSkill, updateSkill, deleteSkill,
    resetStore,
  } = useAdminStore();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  // Check URL pathname for /dashboard or /scraper
  const [viewMode, setViewMode] = useState<'portfolio' | 'dashboard'>(() => {
    if (typeof window !== 'undefined' && (window.location.pathname.includes('/dashboard') || window.location.pathname.includes('/scraper'))) {
      return 'dashboard';
    }
    return 'portfolio';
  });

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname.includes('/dashboard') || window.location.pathname.includes('/scraper')) {
        setViewMode('dashboard');
      } else {
        setViewMode('portfolio');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const toggleViewMode = () => {
    const next = viewMode === 'portfolio' ? 'dashboard' : 'portfolio';
    setViewMode(next);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', next === 'dashboard' ? '/dashboard' : '/');
    }
  };

  const handleAdminTrigger = () => {
    if (session.authenticated) {
      setShowAdmin(true);
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLogin = (password: string): boolean => {
    const ok = login(password);
    if (ok) {
      setShowLoginModal(false);
      setShowAdmin(true);
    }
    return ok;
  };

  const handleLogout = () => {
    logout();
    setShowAdmin(false);
  };

  return (
    <>
      {/* Global ambient layers */}
      <ParallaxBackground />
      <CodeBackground />
      <CRTOverlay />

      {/* Skip to content — keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-gold-500 focus:text-obsidian-950 focus:font-mono focus:text-sm focus:rounded-sm focus:shadow-gold-md"
      >
        Skip to main content
      </a>

      {/* If Scraper Dashboard is active */}
      {viewMode === 'dashboard' ? (
        <LinkedInScraperDashboard onBackToPortfolio={() => setViewMode('portfolio')} />
      ) : (
        <>
          {/* Navigation */}
          <Navbar
            onAdminClick={handleAdminTrigger}
            onOpenDashboard={toggleViewMode}
            isDashboardActive={false}
          />

          {/* Main content */}
          <main id="main-content" tabIndex={-1}>
            {/* ① Hero */}
            <TerminalCard config={store.config} />

            <SectionDivider />

            {/* ② About */}
            <AboutSection config={store.config} />

            <SectionDivider />

            {/* ③ Expertise */}
            <ExpertiseCards />

            <SectionDivider />

            {/* ④ Timeline */}
            <InteractiveTimeline milestones={store.milestones} />

            <SectionDivider />

            {/* ⑤ Projects */}
            <ProjectsSection projects={store.projects} />

            <SectionDivider />

            {/* ⑥ Skills */}
            <SkillsMatrix skills={store.skills} />

            <SectionDivider />

            {/* ⑦ Certificates */}
            <CertificatesSection certificates={store.certificates} />

            <SectionDivider />

            {/* ⑧ Contact */}
            <ContactSection config={store.config} />
          </main>

          {/* Footer */}
          <footer role="contentinfo" className="py-8 px-4 text-center border-t border-gold-700/10">
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={toggleViewMode}
                  className="inline-flex items-center gap-2 px-3 py-1.5 font-mono text-xs text-cyan-300 bg-slate-900/90 border border-slate-700 rounded-xl hover:border-cyan-400 hover:text-cyan-200 transition-all"
                >
                  <Cpu size={14} className="text-cyan-400 animate-pulse" />
                  <span>Launch Scraper Dashboard</span>
                </button>

                <button
                  onClick={handleAdminTrigger}
                  aria-label="Admin panel"
                  className="p-2 text-graphite-600 hover:text-graphite-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-400 rounded-sm"
                  title="Admin"
                >
                  <Terminal size={18} />
                </button>
              </div>
              <p className="font-mono text-xs text-graphite-500">
                &copy; {new Date().getFullYear()} {store.config.ownerName} — Built with{' '}
                <Heart size={10} className="inline text-gold-600 mx-0.5" aria-hidden="true" />
                React, Vite & Tailwind CSS
              </p>
              <p className="font-mono text-[10px] text-graphite-700 tracking-widest">
                EXECUTIVE RETRO-TECH — lnkin.bramkoes.my.id
              </p>
            </div>
          </footer>
        </>
      )}

      {/* Admin Login */}
      <AdminLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />

      {/* Admin Dashboard */}
      <AnimatePresence>
        {showAdmin && session.authenticated && (
          <motion.div
            key="admin"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <AdminDashboard
              store={store}
              onLogout={handleLogout}
              onUpdateConfig={updateConfig}
              onAddProject={addProject}
              onUpdateProject={updateProject}
              onDeleteProject={deleteProject}
              onAddMilestone={addMilestone}
              onUpdateMilestone={updateMilestone}
              onDeleteMilestone={deleteMilestone}
              onAddSkill={addSkill}
              onUpdateSkill={updateSkill}
              onDeleteSkill={deleteSkill}
              onReset={resetStore}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default App;
