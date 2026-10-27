import { useEffect, useRef } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import type { HistoryDirection, Line, Theme } from '../types';
import { Chips } from './Chips';
import { Output } from './Output';
import { Prompt } from './Prompt';
import { TitleBar } from './TitleBar';

interface TerminalProps {
  lines: Line[];
  theme: Theme;
  onRun: (command: string) => void;
  onNavigate: (direction: HistoryDirection, current: string) => string | null;
  onClear: () => void;
  onToggleTheme: () => void;
  onNotice: (node: ReactNode) => void;
}

export function Terminal({
  lines,
  theme,
  onRun,
  onNavigate,
  onClear,
  onToggleTheme,
  onNotice,
}: TerminalProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === 'l') {
        event.preventDefault();
        onClear();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClear]);

  const focusInput = (event: MouseEvent<HTMLElement>) => {
    if (event.target instanceof Element) {
      const interactive = event.target.closest(
        'a, button, input, textarea, select, [role="button"]',
      );
      if (interactive !== null) {
        return;
      }
    }

    if (window.getSelection()?.isCollapsed === false) {
      return;
    }

    inputRef.current?.focus();
  };

  return (
    <section className="terminal" aria-label="Interactive terminal" onClick={focusInput}>
      <TitleBar theme={theme} onToggleTheme={onToggleTheme} />
      <div className="terminal__body">
        <Output lines={lines} />
        <div className="terminal__footer">
          <Prompt
            inputRef={inputRef}
            onRun={onRun}
            onNavigate={onNavigate}
            onNotice={onNotice}
          />
          <Chips onRun={onRun} />
        </div>
      </div>
    </section>
  );
}
