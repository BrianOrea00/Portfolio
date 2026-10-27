import { CommandLink } from '../components/CommandLink';
import type { Command } from '../types';

export function createHelpCommand(getCommands: () => Command[]): Command {
  return {
    name: 'help',
    description: 'List available commands and keyboard shortcuts.',
    usage: 'help',
    run: () => {
      const list = getCommands();
      const aliases = list.flatMap((command) =>
        (command.aliases ?? []).map((alias) => ({ alias, command: command.name })),
      );

      return (
        <div className="block">
          <h2 className="heading">help</h2>
          <p className="muted-text">{list.length} commands. Type one, or select a name.</p>
          <ul className="help-list">
            {list.map((command) => {
              const suffix =
                command.usage === undefined ? '' : command.usage.slice(command.name.length);
              return (
                <li className="help-row" key={command.name}>
                  <span className="help-row__usage">
                    <CommandLink command={command.name}>{command.name}</CommandLink>
                    <span className="muted-text">{suffix}</span>
                  </span>
                  <span className="help-row__desc">{command.description}</span>
                </li>
              );
            })}
          </ul>
          {aliases.length > 0 ? (
            <p className="muted-text">
              Aliases:{' '}
              {aliases.map((entry, index) => (
                <span key={entry.alias}>
                  <CommandLink command={entry.alias}>{entry.alias}</CommandLink>
                  {index < aliases.length - 1 ? ' · ' : null}
                </span>
              ))}
            </p>
          ) : null}
          <p className="muted-text">↑/↓ history · Tab complete · Ctrl+L clear</p>
        </div>
      );
    },
  };
}
