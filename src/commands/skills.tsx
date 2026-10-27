import { skillGroups } from '../data/skills';
import type { Command } from '../types';

export const skills: Command = {
  name: 'skills',
  description: 'Show the stack grouped by area, with self-assessed levels.',
  usage: 'skills',
  run: () => (
    <div className="block">
      <h2 className="heading">skills</h2>
      <p className="muted-text">Self-assessed, 0–100. Working knowledge, not a certification.</p>
      {skillGroups.map((group) => (
        <section className="skill-group" key={group.label}>
          <h3 className="skill-group__title">{group.label}</h3>
          {group.skills.map((skill) => (
            <div className="skill" key={skill.name}>
              <span className="skill__name">{skill.name}</span>
              <progress
                className="skill__bar"
                value={skill.level}
                max={100}
                aria-label={`${skill.name}: ${skill.level} out of 100, self-assessed`}
              >
                {skill.level}
              </progress>
              <span className="skill__level">{skill.level}</span>
            </div>
          ))}
        </section>
      ))}
    </div>
  ),
};
