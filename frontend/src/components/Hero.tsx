import { PROFILE } from '../data/resume';

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <p className="hero__eyebrow">
        <span className="hero__dot" aria-hidden="true" />
        {PROFILE.title} · {PROFILE.location}
      </p>

      <h1 className="hero__heading" id="hero-heading">
        <span className="hero__line">Jeff</span>
        <span className="hero__line hero__line--indent">Shapiro</span>
      </h1>

      <div className="hero__body">
        <p className="hero__lede">
          I build the storefronts commerce companies run on — and the search,
          experimentation, and content systems underneath them.
        </p>
        <p className="hero__sub">
          Nine years shipping web software in New York, most of it on small teams
          where the site <em>is</em> the business. I like problems where the
          engineering, the merchandising, and the page speed all turn out to be
          the same problem.
        </p>
      </div>

      <dl className="hero__facts">
        <div className="hero__fact">
          <dt>Now</dt>
          <dd>Staff Engineer at Ernesta</dd>
        </div>
        <div className="hero__fact">
          <dt>Before</dt>
          <dd>Bombas, Greats</dd>
        </div>
        <div className="hero__fact">
          <dt>Working in</dt>
          <dd>React, Remix, Node, Shopify</dd>
        </div>
      </dl>
    </section>
  );
}
