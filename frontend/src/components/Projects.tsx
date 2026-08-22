import { PROJECTS } from '../data/resume';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

export function Projects() {
  return (
    <section className="section section--projects" aria-labelledby="projects-heading">
      <SectionHeading id="projects-heading" index="03" title="Projects" />

      <div className="projects">
        {PROJECTS.map((project, i) => (
          <Reveal as="article" key={project.name} order={i} className="project">
            <div className="project__head">
              <h3 className="project__name">{project.name}</h3>
              {project.href && (
                <a className="project__link" href={project.href} target="_blank" rel="noreferrer">
                  {project.hrefLabel ?? project.href}
                  <svg viewBox="0 0 12 12" aria-hidden="true" className="project__arrow">
                    <path
                      d="M3 9L9 3M9 3H4.5M9 3v4.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              )}
            </div>
            <p className="project__desc">{project.description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
