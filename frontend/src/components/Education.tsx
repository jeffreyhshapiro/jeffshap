import { EDUCATION } from '../data/resume';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

export function Education() {
  return (
    <section className="section section--education" aria-labelledby="education-heading">
      <SectionHeading id="education-heading" index="04" title="Education" />

      <dl className="education">
        {EDUCATION.map((entry, i) => (
          <Reveal key={entry.credential} order={i} className="education__row">
            <dt className="education__credential">
              {entry.credential}
              <span className="education__dates">{entry.dates}</span>
            </dt>
            <dd className="education__school">{entry.school}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
