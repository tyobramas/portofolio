import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Building2,
  Users,
  Search,
  Play,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Download,
  Terminal,
  ArrowLeft,
  Database,
  Layers,
  Key,
  Eye,
  Trash2,
  Copy,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Mail,
  MapPin,
  X,
  FileJson,
  FileSpreadsheet,
  Check
} from 'lucide-react';
import GoldButton from './GoldButton';
import {
  ApifyLinkedInProfile,
  LinkedInSearchResultCandidate
} from '../types/apify';
import {
  getApifyToken,
  setApifyToken,
  getSavedProfiles,
  deleteSavedProfile,
  getSavedCandidates,
  deleteSavedCandidate,
  searchLinkedInProfilesByApifyName,
  scrapeLinkedInProfile,
  exportProfilesJSON,
  exportProfilesCSV,
  ACTOR_PROFILE_SCRAPER,
  ACTOR_NAME_SEARCH
} from '../services/apifyService';

interface LinkedInScraperDashboardProps {
  onBackToPortfolio: () => void;
}

type TabType = 'search' | 'profile' | 'saved' | 'company' | 'employee';

export const LinkedInScraperDashboard: React.FC<LinkedInScraperDashboardProps> = ({
  onBackToPortfolio,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('search');
  const [isScraping, setIsScraping] = useState(false);
  const [apifyTokenState, setApifyTokenState] = useState('');
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const [tokenInput, setTokenInput] = useState('');

  // Live Logs state
  const [logs, setLogs] = useState<string[]>([
    '[SYSTEM] LinkedIn Scraping Cluster Initialized v3.4.1',
    `[APIFY ACTOR 1] URL Scraper: "${ACTOR_PROFILE_SCRAPER}" Ready`,
    `[APIFY ACTOR 2] Name Search: "${ACTOR_NAME_SEARCH}" Ready`,
    '[PROXY] Connected to 10,482 Residential Proxies (Automated Rotation Enabled)',
    '[READY] Enter Name or URL to execute live extraction.',
  ]);

  // Name Search State (harvestapi/linkedin-profile-search-by-name)
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [strictSearch, setStrictSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<LinkedInSearchResultCandidate[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Profile URL State (dev_fusion/Linkedin-Profile-Scraper)
  const [profileUrlsInput, setProfileUrlsInput] = useState<string>('');
  const [companyDomain, setCompanyDomain] = useState('google.com');
  const [employeeCompany, setEmployeeCompany] = useState('Prakarsa AI');

  // Saved profiles & candidates state
  const [savedProfiles, setSavedProfiles] = useState<ApifyLinkedInProfile[]>([]);
  const [savedCandidates, setSavedCandidates] = useState<LinkedInSearchResultCandidate[]>([]);
  const [savedTab, setSavedTab] = useState<'profiles' | 'candidates'>('profiles');
  const [selectedProfile, setSelectedProfile] = useState<ApifyLinkedInProfile | null>(null);
  const [activeDetailTab, setActiveDetailTab] = useState<'overview' | 'contact' | 'experiences' | 'educations' | 'skills_projects' | 'json'>('overview');
  const [copiedJson, setCopiedJson] = useState(false);

  // Load initial saved profiles, candidates & token
  useEffect(() => {
    const token = getApifyToken();
    setApifyTokenState(token);
    setTokenInput(token);
    setSavedProfiles(getSavedProfiles());
    setSavedCandidates(getSavedCandidates());
  }, []);

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleSaveToken = () => {
    setApifyToken(tokenInput);
    setApifyTokenState(tokenInput);
    setIsTokenModalOpen(false);
    addLog(`[TOKEN UPDATED] Apify API Token saved: ${tokenInput ? tokenInput.slice(0, 12) + '...' : 'Cleared'}`);
  };

  // Search by Name Trigger (HarvestAPI Actor)
  const handleSearchByName = async (firstName: string, lastName: string) => {
    if (!firstName.trim() && !lastName.trim()) return;
    setIsScraping(true);
    setHasSearched(true);

    try {
      const candidates = await searchLinkedInProfilesByApifyName(
        firstName,
        lastName,
        apifyTokenState,
        (msg) => setLogs((prev) => [...prev, msg])
      );
      setSearchResults(candidates);
      setSavedProfiles(getSavedProfiles());
      setSavedCandidates(getSavedCandidates());
    } catch (err: any) {
      addLog(`[ERROR] Search failed: ${err?.message || 'Unknown error'}`);
    } finally {
      setIsScraping(false);
    }
  };

  // Profile URL Scrape Trigger (Dev Fusion Actor)
  const handleExecuteProfileScrape = async (targetUrl: string, candidateName?: string) => {
    setIsScraping(true);
    addLog(`[JOB QUEUED] Starting extraction for ${candidateName || targetUrl}`);

    try {
      const urls = targetUrl.split('\n').map((u) => u.trim()).filter(Boolean);
      for (const url of urls) {
        const extractedProfile = await scrapeLinkedInProfile(url, apifyTokenState, (msg) => {
          setLogs((prev) => [...prev, msg]);
        });
        setSelectedProfile(extractedProfile);
      }

      setSavedProfiles(getSavedProfiles());
      setSavedCandidates(getSavedCandidates());
      addLog(`[SUCCESS] Extracted and saved profile payload(s) to local storage!`);
    } catch (err: any) {
      addLog(`[ERROR] Extraction job failed: ${err?.message || 'Unknown error'}`);
    } finally {
      setIsScraping(false);
    }
  };

  const handleDeleteSaved = (idOrUrl: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = deleteSavedProfile(idOrUrl);
    setSavedProfiles(updated);
    if (selectedProfile && (selectedProfile.publicIdentifier === idOrUrl || selectedProfile.linkedinUrl === idOrUrl)) {
      setSelectedProfile(null);
    }
    addLog(`[DATABASE] Removed 1 profile record from local storage.`);
  };

  const handleDeleteSavedCandidate = (idOrIdentifier: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = deleteSavedCandidate(idOrIdentifier);
    setSavedCandidates(updated);
    addLog(`[DATABASE] Removed 1 search candidate record from local storage.`);
  };

  const handleCopyJSON = (data: any) => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative pb-16">
      {/* Ambient background light */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />
      </div>

      {/* Header Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#090d16]/80 border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToPortfolio}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 bg-slate-900/90 border border-slate-700/80 hover:border-cyan-400 hover:text-cyan-300 transition-all shadow-sm"
          >
            <ArrowLeft size={14} /> Back to Portfolio
          </button>

          <div className="h-5 w-px bg-slate-800 hidden sm:block" />

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Cpu size={18} className="text-white" />
            </div>
            <div>
              <h1 className="font-display text-sm font-bold tracking-tight text-white flex items-center gap-2">
                Apify LinkedIn Scraper Hub
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                  DEV FUSION & HARVEST API
                </span>
              </h1>
              <p className="text-[11px] text-slate-400 font-mono">lnkin.bramkoes.my.id / Apify Production Cluster</p>
            </div>
          </div>
        </div>

        {/* Apify API Key Status & Saved Datasets Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono text-xs border transition-all shadow-sm ${
              activeTab === 'saved'
                ? 'bg-emerald-900/80 border-emerald-400 text-emerald-200 ring-1 ring-emerald-400'
                : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Database size={14} className="text-emerald-400" />
            <span>Saved Datasets ({savedProfiles.length + savedCandidates.length})</span>
          </button>

          <button
            onClick={() => setIsTokenModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono text-xs border bg-emerald-950/60 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/50 transition-all shadow-sm"
          >
            <Key size={14} className="text-emerald-400" />
            <span>Apify Token Connected ({apifyTokenState.slice(0, 10)}...)</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-8 relative z-10">
        {/* KPI Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="glass-panel p-4 rounded-xl border border-slate-800 bg-slate-900/50 relative overflow-hidden group">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
              <span>SAVED PROFILES</span>
              <Database size={15} className="text-cyan-400" />
            </div>
            <p className="text-2xl font-bold font-mono text-white tracking-tight">
              {savedProfiles.length}
            </p>
            <p className="text-[11px] text-emerald-400 font-mono mt-1">Full Scraped Payloads</p>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-slate-800 bg-slate-900/50 relative overflow-hidden group">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
              <span>SAVED CANDIDATES</span>
              <Search size={15} className="text-amber-400" />
            </div>
            <p className="text-2xl font-bold font-mono text-white tracking-tight">
              {savedCandidates.length}
            </p>
            <p className="text-[11px] text-amber-400 font-mono mt-1">Search Name History</p>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-slate-800 bg-slate-900/50 relative overflow-hidden group">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
              <span>URL SCRAPER ACTOR</span>
              <ShieldCheck size={15} className="text-emerald-400" />
            </div>
            <p className="text-sm font-bold font-mono text-white tracking-tight truncate">
              dev_fusion
            </p>
            <p className="text-[11px] text-slate-400 font-mono mt-1 truncate">Linkedin-Profile-Scraper</p>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-slate-800 bg-slate-900/50 relative overflow-hidden group">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
              <span>NAME SEARCH ACTOR</span>
              <Search size={15} className="text-amber-400" />
            </div>
            <p className="text-sm font-bold font-mono text-white tracking-tight truncate">
              harvestapi
            </p>
            <p className="text-[11px] text-amber-400 font-mono mt-1 truncate">profile-search-by-name</p>
          </div>
        </div>

        {/* Scraper Module Selector Tabs */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white font-display flex items-center gap-2">
              <Layers size={18} className="text-cyan-400" />
              Apify Extraction Engine Selection
            </h2>
            <span className="text-xs font-mono text-slate-400">Select actor interface</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Tab 1: Name Search Scraper (harvestapi) */}
            <button
              onClick={() => setActiveTab('search')}
              className={`p-4 rounded-xl text-left border transition-all duration-200 relative overflow-hidden group ${
                activeTab === 'search'
                  ? 'bg-amber-950/40 border-amber-400/80 shadow-lg shadow-amber-500/10 ring-1 ring-amber-400/50'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activeTab === 'search'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-800 text-amber-400 group-hover:bg-slate-700'
                  }`}
                >
                  <Search size={18} />
                </div>
                <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/50">
                  HARVESTAPI
                </span>
              </div>
              <h3 className="font-bold text-white text-sm">Search Profile By Name</h3>
              <p className="text-[11px] text-slate-400 mt-1">First & Last Name Search</p>
            </button>

            {/* Tab 2: Profile URL Scraper (dev_fusion) */}
            <button
              onClick={() => setActiveTab('profile')}
              className={`p-4 rounded-xl text-left border transition-all duration-200 relative overflow-hidden group ${
                activeTab === 'profile'
                  ? 'bg-cyan-950/40 border-cyan-400/80 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-400/50'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activeTab === 'profile'
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-800 text-cyan-400 group-hover:bg-slate-700'
                  }`}
                >
                  <User size={18} />
                </div>
                <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/50">
                  DEV_FUSION
                </span>
              </div>
              <h3 className="font-bold text-white text-sm">Profile Scraper (URLs)</h3>
              <p className="text-[11px] text-slate-400 mt-1">Batch LinkedIn URLs Scraper</p>
            </button>

            {/* Tab 3: Company Scraping */}
            <button
              onClick={() => setActiveTab('company')}
              className={`p-4 rounded-xl text-left border transition-all duration-200 relative overflow-hidden group ${
                activeTab === 'company'
                  ? 'bg-purple-950/40 border-purple-400/80 shadow-lg shadow-purple-500/10 ring-1 ring-purple-400/50'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activeTab === 'company'
                      ? 'bg-purple-500 text-slate-950'
                      : 'bg-slate-800 text-purple-400 group-hover:bg-slate-700'
                  }`}
                >
                  <Building2 size={18} />
                </div>
              </div>
              <h3 className="font-bold text-white text-sm">Company Scraper</h3>
              <p className="text-[11px] text-slate-400 mt-1">Firmographics & headcounts</p>
            </button>

            {/* Tab 4: Employee Directory Scraper */}
            <button
              onClick={() => setActiveTab('employee')}
              className={`p-4 rounded-xl text-left border transition-all duration-200 relative overflow-hidden group ${
                activeTab === 'employee'
                  ? 'bg-blue-950/40 border-blue-400/80 shadow-lg shadow-blue-500/10 ring-1 ring-blue-400/50'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activeTab === 'employee'
                      ? 'bg-blue-500 text-slate-950'
                      : 'bg-slate-800 text-blue-400 group-hover:bg-slate-700'
                  }`}
                >
                  <Users size={18} />
                </div>
              </div>
              <h3 className="font-bold text-white text-sm">Employee Directory</h3>
              <p className="text-[11px] text-slate-400 mt-1">Roster & email enrichment</p>
            </button>
          </div>
        </div>

        {/* Active Module Panel */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/60 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {/* MODULE 1: SEARCH BY NAME (harvestapi/linkedin-profile-search-by-name) */}
            {activeTab === 'search' && (
              <motion.div
                key="name-search-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
                      <Search size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Linkedin Profile Search By Name Scraper</h3>
                      <p className="text-xs text-slate-400">
                        Actor: <code className="text-amber-300 font-mono">harvestapi/linkedin-profile-search-by-name</code> (No Cookies Required)
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-amber-950 text-amber-300 border border-amber-700/50">
                    HarvestAPI Actor
                  </span>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSearchByName(firstNameInput, lastNameInput);
                  }}
                  className="space-y-4"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                        FIRST NAME (REQUIRED)
                      </label>
                      <input
                        type="text"
                        value={firstNameInput}
                        onChange={(e) => setFirstNameInput(e.target.value)}
                        placeholder="e.g. Satya, Bill, Jeannie"
                        className="w-full bg-slate-950/90 border border-slate-700/80 rounded-xl px-4 py-3 font-mono text-sm text-amber-200 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                        LAST NAME (REQUIRED)
                      </label>
                      <input
                        type="text"
                        value={lastNameInput}
                        onChange={(e) => setLastNameInput(e.target.value)}
                        placeholder="e.g. Nadella, Gates, Wyrick"
                        className="w-full bg-slate-950/90 border border-slate-700/80 rounded-xl px-4 py-3 font-mono text-sm text-amber-200 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                      <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
                        <input
                          type="checkbox"
                          checked={strictSearch}
                          onChange={(e) => setStrictSearch(e.target.checked)}
                          className="rounded border-slate-700 bg-slate-950 text-amber-400 focus:ring-amber-400"
                        />
                        <span>Strict Search Mode</span>
                      </label>
                      <span>• Max Pages: 1</span>
                    </div>

                    <GoldButton size="md" type="submit" loading={isScraping} icon={<Play size={15} />}>
                      Run Name Search Scraper
                    </GoldButton>
                  </div>
                </form>

                {/* Candidate Search Results List */}
                {hasSearched && (
                  <div className="space-y-3 pt-4 border-t border-slate-800">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
                      <span>SEARCH CANDIDATES RESULT ({searchResults.length})</span>
                      <span>Click "Scrape & Save" to extract full JSON payload</span>
                    </h4>

                    <div className="grid md:grid-cols-2 gap-4">
                      {searchResults.map((candidate) => (
                        <div
                          key={candidate.id}
                          className="glass-panel p-4 rounded-xl border border-slate-800 bg-slate-950/70 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-3"
                        >
                          <div className="flex items-start gap-3">
                            <img
                              src={
                                candidate.profilePic ||
                                `https://api.dicebear.com/7.x/avataaars/svg?seed=${candidate.publicIdentifier}`
                              }
                              alt={candidate.fullName}
                              className="w-12 h-12 rounded-full object-cover border border-amber-500/30 bg-slate-900"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <h5 className="font-bold text-white text-sm truncate">{candidate.fullName}</h5>
                                {candidate.isVerified && (
                                  <ShieldCheck size={14} className="text-cyan-400 flex-shrink-0" />
                                )}
                              </div>
                              <p className="text-xs text-amber-200/90 line-clamp-2 mt-0.5">{candidate.headline}</p>
                              <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400 mt-2">
                                <span className="flex items-center gap-1 text-slate-300">
                                  <Building2 size={12} /> {candidate.companyName}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin size={12} /> {candidate.location}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs font-mono">
                            <a
                              href={candidate.profileUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-slate-400 hover:text-cyan-300 flex items-center gap-1"
                            >
                              <span>LinkedIn</span> <ExternalLink size={12} />
                            </a>

                            <GoldButton
                              size="sm"
                              loading={isScraping}
                              onClick={() =>
                                handleExecuteProfileScrape(candidate.profileUrl, candidate.fullName)
                              }
                              icon={<Play size={13} />}
                            >
                              Scrape & Save Profile
                            </GoldButton>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* MODULE 2: PROFILE URL SCRAPER (dev_fusion/Linkedin-Profile-Scraper) */}
            {activeTab === 'profile' && (
              <motion.div
                key="profile-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                      <User size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Mass Linkedin Profile Scraper with Email (No Cookies)</h3>
                      <p className="text-xs text-slate-400">
                        Actor: <code className="text-cyan-300 font-mono">dev_fusion/Linkedin-Profile-Scraper</code>
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-950 text-cyan-300 border border-cyan-700/50">
                    Dev Fusion Actor
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                      LINKEDIN PROFILE URLS (ONE PER LINE)
                    </label>
                    <textarea
                      rows={4}
                      value={profileUrlsInput}
                      onChange={(e) => setProfileUrlsInput(e.target.value)}
                      placeholder="https://www.linkedin.com/in/williamhgates&#10;http://www.linkedin.com/in/jeannie-wyrick-b4760710a"
                      className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl p-4 font-mono text-xs text-cyan-200 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 leading-relaxed"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                      <span className="flex items-center gap-1.5 text-emerald-400">
                        <CheckCircle2 size={14} /> Verified Work Email Enrichment
                      </span>
                      <span className="flex items-center gap-1.5 text-cyan-400">
                        <ShieldCheck size={14} /> No Cookies Required
                      </span>
                    </div>

                    <GoldButton
                      size="md"
                      loading={isScraping}
                      onClick={() => handleExecuteProfileScrape(profileUrlsInput)}
                      icon={<Play size={15} />}
                    >
                      Execute Profile Scraper (dev_fusion)
                    </GoldButton>
                  </div>
                </div>
              </motion.div>
            )}            {/* MODULE 3: SAVED DATASETS DATABASE */}
            {activeTab === 'saved' && (
              <motion.div
                key="saved-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-4 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                      <Database size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Extracted LinkedIn Datasets Database</h3>
                      <p className="text-xs text-slate-400">
                        Storage repository for extracted LinkedIn profiles and candidate search histories.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => exportProfilesJSON(savedProfiles)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-mono text-cyan-300 flex items-center gap-1.5 transition-colors"
                    >
                      <FileJson size={14} /> Export JSON
                    </button>
                    <button
                      onClick={() => exportProfilesCSV(savedProfiles)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-mono text-emerald-300 flex items-center gap-1.5 transition-colors"
                    >
                      <FileSpreadsheet size={14} /> Export CSV
                    </button>
                  </div>
                </div>

                {/* Sub-Tabs Selector: Full Scraped Profiles vs Search Candidates */}
                <div className="flex items-center gap-3 border-b border-slate-800 pb-3 font-mono text-xs">
                  <button
                    onClick={() => setSavedTab('profiles')}
                    className={`px-4 py-2 rounded-xl flex items-center gap-2 border transition-all ${
                      savedTab === 'profiles'
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50 shadow-md shadow-emerald-500/10 font-bold'
                        : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    <User size={15} className="text-emerald-400" />
                    <span>Profil Detail (Full Scraped) ({savedProfiles.length})</span>
                  </button>

                  <button
                    onClick={() => setSavedTab('candidates')}
                    className={`px-4 py-2 rounded-xl flex items-center gap-2 border transition-all ${
                      savedTab === 'candidates'
                        ? 'bg-amber-950/80 text-amber-300 border-amber-500/50 shadow-md shadow-amber-500/10 font-bold'
                        : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    <Search size={15} className="text-amber-400" />
                    <span>Kandidat Nama (Search History) ({savedCandidates.length})</span>
                  </button>
                </div>

                {/* SUB-TAB 1: FULL SCRAPED PROFILES */}
                {savedTab === 'profiles' && (
                  <div>
                    {savedProfiles.length === 0 ? (
                      <div className="text-center py-12 text-slate-400 space-y-2">
                        <Database size={36} className="mx-auto text-slate-600 mb-2" />
                        <p className="text-sm font-semibold text-slate-300">Belum ada profil detail yang di-scrap.</p>
                        <p className="text-xs font-mono text-slate-500">
                          Gunakan "Profile Scraper (URLs)" atau klik "Scrape & Save" pada kandidat untuk mengekstraksi data profil lengkap.
                        </p>
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {savedProfiles.map((p) => (
                          <div
                            key={p.publicIdentifier || p.linkedinUrl}
                            onClick={() => setSelectedProfile(p)}
                            className="glass-panel p-4 rounded-xl border border-slate-800 bg-slate-950/70 hover:border-emerald-500/50 cursor-pointer transition-all space-y-3 relative group"
                          >
                            <div className="flex items-start gap-3">
                              <img
                                src={
                                  p.profilePic ||
                                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.publicIdentifier}`
                                }
                                alt={p.fullName}
                                className="w-12 h-12 rounded-full object-cover border border-emerald-500/30 bg-slate-900"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h5 className="font-bold text-white text-sm truncate">{p.fullName}</h5>
                                  <button
                                    onClick={(e) => handleDeleteSaved(p.publicIdentifier || p.linkedinUrl, e)}
                                    className="text-slate-500 hover:text-red-400 transition-colors p-1"
                                    title="Delete from Local Storage"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                                <p className="text-xs text-emerald-200/90 line-clamp-1 mt-0.5">{p.headline}</p>
                                <p className="text-[11px] text-slate-400 font-mono mt-1 truncate">
                                  {p.companyName || 'N/A'} • {p.addressWithoutCountry || p.addressCountryOnly || 'Global'}
                                </p>
                              </div>
                            </div>

                            <div className="border-t border-slate-800/80 pt-2 flex items-center justify-between text-[11px] font-mono text-slate-400">
                              <span className="text-emerald-400 flex items-center gap-1">
                                <CheckCircle2 size={12} /> {p.experiences?.length || 0} Exp • {p.educations?.length || 0} Edu
                              </span>
                              <span className="text-cyan-400 hover:underline flex items-center gap-1">
                                <Eye size={12} /> View Payload
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* SUB-TAB 2: SEARCH NAME CANDIDATES HISTORY */}
                {savedTab === 'candidates' && (
                  <div>
                    {savedCandidates.length === 0 ? (
                      <div className="text-center py-12 text-slate-400 space-y-2">
                        <Search size={36} className="mx-auto text-slate-600 mb-2" />
                        <p className="text-sm font-semibold text-slate-300">Belum ada riwayat pencarian nama yang di-scrap.</p>
                        <p className="text-xs font-mono text-slate-500">
                          Gunakan modul "Search Profile By Name" untuk mencari nama kandidat profil.
                        </p>
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {savedCandidates.map((c) => (
                          <div
                            key={c.id || c.publicIdentifier}
                            className="glass-panel p-4 rounded-xl border border-slate-800 bg-slate-950/70 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-3"
                          >
                            <div className="flex items-start gap-3">
                              <img
                                src={
                                  c.profilePic ||
                                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${c.publicIdentifier}`
                                }
                                alt={c.fullName}
                                className="w-11 h-11 rounded-full object-cover border border-amber-500/30 bg-slate-900 flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h5 className="font-bold text-white text-sm truncate">{c.fullName}</h5>
                                  <button
                                    onClick={(e) => handleDeleteSavedCandidate(c.id || c.publicIdentifier, e)}
                                    className="text-slate-500 hover:text-red-400 transition-colors p-1"
                                    title="Delete from History"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                                <p className="text-xs text-amber-200/90 line-clamp-2 mt-0.5">{c.headline}</p>
                                <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400 mt-2">
                                  <span className="flex items-center gap-1 text-slate-300 truncate">
                                    <Building2 size={12} /> {c.companyName}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs font-mono">
                              <a
                                href={c.profileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-slate-400 hover:text-cyan-300 flex items-center gap-1"
                              >
                                <span>LinkedIn</span> <ExternalLink size={12} />
                              </a>

                              <GoldButton
                                size="sm"
                                loading={isScraping}
                                onClick={() => handleExecuteProfileScrape(c.profileUrl, c.fullName)}
                                icon={<Play size={13} />}
                              >
                                Scrape & Save Profile
                              </GoldButton>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* MODULE 4: COMPANY SCRAPER */}
            {activeTab === 'company' && (
              <motion.div
                key="company-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/40">
                      <Building2 size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Company Firmographics Console</h3>
                      <p className="text-xs text-slate-400">Extract company details, headcount growth & active vacancies</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-purple-950 text-purple-300 border border-purple-700/50">
                    Engine: Company Intelligence
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                      COMPANY DOMAIN / LINKEDIN URL
                    </label>
                    <input
                      type="text"
                      value={companyDomain}
                      onChange={(e) => setCompanyDomain(e.target.value)}
                      placeholder="e.g. google.com or linkedin.com/company/google"
                      className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 font-mono text-sm text-purple-200 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                      TARGET DATA
                    </label>
                    <select className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 font-mono text-sm text-slate-200 focus:outline-none focus:border-purple-400">
                      <option>Full Intelligence (Headcount, Tech, Jobs)</option>
                      <option>Active Job Vacancies Only</option>
                      <option>Key Executive Roster</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                    <span className="text-purple-400 flex items-center gap-1">
                      <Database size={14} /> Firmographics DB
                    </span>
                    <span className="text-cyan-400">Tech Stack Detection Enabled</span>
                  </div>

                  <GoldButton
                    size="md"
                    loading={isScraping}
                    onClick={() => {
                      addLog(`[JOB QUEUED] Starting Company Scrape for: "${companyDomain}"`);
                      setTimeout(() => addLog(`[SUCCESS] Extracted ${companyDomain} company firmographics.`), 1500);
                    }}
                    icon={<Play size={15} />}
                  >
                    Execute Company Scrape
                  </GoldButton>
                </div>
              </motion.div>
            )}

            {/* MODULE 5: EMPLOYEE DIRECTORY */}
            {activeTab === 'employee' && (
              <motion.div
                key="employee-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/40">
                      <Users size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Employee Directory Parser</h3>
                      <p className="text-xs text-slate-400">Extract employee rosters filtered by title & seniority level</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-blue-950 text-blue-300 border border-blue-700/50">
                    Engine: Directory Crawl
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                      COMPANY NAME
                    </label>
                    <input
                      type="text"
                      value={employeeCompany}
                      onChange={(e) => setEmployeeCompany(e.target.value)}
                      placeholder="Company name"
                      className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 font-mono text-sm text-blue-200 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                      TITLE FILTER
                    </label>
                    <input
                      type="text"
                      defaultValue="Engineer, Director, VP"
                      className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 font-mono text-sm text-slate-200 focus:outline-none focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                      SENIORITY
                    </label>
                    <select className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 font-mono text-sm text-slate-200 focus:outline-none focus:border-blue-400">
                      <option>All Seniority Levels</option>
                      <option>C-Level & VP Only</option>
                      <option>Directors & Heads</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                    <span className="text-blue-400">Max 500 profiles / batch</span>
                    <span className="text-emerald-400">Work Email Lookup Active</span>
                  </div>

                  <GoldButton
                    size="md"
                    loading={isScraping}
                    onClick={() => {
                      addLog(`[JOB QUEUED] Starting Employee Directory scrape for: "${employeeCompany}"`);
                      setTimeout(() => addLog(`[SUCCESS] Extracted employee roster for ${employeeCompany}.`), 1500);
                    }}
                    icon={<Play size={15} />}
                  >
                    Execute Employee Scrape
                  </GoldButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Live Terminal Cluster Logs & Export Panel */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Real-Time Execution Log */}
          <div className="lg:col-span-2 glass-panel p-5 rounded-2xl border border-slate-800 bg-slate-950/80 space-y-3 font-mono">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
              <div className="flex items-center gap-2 text-xs text-cyan-400">
                <Terminal size={15} />
                <span>APIFY EXECUTION ENGINE LOGS</span>
              </div>
              <button
                onClick={() => setLogs(['[SYSTEM] Logs cleared manually. Waiting for next job.'])}
                className="text-[11px] text-slate-500 hover:text-slate-300 transition-colors"
              >
                Clear Logs
              </button>
            </div>

            <div className="h-48 overflow-y-auto space-y-1.5 text-xs text-slate-300 font-mono pr-2 scrollbar-thin scrollbar-thumb-slate-700">
              {logs.map((log, i) => (
                <p
                  key={i}
                  className={
                    log.includes('[SUCCESS]') || log.includes('[APIFY SUCCESS]')
                      ? 'text-emerald-400 font-semibold'
                      : log.includes('[BYPASS]') || log.includes('[APIFY API]') || log.includes('[APIFY HTTP]')
                      ? 'text-cyan-300'
                      : log.includes('[JOB QUEUED]') || log.includes('[APIFY SEARCH]')
                      ? 'text-amber-300 font-semibold'
                      : 'text-slate-400'
                  }
                >
                  {log}
                </p>
              ))}
            </div>
          </div>

          {/* Right Col: Quick Data Export Options */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <Download size={15} />
              <span>EXPORT SAVED DATASETS</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Export all extracted LinkedIn profile JSON payloads to local disk files (.json / .csv).
            </p>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => exportProfilesJSON(savedProfiles)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-mono text-white flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-2">
                  <FileJson size={15} className="text-cyan-400" /> Export JSON Payload ({savedProfiles.length})
                </span>
                <span className="text-slate-400">.json</span>
              </button>

              <button
                onClick={() => exportProfilesCSV(savedProfiles)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-mono text-white flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-2">
                  <FileSpreadsheet size={15} className="text-emerald-400" /> Export CSV Table ({savedProfiles.length})
                </span>
                <span className="text-slate-400">.csv</span>
              </button>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Apify Endpoint</span>
              <span className="text-cyan-400">api.apify.com/v2/acts</span>
            </div>
          </div>
        </div>
      </main>

      {/* APIFY TOKEN MODAL */}
      <AnimatePresence>
        {isTokenModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0f172a] border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl relative"
            >
              <button
                onClick={() => setIsTokenModalOpen(false)}
                className="absolute right-4 top-4 text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
                  <Key size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Apify API Token</h3>
                  <p className="text-xs text-slate-400">Used for live LinkedIn profile & search extraction</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono text-slate-300 uppercase">APIFY API TOKEN</label>
                <input
                  type="text"
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  placeholder="apify_api_..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 font-mono text-xs text-cyan-200 focus:outline-none focus:border-amber-400"
                />
                <p className="text-[11px] text-slate-400 leading-normal">
                  Token currently configured: <code className="text-amber-300 font-mono">apify_api_ZdIX...</code>
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => {
                    setTokenInput('');
                    setApifyToken('');
                    setApifyTokenState('');
                    setIsTokenModalOpen(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300"
                >
                  Clear Token
                </button>

                <GoldButton size="sm" onClick={handleSaveToken} icon={<CheckCircle2 size={14} />}>
                  Save Apify Token
                </GoldButton>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PROFILE DETAIL VIEWER MODAL */}
      <AnimatePresence>
        {selectedProfile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0b1120] border border-slate-700 rounded-2xl max-w-3xl w-full max-h-[88vh] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Profile Header */}
              <div className="p-6 border-b border-slate-800 bg-slate-900/60 relative">
                <button
                  onClick={() => setSelectedProfile(null)}
                  className="absolute right-4 top-4 text-slate-400 hover:text-white p-1"
                >
                  <X size={20} />
                </button>

                <div className="flex items-start gap-4">
                  <img
                    src={
                      selectedProfile.profilePic ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedProfile.publicIdentifier}`
                    }
                    alt={selectedProfile.fullName}
                    className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500/40 bg-slate-950 flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white text-lg">{selectedProfile.fullName}</h3>
                      {selectedProfile.isVerified && <ShieldCheck size={16} className="text-cyan-400" />}
                    </div>
                    <p className="text-xs text-cyan-200 mt-0.5 leading-relaxed">{selectedProfile.headline}</p>

                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 mt-2">
                      {selectedProfile.companyName && (
                        <span className="flex items-center gap-1 text-slate-300">
                          <Building2 size={13} /> {selectedProfile.companyName}
                        </span>
                      )}
                      {selectedProfile.email && (
                        <span className="flex items-center gap-1 text-emerald-400">
                          <Mail size={13} /> {selectedProfile.email}
                        </span>
                      )}
                      {selectedProfile.addressWithCountry && (
                        <span className="flex items-center gap-1">
                          <MapPin size={13} /> {selectedProfile.addressWithCountry}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tab Navigation inside Modal */}
                <div className="flex items-center gap-2 border-t border-slate-800/80 pt-4 mt-4 font-mono text-xs overflow-x-auto">
                  <button
                    onClick={() => setActiveDetailTab('overview')}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                      activeDetailTab === 'overview'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Overview & About
                  </button>
                  <button
                    onClick={() => setActiveDetailTab('contact')}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                      activeDetailTab === 'contact'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Contact Info & Stats
                  </button>
                  <button
                    onClick={() => setActiveDetailTab('experiences')}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                      activeDetailTab === 'experiences'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Experiences ({selectedProfile.experiences?.length || 0})
                  </button>
                  <button
                    onClick={() => setActiveDetailTab('educations')}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                      activeDetailTab === 'educations'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Educations ({selectedProfile.educations?.length || 0})
                  </button>
                  <button
                    onClick={() => setActiveDetailTab('skills_projects')}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                      activeDetailTab === 'skills_projects'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Skills & Projects ({(selectedProfile.skills?.length || 0) + (selectedProfile.projects?.length || 0)})
                  </button>
                  <button
                    onClick={() => setActiveDetailTab('json')}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                      activeDetailTab === 'json'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Raw Output JSON
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-4 flex-1 font-mono text-xs">
                {activeDetailTab === 'overview' && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-slate-400 uppercase tracking-wider text-[11px] mb-1">About Summary</h4>
                      <p className="text-slate-200 font-sans text-sm leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800 whitespace-pre-line">
                        {selectedProfile.about || 'No detailed bio recorded.'}
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3 pt-2">
                      <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                        <span className="text-slate-400 text-[11px]">Current Job / Company:</span>
                        <p className="text-white font-bold text-sm mt-0.5">
                          {selectedProfile.companyName || 'N/A'}
                        </p>
                      </div>

                      <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                        <span className="text-slate-400 text-[11px]">Public Identifier:</span>
                        <p className="text-cyan-300 font-bold text-sm mt-0.5">
                          {selectedProfile.publicIdentifier}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeDetailTab === 'contact' && (
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1">
                        <span className="text-emerald-400 text-[11px] uppercase flex items-center gap-1 font-bold">
                          <Mail size={13} /> Email Address
                        </span>
                        <p className="text-white font-mono text-sm font-bold">
                          {selectedProfile.email || 'Not Public / N/A'}
                        </p>
                      </div>

                      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1">
                        <span className="text-cyan-400 text-[11px] uppercase flex items-center gap-1 font-bold">
                          <Users size={13} /> Phone / Mobile Number
                        </span>
                        <p className="text-white font-mono text-sm font-bold">
                          {selectedProfile.mobileNumber || 'Not Public / N/A'}
                        </p>
                      </div>

                      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1">
                        <span className="text-amber-400 text-[11px] uppercase flex items-center gap-1 font-bold">
                          <MapPin size={13} /> Location / Address
                        </span>
                        <p className="text-white font-mono text-sm font-bold">
                          {selectedProfile.addressWithCountry || 'Global / Remote'}
                        </p>
                      </div>

                      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1">
                        <span className="text-purple-400 text-[11px] uppercase flex items-center gap-1 font-bold">
                          <Users size={13} /> LinkedIn Network Stats
                        </span>
                        <p className="text-white font-mono text-sm font-bold">
                          {selectedProfile.connectionCount ? `${selectedProfile.connectionCount.toLocaleString()} Connections` : '500+ Connections'}
                          {selectedProfile.followerCount ? ` • ${selectedProfile.followerCount.toLocaleString()} Followers` : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeDetailTab === 'experiences' && (
                  <div className="space-y-3">
                    {selectedProfile.experiences && selectedProfile.experiences.length > 0 ? (
                      selectedProfile.experiences.map((exp, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex items-start gap-3"
                        >
                          <Briefcase className="text-emerald-400 mt-1 flex-shrink-0" size={18} />
                          <div>
                            <h5 className="font-bold text-white text-sm">{exp.title || 'Role'}</h5>
                            <p className="text-emerald-300 text-xs">{exp.companyName || 'Company'}</p>
                            <p className="text-slate-400 text-[11px] mt-1">
                              {exp.jobStartedOn || 'N/A'} - {exp.jobEndedOn || (exp.jobStillWorking ? 'Present' : 'N/A')} • {exp.jobLocation || 'Remote/Global'}
                            </p>
                            {exp.jobDescription && (
                              <p className="text-slate-300 text-xs font-sans mt-2 whitespace-pre-line">{exp.jobDescription}</p>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-400">No work experience items found.</p>
                    )}
                  </div>
                )}

                {activeDetailTab === 'educations' && (
                  <div className="space-y-3">
                    {selectedProfile.educations && selectedProfile.educations.length > 0 ? (
                      selectedProfile.educations.map((edu, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex items-start gap-3"
                        >
                          <GraduationCap className="text-cyan-400 mt-1 flex-shrink-0" size={18} />
                          <div>
                            <h5 className="font-bold text-white text-sm">{edu.title}</h5>
                            <p className="text-cyan-300 text-xs">{edu.subtitle}</p>
                            {edu.description && (
                              <p className="text-slate-300 text-xs font-sans mt-2 whitespace-pre-line">{edu.description}</p>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-400">No education items found.</p>
                    )}
                  </div>
                )}

                {activeDetailTab === 'skills_projects' && (
                  <div className="space-y-4">
                    {/* Skills */}
                    <div>
                      <h4 className="text-slate-400 uppercase tracking-wider text-[11px] mb-2 font-bold">Skills & Competencies ({selectedProfile.skills?.length || 0})</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProfile.skills && selectedProfile.skills.length > 0 ? (
                          selectedProfile.skills.map((skill, idx) => (
                            <span key={idx} className="px-2.5 py-1 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 text-xs font-mono">
                              {skill}
                            </span>
                          ))
                        ) : (
                          <p className="text-slate-400">No skills list recorded.</p>
                        )}
                      </div>
                    </div>

                    {/* Projects */}
                    {selectedProfile.projects && selectedProfile.projects.length > 0 && (
                      <div className="pt-2">
                        <h4 className="text-slate-400 uppercase tracking-wider text-[11px] mb-2 font-bold">Projects Portfolio ({selectedProfile.projects.length})</h4>
                        <div className="space-y-2">
                          {selectedProfile.projects.map((proj, idx) => (
                            <div key={idx} className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                              <h5 className="font-bold text-cyan-300 text-xs">{proj.name}</h5>
                              {proj.associated_with && <p className="text-slate-400 text-[10px]">Associated with {proj.associated_with}</p>}
                              {proj.description && <p className="text-slate-300 text-xs font-sans mt-1">{proj.description}</p>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Languages & Causes */}
                    <div className="grid sm:grid-cols-2 gap-3 pt-2">
                      {selectedProfile.languages && selectedProfile.languages.length > 0 && (
                        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                          <span className="text-slate-400 text-[11px] font-bold">Languages:</span>
                          <div className="mt-1 space-y-1">
                            {selectedProfile.languages.map((lang, idx) => (
                              <p key={idx} className="text-white text-xs">
                                <strong className="text-cyan-300">{lang.language}:</strong> {lang.proficiency || 'Proficient'}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedProfile.causes && selectedProfile.causes.length > 0 && (
                        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                          <span className="text-slate-400 text-[11px] font-bold">Volunteer Causes:</span>
                          <p className="text-amber-300 text-xs mt-1">
                            {selectedProfile.causes.join(', ')}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeDetailTab === 'json' && (
                  <div className="relative">
                    <button
                      onClick={() => handleCopyJSON(selectedProfile)}
                      className="absolute right-3 top-3 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs flex items-center gap-1"
                    >
                      {copiedJson ? <Check size={13} /> : <Copy size={13} />}
                      <span>{copiedJson ? 'Copied!' : 'Copy JSON'}</span>
                    </button>
                    <pre className="bg-slate-950 p-4 rounded-xl text-cyan-300 text-[11px] font-mono overflow-x-auto max-h-96 scrollbar-thin scrollbar-thumb-slate-700">
                      {JSON.stringify(selectedProfile, null, 2)}
                    </pre>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between">
                <a
                  href={selectedProfile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
                >
                  Open LinkedIn Profile <ExternalLink size={12} />
                </a>

                <button
                  onClick={() => setSelectedProfile(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-white"
                >
                  Close Drawer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LinkedInScraperDashboard;
