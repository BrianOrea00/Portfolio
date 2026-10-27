import { ExternalLink } from '../components/CommandLink';
import { profile } from '../data/profile';
import type { Command } from '../types';

export const contact: Command = {
  name: 'contact',
  description: 'Email, GitHub, Facebook, and availability.',
  usage: 'contact',
  run: () => (
    <div className="block">
      <h2 className="heading">contact</h2>
      <p>{profile.availability}. Email is the fastest route.</p>
      <div className="kv">
        <span className="kv__key">email</span>
        <span className="kv__value">
          <a className="link" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </span>
        <span className="kv__key">github</span>
        <span className="kv__value">
          <ExternalLink href={profile.github}>
            {profile.github.replace('https://', '')}
          </ExternalLink>
        </span>
        <span className="kv__key">facebook</span>
        <span className="kv__value">
          <ExternalLink href={profile.facebook}>
            {profile.facebook.replace('https://', '').replace(/\/$/, '')}
          </ExternalLink>
        </span>
      </div>
    </div>
  ),
};
