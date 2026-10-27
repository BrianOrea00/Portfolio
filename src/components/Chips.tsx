const CHIP_COMMANDS = ['about', 'projects', 'skills', 'contact', 'resume', 'help'] as const;

interface ChipsProps {
  onRun: (command: string) => void;
}

export function Chips({ onRun }: ChipsProps) {
  return (
    <div className="chips" role="group" aria-label="Quick commands">
      {CHIP_COMMANDS.map((command) => (
        <button
          key={command}
          type="button"
          className="chip"
          onClick={() => onRun(command)}
        >
          {command}
        </button>
      ))}
    </div>
  );
}
