import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Sparkles, Users, Trophy } from 'lucide-react';
import { authStore } from '../lib/storage';

export default function Auth({ defaultTab = 'login' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Sync tab with route if it changes
  useEffect(() => {
    if (location.pathname === '/login') {
      setActiveTab('login');
    } else if (location.pathname === '/register') {
      setActiveTab('register');
    }
  }, [location.pathname]);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [techStack, setTechStack] = useState('Frontend');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const normalizedEmail = email.trim().toLowerCase();

    if (activeTab === 'register') {
      if (password !== confirmPassword) {
        setLoading(false);
        setError('Les mots de passe ne correspondent pas.');
        return;
      }
      const result = authStore.createUser({
        name,
        email: normalizedEmail,
        password,
        techStack,
      });
      if (!result.ok) {
        setLoading(false);
        setError(result.error);
        return;
      }
      authStore.setSession({
        userId: result.user.id,
        name: result.user.name,
        email: result.user.email,
      });
      setTimeout(() => {
        setLoading(false);
        navigate('/');
      }, 600);
      return;
    }

    const result = authStore.validateUser(normalizedEmail, password);
    if (!result.ok) {
      setLoading(false);
      setError(result.error);
      return;
    }
    authStore.setSession({
      userId: result.user.id,
      name: result.user.name,
      email: result.user.email,
    });
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 600);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError('');
    setLoading(false);
    if (tab === 'login') {
      navigate('/login');
    } else {
      navigate('/register');
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex flex-col md:flex-row transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg)', color: 'var(--text-main)' }}
    >
      
      {/* ── DESKTOP ONLY: LEFT PANEL (Text & Brand presentation) ── */}
      <div 
        className="hidden md:flex md:w-1/2 flex-col justify-between p-12 lg:p-16 relative overflow-hidden transition-colors duration-300"
        style={{ 
          backgroundColor: 'var(--card-bg)',
          borderRight: '1px solid var(--border-col)'
        }}
      >
        {/* Glow effects */}
        <div
          className="absolute top-1/4 left-1/4 h-[300px] w-[300px] pointer-events-none rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle, var(--glow-orange) 0%, transparent 70%)' }}
        />

        {/* Top brand */}
        <Link to="/" className="font-display text-2xl font-bold tracking-wider inline-flex items-center gap-3">
          <svg className="w-8 h-8 text-[var(--accent-orange)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M25 20C25 20 45 10 65 25C85 40 75 70 55 75C35 80 20 60 35 45C50 30 75 50 65 65" 
              stroke="currentColor" 
              strokeWidth="10" 
              strokeLinecap="round"
            />
          </svg>
          <span>Dev<span style={{ color: 'var(--accent-orange)' }}>Bénin</span></span>
        </Link>

        {/* Central visual text */}
        <div className="my-auto max-w-md space-y-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl lg:text-4xl font-display font-bold leading-tight"
          >
            Rejoignez l'élite de la tech <span style={{ color: 'var(--accent-orange)' }}>béninoise</span>.
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm leading-relaxed"
            style={{ color: 'var(--text-sub)' }}
          >
            Participez à des challenges réguliers, progressez dans le classement national, et connectez-vous avec d'autres développeurs passionnés de l'écosystème.
          </motion.p>

          {/* Interactive small list of advantages */}
          <div className="space-y-4 pt-6">
            <div className="flex items-center gap-3.5">
              <div className="rounded-lg p-2 flex items-center justify-center" style={{ background: 'var(--glow-orange)' }}>
                <Trophy className="h-4 w-4" style={{ color: 'var(--accent-orange)' }} />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider">Challenges &amp; Hacks</h4>
                <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Des défis mensuels pour tester vos compétences réelles.</p>
              </div>
            </div>
            <div className="flex items-center gap-3.5">
              <div className="rounded-lg p-2 flex items-center justify-center" style={{ background: 'var(--glow-green)' }}>
                <Users className="h-4 w-4" style={{ color: 'var(--accent-green)' }} />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider">Réseautage &amp; Collaboration</h4>
                <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Trouvez des collaborateurs pour vos projets open source.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex gap-6 text-[10px]" style={{ color: 'var(--text-muted)' }}>
          <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" style={{ color: 'var(--accent-green)' }} /> Certifié Open-Source</span>
          <span className="flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5" style={{ color: 'var(--accent-orange)' }} /> Communauté active</span>
        </div>
      </div>

      {/* ── MOBILE ONLY: TOP WAVE HEADER ── */}
      <div 
        className="md:hidden relative pt-12 pb-14 px-6 flex flex-col items-center justify-center overflow-visible transition-colors duration-300"
        style={{ 
          backgroundColor: 'var(--card-bg)',
          borderBottom: '1px solid var(--border-col)',
          borderRadius: '0 0 40px 40px' 
        }}
      >
        {/* Animated Yin-Yang style curve at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-10 translate-y-[99%] pointer-events-none overflow-hidden">
          <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,0 C150,110 350,-40 500,50 L500,150 L0,150 Z" fill="var(--bg)" />
          </svg>
        </div>

        {/* Logo Icon */}
        <div className="w-14 h-14 flex items-center justify-center mb-2" style={{ color: 'var(--accent-orange)' }}>
          <svg className="w-full h-full text-current" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M25 20C25 20 45 10 65 25C85 40 75 70 55 75C35 80 20 60 35 45C50 30 75 50 65 65" 
              stroke="currentColor" 
              strokeWidth="10" 
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Brand Name */}
        <h1 className="font-display text-xl font-bold tracking-wider" style={{ color: 'var(--text-main)' }}>
          Dev<span style={{ color: 'var(--accent-orange)' }}>Bénin</span>
        </h1>
        <p className="text-[9px] uppercase tracking-widest font-semibold mt-1" style={{ color: 'var(--text-muted)' }}>
          Communauté de Développeurs
        </p>
      </div>

      {/* ── RIGHT PANEL / BOTTOM AREA (Form Container) ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-12 z-10">
        
        {/* Tab switcher */}
        <div 
          className="w-full max-w-xs p-1 rounded-full flex mb-10"
          style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border-col)' }}
        >
          <button
            onClick={() => handleTabChange('login')}
            className="flex-1 py-2 text-xs font-semibold rounded-full transition-all duration-300 relative"
            style={{ color: activeTab === 'login' ? '#ffffff' : 'var(--text-muted)' }}
          >
            {activeTab === 'login' && (
              <motion.div
                layoutId="activeTabGlow"
                className="absolute inset-0 rounded-full z-0"
                style={{ backgroundColor: 'var(--accent-orange)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">Login</span>
          </button>

          <button
            onClick={() => handleTabChange('register')}
            className="flex-1 py-2 text-xs font-semibold rounded-full transition-all duration-300 relative"
            style={{ color: activeTab === 'register' ? '#ffffff' : 'var(--text-muted)' }}
          >
            {activeTab === 'register' && (
              <motion.div
                layoutId="activeTabGlow"
                className="absolute inset-0 rounded-full z-0"
                style={{ backgroundColor: 'var(--accent-orange)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">Sign up</span>
          </button>
        </div>

        {/* Form container */}
        <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-6">
          <AnimatePresence mode="wait">
            {activeTab === 'register' ? (
              <motion.div
                key="register-fields"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Username / Name */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider block" style={{ color: 'var(--text-muted)' }}>
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: John Doe"
                    className="w-full bg-transparent border-b py-2 text-sm text-current focus:outline-none transition-all"
                    style={{ borderColor: 'var(--border-col)' }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent-orange)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-col)'}
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider block" style={{ color: 'var(--text-muted)' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nom@exemple.com"
                    className="w-full bg-transparent border-b py-2 text-sm text-current focus:outline-none transition-all"
                    style={{ borderColor: 'var(--border-col)' }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent-orange)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-col)'}
                  />
                </div>

                {/* Tech Stack Specialty */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider block" style={{ color: 'var(--text-muted)' }}>
                    Spécialité
                  </label>
                  <select
                    value={techStack}
                    onChange={(e) => setTechStack(e.target.value)}
                    className="w-full bg-transparent border-b py-2 text-sm text-current focus:outline-none transition-all cursor-pointer"
                    style={{ borderColor: 'var(--border-col)', colorScheme: 'dark' }}
                  >
                    <option value="Frontend" className="bg-neutral-900 text-white">Frontend (React, Vue)</option>
                    <option value="Backend" className="bg-neutral-900 text-white">Backend (Node, Python)</option>
                    <option value="Fullstack" className="bg-neutral-900 text-white">Fullstack</option>
                    <option value="Mobile" className="bg-neutral-900 text-white">Mobile (Flutter)</option>
                  </select>
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider block" style={{ color: 'var(--text-muted)' }}>
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-transparent border-b py-2 text-sm text-current focus:outline-none transition-all"
                    style={{ borderColor: 'var(--border-col)' }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent-orange)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-col)'}
                  />
                </div>

                {/* Confirm Password */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider block" style={{ color: 'var(--text-muted)' }}>
                    Confirm password
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-transparent border-b py-2 text-sm text-current focus:outline-none transition-all"
                    style={{ borderColor: 'var(--border-col)' }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent-orange)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-col)'}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="login-fields"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Email */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider block" style={{ color: 'var(--text-muted)' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nom@exemple.com"
                    className="w-full bg-transparent border-b py-2 text-sm text-current focus:outline-none transition-all"
                    style={{ borderColor: 'var(--border-col)' }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent-orange)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-col)'}
                  />
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider block" style={{ color: 'var(--text-muted)' }}>
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-transparent border-b py-2 text-sm text-current focus:outline-none transition-all"
                    style={{ borderColor: 'var(--border-col)' }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent-orange)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-col)'}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <div
              className="rounded-md px-3 py-2 text-[11px] font-medium"
              style={{
                background: 'var(--glow-orange)',
                border: '1px solid var(--border-orange)',
                color: 'var(--accent-orange)'
              }}
            >
              {error}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-orange py-3 rounded-full text-xs font-semibold tracking-wider hover:opacity-90 transition-opacity mt-8 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              activeTab === 'login' ? 'Login' : 'Sign up'
            )}
          </button>
        </form>

        {/* Back Link */}
        <Link 
          to="/" 
          className="mt-8 text-[11px] hover:opacity-80 transition-opacity"
          style={{ color: 'var(--text-muted)' }}
        >
          ← Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
