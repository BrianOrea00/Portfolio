import { CommandLink, ExternalLink } from '../components/CommandLink';
import { projects as projectList } from '../data/projects';
import type { Command, Project } from '../types';

function ProjectActions({ project }: { project: Project }) {
  const hasLive = project.liveUrl !== '#';
  const hasRepo = project.repoUrl !== '#';

  return (
    <p className="row">
      {hasLive ? (
        <ExternalLink href={project.liveUrl}>live</ExternalLink>
      ) : (
        <span className="muted-text">live: pending</span>
      )}
      {hasRepo ? (
        <ExternalLink href={project.repoUrl}>repo</ExternalLink>
      ) : (
        <span className="muted-text">repo: pending</span>
      )}
    </p>
  );
}

export const projects: Command = {
  name: 'projects',
  description: 'List the projects and their command ids.',
  usage: 'projects',
  aliases: ['ls projects'],
  run: () => (
    <div className="block">
      <h2 className="heading">projects</h2>
      <p className="muted-text">{projectList.length} entries. Open one by id.</p>
      {projectList.map((project) => (
        <article className="project" key={project.id}>
          <div className="project__head">
            <h3 className="project__name">{project.name}</h3>
            <span className="badge">{project.status}</span>
            <span className="muted-text">{project.year}</span>
          </div>
          <p className="dim-text">{project.tagline}</p>
          <p className="muted-text project__stack">{project.stack.join(' · ')}</p>
          <CommandLink command={`open ${project.id}`}>open {project.id}</CommandLink>
        </article>
      ))}
    </div>
  ),
};

export const openProject: Command = {
  name: 'open',
  description: 'Show one project in detail.',
  usage: 'open <project-id>',
  run: (args) => {
    const id = args[0];

    if (id === undefined) {
      return (
        <span className="error-text">
          <span aria-hidden="true">✗ </span>open: missing project id. Try{' '}
          <CommandLink command="projects">projects</CommandLink>.
        </span>
      );
    }

    const project = projectList.find((entry) => entry.id === id);

    if (project === undefined) {
      return (
        <span className="error-text">
          <span aria-hidden="true">✗ </span>open: unknown project "{id}". Try{' '}
          <CommandLink command="projects">projects</CommandLink>.
        </span>
      );
    }

    return (
      <div className="block">
        <h2 className="heading">{project.name}</h2>
        <p className="dim-text">{project.tagline}</p>
        <p>{project.description}</p>
        <div className="kv">
          <span className="kv__key">id</span>
          <span className="kv__value">{project.id}</span>
          <span className="kv__key">role</span>
          <span className="kv__value">{project.role}</span>
          <span className="kv__key">status</span>
          <span className="kv__value">{project.status}</span>
          <span className="kv__key">year</span>
          <span className="kv__value">{project.year}</span>
          <span className="kv__key">stack</span>
          <span className="kv__value tag-list">
            {project.stack.map((item) => (
              <span className="tag" key={item}>
                {item}
              </span>
            ))}
          </span>
        </div>
        <ProjectActions project={project} />
      </div>
    );
  },
};
