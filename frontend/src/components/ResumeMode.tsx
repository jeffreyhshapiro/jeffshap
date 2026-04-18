export function ResumeMode() {
  return (
    <div className="resume-mode">
      <div className="resume">
        <header className="resume__header">
          <h1 className="resume__name">Jeff Shapiro</h1>
          <p className="resume__title">Software Engineer</p>
          <p className="resume__contact">
            <a href="mailto:jeffreyhshapiro@gmail.com">jeffreyhshapiro@gmail.com</a>
            <span className="resume__contact-sep" />
            New York, NY
            <span className="resume__contact-sep" />
            <a href="https://linkedin.com/in/jeffreyhshapiro" target="_blank" rel="noreferrer">LinkedIn</a>
            <span className="resume__contact-sep" />
            <a href="https://github.com/jeffreyhshapiro" target="_blank" rel="noreferrer">GitHub</a>
          </p>
        </header>

        <section className="resume__section">
          <h2 className="resume__section-title">Experience</h2>

          <div className="resume__job">
            <div className="resume__job-header">
              <div>
                <span className="resume__job-title">Staff Software Engineer</span>
                <span className="resume__job-company"> — Ernesta, New York, NY</span>
              </div>
              <span className="resume__job-dates">Feb 2026 - Present</span>
            </div>
            <div className="resume__job-header resume__job-header--sub">
              <div>
                <span className="resume__job-title">Senior Software Engineer</span>
                <span className="resume__job-company"> — Ernesta, New York, NY</span>
              </div>
              <span className="resume__job-dates">May 2023 - Feb 2026</span>
            </div>
            <ul className="resume__bullets">
              <li>Brought organic search presence to top 5 (avg) for phrases such as "custom-sized rugs" by leading technical SEO implementation</li>
              <li>Integrated a server-side AB testing platform, enabling the product team to optimize UI/UX decisions and improve engagement and conversion rates through data-driven experimentation</li>
              <li>Integrated a search and discovery platform into the website, improving customer product discovery and enabling more flexible data-driven merchandising and enhanced recommendations</li>
              <li>Enable sharing of project and business knowledge by creating a central project context that's continuously updated and summarized by AI</li>
              <li>Small agile team of 5 engineers, building product and process from the ground up using Remix, React, Shopify, and Claude Code</li>
            </ul>
          </div>

          <div className="resume__job">
            <div className="resume__job-header">
              <div>
                <span className="resume__job-title">Senior Software Engineer</span>
                <span className="resume__job-company"> — Bombas, New York, NY</span>
              </div>
              <span className="resume__job-dates">Dec 2021 - May 2023</span>
            </div>
            <div className="resume__job-header resume__job-header--sub">
              <div>
                <span className="resume__job-title">Front End Engineer</span>
                <span className="resume__job-company"> — Bombas, New York, NY</span>
              </div>
              <span className="resume__job-dates">Oct 2018 - Dec 2021</span>
            </div>
            <ul className="resume__bullets">
              <li>Developed a set of CMS-powered design system blocks, empowering merchandising and marketing teams to independently build static pages and update collection/product content</li>
              <li>Migrated collection page from Shopify Liquid to React, resulting in 50% faster page load speeds</li>
              <li>Joined a team of 2 engineers and helped grow it to about 12 engineers with product managers and designers</li>
            </ul>
          </div>

          <div className="resume__job">
            <div className="resume__job-header">
              <div>
                <span className="resume__job-title">Full Stack Developer</span>
                <span className="resume__job-company"> — Greats, Brooklyn, NY</span>
              </div>
              <span className="resume__job-dates">Aug 2017 - Oct 2018</span>
            </div>
            <ul className="resume__bullets">
              <li>Led the development of the company Shopify ecommerce site</li>
              <li>Built custom services with Node that interact with the Shopify Admin API</li>
              <li>Rewrote the website (design and development) from the ground up and implemented development workflows with Node</li>
            </ul>
          </div>

          <div className="resume__job">
            <div className="resume__job-header">
              <div>
                <span className="resume__job-title">Web Developer</span>
                <span className="resume__job-company"> — iDialogs, New York, NY</span>
              </div>
              <span className="resume__job-dates">Sep 2016 - Jul 2017</span>
            </div>
            <ul className="resume__bullets">
              <li>Developed a beta Alexa skill for recording patient data which resulted in raising $250k to support continued exploration of business opportunity</li>
              <li>Improved website Help section by creating a toolset that streamlined the process of generating user-facing documentation</li>
              <li>Performed QA and bug reporting for web, Android, and iOS applications</li>
            </ul>
          </div>

          <div className="resume__job">
            <div className="resume__job-header">
              <div>
                <span className="resume__job-title">Lab Technician</span>
                <span className="resume__job-company"> — Pharma industry</span>
              </div>
              <span className="resume__job-dates">2014 - 2016</span>
            </div>
          </div>
        </section>

        <section className="resume__section">
          <h2 className="resume__section-title">Projects</h2>
          <div className="resume__job">
            <div className="resume__job-header">
              <span className="resume__job-title">Tab Cafe</span>
              <a className="resume__project-link" href="https://tab.cafe" target="_blank" rel="noreferrer">tab.cafe</a>
            </div>
            <p className="resume__project-desc">A browser-based guitar tab editor with AI-powered audio transcription. Hum or play a melody and it transcribes directly into tab notation.</p>
          </div>
        </section>

        <section className="resume__section">
          <h2 className="resume__section-title">Education</h2>
          <div className="resume__edu">
            <div className="resume__job-header">
              <span className="resume__job-title">AI Engineering Fellow</span>
              <span className="resume__job-dates">Oct 2025 - Dec 2025</span>
            </div>
            <p className="resume__edu-school">Overclock Accelerator, Online</p>
          </div>
          <div className="resume__edu">
            <div className="resume__job-header">
              <span className="resume__job-title">Web Development</span>
              <span className="resume__job-dates">2016</span>
            </div>
            <p className="resume__edu-school">Rutgers Coding Bootcamp, New Brunswick, NJ</p>
          </div>
          <div className="resume__edu">
            <div className="resume__job-header">
              <span className="resume__job-title">Master of Biotechnology</span>
              <span className="resume__job-dates">2013</span>
            </div>
            <p className="resume__edu-school">University of Pennsylvania, Philadelphia, PA</p>
          </div>
          <div className="resume__edu">
            <div className="resume__job-header">
              <span className="resume__job-title">BS Environmental Science</span>
              <span className="resume__job-dates">2011</span>
            </div>
            <p className="resume__edu-school">Rutgers University, New Brunswick, NJ</p>
          </div>
        </section>
      </div>
    </div>
  );
}
