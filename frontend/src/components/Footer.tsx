import { PROFILE } from '../data/resume';

const LINKS = [
  { label: 'Email', href: `mailto:${PROFILE.email}`, value: PROFILE.email, external: false },
  { label: 'LinkedIn', href: PROFILE.linkedin, value: 'in/jeffreyhshapiro', external: true },
  { label: 'GitHub', href: PROFILE.github, value: 'jeffreyhshapiro', external: true },
];

export function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer__inner">
        <p className="footer__lede">
          Open to conversations about staff-level work on commerce, platform, and
          the systems that make a website worth visiting.
        </p>

        <ul className="footer__links">
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                className="footer__link"
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                <span className="footer__link-label">{link.label}</span>
                <span className="footer__link-value">{link.value}</span>
              </a>
            </li>
          ))}
        </ul>

        <p className="footer__colophon">
          {PROFILE.location} · Built with React and Vite, hosted on Cloudflare Pages.
        </p>
      </div>
    </footer>
  );
}
