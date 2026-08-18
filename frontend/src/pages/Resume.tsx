import { PROFILE, COMPETENCIES, PROJECTS, JOBS, EDUCATION } from '../data';
import { useReveal } from '../useReveal';

export function Resume() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div ref={ref}>
      <section className="intro">
        <h1 className="intro__name">{PROFILE.name}</h1>
        <p className="intro__title">
          {PROFILE.title}
          <span className="dot" />
          {PROFILE.location}
        </p>
        <p className="intro__blurb">{PROFILE.intro}</p>
      </section>

      <section className="section reveal" aria-labelledby="skills-heading">
        <h2 className="section__title" id="skills-heading">
          Core competencies
        </h2>
        <dl className="skills">
          {COMPETENCIES.map((competency) => (
            <div className="skills__row" key={competency.area}>
              <dt className="skills__area">{competency.area}</dt>
              <dd className="skills__items">
                {competency.items.map((item) => (
                  <span className="skills__tag" key={item}>
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section reveal" aria-labelledby="projects-heading">
        <h2 className="section__title" id="projects-heading">
          Projects
        </h2>
        {PROJECTS.map((project) => (
          <article className="entry entry--panel" key={project.name}>
            <div className="entry__head">
              <h3 className="entry__title">{project.name}</h3>
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
      </section>

      <section className="section reveal" aria-labelledby="experience-heading">
        <h2 className="section__title" id="experience-heading">
          Experience
        </h2>
        {JOBS.map((job) => (
          <article className="entry entry--job" key={job.company}>
            {job.roles.map((role, i) => (
              <div
                className={`entry__head${i > 0 ? ' entry__head--sub' : ''}`}
                key={role.title}
              >
                <h3 className="entry__title">
                  {role.title}
                  {i === 0 && (
                    <span className="entry__company">
                      {' — '}
                      {job.company}
                      {job.location && `, ${job.location}`}
                    </span>
                  )}
                </h3>
                <span className="entry__dates">{role.dates}</span>
              </div>
            ))}
            {job.bullets && (
              <ul className="entry__bullets">
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </section>

      <section className="section reveal" aria-labelledby="education-heading">
        <h2 className="section__title" id="education-heading">
          Education
        </h2>
        {EDUCATION.map((edu) => (
          <article
            className="entry entry--panel entry--compact"
            key={edu.credential}
          >
            <div className="entry__head">
              <h3 className="entry__title">{edu.credential}</h3>
              <span className="entry__dates">{edu.dates}</span>
            </div>
            <p className="entry__desc entry__desc--muted">{edu.school}</p>
          </article>
        ))}
      </section>

      <footer className="footer reveal">
        <p className="footer__note">
          Get in touch — <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
        </p>
        <p className="footer__meta">{PROFILE.location}</p>
      </footer>
    </div>
  );
}
