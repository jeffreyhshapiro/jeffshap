import { useEffect, useMemo, useRef, useState } from 'react';
import { FieldCanvas } from './FieldCanvas';
import { detectTier, prefersReducedMotion } from '../webgl/capability';
import { CHAPTERS, EDUCATION, JOBS, PROFILE, PROJECTS } from '../resume';

export function Field() {
  // Detected once. `none` means no WebGL at all — the document still stands
  // on its own, just without the field behind it.
  const tier = useMemo(() => detectTier(), []);
  const reduced = useMemo(() => prefersReducedMotion(), []);

  const scrollRef = useRef(0);
  const [activeChapter, setActiveChapter] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Scroll progress is written to a ref, not state: the field reads it on
  // its own frame and React never re-renders for it.
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = max > 0 ? window.scrollY / max : 0;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Active chapter drives both the field's warm accent and the rail marker.
  useEffect(() => {
    const els = sectionRefs.current.filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const idx = els.indexOf(visible.target as HTMLElement);
        if (idx >= 0) setActiveChapter(idx);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const register = (i: number) => (el: HTMLElement | null) => {
    sectionRefs.current[i] = el;
  };

  return (
    <div className={`field${reduced ? ' field--still' : ''}`}>
      {tier !== 'none' && (
        <div className="field__stage">
          <FieldCanvas
            tier={tier}
            chapters={CHAPTERS.length}
            scrollRef={scrollRef}
            activeChapter={activeChapter}
          />
        </div>
      )}
      {tier === 'none' && <div className="field__stage field__stage--fallback" aria-hidden="true" />}

      <div className="field__veil" aria-hidden="true" />

      <a className="skip-link" href="#resume">Skip to resume</a>

      <div className="doc">
        {/* Hero: plain DOM text, painted immediately, no entrance gate. */}
        <header className="hero" ref={register(0)}>
          <div className="hero__inner">
            <p className="hero__eyebrow">Portfolio — 2026</p>
            <h1 className="hero__name">{PROFILE.name}</h1>
            <p className="hero__role">
              <span className="hero__role-main">{PROFILE.role}</span>
              <span className="hero__role-sep" aria-hidden="true" />
              <span className="hero__role-loc">{PROFILE.location}</span>
            </p>
            <p className="hero__blurb">
              Ten years building for the web — commerce platforms, design systems, search and
              experimentation infrastructure. Currently at Ernesta, on a team of five.
            </p>
            <nav className="hero__links" aria-label="Contact">
              <a href={`mailto:${PROFILE.email}`}>Email</a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub</a>
              <a href="#resume" className="hero__links-cta">Read the résumé ↓</a>
            </nav>
          </div>
        </header>

        <main className="resume" id="resume">
          <section className="resume__section" aria-labelledby="experience-heading">
            <h2 className="resume__heading" id="experience-heading">Experience</h2>
            <ol className="resume__list">
              {JOBS.map((job, i) => (
                <li
                  key={job.id}
                  className={`entry${activeChapter === i + 1 ? ' entry--active' : ''}`}
                  ref={register(i + 1)}
                >
                  <div className="entry__marker" aria-hidden="true" />
                  <div className="entry__body">
                    <h3 className="entry__company">
                      {job.company}
                      {job.location && <span className="entry__location">{job.location}</span>}
                    </h3>
                    <ul className="entry__roles">
                      {job.roles.map((r) => (
                        <li key={r.title + r.dates} className="entry__role">
                          <span className="entry__role-title">{r.title}</span>
                          <span className="entry__role-dates">{r.dates}</span>
                        </li>
                      ))}
                    </ul>
                    {job.bullets.length > 0 && (
                      <ul className="entry__bullets">
                        {job.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section
            className="resume__section"
            aria-labelledby="projects-heading"
            ref={register(JOBS.length + 1) as React.Ref<HTMLElement>}
          >
            <h2 className="resume__heading" id="projects-heading">Projects</h2>
            {PROJECTS.map((p) => (
              <article key={p.name} className="project">
                <h3 className="project__name">
                  {p.name}
                  <a className="project__link" href={p.href} target="_blank" rel="noreferrer">
                    {p.label}
                  </a>
                </h3>
                <p className="project__desc">{p.description}</p>
              </article>
            ))}
          </section>

          <section
            className="resume__section"
            aria-labelledby="education-heading"
            ref={register(JOBS.length + 2) as React.Ref<HTMLElement>}
          >
            <h2 className="resume__heading" id="education-heading">Education</h2>
            <ul className="resume__list resume__list--plain">
              {EDUCATION.map((e) => (
                <li key={e.title} className="edu">
                  <div className="edu__row">
                    <span className="edu__title">{e.title}</span>
                    <span className="edu__dates">{e.dates}</span>
                  </div>
                  <p className="edu__school">{e.school}</p>
                </li>
              ))}
            </ul>
          </section>

          <footer className="doc__footer">
            <p>
              {PROFILE.name} — {PROFILE.role}, {PROFILE.location}
            </p>
            <p className="doc__footer-links">
              <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
