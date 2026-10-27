import { useCallback, useReducer } from 'react';
import type { ReactNode } from 'react';
import { resolveCommand } from './commands';
import { AsciiArt } from './components/AsciiArt';
import { CommandLink, TerminalActionsProvider } from './components/CommandLink';
import { Terminal } from './components/Terminal';
import { profile } from './data/profile';
import { useHistory } from './hooks/useHistory';
import { useTheme } from './hooks/useTheme';
import type { CommandContext, Line, LineKind } from './types';

interface TerminalState {
  lines: Line[];
  nextId: number;
}

type TerminalAction =
  | { type: 'submit'; text: string }
  | { type: 'append'; kind: Exclude<LineKind, 'input'>; node: ReactNode }
  | { type: 'clear' };

function createInitialState(): TerminalState {
  const lines: Line[] = [
    { id: 'l0', kind: 'system', node: <AsciiArt /> },
    {
      id: 'l1',
      kind: 'output',
      node: (
        <div className="boot">
          <p>
            <span className="accent-text">Welcome.</span> I'm {profile.name} ({profile.handle}) —{' '}
            {profile.role.toLowerCase()}.
          </p>
          <p className="dim-text">
            {profile.location} · {profile.availability}
          </p>
          <p className="muted-text">
            Type <CommandLink command="help">help</CommandLink> for commands, or tap one below.
          </p>
        </div>
      ),
    },
  ];

  return { lines, nextId: lines.length };
}

function reducer(state: TerminalState, action: TerminalAction): TerminalState {
  switch (action.type) {
    case 'submit': {
      const line: Line = {
        id: `l${state.nextId}`,
        kind: 'input',
        node: action.text,
      };
      return { lines: [...state.lines, line], nextId: state.nextId + 1 };
    }
    case 'append': {
      const line: Line = {
        id: `l${state.nextId}`,
        kind: action.kind,
        node: action.node,
      };
      return { lines: [...state.lines, line], nextId: state.nextId + 1 };
    }
    case 'clear':
      return { lines: [], nextId: state.nextId };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState);
  const { theme, toggleTheme } = useTheme();
  const { push, navigate } = useHistory();

  const clear = useCallback(() => {
    dispatch({ type: 'clear' });
  }, []);

  const notice = useCallback((node: ReactNode) => {
    dispatch({ type: 'append', kind: 'system', node });
  }, []);

  const run = useCallback(
    (raw: string) => {
      const text = raw.trim();
      if (text.length === 0) {
        return;
      }

      push(text);
      dispatch({ type: 'submit', text });

      const match = resolveCommand(text);
      if (match === null) {
        const commandName = text.split(/\s+/)[0] ?? text;
        dispatch({
          type: 'append',
          kind: 'error',
          node: (
            <span>
              <span aria-hidden="true">✗ </span>
              <span className="error-text">{commandName}</span>: command not found. Type{' '}
              <CommandLink command="help">help</CommandLink> for the list.
            </span>
          ),
        });
        return;
      }

      const context: CommandContext = { toggleTheme, clear, theme };
      const node = match.command.run(match.args, context);

      if (node !== null && node !== undefined) {
        dispatch({ type: 'append', kind: 'output', node });
      }
    },
    [clear, push, theme, toggleTheme],
  );

  return (
    <main className="app">
      <h1 className="sr-only">Brian Orea — Developer</h1>
      <TerminalActionsProvider run={run}>
        <Terminal
          lines={state.lines}
          theme={theme}
          onRun={run}
          onNavigate={navigate}
          onClear={clear}
          onToggleTheme={toggleTheme}
          onNotice={notice}
        />
      </TerminalActionsProvider>
    </main>
  );
}
