import { JOBS } from '../data/resume';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

export function Experience() {
  return (
    <section className="section section--experience" aria-labelledby="experience-heading">
      <SectionHeading id="experience-heading" index="02" title="Experience" />

      <ol className="timeline">
        {JOBS.map((job, i) => (
          <Reveal as="li" key={job.company} order={i} className="timeline__item">
            <div className="timeline__rail" aria-hidden="true">
              <span className="timeline__marker" />
            </div>

            <div className="timeline__meta">
              <span className="timeline__span">{job.span}</span>
              {job.location && <span className="timeline__location">{job.location}</span>}
            </div>

            <div className="timeline__content">
              <h3 className="timeline__company">{job.company}</h3>

              <ul className="timeline__roles">
                {job.roles.map((role) => (
                  <li className="timeline__role" key={role.title}>
                    <span className="timeline__role-title">{role.title}</span>
                    <span className="timeline__role-dates">{role.dates}</span>
                  </li>
                ))}
              </ul>

              {job.bullets.length > 0 && (
                <ul className="timeline__bullets">
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}

              {job.stack && (
                <ul className="timeline__stack" aria-label={`Tools used at ${job.company}`}>
                  {job.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
