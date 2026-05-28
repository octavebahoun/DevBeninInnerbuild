import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, Sun, Moon, Search, ChevronDown, Users, BookOpen, Trophy, Code2, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authStore } from '../lib/storage';

/* ──────────────────────────────────────────────────────────
   Search data
────────────────────────────────────────────────────────── */
const SEARCH_DATA = [
  { type: 'article', label: 'Déployer React sur Azure en 2025', href: '#blog' },
  { type: 'article', label: 'Optimiser Django et PostgreSQL avec Docker', href: '#blog' },
  { type: 'article', label: 'Dompter GSAP ScrollTrigger pour des sites vivants', href: '#blog' },
  { type: 'dev', label: 'Oktav Dev — Fullstack JS · AI Engineer', href: '#community' },
  { type: 'dev', label: 'Precieux Dev — Frontend · Web3', href: '#community' },
  { type: 'dev', label: 'Ronald Hounnou — UI/UX · Creative Dev', href: '#community' },
  { type: 'dev', label: 'Amina Bello — Backend · Python', href: '#community' },
  { type: 'project', label: 'DevBenin Platform — Open Source', href: '/projects/devbenin-platform' },
  { type: 'project', label: 'TontineChain — Web3 DeFi', href: '/projects/tontinechain' },
  { type: 'project', label: 'CodeToVecto — AI Dev Tools', href: '/projects/codetovecto' },
];

const TYPE_LABEL  = { article: '📝 Derniers articles', dev: '👤 Devs actifs', project: '🚀 Projets populaires' };
const TYPE_COLOR  = { article: 'var(--accent-orange)', dev: 'var(--accent-green)', project: 'var(--accent-orange)' };

