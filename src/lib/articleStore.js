import { readJSON, writeJSON } from './storage';
import initialArticles from '../data/articles.json';

const ARTICLES_KEY = 'devbenin-articles';
const LEGACY_KEY = 'devbenin-blog-counts';
const LIKES_KEY = 'devbenin-article-likes';
const LEGACY_LIKES_KEY = 'devbenin-blog-likes';

const createId = () => `a_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

const normalizeArticle = (article) => {
  const seed = initialArticles.find((a) => a.id === article.id);
  return {
    ...article,
    likes: Number(article.likes) || 0,
    comments: Number(article.comments) || 0,
    views: Number(article.views) || seed?.views || 5,
    tags: Array.isArray(article.tags) ? article.tags : [],
    category: article.category || seed?.category || 'General',
    readTime: article.readTime || '4 min',
    image: article.image || seed?.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80',
    date: article.date || seed?.date || 'il y a 2h',
    content: article.content || seed?.content || article.preview || '',
  };
};

const normalizeList = (list) => list.map(normalizeArticle);

const getStoredList = (key) => {
  const data = readJSON(key, null);
  return Array.isArray(data) ? data : null;
};

const getLikesMap = () => {
  const map = readJSON(LIKES_KEY, null);
  if (map && typeof map === 'object') return map;
  const legacy = readJSON(LEGACY_LIKES_KEY, null);
  if (legacy && typeof legacy === 'object') {
    writeJSON(LIKES_KEY, legacy);
    return legacy;
  }
  return {};
};

const saveLikesMap = (map) => {
  writeJSON(LIKES_KEY, map);
  writeJSON(LEGACY_LIKES_KEY, map);
};

export const articleStore = {
  getArticles() {
    const stored = getStoredList(ARTICLES_KEY) || getStoredList(LEGACY_KEY);
    if (stored && stored.length > 0) {
      const normalized = normalizeList(stored);
      writeJSON(ARTICLES_KEY, normalized);
      writeJSON(LEGACY_KEY, normalized);
      return normalized;
    }
    const seeded = normalizeList(initialArticles);
    writeJSON(ARTICLES_KEY, seeded);
    writeJSON(LEGACY_KEY, seeded);
    return seeded;
  },
  saveArticles(articles) {
    const normalized = normalizeList(articles);
    writeJSON(ARTICLES_KEY, normalized);
    writeJSON(LEGACY_KEY, normalized);
  },
  getLikesMap() {
    return getLikesMap();
  },
  toggleLike(articleId) {
    const likesMap = getLikesMap();
    const isLiked = Boolean(likesMap[articleId]);
    const nextLikesMap = { ...likesMap, [articleId]: !isLiked };
    const articles = this.getArticles();
    const nextArticles = articles.map((article) => {
      if (article.id === articleId) {
        const nextLikes = isLiked ? Math.max(0, article.likes - 1) : article.likes + 1;
        return { ...article, likes: nextLikes };
      }
      return article;
    });
    this.saveArticles(nextArticles);
    saveLikesMap(nextLikesMap);
    return { articles: nextArticles, likesMap: nextLikesMap };
  },
  addArticle(payload) {
    const title = payload.title?.trim() || '';
    const preview = payload.preview?.trim() || '';
    if (!title || !preview) {
      return { ok: false, error: 'Titre et description sont requis.', articles: this.getArticles() };
    }

    const author = payload.author?.trim() || 'Anonyme';
    const category = payload.category?.trim() || 'General';
    const tags = Array.isArray(payload.tags) ? payload.tags : [];
    const readTime = payload.readTime?.trim() || '4 min';
    const content = payload.content?.trim() || preview;
    const image = payload.image?.trim() || '';
    const date = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });

    const newArticle = normalizeArticle({
      id: createId(),
      title,
      preview,
      content,
      image,
      author,
      date,
      readTime,
      tags,
      comments: 0,
      likes: 0,
      category,
    });

    const articles = this.getArticles();
    const nextArticles = [newArticle, ...articles];
    this.saveArticles(nextArticles);
    return { ok: true, articles: nextArticles, article: newArticle };
  },
  getArticleById(id) {
    const articles = this.getArticles();
    const art = articles.find((a) => a.id === id);
    if (art) {
      // Dynamic views incrementation on load
      art.views = (art.views || 0) + 1;
      this.saveArticles(articles);
    }
    return art || null;
  },
};
