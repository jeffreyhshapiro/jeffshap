import { Fragment } from 'react';
import { PROFILE, COMPETENCIES, PROJECTS, JOBS, EDUCATION } from '../data';

/**
 * The resume is set in two columns: a narrow left rail carrying
 * section rubrics, and a wide right column carrying everything
 * that is actually read.
 */

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="section" aria-labelledby={id}>
      <h2 className="section__title" id={id}>
        {title}
      </h2>
      <div className="section__body">{children}</div>
    </section>
  );
}

export function Resume() {
  return (
    <>
      <section className="masthead" aria-labelledby="masthead-name">
        <div className="masthead__rule" />
        <h1 className="masthead__name" id="masthead-name">
          {PROFILE.name}
        </h1>
        <p className="masthead__meta label">
          {PROFILE.title}
          <span className="rule-dot" aria-hidden="true">
            /
          </span>
          {PROFILE.location}
        </p>
        <p className="masthead__blurb">{PROFILE.intro}</p>
      </section>

      <Section id="skills-heading" title="Competencies">
        <dl className="skills">
          {COMPETENCIES.map((competency) => (
            <div className="skills__row" key={competency.area}>
              <dt className="skills__area">{competency.area}</dt>
              {/* Set as running text with hairline separators. The
                  fragment keeps each item breakable so the line wraps
                  naturally instead of forcing a wide inline box. */}
              <dd className="skills__items">
                {competency.items.map((item, i) => (
                  <Fragment key={item}>
                    {i > 0 && (
                      <span className="skills__sep" aria-hidden="true">
                        {' · '}
                      </span>
                    )}
                    {item}
                  </Fragment>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* The one pull quote on the site. Jeff's own words, lifted
          from the intro — the line that says what he actually does. */}
      <figure className="pullquote">
        <blockquote className="pullquote__text">
          <span className="pullquote__mark" aria-hidden="true">
            “
          </span>
          Infrastructure that lets designers, merchandisers, and marketers move
          without waiting on engineering.
        </blockquote>
      </figure>

      <Section id="projects-heading" title="Projects">
        {PROJECTS.map((project) => (
          <article className="entry" key={project.name}>
            <div className="role role--lead">
              <h3 className="role__title entry__title">{project.name}</h3>
              <span className="role__leader" aria-hidden="true" />
              {project.href && (
                <a
                  className="entry__link"
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {project.linkLabel ?? project.href}
                </a>
              )}
            </div>
            <p className="entry__desc">{project.description}</p>
          </article>
        ))}
      </Section>

      <Section id="experience-heading" title="Experience">
        {JOBS.map((job) => (
          <article className="entry" key={job.company}>
            {/* The company is the heading; each role sits beneath it
                on its own line with its own dates, joined by a
                leader rule like a table-of-contents entry. */}
            <h3 className="entry__title entry__masthead">
              <span className="entry__company">{job.company}</span>
              {job.location && (
                <span className="entry__place">, {job.location}</span>
              )}
            </h3>
            <div className="roles">
              {job.roles.map((role) => (
                <div className="role" key={role.title}>
                  <span className="role__title">{role.title}</span>
                  <span className="role__leader" aria-hidden="true" />
                  <span className="role__dates">{role.dates}</span>
                </div>
              ))}
            </div>
            {job.bullets && (
              <ul className="entry__bullets">
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </Section>

      <Section id="education-heading" title="Education">
        {EDUCATION.map((edu) => (
          <article className="entry entry--compact" key={edu.credential}>
            <div className="role">
              <h3 className="role__title entry__title">{edu.credential}</h3>
              <span className="role__leader" aria-hidden="true" />
              <span className="role__dates">{edu.dates}</span>
            </div>
            <p className="entry__desc entry__desc--muted">{edu.school}</p>
          </article>
        ))}
      </Section>

      <footer className="footer">
        <p className="footer__note">
          Currently building at Ernesta in New York. Reach me at{' '}
          <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>.
        </p>
        <nav className="footer__links" aria-label="Elsewhere">
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={PROFILE.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </nav>
        <p className="colophon">
          Set in Iowan Old Style. Built with React and served as static files.
        </p>
      </footer>
    </>
  );
}
