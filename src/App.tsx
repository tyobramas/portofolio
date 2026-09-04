import React, { useState, useEffect, lazy, Suspense } from 'react';
import TopBar from './components/TopBar';
import ProfileAside from './components/ProfileAside';
import AboutSection from './components/AboutSection';
import ExperienceList from './components/ExperienceList';
import ProjectsList from './components/ProjectsList';
import SkillsCompact from './components/SkillsCompact';
import CertificatesList from './components/CertificatesList';
import ContactSection from './components/ContactSection';
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
    <Modal isOpen={isOpen} onClose={handleClose} title="Autentikasi Administrator">
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="font-mono text-meta text-ink-600 leading-relaxed">
          Masukkan kata sandi kontrol panel untuk mengelola konten portofolio.
        </p>
        <div>
          <label
            htmlFor="admin-password"
            className="block font-mono text-[0.6875rem] uppercase tracking-widest text-ink-500 mb-1.5"
          >
            Kata Sandi
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
              'w-full rounded-[3px] border px-3.5 py-2.5 font-mono text-body text-ink-900 bg-canvas transition-colors',
              error
                ? 'border-red-500 focus:border-red-500'
                : 'border-rule focus:border-brass-500',
            ].join(' ')}
            placeholder="••••••••••"
            aria-describedby={error ? 'login-error' : undefined}
            aria-invalid={error}
          />
          {error && (
            <p id="login-error" role="alert" className="mt-1.5 font-mono text-meta text-red-600">
              Kata sandi tidak valid. Akses ditolak.
            </p>
          )}
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <GoldButton type="button" variant="outline" size="sm" onClick={handleClose}>
            Batal
          </GoldButton>
          <GoldButton type="submit" size="sm" loading={loading}>
            Masuk
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
    <div className="min-h-screen bg-canvas text-ink-700">
      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[9999] focus:px-3.5 focus:py-2 focus:bg-ink-900 focus:text-canvas focus:text-meta focus:rounded-[2px]"
      >
        Lewati ke konten utama
      </a>

      {isScraperRoute ? (
        <Suspense
          fallback={
            <div className="flex h-screen items-center justify-center font-mono text-meta text-ink-500">
              Memuat alat...
            </div>
          }
        >
          <LinkedInScraperDashboard onBackToPortfolio={() => navigateTo('/')} />
        </Suspense>
      ) : (
        <>
          {/* TopBar 56px, hairline bawah, tanpa blur */}
          <TopBar
            onAdminClick={handleAdminTrigger}
            onOpenScraper={() => navigateTo('/tools/linkedin')}
          />

          {/* Kerangka dua kolom sticky */}
          <div className="shell mx-auto max-w-shell px-6 grid lg:grid-cols-[318px_1fr] gap-x-14 gap-y-10 pt-8 pb-16">
            <ProfileAside config={store.config} />

            <main id="main-content" tabIndex={-1} className="min-w-0">
              <AboutSection config={store.config} />
              <ExperienceList milestones={store.milestones} />
              <ProjectsList projects={store.projects} />
              <SkillsCompact skills={store.skills} />
              <CertificatesList items={store.certificates} />
              <ContactSection config={store.config} />

              {/* Minimal print-safe footer */}
              <footer className="mt-12 border-t border-rule pt-6 text-meta text-ink-500 flex flex-wrap items-center justify-between gap-4">
                <p>
                  &copy; {new Date().getFullYear()} {store.config.ownerName}. Seluruh hak cipta dilindungi.
                </p>
                <p className="font-mono text-[0.75rem] text-ink-400">
                  Fraunces · Inter · IBM Plex Mono
                </p>
              </footer>
            </main>
          </div>
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
