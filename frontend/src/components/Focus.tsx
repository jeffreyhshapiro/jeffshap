import { FOCUS_AREAS } from '../data/resume';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

export function Focus() {
  return (
    <section className="section section--focus" aria-labelledby="focus-heading">
      <SectionHeading id="focus-heading" index="01" title="What I'm good at" />

      <div className="focus__grid">
        {FOCUS_AREAS.map((area, i) => (
          <Reveal as="article" key={area.label} order={i} className="focus__card">
            <h3 className="focus__label">{area.label}</h3>
            <p className="focus__body">{area.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
