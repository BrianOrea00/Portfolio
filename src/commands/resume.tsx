import { ExternalLink } from '../components/CommandLink';
import { profile } from '../data/profile';
import type { Command } from '../types';

export const resume: Command = {
  name: 'resume',
  description: 'Open the resume PDF and show the short version.',
  usage: 'resume',
  run: () => (
    <div className="block">
      <h2 className="heading">resume</h2>
      <div className="kv">
        <span className="kv__key">name</span>
        <span className="kv__value">{profile.name}</span>
        <span className="kv__key">education</span>
        <span className="kv__value">{profile.education}</span>
        <span className="kv__key">focus</span>
        <span className="kv__value">{profile.focus}</span>
        <span className="kv__key">status</span>
        <span className="kv__value">{profile.availability}</span>
      </div>
      <p className="muted-text">
        The PDF is a placeholder in this build; the final resume will replace it.
      </p>
      <p>
        <ExternalLink href={profile.resumeUrl}>open resume.pdf</ExternalLink>
      </p>
    </div>
  ),
};
