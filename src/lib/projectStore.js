import { readJSON, writeJSON } from './storage';
import initialProjects from '../data/projects.json';

const PROJECTS_KEY = 'devbenin-projects';
const LIKES_KEY = 'devbenin-project-likes';

const createId = () => `c_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

const normalizeProject = (project) => {
  const seed = initialProjects.find((p) => p.id === project.id);
  return {
    ...project,
    owner: project.owner || seed?.owner || 'Membre DevBenin',
    ownerEmail: project.ownerEmail || seed?.ownerEmail || 'contact@devbenin.bj',
    ownerAvatar: project.ownerAvatar || seed?.ownerAvatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80&q=80",
    image: project.image || seed?.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    likes: Number(project.likes) || 0,
    comments: Array.isArray(project.comments) ? project.comments : [],
    techStack: Array.isArray(project.techStack) ? project.techStack : [],
    tags: Array.isArray(project.tags) ? project.tags : [],
  };
};

const normalizeList = (list) => list.map(normalizeProject);

const getLikesMap = () => {
  const map = readJSON(LIKES_KEY, {});
  if (!map || typeof map !== 'object') return {};
  return map;
};

const saveLikesMap = (map) => {
  writeJSON(LIKES_KEY, map);
};

export const projectStore = {
  getProjects() {
    const stored = readJSON(PROJECTS_KEY, null);
    if (Array.isArray(stored) && stored.length > 0) {
      return normalizeList(stored);
    }
    const seeded = normalizeList(initialProjects);
    writeJSON(PROJECTS_KEY, seeded);
    return seeded;
  },
  saveProjects(projects) {
    writeJSON(PROJECTS_KEY, normalizeList(projects));
  },
  getLikesMap() {
    return getLikesMap();
  },
  getProjectById(projectId) {
    if (!projectId) return null;
    const projects = this.getProjects();
    return projects.find((project) => project.id === projectId) || null;
  },
  toggleLike(projectId) {
    const likesMap = getLikesMap();
    const isLiked = Boolean(likesMap[projectId]);
    const nextLikesMap = { ...likesMap, [projectId]: !isLiked };
    const projects = this.getProjects();
    const nextProjects = projects.map((project) => {
      if (project.id === projectId) {
        const nextLikes = isLiked ? Math.max(0, project.likes - 1) : project.likes + 1;
        return { ...project, likes: nextLikes };
      }
      return project;
    });
    this.saveProjects(nextProjects);
    saveLikesMap(nextLikesMap);
    return { projects: nextProjects, likesMap: nextLikesMap };
  },
  updateProject(projectId, updates) {
    const projects = this.getProjects();
    const index = projects.findIndex((project) => project.id === projectId);
    if (index === -1) {
      return { ok: false, error: 'Projet introuvable.', projects, project: null };
    }

    const nextProject = {
      ...projects[index],
      ...updates,
      id: projectId,
      updatedAt: new Date().toISOString(),
    };

    const nextProjects = [...projects];
    nextProjects[index] = normalizeProject(nextProject);
    this.saveProjects(nextProjects);
    return { ok: true, projects: nextProjects, project: nextProjects[index] };
  },
  addComment(projectId, payload) {
    const projects = this.getProjects();
    const index = projects.findIndex((project) => project.id === projectId);
    if (index === -1) {
      return { ok: false, error: 'Projet introuvable.', projects, project: null };
    }

    const author = payload.author?.trim() || 'Anonyme';
    const message = payload.message?.trim() || '';
    if (!message) {
      return { ok: false, error: 'Le message est requis.', projects, project: projects[index] };
    }

    const nextProject = {
      ...projects[index],
      comments: [
        {
          id: createId(),
          author,
          message,
          createdAt: new Date().toISOString(),
        },
        ...projects[index].comments,
      ],
    };

    const nextProjects = [...projects];
    nextProjects[index] = nextProject;
    this.saveProjects(nextProjects);
    return { ok: true, projects: nextProjects, project: nextProject };
  },
};
