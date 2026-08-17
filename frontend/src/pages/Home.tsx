import { Link } from 'react-router-dom';
import { PROFILE } from '../data';

export function Home() {
  return (
    <div className="home">
      <div className="home__inner">
        <h1 className="home__name">{PROFILE.name}</h1>
        <p className="home__tagline">{PROFILE.tagline}</p>
        <Link className="home__link" to="/resume">
          Resume <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
