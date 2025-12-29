/**
 * ===========================================
 * PROJECTS SECTION (ls /projects)
 * ===========================================
 * Displays project cards styled as terminal windows.
 */

import TerminalWindow from '../TerminalWindow';
import { projects } from '../../data/content';

const ProjectsSection = () => {
  // Status badge colors
  const statusColors = {
    active: 'text-primary',
    archived: 'text-muted-foreground',
    wip: 'text-accent',
  };

  const statusLabels = {
    active: 'RUNNING',
    archived: 'ARCHIVED',
    wip: 'IN_PROGRESS',
  };

  return (
    <section id="projects" className="space-y-6">
      {/* Section header */}
      <div className="text-muted-foreground text-base mb-4">
        <span className="text-accent">$</span> ls -la /projects |
        <span className='text-accent animate-pulse'> total {projects.length}</span>
      </div>

      {/* Project grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project, index) => (
          <TerminalWindow 
            key={project.id} 
            title={`~/${project.id}`}
          >
            <div 
              className="space-y-4 boot-line"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project name and status */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-accent text-glow font-bold text-lg">
                  {project.title}
                </h3>
                <span className={`text-xs ${statusColors[project.status]}`}>
                  [{statusLabels[project.status]}]
                </span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-base leading-relaxed">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span 
                    key={tech}
                    className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-4 pt-2 border-t border-border text-base">
                {project.github && (
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="terminal-link"
                  >
                    <span className="text-accent">→</span> git clone
                  </a>
                )}
                {project.link && (
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="terminal-link"
                  >
                    <span className="text-accent">→</span> ./run
                  </a>
                )}
              </div>
            </div>
          </TerminalWindow>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
