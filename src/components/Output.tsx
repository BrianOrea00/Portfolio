import { useLayoutEffect, useRef } from 'react';
import type { Line } from '../types';

function LineView({ line }: { line: Line }) {
  if (line.kind === 'input') {
    return (
      <div className="line line--input">
        <span className="line__prompt" aria-hidden="true">
          ❯
        </span>{' '}
        <span className="line__command">{line.node}</span>
      </div>
    );
  }

  return <div className={`line line--${line.kind}`}>{line.node}</div>;
}

interface OutputProps {
  lines: Line[];
}

export function Output({ lines }: OutputProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const latest = lines[lines.length - 1];
  const older = lines.slice(0, -1);

  useLayoutEffect(() => {
    const node = scrollRef.current;
    if (node !== null) {
      node.scrollTop = node.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="output" ref={scrollRef}>
      {older.map((line) => (
        <LineView key={line.id} line={line} />
      ))}
      <div
        className="output__live"
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        aria-atomic="true"
        aria-label="Command output"
      >
        {latest ? <LineView key={latest.id} line={latest} /> : null}
      </div>
    </div>
  );
}
