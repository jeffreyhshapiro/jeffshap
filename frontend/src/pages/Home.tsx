import { Link } from 'react-router-dom';
import { PROFILE } from '../data';

/**
 * The landing page is set as a title page: a rule, the name at
 * display size, the tagline as a standfirst, and a single way
 * forward. Everything else is whitespace.
 */
export function Home() {
  // Jeff's tagline, pipe intact — the pipe is set as a real divider.
  const [role, focus] = PROFILE.tagline.split('|').map((part) => part.trim());

  return (
    <div className="home">
      <div className="home__rule" />

      <h1 className="home__name">{PROFILE.name}</h1>

      <p className="home__tagline">
        {role}
        <span className="home__pipe" aria-hidden="true">
          |
        </span>
        {focus}
      </p>

      <div className="home__foot">
        <span className="home__place">{PROFILE.location}</span>
        <Link className="home__link" to="/resume">
          Read the resume
          <span className="arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
