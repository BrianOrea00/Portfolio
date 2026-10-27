import type { SkillGroup } from '../types';

export const skillGroups: SkillGroup[] = [
  {
    label: 'Frontend',
    skills: [
      { name: 'React', level: 85 },
      { name: 'TypeScript', level: 78 },
      { name: 'HTML / CSS', level: 88 },
    ],
  },
  {
    label: 'Backend',
    skills: [
      { name: 'Node.js', level: 80 },
      { name: 'REST APIs', level: 75 },
      { name: 'Python', level: 82 },
    ],
  },
  {
    label: 'Database',
    skills: [
      { name: 'PostgreSQL', level: 75 },
      { name: 'SQL', level: 78 },
    ],
  },
  {
    label: 'Desktop',
    skills: [{ name: 'Python desktop apps', level: 75 }],
  },
  {
    label: 'Systems / Tools',
    skills: [
      { name: 'Linux', level: 80 },
      { name: 'Git', level: 82 },
      { name: 'Vite', level: 75 },
    ],
  },
];
