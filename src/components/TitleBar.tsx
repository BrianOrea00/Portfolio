import type { Theme } from '../types';

interface TitleBarProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export function TitleBar({ theme, onToggleTheme }: TitleBarProps) {
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <div className="titlebar">
      <span className="titlebar__dots" aria-hidden="true">
        <span className="titlebar__dot titlebar__dot--error" />
        <span className="titlebar__dot titlebar__dot--warn" />
        <span className="titlebar__dot titlebar__dot--success" />
      </span>
      <span className="titlebar__title">arisu@portfolio: ~</span>
      <button
        type="button"
        className="theme-toggle"
        onClick={onToggleTheme}
        aria-label={`Switch to ${nextTheme} theme`}
      >
        theme: {theme}
      </button>
    </div>
  );
}
