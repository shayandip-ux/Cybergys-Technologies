import { useEffect, useRef, useState } from "react";
import "./footer.css";

export default function Footer() {
  const footerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(() => typeof IntersectionObserver === "undefined");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    alert("Thank you for subscribing!");
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const quickLinks = ["Home", "About Us", "Services", "Career", "Contact Us"];

  const services = ["Web Designing", "Web Development", "App Development", "eCommerce Support Service", "Digital Marketing"];

  return (
    <footer ref={footerRef} className={`cyber-footer${isVisible ? " is-visible" : ""}`} id="footer">
      {/* TOP DECORATIVE AREA */}
      <div className="cyber-footer__top-shape"></div>

      {/* DECORATIVE RIBBON */}
      <div className="cyber-footer__ribbon" aria-hidden="true">
        {/* <svg viewBox="0 0 280 300" fill="none">
          <defs>
            <linearGradient id="footerRibbonGradient" x1="20" y1="20" x2="250" y2="260">
              <stop offset="0%" stopColor="#3125f5" />
              <stop offset="45%" stopColor="#7560f5" />
              <stop offset="100%" stopColor="#e4a9ff" />
            </linearGradient>
          </defs>

          <path d="M160 20 C70 -10 20 65 45 135 C65 190 145 210 180 160 C220 100 155 45 125 80 C90 120 115 190 195 235" stroke="url(#footerRibbonGradient)" strokeWidth="43" strokeLinecap="round" />

          <path d="M165 45 L245 70" stroke="#3526ed" strokeWidth="39" strokeLinecap="round" />
        </svg> */}
        <img src="src/assets/img-s-28.webp"></img>
      </div>

      <div className="cyber-footer__container">
        {/* NEWSLETTER */}
        <div className="cyber-footer__newsletter">
          <h2>Join Our Newsletter</h2>

          <p>We Provide Best Pricing package to grow your lead capture</p>

          <form className="cyber-footer__subscribe" onSubmit={handleSubscribe}>
            <input type="email" placeholder="Email Address" aria-label="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <button type="submit">
              <span>Subscribe</span>

              <svg viewBox="0 0 36 20" fill="none">
                <path d="M1 10H33M24 1L33 10L24 19" />
              </svg>
            </button>
          </form>

          <div className="cyber-footer__decoration cyber-footer__decoration--left">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="cyber-footer__decoration cyber-footer__decoration--right">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* FOOTER MAIN CONTENT */}
        <div className="cyber-footer__main">
          {/* COMPANY INFORMATION */}
          <div className="cyber-footer__company">
            <img src="src/assets/logo-1.png"></img>

            <p className="cyber-footer__description">Welcome to Cybergys Technologies – Empowering Technological Excellence Since 2006. Cybergys has emerged as a leading company in the digital realm headquartered in Kolkata, India.</p>

            {/* SOCIAL ICONS */}
            <div className="cyber-footer__socials">
              <a href="#" aria-label="Facebook">
                <img src="src/assets/facebook.png"></img>
              </a>

              <a href="#" aria-label="LinkedIn">
                <img src="src/assets/linkedin-blue.png"></img>
              </a>

              <a href="#" aria-label="X">
                <img src="src/assets/twitter.png"></img>
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="cyber-footer__links">
            <h3>QUICK LINKS</h3>

            <ul>
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href="#">
                    <span className="cyber-footer__chevron"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* SERVICES */}
          <div className="cyber-footer__links cyber-footer__services">
            <h3>SERVICES</h3>

            <ul>
              {services.map((service) => (
                <li key={service}>
                  <a href="#">
                    <span className="cyber-footer__chevron"></span>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CONTACT INFORMATION */}
        <div className="cyber-footer__contact">
          <div className="cyber-footer__contact-item cyber-footer__address">
            <img src="src/assets/maps-and-flags.png" className="adress_icons"></img>
            <span>15th Floor, Module 18, Bengal Eco Intelligent Park, EM-3, Sector V, Salt Lake, Kolkata – 700091</span>
          </div>

          <a href="mailto:info@cybergys.com" className="cyber-footer__contact-item">
            <img src="src/assets/emails.png" className="adress_icons"></img>
            <span>info@cybergys.com</span>
          </a>

          <a href="tel:+919007753459" className="cyber-footer__contact-item">
            <img src="src/assets/call.png" className="adress_icons"></img>
            <span>+91 9007753459</span>
          </a>
        </div>
      </div>

      {/* COPYRIGHT BAR */}
      <div className="cyber-footer__bottom">
        <div className="cyber-footer__bottom-inner">
          <p>Copyright © 2026 Cybergys Technologies. All Rights Reserved.</p>

          <div className="cyber-footer__bottom-links">
            <a href="#">Company</a>
            <a href="#">Support</a>
            <a href="#">Privacy</a>
            <a href="#">Faqs</a>
          </div>
        </div>
      </div>

      {/* SCROLL TO TOP */}
      <button type="button" className="cyber-footer__scroll-top" onClick={scrollToTop} aria-label="Scroll to top">
        <svg viewBox="0 0 40 40">
          <path d="M20 34V6M8 18L20 6L32 18" />
        </svg>
      </button>
    </footer>
  );
}
