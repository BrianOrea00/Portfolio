import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

interface TerminalActions {
  run: (command: string) => void;
}

const TerminalActionsContext = createContext<TerminalActions | null>(null);

interface TerminalActionsProviderProps {
  run: (command: string) => void;
  children: ReactNode;
}

export function TerminalActionsProvider({ run, children }: TerminalActionsProviderProps) {
  return (
    <TerminalActionsContext.Provider value={{ run }}>
      {children}
    </TerminalActionsContext.Provider>
  );
}

interface CommandLinkProps {
  command: string;
  children: ReactNode;
}

export function CommandLink({ command, children }: CommandLinkProps) {
  const actions = useContext(TerminalActionsContext);

  if (actions === null) {
    throw new Error('CommandLink must be rendered inside TerminalActionsProvider.');
  }

  return (
    <button type="button" className="cmd-link" onClick={() => actions.run(command)}>
      {children}
    </button>
  );
}

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
}

export function ExternalLink({ href, children }: ExternalLinkProps) {
  return (
    <a className="link" href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="external-mark" aria-hidden="true">
        {' '}
        ↗
      </span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
