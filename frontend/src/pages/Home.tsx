import { Link } from 'react-router-dom';
import { PROFILE } from '../data';

const [role, focus] = PROFILE.tagline.split(' | ');

export function Home() {
  return (
    <div className="home">
      <p className="home__eyebrow">
        <span>Software Engineer</span>
        <span>New York, NY</span>
        <span />
      </p>

      <h1 className="home__name">{PROFILE.name}</h1>

      <hr className="home__rule" />

      <p className="home__tagline">
        {role}
        <span className="home__pipe">|</span>
        {focus}
      </p>

      <dl className="home__fields">
        <div className="home__field">
          <dt className="home__key">Email</dt>
          <dd className="home__value">
            <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
          </dd>
        </div>
        <div className="home__field">
          <dt className="home__key">GitHub</dt>
          <dd className="home__value">
            <a href={PROFILE.github} target="_blank" rel="noreferrer">
              github.com/jeffreyhshapiro
            </a>
          </dd>
        </div>
        <div className="home__field">
          <dt className="home__key">LinkedIn</dt>
          <dd className="home__value">
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
              in/jeffreyhshapiro
            </a>
          </dd>
        </div>
      </dl>

      <Link className="home__cta" to="/resume">
        Read the resume <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
