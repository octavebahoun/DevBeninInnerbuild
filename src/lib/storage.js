const isBrowser = typeof window !== 'undefined';

const createId = () => `u_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

export const readJSON = (key, fallback) => {
  if (!isBrowser) return fallback;
  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

export const writeJSON = (key, value) => {
  if (!isBrowser) return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const removeKey = (key) => {
  if (!isBrowser) return;
  window.localStorage.removeItem(key);
};

const USERS_KEY = 'devbenin-users';
const SESSION_KEY = 'devbenin-session';

const normalizeEmail = (email) => email.trim().toLowerCase();

export const authStore = {
  getUsers() {
    const users = readJSON(USERS_KEY, []);
    return Array.isArray(users) ? users : [];
  },
  saveUsers(users) {
    writeJSON(USERS_KEY, users);
  },
  createUser(payload) {
    const users = this.getUsers();
    const email = normalizeEmail(payload.email || '');
    const exists = users.find((u) => normalizeEmail(u.email) === email);
    if (exists) {
      return { ok: false, error: 'Un compte existe deja avec cet email.' };
    }
    const user = {
      id: createId(),
      name: payload.name?.trim() || 'Utilisateur',
      email,
      password: payload.password || '',
      techStack: payload.techStack || 'Frontend',
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    this.saveUsers(users);
    return { ok: true, user };
  },
  getUserById(userId) {
    if (!userId) return null;
    const users = this.getUsers();
    return users.find((u) => u.id === userId) || null;
  },
  updateUser(userId, updates) {
    const users = this.getUsers();
    const index = users.findIndex((u) => u.id === userId);
    if (index === -1) return { ok: false, error: 'Utilisateur introuvable.' };
    const nextUser = { ...users[index], ...updates, id: userId };
    users[index] = nextUser;
    this.saveUsers(users);
    return { ok: true, user: nextUser };
  },
  validateUser(email, password) {
    const users = this.getUsers();
    const normalizedEmail = normalizeEmail(email || '');
    const user = users.find((u) => normalizeEmail(u.email) === normalizedEmail);
    if (!user || user.password !== password) {
      return { ok: false, error: 'Email ou mot de passe invalide.' };
    }
    return { ok: true, user };
  },
  getSession() {
    return readJSON(SESSION_KEY, null);
  },
  setSession(session) {
    writeJSON(SESSION_KEY, session);
  },
  clearSession() {
    removeKey(SESSION_KEY);
  },
};
