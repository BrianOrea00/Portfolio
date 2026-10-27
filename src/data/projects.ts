import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'ayos-ai',
    name: 'ayos-AI',
    tagline: 'AI-assisted motorcycle mechanic booking and diagnostics for Pandi, Bulacan',
    description:
      'Thesis project: an AI-assisted booking and diagnostic system for motorcycle mechanics in Pandi, Bulacan. The stack is provisional until the thesis implementation review is complete.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Python (to confirm)'],
    role: 'Thesis developer',
    status: 'Thesis · in progress',
    liveUrl: '#',
    repoUrl: '#',
    year: 2026,
  },
  {
    id: 'paschal-inventory',
    name: 'Paschal Inventory',
    tagline: 'Inventory and requisition system for Paschal Multi-Purpose Cooperative',
    description:
      'Client work: an inventory and requisition system built for Paschal Multi-Purpose Cooperative.',
    stack: ['React', 'Node.js', 'PostgreSQL'],
    role: 'Freelance developer',
    status: 'Client work',
    liveUrl: '#',
    repoUrl: '#',
    year: 2026,
  },
  {
    id: 'threejs-realism',
    name: 'Three.js Realism',
    tagline: 'Browser scenes pushing visual realism in pure code',
    description:
      'Personal experiments in lighting, materials, and scene composition, rendered in the browser with Three.js.',
    stack: ['Three.js', 'JavaScript'],
    role: 'Personal project',
    status: 'Personal',
    liveUrl: '#',
    repoUrl: '#',
    year: 2026,
  },
];
