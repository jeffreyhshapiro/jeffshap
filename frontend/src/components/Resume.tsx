import { EDUCATION, EXPERIENCE, PROJECTS } from '../data/resume';
import { HEADLINE, SITE } from '../data/seo';

const LINKS = [
  { label: 'jeffreyhshapiro@gmail.com', href: 'mailto:jeffreyhshapiro@gmail.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/jeffreyhshapiro' },
  { label: 'GitHub', href: 'https://github.com/jeffreyhshapiro' },
];

export function Resume() {
  return (
    <article className="page">
      <header className="masthead">
        <h1 className="masthead__name">{SITE.name}</h1>
        <p className="masthead__headline">{HEADLINE}</p>
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
