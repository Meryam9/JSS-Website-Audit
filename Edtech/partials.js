// Shared header/footer markup, inlined as JS strings.
// This avoids fetch("header.html") / fetch("footer.html"), which the
// browser blocks with a CORS error when a page is opened directly from
// disk (file:// - e.g. double-clicking the HTML file, common in Edge).
// header.html / footer.html are still kept as the source of truth for
// editing the markup by hand - just copy any changes into the strings
// below (or regenerate this file) after editing them.
// Sticky sub-nav for program detail pages ("campaign landing pages").
// Only used on pages that include a #jumpnav-placeholder div - pages
// without the full Overview/Outcomes/Roadmap/Courses/Reviews section
// set (most program-*.html pages besides Cybersecurity Analyst and IT
// Support) should NOT include this placeholder, since the links would
// point at sections that don't exist there yet.
const JUMPNAV_HTML = `<span class="pd-jumpnav-label">Jump to</span>
<a href="#overview" data-jump="overview">Overview</a>
<a href="#roadmap" data-jump="roadmap">Roadmap</a>
<a href="#courses-in-program" data-jump="courses-in-program">Courses</a>
<a href="#outcomes" data-jump="outcomes">Outcomes</a>
<a href="#reviews" data-jump="reviews">Reviews</a>`;

const HEADER_HTML = `<header class="site-header">
  <div class="header-inner">
    <a href="index.html" class="logo">
      <div class="logo-img" role="img" aria-label="EdTech4D logo"></div>
    </a>

    <nav class="main-nav" id="mainNav">
      <a href="index.html" data-page="index.html">Home</a>
      <a href="programs.html" data-page="programs.html">Programs</a>
      <a href="courses.html" data-page="courses.html">Courses</a>
      <a href="success-stories.html" data-page="success-stories.html">Success Stories</a>
      <!-- <a href="pricing.html" data-page="pricing.html">Membership</a> -->
      <a href="faq.html" data-page="faq.html">FAQ</a>
    </nav>

    <div class="header-actions">
      <a href="https://www.jobskillshare.org/?ref=maryam#/membership" target="_blank" rel="noopener noreferrer" class="login-link" id="loggedOutLogin">Login</a>
      <a href="https://www.jobskillshare.org/?ref=maryam#/membership" target="_blank" rel="noopener noreferrer" class="btn btn-primary header-create-account-btn" id="loggedOutCreate">Create Account</a>
      <button type="button" class="nav-toggle" id="navToggle" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="mainNav">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>
`;
const FOOTER_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Footer Preview</title>
<style>
  :root {
    --navy: #07111f;
    --blue: #4a86ff;
    --cta-navy: #1b2a4d;
  }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background: #eef4ff; }

  .site-footer {
    background: var(--cta-navy);
    color: #b7c0d1;
    padding: 34px 32px 0;
    font-size: 13.5px;
  }
  .footer-centered {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .footer-inner-centered {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 640px;
    margin: 0 auto;
    padding-bottom: 24px;
    text-align: center;
  }
  .footer-centered h4 {
    color: #fff;
    font-size: 17px;
    margin: 0 0 14px;
  }
  .footer-contact.centered {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .footer-contact.centered li {
    display: inline-flex;
    align-items: flex-start;
    gap: 12px;
    text-align: left;
    width: auto;
    max-width: 100%;
    font-size: 15px;
    line-height: 1.5;
    margin-bottom: 12px;
    color: #9aa4b8;
  }
  .footer-contact.centered li:last-child { margin-bottom: 0; }
  .footer-contact.centered svg { width: 18px; height: 18px; margin-top: 1px; flex-shrink: 0; color: var(--blue); }
  .footer-contact.centered a { color: #9aa4b8; transition: color 0.15s; }
  .footer-contact.centered a:hover { color: #fff; }

  .footer-social-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    margin-top: 14px;
  }
  .footer-social-wrap h5 {
    margin: 0;
    color: #fff;
    font-size: 14px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .footer-social.centered {
    display: flex;
    justify-content: center;
    gap: 12px;
  }
  .footer-social.centered a {
    width: 34px;
    height: 34px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 10px 20px rgba(7, 17, 31, 0.18);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    transition: background 0.15s, transform 0.15s;
  }
  .footer-social.centered a:hover {
    background: var(--blue);
    transform: translateY(-2px);
  }
  .footer-bottom {
    padding: 14px 0;
    text-align: center;
    color: #7e889c;
    font-size: 13px;
    width: 100%;
  }
</style>
</head>
<body>

<footer class="site-footer footer-centered">
  <div class="footer-inner-centered">
    <h4>Contact Us</h4>

    <ul class="footer-contact centered">
      <li>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        <span>HQ: 15524 New Hampshire Ave, Silver Spring, MD 20905</span>
      </li>

      <li>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2"></rect>
          <polyline points="2 6 12 13 22 6"></polyline>
        </svg>
        <span>Helpdesk: <a href="mailto:Support@jobskillshare.org">Support@jobskillshare.org</a></span>
      </li>
    </ul>

    <div class="footer-social-wrap">
      <h5>Follow Us</h5>
      <div class="footer-social centered">

        <!-- YouTube (official mark) -->
        <a href="https://www.youtube.com/c/JOBSkillSharesite" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF0000">
            <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12z" fill="#fff"></path>
          </svg>
        </a>

        <!-- Facebook (official mark) -->
        <a href="https://www.facebook.com/jobskillshare.org/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.24h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" fill="#1877F2"></path>
            <path d="M16.67 15.56l.53-3.49h-3.33V9.83c0-.96.47-1.89 1.96-1.89h1.51V4.97s-1.37-.24-2.68-.24c-2.74 0-4.53 1.67-4.53 4.69v2.66H7.08v3.49h3.05V24a12.1 12.1 0 0 0 3.76 0v-8.44h2.78z" fill="#fff"></path>
          </svg>
        </a>

        <!-- LinkedIn (official mark) -->
        <a href="https://www.linkedin.com/company/dmvitsolutions/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
            <rect width="24" height="24" rx="4" fill="#0A66C2"></rect>
            <path d="M7.1 9.4H3.9V20h3.2V9.4zM5.5 4.6a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8zM20 14.1c0-3.2-1.7-4.7-4-4.7a3.5 3.5 0 0 0-3.1 1.7V9.4H9.7c.04.9 0 10.6 0 10.6h3.2v-5.9c0-.3 0-.6.1-.8.2-.6.8-1.2 1.7-1.2 1.2 0 1.7.9 1.7 2.3V20H20v-5.9z" fill="#fff"></path>
        </svg>
        </a>

        <!-- Discord (official mark) -->
        <a href="https://discord.com/invite/bAxDffN" target="_blank" rel="noopener noreferrer" aria-label="Discord">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#5865F2">
            <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.099.246.198.373.292a.077.077 0 0 1-.006.127c-.598.35-1.22.645-1.873.893a.076.076 0 0 0-.04.106c.36.698.772 1.363 1.225 1.993a.076.076 0 0 0 .084.029 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.057c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.028zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.955 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z"></path>
          </svg>
        </a>

      </div>
    </div>

    <div class="footer-bottom">
      &copy; 2026 JobSkillShare. All rights reserved.
    </div>
  </div>
</footer>

</body>
</html>`;
