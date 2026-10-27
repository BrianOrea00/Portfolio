import type { Command } from '../types';

export const theme: Command = {
  name: 'theme',
  description: 'Toggle between the dark and light themes.',
  usage: 'theme',
  run: (_args, ctx) => {
    const next = ctx.theme === 'dark' ? 'light' : 'dark';
    ctx.toggleTheme();
    return (
      <span>
        <span className="success-text" aria-hidden="true">
          ✓{' '}
        </span>
        Theme set to <span className="strong-text">{next}</span>. Saved in this browser.
      </span>
    );
  },
};