/* ──────────────────────────────────────────────────────────
   Nav links config
────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Accueil', href: '#home' },
  {
    label: 'Communauté',
    children: [
      { label: 'Membres',  href: '/membres', icon: <Users    className="h-3.5 w-3.5" /> },
      { label: 'Projets',  href: '/projects',  icon: <Code2    className="h-3.5 w-3.5" /> },
      { label: 'Articles', href: '/articles', icon: <BookOpen className="h-3.5 w-3.5" /> },
    ],
  },
  {
    label: 'Ressources',
    children: [
      { label: 'Challenges',  href: '#challenges',  icon: <Trophy    className="h-3.5 w-3.5" /> },
      { label: 'Classement',  href: '#leaderboard', icon: <BarChart2 className="h-3.5 w-3.5" /> },
    ],
  },
];

/* ══════════════════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════════════════ */
export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const getHref = (hash) => {
    if (!hash) return '#';
    if (hash.startsWith('/')) return hash;
    return location.pathname === '/' ? hash : '/' + hash;
  };

  const [scrolled,        setScrolled]        = useState(false);
  const [isOpen,          setIsOpen]          = useState(false);
  const [session,         setSession]         = useState(() => authStore.getSession());
  const [windowWidth,     setWindowWidth]     = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const [activeDropdown,  setActiveDropdown]  = useState(null);
  const [searchOpen,      setSearchOpen]      = useState(false);
  const [searchQuery,     setSearchQuery]     = useState('');
  const searchRef = useRef(null);
  const closeTimeout = useRef(null);

  const isDesktop = windowWidth >= 768;

  /* scroll + resize listeners */
  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY > 80;
      setScrolled(s);
      if (s) { setIsOpen(false); setActiveDropdown(null); }
    };
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  /* focus search on open */
  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 80);
    else setSearchQuery('');
  }, [searchOpen]);

  /* session tracking */
  useEffect(() => {
    setSession(authStore.getSession());
  }, [location.pathname]);

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === 'devbenin-session') {
        setSession(authStore.getSession());
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  /* ─── Derived states ───────────────────────────────────────
     Mobile  : ALWAYS pill → dropdown on burger open
     Desktop : full navbar at top, pill after scroll,
               pill expands back to full when burger opened
  ─────────────────────────────────────────────────────────── */
  const showFullNav    = isDesktop && (!scrolled || isOpen);   // desktop only
  const showMobileMenu = !isDesktop && isOpen;                 // mobile dropdown

  const filteredSearch = searchQuery.length > 0
    ? SEARCH_DATA.filter(i => i.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : SEARCH_DATA;

  const handleBurger = () => { setIsOpen(p => !p); setActiveDropdown(null); };
  const closeAll     = () => { setIsOpen(false); setActiveDropdown(null); };
    const openDropdown = (label) => {
      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
        closeTimeout.current = null;
      }
      setActiveDropdown(label);
    };

    const scheduleCloseDropdown = () => {
      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
      }
      closeTimeout.current = setTimeout(() => {
        setActiveDropdown(null);
        closeTimeout.current = null;
      }, 140);
    };

    const cancelCloseDropdown = () => {
      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
        closeTimeout.current = null;
      }
    };

    useEffect(() => {
      return () => {
        if (closeTimeout.current) {
          clearTimeout(closeTimeout.current);
        }
      };
    }, []);
  const handleLogout = () => {
    authStore.clearSession();
    setSession(null);
    closeAll();
    navigate('/');
  };

  /* ── burger lines (animated) ── */
  const BurgerLines = () => (
    <span className="flex flex-col gap-[4.5px] items-center" aria-label="Menu">
      {[0,1,2].map(i => (
        <span key={i} className="block h-[1.5px] w-[18px] transition-all duration-300"
          style={{
            background: 'var(--accent-orange)',
            opacity: i === 1 && isOpen ? 0 : 1,
            transform:
              i === 0 && isOpen ? 'translateY(6px) rotate(45deg)' :
              i === 2 && isOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
          }}
        />
      ))}
    </span>
  );

  /* ── desktop dropdown ── */
  const DesktopDropdown = ({ link }) => (
    <AnimatePresence>
      {link.children && activeDropdown === link.label && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
          className="absolute top-full left-0 mt-1.5 w-44 rounded-xl overflow-hidden shadow-2xl z-50"
          style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-col)' }}
          onMouseEnter={cancelCloseDropdown}
          onMouseLeave={scheduleCloseDropdown}
        >
          {link.children.map(child => (
            <a key={child.label} href={child.href}
              className="nav-dropdown-item flex items-center gap-2.5 px-4 py-2.5 text-small font-medium"
              onClick={closeAll}
            >
              <span style={{ color: 'var(--accent-orange)' }}>{child.icon}</span>
              {child.label}
            </a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* ═══════ SEARCH OVERLAY ═══════ */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-start justify-center pt-24 px-4"
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(10px)' }}
            onClick={e => e.target === e.currentTarget && setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
              style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-orange)' }}
            >
              {/* Input row */}
              <div className="flex items-center gap-3 px-4 py-3.5"
                style={{ borderBottom: '1px solid var(--border-col)' }}>
                <Search className="h-4 w-4 flex-shrink-0" style={{ color: 'var(--accent-orange)' }} />
                <input ref={searchRef} type="text"
                  placeholder="Rechercher articles, devs, projets..."
                  value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-body focus:outline-none"
                  style={{ color: 'var(--text-main)' }}
                />
                <button onClick={() => setSearchOpen(false)}>
                  <X className="h-4 w-4" style={{ color: 'var(--text-sub)' }} />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-72 overflow-y-auto">
                {['article','dev','project'].map(type => {
                  const items = filteredSearch.filter(i => i.type === type);
                  if (!items.length) return null;
                  return (
                    <div key={type}>
                      <div className="px-4 py-1.5 text-stag"
                        style={{ color: TYPE_COLOR[type], background: 'var(--surface)' }}>
                        {TYPE_LABEL[type]}
                      </div>
                      {items.map(item => (
                        <a key={item.label} href={item.href}
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-body transition-colors duration-150"
                          style={{ color: 'var(--text-main)' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'var(--surface)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          <span className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                            style={{ background: TYPE_COLOR[type] }} />
                          {item.label}
                        </a>
                      ))}
                    </div>
                  );
                })}
                {filteredSearch.length === 0 && (
                  <div className="py-10 text-center text-body" style={{ color: 'var(--text-sub)' }}>
                    Aucun résultat pour «&nbsp;{searchQuery}&nbsp;»
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════ NAVBAR ═══════ */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 px-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-5xl">

          {/* Animated container — expands/collapses horizontally via layout */}
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 380, damping: 38 }}
            className={`relative overflow-visible mx-auto ${showFullNav ? 'w-full' : 'w-fit'}`}
            style={{
              backgroundColor: 'color-mix(in srgb, var(--bg) 90%, transparent)',
              backdropFilter: 'blur(18px)',
              border: '1px solid var(--border-col)',
              borderRadius: showFullNav ? '14px' : '999px',
              boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.18)' : 'none',
            }}
          >
            <AnimatePresence mode="wait">

              {/* ──── FULL NAVBAR ──── */}
              {showFullNav && (
                <motion.div key="full"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="flex h-14 items-center justify-between px-5 gap-3 whitespace-nowrap"
                >
                  {/* Logo */}
                  <Link to="/" className="text-h3 tracking-wider flex-shrink-0"
                    style={{ color: 'var(--text-main)' }}>
                    Dev<span style={{ color: 'var(--accent-orange)' }}>Bénin</span>
                  </Link>

                  {/* Nav links — desktop */}
                  <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
                    {NAV_LINKS.map(link => (
                      <div key={link.label} className="relative"
                        onMouseEnter={() => link.children && openDropdown(link.label)}
                        onMouseLeave={() => link.children && scheduleCloseDropdown()}
                      >
                        <a href={getHref(link.href)}
                          className="nav-link flex items-center gap-1 rounded-lg px-3 py-1.5 text-small font-bold uppercase tracking-wider"
                          onClick={link.children ? e => e.preventDefault() : closeAll}
                        >
                          {link.label}
                          {link.children && <ChevronDown className="h-3 w-3" />}
                        </a>
                        <DesktopDropdown link={link} />
                      </div>
                    ))}
                  </nav>

                  {/* Right actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Search */}
                    <button onClick={() => setSearchOpen(true)}
                      className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-small transition-all duration-200"
                      style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-sub)' }}
                    >
                      <Search className="h-3.5 w-3.5" style={{ color: 'var(--accent-orange)' }} />
                      <span className="hidden md:block text-small">Rechercher…</span>
                    </button>

                    {/* Theme */}
                    <button onClick={toggleTheme}
                      className="rounded-lg p-2 transition-all duration-200"
                      style={{ border: '1px solid var(--border-col)', color: 'var(--text-muted)' }}
                      aria-label="Changer de thème"
                    >
                      {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                    </button>

                    {/* Dashboard / Connexion — desktop */}
                    {session ? (
                      <>
                        <Link to="/dashboard" className="hidden md:block text-small font-bold uppercase tracking-wider transition-colors duration-200"
                          style={{ color: 'var(--text-muted)' }}
                          onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-orange)'}
                          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="hidden md:block text-small font-bold uppercase tracking-wider transition-colors duration-200"
                          style={{ color: 'var(--accent-orange)' }}
                        >
                          Deconnexion
                        </button>
                      </>
                    ) : (
                      <Link to="/login" className="hidden md:block text-small font-bold uppercase tracking-wider transition-colors duration-200"
                        style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-orange)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                      >
                        Connexion
                      </Link>
                    )}

                    {/* CTA — desktop */}
                    {!session && (
                      <Link to="/register" className="hidden md:block btn-orange rounded-lg px-4 py-1.5 text-cta text-center">
                        Rejoindre ↗
                      </Link>
                    )}

                    {/* Burger — mobile */}
                    <button onClick={handleBurger}
                      className="md:hidden rounded-lg p-2 transition-all duration-200"
                      style={{ border: '1px solid var(--border-col)' }}
                    >
                      <BurgerLines />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ──── COLLAPSED PILL ──── */}
              {!showFullNav && (
                <motion.div key="pill"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex h-11 items-center justify-center gap-3 px-5"
                >
                  <Link to="/" className="text-cta"
                    style={{ color: 'var(--text-main)' }}>
                    Dev<span style={{ color: 'var(--accent-orange)' }}>Bénin</span>
                  </Link>
                  <span className="h-3.5 w-[1px]" style={{ background: 'var(--border-col)' }} />
                  <button onClick={handleBurger} aria-label="Menu">
                    <BurgerLines />
                  </button>
                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>

          {/* ──── MOBILE DROPDOWN (scrolled + open + mobile) ──── */}
          <AnimatePresence>
            {showMobileMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="mt-2 mx-auto rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  width: '260px',
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid var(--border-col)',
                  backdropFilter: 'blur(18px)',
                }}
              >
                <div className="py-3">
                  <div className="px-5 pb-2">
                    {session ? (
                      <div className="flex flex-col gap-2">
                        <Link
                          to="/dashboard"
                          className="flex items-center rounded-lg px-3 py-2 text-small font-bold uppercase tracking-wider transition-all duration-150"
                          style={{ color: 'var(--accent-orange)', background: 'var(--glow-orange)' }}
                          onClick={closeAll}
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center justify-center rounded-lg px-3 py-2 text-small font-bold uppercase tracking-wider transition-all duration-150"
                          style={{ color: 'var(--accent-orange)', border: '1px solid var(--border-orange)' }}
                        >
                          Deconnexion
                        </button>
                      </div>
                    ) : (
                      <Link
                        to="/login"
                        className="flex items-center rounded-lg px-3 py-2 text-small font-bold uppercase tracking-wider transition-all duration-150"
                        style={{ color: 'var(--accent-orange)', background: 'var(--glow-orange)' }}
                        onClick={closeAll}
                      >
                        Connexion
                      </Link>
                    )}
                  </div>
                  {/* Links */}
                  {NAV_LINKS.map(link => (
                    <div key={link.label}>
                      {!link.children ? (
                        <a href={getHref(link.href)} onClick={closeAll}
                          className="flex items-center px-5 py-2.5 text-body font-bold uppercase tracking-wider transition-all duration-150"
                          style={{ color: 'var(--text-muted)' }}
                          onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-orange)'}
                          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <>
                          <div className="px-5 pt-2 pb-1 text-stag"
                            style={{ color: 'var(--accent-orange)' }}>
                            {link.label}
                          </div>
                          {link.children.map(child => (
                            <a key={child.label} href={getHref(child.href)} onClick={closeAll}
                              className="flex items-center gap-2.5 px-6 py-2 text-small font-medium transition-all duration-150"
                              style={{ color: 'var(--text-sub)' }}
                              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent-orange)'; e.currentTarget.style.background = 'var(--glow-orange)'; }}
                              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-sub)'; e.currentTarget.style.background = 'transparent'; }}
                            >
                              <span style={{ color: 'var(--accent-orange)' }}>{child.icon}</span>
                              {child.label}
                            </a>
                          ))}
                        </>
                      )}
                    </div>
                  ))}

                  {/* Divider + utils */}
                  <div className="mx-5 mt-3 pt-3" style={{ borderTop: '1px solid var(--border-col)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <button onClick={toggleTheme}
                        className="rounded-lg p-2 transition-all duration-200"
                        style={{ border: '1px solid var(--border-col)', color: 'var(--text-muted)' }}
                        aria-label="Changer de thème"
                      >
                        {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                      </button>
                      <button onClick={() => { setSearchOpen(true); closeAll(); }}
                        className="flex-1 flex items-center gap-2 rounded-lg px-3 py-2 text-small transition-all duration-200"
                        style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-sub)' }}
                      >
                        <Search className="h-3.5 w-3.5 flex-shrink-0" style={{ color: 'var(--accent-orange)' }} />
                        Rechercher…
                      </button>
                    </div>
                    {!session && (
                      <>
                        <Link to="/login" onClick={closeAll} className="block w-full rounded-lg py-2 text-small font-bold uppercase tracking-wider text-center mb-2 transition-all duration-200"
                          style={{ border: '1px solid var(--border-col)', color: 'var(--text-muted)' }}>
                          Connexion
                        </Link>
                        <Link to="/register" onClick={closeAll} className="block btn-orange w-full rounded-lg py-2 text-cta text-center">
                          Rejoindre ↗
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      {/* Spacer sous la navbar fixe */}
      <div className="h-20" />
    </>
  );
}
