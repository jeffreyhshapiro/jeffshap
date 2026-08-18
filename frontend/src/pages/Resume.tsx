import { PROFILE, COMPETENCIES, PROJECTS, JOBS, EDUCATION } from '../data';

export function Resume() {
  return (
    <div className="doc">
      <section className="intro">
        <h1 className="intro__name">{PROFILE.name}</h1>
        <p className="intro__meta">
          <span>{PROFILE.title}</span>
          <i aria-hidden="true">/</i>
          <span>{PROFILE.location}</span>
        </p>
        <p className="intro__blurb">{PROFILE.intro}</p>
      </section>

      <section className="section" aria-labelledby="skills-heading">
        <h2 className="section__title" id="skills-heading">
          Competencies
        </h2>
        <div className="section__body">
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
        </div>
      </section>

      <section className="section" aria-labelledby="projects-heading">
        <h2 className="section__title" id="projects-heading">
          Projects
        </h2>
        <div className="section__body">
          {PROJECTS.map((project) => (
            <article className="entry" key={project.name}>
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
        </div>
      </section>

      <section className="section" aria-labelledby="experience-heading">
        <h2 className="section__title" id="experience-heading">
          Experience
        </h2>
        <div className="section__body">
          {JOBS.map((job) => {
            const [current, ...previous] = job.roles;
            return (
              <article className="entry" key={job.company}>
                <div className="entry__head">
                  <h3 className="entry__title">{job.company}</h3>
                  <span className="entry__dates">{current.dates}</span>
                </div>
                <p className="entry__place">
                  {current.title}
                  {job.location && ` — ${job.location}`}
                </p>

                {previous.length > 0 && (
                  <div className="entry__roles">
                    {previous.map((role) => (
                      <p className="entry__role" key={role.title}>
                        <span>{role.title}</span>
                        <span className="entry__dates">{role.dates}</span>
                      </p>
                    ))}
                  </div>
                )}

                {job.bullets && (
                  <ul className="entry__bullets">
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="section" aria-labelledby="education-heading">
        <h2 className="section__title" id="education-heading">
          Education
        </h2>
        <div className="section__body">
          <table className="edu">
            <thead>
              <tr>
                <th scope="col">Credential</th>
                <th scope="col">Institution</th>
                <th scope="col">Year</th>
              </tr>
            </thead>
            <tbody>
              {EDUCATION.map((edu) => (
                <tr key={edu.credential}>
                  <td>{edu.credential}</td>
                  <td>{edu.school}</td>
                  <td>{edu.dates}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="footer">
        <p>New York, NY</p>
        <p className="footer__links">
          <a href={`mailto:${PROFILE.email}`}>Email</a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={PROFILE.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
