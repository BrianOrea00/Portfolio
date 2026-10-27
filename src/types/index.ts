import type { ReactNode } from 'react';

export type Theme = 'dark' | 'light';

export type LineKind = 'input' | 'output' | 'error' | 'system';

export interface Line {
  id: string;
  kind: LineKind;
  node: ReactNode;
}

export interface CommandContext {
  toggleTheme: () => void;
  clear: () => void;
  theme: Theme;
}

export interface Command {
  name: string;
  description: string;
  usage?: string;
  aliases?: string[];
  run(args: string[], ctx: CommandContext): ReactNode;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  role: string;
  status: string;
  liveUrl: string;
  repoUrl: string;
  year: number;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillGroup {
  label: string;
  skills: Skill[];
}

export interface Profile {
  name: string;
  handle: string;
  role: string;
  location: string;
  education: string;
  focus: string;
  availability: string;
  email: string;
  github: string;
  facebook: string;
  resumeUrl: string;
  bio: string[];
}

export type HistoryDirection = 'up' | 'down';
