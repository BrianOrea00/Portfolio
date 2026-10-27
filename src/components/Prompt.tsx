import { useEffect, useState } from 'react';
import type { FormEvent, KeyboardEvent, ReactNode, RefObject } from 'react';
import { useAutocomplete } from '../hooks/useAutocomplete';
import type { HistoryDirection } from '../types';
import { CommandLink } from './CommandLink';

interface PromptProps {
  inputRef: RefObject<HTMLInputElement | null>;
  onRun: (command: string) => void;
  onNavigate: (direction: HistoryDirection, current: string) => string | null;
  onNotice: (node: ReactNode) => void;
}

export function Prompt({ inputRef, onRun, onNavigate, onNotice }: PromptProps) {
  const [value, setValue] = useState('');
  const complete = useAutocomplete();

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const command = value.trim();
    if (command.length === 0) {
      return;
    }
    onRun(command);
    setValue('');
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      const next = onNavigate(event.key === 'ArrowUp' ? 'up' : 'down', value);
      if (next !== null) {
        setValue(next);
      }
      return;
    }

    if (event.key !== 'Tab') {
      return;
    }

    if (event.shiftKey || value.length === 0) {
      return;
    }

    event.preventDefault();
    const result = complete(value);
    if (result === null) {
      return;
    }

    if (result.value !== value) {
      setValue(result.value);
    }

    if (result.suggestions.length > 0) {
      onNotice(
        <span className="completion">
          <span className="muted-text">completions:</span>{' '}
          {result.suggestions.map((suggestion, index) => (
            <span key={suggestion.command}>
              <CommandLink command={suggestion.command}>{suggestion.label}</CommandLink>
              {index < result.suggestions.length - 1 ? '  ' : null}
            </span>
          ))}
        </span>,
      );
    }
  };

  return (
    <>
      <span id="terminal-input-hint" className="sr-only">
        Type a command and press Enter. The Up and Down arrows browse command history, Tab
        completes commands and project ids, and Ctrl+L clears the screen.
      </span>
      <form className="prompt" onSubmit={handleSubmit}>
        <span className="prompt__glyph" aria-hidden="true">
          ❯
        </span>
        <input
          ref={inputRef}
          className="prompt__input"
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Terminal command input"
          aria-describedby="terminal-input-hint"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="send"
        />
      </form>
    </>
  );
}
