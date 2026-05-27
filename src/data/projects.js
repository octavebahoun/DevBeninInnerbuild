export const initialProjects = [
  {
    id: 'devbenin-platform',
    title: 'DevBenin Platform',
    summary: 'Rebuild complet de la plateforme communautaire avec pages, profils et contenus.',
    description: 'Projet open source qui recree les parcours clés: home, projets, blog, quiz et leaderboard. Objectif: une base front solide, rapide et scalable.',
    category: 'Community',
    status: 'Active',
    owner: 'Oktav Dev',
    ownerEmail: 'oktav.dev@example.com',
    techStack: ['React', 'Vite', 'Tailwind', 'GSAP'],
    tags: ['Open Source', 'Community'],
    likes: 128,
    comments: [
      {
        id: 'c_devbenin_1',
        author: 'Amina Bello',
        message: 'La structure est claire, bonne base pour ajouter les features.',
        createdAt: '2026-05-10T09:00:00Z'
      },
      {
        id: 'c_devbenin_2',
        author: 'Ronald Hounnou',
        message: 'Belle coherence visuelle, les sections sont bien rythmees.',
        createdAt: '2026-05-12T13:30:00Z'
      }
    ],
    createdAt: '2026-04-10T08:00:00Z',
    updatedAt: '2026-05-20T18:00:00Z',
    featured: true
  },
  {
    id: 'tontinechain',
    title: 'TontineChain',
    summary: 'Plateforme Web3 pour gerer des tontines et epargne collective.',
    description: 'Gestion de cycles, contributions et historique via un dashboard moderne. Cible: communaute locale et usage mobile first.',
    category: 'Fintech',
    status: 'In review',
    owner: 'Precieux Dev',
    ownerEmail: 'precieux.dev@example.com',
    techStack: ['React', 'Node', 'Solidity'],
    tags: ['Web3', 'Finance'],
    likes: 72,
    comments: [
      {
        id: 'c_tontine_1',
        author: 'Precieux Dev',
        message: 'Flow clair, on voit bien la logique de cycle.',
        createdAt: '2026-05-14T16:20:00Z'
      }
    ],
    createdAt: '2026-03-28T09:30:00Z',
    updatedAt: '2026-05-18T15:10:00Z',
    featured: false
  },
  {
    id: 'codetovecto',
    title: 'CodeToVecto',
    summary: 'Suite d outils AI pour transformer du code en design system.',
    description: 'Analyse de composants, generation de tokens et documentation automatique pour accelerer les equipes UI.',
    category: 'AI Tools',
    status: 'Active',
    owner: 'Ronald Hounnou',
    ownerEmail: 'ronald.hounnou@example.com',
    techStack: ['React', 'Python', 'FastAPI'],
    tags: ['AI', 'Design'],
    likes: 94,
    comments: [
      {
        id: 'c_codetovecto_1',
        author: 'Oktav Dev',
        message: 'Gros potentiel pour la documentation des DS.',
        createdAt: '2026-05-09T11:45:00Z'
      }
    ],
    createdAt: '2026-04-02T10:15:00Z',
    updatedAt: '2026-05-21T08:00:00Z',
    featured: true
  },
  {
    id: 'benin-maps',
    title: 'Benin Maps',
    summary: 'Visualisation de donnees publiques avec cartes interactives.',
    description: 'Cartes dynamiques, exploration par region et tableau de bord data. Usage pour education et media.',
    category: 'Data',
    status: 'Active',
    owner: 'Amina Bello',
    ownerEmail: 'amina.bello@example.com',
    techStack: ['Vue', 'D3', 'Node'],
    tags: ['Data', 'Maps'],
    likes: 63,
    comments: [],
    createdAt: '2026-02-22T12:00:00Z',
    updatedAt: '2026-05-02T14:30:00Z',
    featured: false
  },
  {
    id: 'learn-benin',
    title: 'Learn Benin',
    summary: 'Plateforme de cours tech avec parcours adaptes au marche local.',
    description: 'Cours, quiz et suivi de progression pour debutants et profils en reconversion.',
    category: 'Education',
    status: 'Active',
    owner: 'Oktav Dev',
    ownerEmail: 'oktav.dev@example.com',
    techStack: ['Next.js', 'Prisma', 'PostgreSQL'],
    tags: ['EdTech', 'Learning'],
    likes: 110,
    comments: [
      {
        id: 'c_learn_1',
        author: 'Amina Bello',
        message: 'Les parcours sont bien structures, bon potentiel local.',
        createdAt: '2026-04-25T17:00:00Z'
      }
    ],
    createdAt: '2026-01-18T07:40:00Z',
    updatedAt: '2026-05-05T09:20:00Z',
    featured: true
  },
  {
    id: 'agro-connect',
    title: 'Agro Connect',
    summary: 'Mise en relation entre agriculteurs, cooperatives et acheteurs.',
    description: 'Catalogue de produits, gestion de commandes et suivi logistique en temps reel.',
    category: 'AgriTech',
    status: 'In review',
    owner: 'Precieux Dev',
    ownerEmail: 'precieux.dev@example.com',
    techStack: ['React', 'Firebase'],
    tags: ['AgriTech', 'Marketplace'],
    likes: 58,
    comments: [],
    createdAt: '2026-03-05T11:20:00Z',
    updatedAt: '2026-05-11T10:05:00Z',
    featured: false
  }
];
