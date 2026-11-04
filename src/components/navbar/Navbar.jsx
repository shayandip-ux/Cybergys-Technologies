import { useState } from "react";
import companyLogo from "../../assets/logo.png";
import "./navbar.css";

const navigationLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Technologies", href: "#technologies" },
  { label: "Corporate", href: "#corporate" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact Us", href: "#contact" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");

  function handleLinkClick(href) {
    setActiveHref(href);
    setIsMenuOpen(false);
  }

  return (
    <header className="site-navbar">
      {" "}
      <nav className="site-navbar__inner" aria-label="Main navigation">
        {/* LOGO */}
        <img src={companyLogo} className="site_logodesign" alt="Company logo" />

        {/* MOBILE MENU BUTTON */}
        <button className={`site-navbar__toggle ${isMenuOpen ? "is-open" : ""}`} type="button" aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={isMenuOpen} aria-controls="site-navbar-links" onClick={() => setIsMenuOpen((open) => !open)}>
          <span />
          <span />
          <span />
        </button>

        {/* NAVIGATION MENU */}
        <div className={`site-navbar__menu ${isMenuOpen ? "is-open" : ""}`} id="site-navbar-links" aria-hidden={!isMenuOpen && window.innerWidth <= 900}>
          <ul className="site-navbar__links">
            {navigationLinks.map(({ label, href }, index) => (
              <li key={label} style={{ "--link-index": index }}>
                <a href={href} aria-current={activeHref === href ? "location" : undefined} onClick={() => handleLinkClick(href)}>
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA BUTTON */}
          <a className="site-navbar__cta" href="#contact" onClick={() => handleLinkClick("#contact")}>
            <span>Start a Project</span>

            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
