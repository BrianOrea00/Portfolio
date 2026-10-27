import { useCallback, useRef, useState } from 'react';
import type { HistoryDirection } from '../types';

export function useHistory() {
  const [entries, setEntries] = useState<string[]>([]);
  const indexRef = useRef<number | null>(null);
  const draftRef = useRef('');

  const push = useCallback((command: string) => {
    setEntries((previous) => [...previous, command]);
    indexRef.current = null;
    draftRef.current = '';
  }, []);

  const navigate = useCallback(
    (direction: HistoryDirection, current: string): string | null => {
      if (entries.length === 0) {
        return null;
      }

      if (indexRef.current === null) {
        if (direction === 'down') {
          return null;
        }
        draftRef.current = current;
        const newest = entries.length - 1;
        indexRef.current = newest;
        return entries[newest] ?? '';
      }

      if (direction === 'up') {
        const previous = indexRef.current > 0 ? indexRef.current - 1 : 0;
        indexRef.current = previous;
        return entries[previous] ?? '';
      }

      if (indexRef.current < entries.length - 1) {
        const next = indexRef.current + 1;
        indexRef.current = next;
        return entries[next] ?? '';
      }

      indexRef.current = null;
      return draftRef.current;
    },
    [entries],
  );

  return { push, navigate };
}
