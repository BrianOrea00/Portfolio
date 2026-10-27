import { useCallback } from 'react';
import { commands } from '../commands';
import { projects } from '../data/projects';

interface CommandSuggestion {
  label: string;
  command: string;
}

interface CompletionResult {
  value: string;
  suggestions: CommandSuggestion[];
}

const PROJECT_IDS = projects.map((project) => project.id);

function commonPrefix(values: string[]): string {
  const first = values[0];
  if (first === undefined) {
    return '';
  }

  return values.reduce((prefix, value) => {
    let index = 0;
    while (
      index < prefix.length &&
      index < value.length &&
      prefix.charAt(index) === value.charAt(index)
    ) {
      index += 1;
    }
    return prefix.slice(0, index);
  }, first);
}

function projectSuggestions(ids: string[]): CommandSuggestion[] {
  return ids.map((id) => ({ label: id, command: `open ${id}` }));
}

export function useAutocomplete() {
  return useCallback((input: string): CompletionResult | null => {
    const trimmed = input.trimStart();

    if (trimmed === 'open') {
      return { value: 'open ', suggestions: projectSuggestions(PROJECT_IDS) };
    }

    if (trimmed.startsWith('open ')) {
      const fragment = trimmed.slice('open '.length);
      const matches = PROJECT_IDS.filter((id) => id.startsWith(fragment));

      if (matches.length === 0) {
        return null;
      }

      if (matches.length === 1) {
        const match = matches[0];
        if (match === undefined) {
          return null;
        }
        if (match === fragment) {
          return { value: input, suggestions: projectSuggestions(matches) };
        }
        return { value: `open ${match}`, suggestions: [] };
      }

      const prefix = commonPrefix(matches);
      return {
        value: prefix.length > fragment.length ? `open ${prefix}` : input,
        suggestions: projectSuggestions(matches),
      };
    }

    if (/\s/.test(trimmed)) {
      return null;
    }

    const matches = commands.filter((command) => command.name.startsWith(trimmed));

    if (matches.length === 0) {
      return null;
    }

    if (matches.length === 1) {
      const match = matches[0];
      if (match === undefined) {
        return null;
      }
      if (match.name === trimmed) {
        return {
          value: input,
          suggestions: [{ label: match.name, command: match.name }],
        };
      }
      return {
        value: `${match.name} `,
        suggestions: [],
      };
    }

    const prefix = commonPrefix(matches.map((command) => command.name));
    return {
      value: prefix.length > trimmed.length ? prefix : input,
      suggestions: matches.map((command) => ({
        label: command.name,
        command: command.name,
      })),
    };
  }, []);
}
