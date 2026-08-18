import { Link } from 'react-router-dom';
import { PROFILE } from '../data';

/* Six strings, low to high. A quiet nod to the guitar work — each line
   plucks under the pointer and holds still when motion is reduced. */
const STRINGS = [0, 1, 2, 3, 4, 5];

export function Home() {
  const [role, focus] = PROFILE.tagline.split(' | ');

  return (
    <div className="home">
      <div className="home__inner">
        <h1 className="home__name">{PROFILE.name}</h1>

        <svg
          className="strings"
          viewBox="0 0 430 62"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          {STRINGS.map((i) => (
            <line
              className="strings__line"
              key={i}
              x1="0"
              x2="430"
              y1={6 + i * 10}
              y2={6 + i * 10}
              strokeWidth={1 + (5 - i) * 0.22}
            />
          ))}
        </svg>

        <p className="home__tagline">
          <em>{role}</em> — {focus}
        </p>

        <div className="home__actions">
          <Link className="home__link" to="/resume">
            Read the resume <span aria-hidden="true">→</span>
          </Link>
          <nav className="home__side" aria-label="Contact">
            <a href={`mailto:${PROFILE.email}`}>Email</a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={PROFILE.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
