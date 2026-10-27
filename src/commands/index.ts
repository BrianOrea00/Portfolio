import type { Command } from '../types';
import { about } from './about';
import { contact } from './contact';
import { ls, sudo, whoami } from './fun';
import { createHelpCommand } from './help';
import { openProject, projects } from './projects';
import { resume } from './resume';
import { skills } from './skills';
import { theme } from './theme';

const clear: Command = {
  name: 'clear',
  description: 'Clear the terminal scrollback.',
  usage: 'clear',
  run: (_args, ctx) => {
    ctx.clear();
    return null;
  },
};

export const commands: Command[] = [
  createHelpCommand(() => commands),
  about,
  projects,
  openProject,
  skills,
  resume,
  contact,
  theme,
  clear,
  whoami,
  ls,
  sudo,
];

export function resolveCommand(raw: string): { command: Command; args: string[] } | null {
  const trimmed = raw.trim();
  if (trimmed.length === 0) {
    return null;
  }

  const aliasMatch = commands.find((command) =>
    (command.aliases ?? []).includes(trimmed),
  );

  if (aliasMatch !== undefined) {
    return { command: aliasMatch, args: [] };
  }

  const [name, ...args] = trimmed.split(/\s+/);
  if (name === undefined) {
    return null;
  }

  const command = commands.find((entry) => entry.name === name);
  if (command === undefined) {
    return null;
  }

  return { command, args };
}
