import { CommandLink } from '../components/CommandLink';
import { profile } from '../data/profile';
import type { Command } from '../types';

export const whoami: Command = {
  name: 'whoami',
  description: 'Print the current user.',
  usage: 'whoami',
  run: () => (
    <span>
      <span className="success-text">brian</span>
      <span className="muted-text"> ({profile.handle.toLowerCase()})</span> · {profile.role} ·{' '}
      {profile.location}
    </span>
  ),
};

export const ls: Command = {
  name: 'ls',
  description: 'List the terminal commands as files.',
  usage: 'ls',
  run: () => (
    <span className="ls-list">
      <CommandLink command="about">about/</CommandLink>{'  '}
      <CommandLink command="projects">projects/</CommandLink>{'  '}
      <CommandLink command="skills">skills/</CommandLink>{'  '}
      <CommandLink command="contact">contact/</CommandLink>{'  '}
      <CommandLink command="resume">resume.pdf</CommandLink>{'  '}
      <CommandLink command="help">help/</CommandLink>
    </span>
  ),
};

export const sudo: Command = {
  name: 'sudo',
  description: 'Try to elevate privileges.',
  usage: 'sudo',
  run: () => (
    <span className="error-text">
      <span aria-hidden="true">✗ </span>sudo: arisu is not in the sudoers file. This incident has
      been reported to <span className="muted-text">/dev/null</span>.
    </span>
  ),
};
