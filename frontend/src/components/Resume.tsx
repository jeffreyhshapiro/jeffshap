import { EDUCATION, EXPERIENCE, PROJECTS } from '../data/resume';

const LINKS = [
  { label: 'jeffreyhshapiro@gmail.com', href: 'mailto:jeffreyhshapiro@gmail.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/jeffreyhshapiro' },
  { label: 'GitHub', href: 'https://github.com/jeffreyhshapiro' },
];

export function Resume() {
  return (
    <article className="page">
      <header className="masthead">
        <h1 className="masthead__name">Jeff Shapiro</h1>
        <p className="masthead__role">
          Staff Software Engineer
          <span className="masthead__sep" aria-hidden="true" />
          New York, NY
        </p>
        <nav className="masthead__links" aria-label="Contact">
          {LINKS.map((link) => (
            <a
              key={link.href}
              className="link"
              href={link.href}
              {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <section className="intro">
        <p>
          I build the web storefronts that consumer brands run on. For most of the last decade
          that has meant joining a very small engineering team early, shipping the thing that
          makes money, and then helping the team and its practices grow up around it — at
          Ernesta today, and at Bombas and Greats before that.
        </p>
        <p>
          The work I like sits where the front end meets the systems behind it: technical SEO,
          server-side experimentation, search and discovery, design systems that let
          non-engineers move on their own. I came to engineering from a biotech lab by way of a
          coding bootcamp, which is probably why I still treat shipping as a matter of forming a
          hypothesis and then actually measuring it.
        </p>
      </section>

      <Section title="Experience">
        {EXPERIENCE.map((position) => (
          <div className="entry" key={position.company}>
            <div className="entry__rail">
              {position.roles.map((role) => (
                <span className="entry__dates" key={role.dates}>
                  {role.dates}
                </span>
              ))}
            </div>
            <div className="entry__body">
              <h3 className="entry__heading">
                {position.company}
                {position.location && (
                  <>
                    {' '}
                    <span className="entry__location">{position.location}</span>
                  </>
                )}
              </h3>
              <ul className="entry__roles">
                {position.roles.map((role) => (
                  <li className="entry__role" key={role.title}>
                    {role.title}
                    <span className="entry__role-dates">{role.dates}</span>
                  </li>
                ))}
              </ul>
              {position.bullets && (
                <ul className="bullets">
                  {position.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </Section>

      <Section title="Projects">
        {PROJECTS.map((project) => (
          <div className="entry" key={project.name}>
            <div className="entry__rail">
              <a className="link entry__dates" href={project.href} target="_blank" rel="noreferrer">
                {project.label}
              </a>
            </div>
            <div className="entry__body">
              <h3 className="entry__heading">{project.name}</h3>
              <p className="entry__note">{project.description}</p>
            </div>
          </div>
        ))}
      </Section>

      <Section title="Education" tight>
        {EDUCATION.map((item) => (
          <div className="entry entry--compact" key={item.credential}>
            <div className="entry__rail">
              <span className="entry__dates">{item.dates}</span>
            </div>
            <div className="entry__body">
              <h3 className="entry__heading entry__heading--plain">{item.credential}</h3>
              <p className="entry__note">
                {item.school}{' '}
                <span className="entry__location">{item.location}</span>
              </p>
            </div>
          </div>
        ))}
      </Section>

      <footer className="colophon">
        <span>Jeff Shapiro</span>
        <span>New York, NY</span>
      </footer>
    </article>
  );
}

function Section({
  title,
  tight,
  children,
}: {
  title: string;
  tight?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={`section${tight ? ' section--tight' : ''}`}>
      <h2 className="section__title">{title}</h2>
      <div className="section__body">{children}</div>
    </section>
  );
}
