import { CommandLink } from '../components/CommandLink';
import { profile } from '../data/profile';
import type { Command } from '../types';

export const about: Command = {
  name: 'about',
  description: 'Who I am, where I study, and what I build.',
  usage: 'about',
  aliases: ['cat about'],
  run: () => (
    <div className="block">
      <h2 className="heading">about</h2>
      <div className="kv">
        <span className="kv__key">name</span>
        <span className="kv__value">
          {profile.name} <span className="muted-text">({profile.handle})</span>
        </span>
        <span className="kv__key">role</span>
        <span className="kv__value">{profile.role}</span>
        <span className="kv__key">based</span>
        <span className="kv__value">{profile.location}</span>
        <span className="kv__key">education</span>
        <span className="kv__value">{profile.education}</span>
        <span className="kv__key">status</span>
        <span className="kv__value">{profile.availability}</span>
      </div>
      <div className="prose">
        {profile.bio.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <p className="muted-text">
        Next: <CommandLink command="projects">projects</CommandLink> ·{' '}
        <CommandLink command="skills">skills</CommandLink> ·{' '}
        <CommandLink command="contact">contact</CommandLink>
      </p>
    </div>
  ),
};
