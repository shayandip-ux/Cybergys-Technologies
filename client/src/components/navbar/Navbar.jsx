import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import companyLogo from "../../assets/logo.png";
import "./navbar.css";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Technologies", href: "/technologies" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact Us", href: "/contact-us" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const currentPath = pathname.replace(/\/+$/, "").toLowerCase() || "/";

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const isActive = (href) => {
    if (href === "/services") return currentPath.startsWith("/services");
    return currentPath === href;
  };

  const toggleMenu = () => {
    setIsMenuOpen((previousState) => !previousState);
  };

  return (
    <header className="site-navbar">
      <nav className="site-navbar__inner" aria-label="Main navigation">
        {/* LOGO */}
        <Link to="/" className="site-navbar__logo">
          <img src={companyLogo} className="site_logodesign" alt="Cybergy Technologies" />
        </Link>

        {/* NAVIGATION MENU */}
        <div className={isMenuOpen ? "site-navbar__menu is-open" : "site-navbar__menu"} id="site-navbar-links">
          <ul className="site-navbar__links">
            {navigationLinks.map((item, index) => (
              <li key={item.label} style={{ "--link-index": index }}>
                <Link to={item.href} className={isActive(item.href) ? "active" : ""} aria-current={isActive(item.href) ? "page" : undefined} onClick={handleLinkClick}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* MOBILE PHONE CONTACT */}
          <a href="tel:+9198567451263" className="navbar-phone mobile-phone">
            <span className="navbar-phone__icon">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.56 3.58.56a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.19 2.46.56 3.58a1 1 0 01-.25 1.01l-2.19 2.2z" />
              </svg>
            </span>

            <span className="navbar-phone__content">
              <span className="navbar-phone__label">Call Us For Service</span>

              <strong>+91-98567451263</strong>
            </span>
          </a>

          {/* MOBILE CTA */}
          <Link to="/#quick-projects" className="site-navbar__cta mobile-cta" onClick={handleLinkClick}>
            <span>Get a Quote</span>

            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="site-navbar__actions">
          {/* PHONE CONTACT */}
          <a href="tel:+9198567451263" className="navbar-phone desktop-phone" aria-label="Call us at +91-98567451263">
            <span className="navbar-phone__icon">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.56 3.58.56a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.19 2.46.56 3.58a1 1 0 01-.25 1.01l-2.19 2.2z" />
              </svg>
            </span>

            <span className="navbar-phone__content">
              <span className="navbar-phone__label">Call Us For Service</span>

              <strong>+91-98567451263</strong>
            </span>
          </a>

          {/* DESKTOP CTA */}
          <Link to="/#quick-projects" className="site-navbar__cta desktop-cta" onClick={handleLinkClick}>
            <span>Get a Quote</span>

            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M7 17L17 7M8 7h9v9" />
            </svg>
          </Link>

          {/* MOBILE HAMBURGER */}
          <button type="button" className={isMenuOpen ? "site-navbar__toggle is-open" : "site-navbar__toggle"} aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={isMenuOpen} aria-controls="site-navbar-links" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
