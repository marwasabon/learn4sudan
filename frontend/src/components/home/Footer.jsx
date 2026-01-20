import React from "react";

export default function Footer({
  newsletterEmail,
  onNewsletterEmailChange,
  newsletterMsg,
  onNewsletterSubmit,
}) {
  return (
    <section id="footer">
      <footer className="footer" role="contentinfo">
        <div className="footer-grid">
          <div>
            <h3 className="footer-title">About Learn 4 Sudan</h3>
            <p className="footer-text">
              Your hub for scholarships, courses, and programs that help
              Sudanese learners grow. Discover opportunities and stay connected
              with our community.
            </p>
          </div>

          <nav aria-label="Footer quick links">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <a href="#home" className="footer-link">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="footer-link">
                  About
                </a>
              </li>
              <li>
                <a href="#programs" className="footer-link">
                  Programs
                </a>
              </li>
              <li>
                <a href="#gallery" className="footer-link">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#contact" className="footer-link">
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="footer-title">Stay Updated</h3>
            <p className="footer-text">
              Subscribe to get updates on new programs and features.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onNewsletterSubmit();
              }}
              aria-label="Newsletter subscription"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => onNewsletterEmailChange(e.target.value)}
                className="footer-input"
              />
              <button type="submit" className="footer-button">
                Subscribe
              </button>
              {newsletterMsg && (
                <div className="footer-msg">{newsletterMsg}</div>
              )}
            </form>
          </div>

          <div>
            <h3 className="footer-title">Connect With Us</h3>
            <div className="footer-socials">
              <a
                href="https://discord.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
                aria-label="Discord"
              >
                <i className="bi bi-discord me-2"></i>
                Discord
              </a>
              <a
                href="https://youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
                aria-label="YouTube"
              >
                <i className="bi bi-youtube me-2"></i>
                YouTube
              </a>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
                aria-label="GitHub"
              >
                <i className="bi bi-github me-2"></i>
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="footer-copy">
          © 2025 Learn 4 Sudan. All rights reserved.
        </div>
      </footer>
    </section>
  );
}
