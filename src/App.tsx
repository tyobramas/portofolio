import React, { useState, useEffect, lazy, Suspense } from 'react';
import TopBar from './components/TopBar';
import HeroSection from './components/HeroSection';
import StatsBar from './components/StatsBar';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsList from './components/ProjectsList';
import SkillsCompact from './components/SkillsCompact';
import ExperienceList from './components/ExperienceList';
import WorkTogetherBanner from './components/WorkTogetherBanner';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import Modal from './components/Modal';
import GoldButton from './components/GoldButton';
import { useAdminStore } from './hooks/useAdminStore';

const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const LinkedInScraperDashboard = lazy(() => import('./components/LinkedInScraperDashboard'));

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
    await new Promise((r) => setTimeout(r, 400));
    const ok = onLogin(password);
    setLoading(false);
    if (!ok) {
      setError(true);
      setPassword('');
    }
  };

  const handleClose = () => {
    setPassword('');
    setError(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Administrator Authentication">
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-xs text-ink-300 leading-relaxed">
          Enter admin credentials to manage portfolio content, project case studies, and configuration.
        </p>
        <div>
          <label
            htmlFor="admin-password"
            className="block text-[0.6875rem] uppercase tracking-widest font-bold text-ink-400 mb-1.5"
          >
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            autoComplete="current-password"
            className={[
              'w-full rounded-lg border px-4 py-2.5 text-sm text-white bg-[#0E1017] transition-colors',
              error
                ? 'border-red-500 focus:border-red-500'
                : 'border-[#262A38] focus:border-gold-500 focus:outline-none',
            ].join(' ')}
            placeholder="••••••••••"
            aria-describedby={error ? 'login-error' : undefined}
            aria-invalid={error}
          />
          {error && (
            <p id="login-error" role="alert" className="mt-1.5 text-xs text-red-400">
              Invalid credentials. Access denied.
            </p>
          )}
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <GoldButton type="button" variant="outline" size="sm" onClick={handleClose}>
            Cancel
          </GoldButton>
          <GoldButton type="submit" size="sm" loading={loading}>
            Sign In
          </GoldButton>
        </div>
      </form>
    </Modal>
  );
};

// ─── Main Application ──────────────────────────────────────────
export default function App() {
  const {
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
  } = useAdminStore();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  // Exact route checks
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname.replace(/\/+$/, '') || '/';
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname.replace(/\/+$/, '') || '/';
      setCurrentPath(p);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const isAdminRoute = currentPath === '/admin';
  const isScraperRoute =
    currentPath === '/tools/linkedin' ||
    currentPath === '/dashboard' ||
    currentPath === '/scraper';

  useEffect(() => {
    if (isAdminRoute) {
      if (session.authenticated) {
        setShowAdmin(true);
      } else {
        setShowLoginModal(true);
      }
    }
  }, [isAdminRoute, session.authenticated]);

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
    if (isAdminRoute && typeof window !== 'undefined') {
      window.history.pushState({}, '', '/');
      setCurrentPath('/');
    }
  };

  const navigateTo = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] text-[#E1E4EA] selection:bg-gold-500/30 selection:text-gold-200">
      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-gold-500 focus:text-canvas focus:text-xs focus:font-bold focus:rounded-md"
      >
        Skip to main content
      </a>

      {isScraperRoute ? (
        <Suspense
          fallback={
            <div className="flex h-screen items-center justify-center font-sans text-sm text-gold-400">
              Loading tools...
            </div>
          }
        >
          <LinkedInScraperDashboard onBackToPortfolio={() => navigateTo('/')} />
        </Suspense>
      ) : (
        <>
          {/* Header TopBar */}
          <TopBar
            onAdminClick={handleAdminTrigger}
            onOpenScraper={() => navigateTo('/tools/linkedin')}
          />

          {/* Unified Single-Page Flow Matching Reference Template */}
          <main id="main-content" tabIndex={-1} className="min-w-0">
            {/* 1. Hero Section with Glowing Golden Halo Portrait */}
            <HeroSection config={store.config} />

            {/* 2. Stats / KPI Counter Bar (4 Cards) */}
            <StatsBar />

            {/* 3. About Me Section with Impact Heading, Checkmarks, Cursive Signature & Workstation */}
            <AboutSection config={store.config} />

            {/* 4. My Services ("What I Do") Grid */}
            <ServicesSection />

            {/* 5. Featured Projects ("My Recent Work") */}
            <ProjectsList projects={store.projects} />

            {/* 6. Core Competencies & Technologies */}
            <SkillsCompact skills={store.skills} />

            {/* 7. Career Timeline & Experience */}
            <ExperienceList milestones={store.milestones} />

            {/* 8. Let's Work Together! Banner */}
            <WorkTogetherBanner onContactClick={() => {
              const el = document.querySelector('#contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }} />

            {/* 9. Contact / Get In Touch Form */}
            <ContactSection config={store.config} />
          </main>

          {/* 10. Footer with Engineering Standard Badges */}
          <Footer ownerName={store.config.ownerName} />
        </>
      )}

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
          if (isAdminRoute) navigateTo('/');
        }}
        onLogin={handleLogin}
      />

      {/* Admin Dashboard */}
      <Suspense fallback={null}>
        {showAdmin && session.authenticated && (
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
        )}
      </Suspense>
    </div>
  );
}
