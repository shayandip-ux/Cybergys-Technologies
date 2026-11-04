import { useEffect, useRef, useState } from "react";

import floatingPerson from "../../assets/img-s-14.webp";
import teamImage from "../../assets/img-s-9.webp";
import chatImage from "../../assets/img-s-13.webp";
import cubeImage from "../../assets/img-s-15.webp";

import "./achievement-section.css";

export default function Achievement() {
  const sectionRef = useRef(null);

  const [isVisible, setIsVisible] = useState(() => typeof IntersectionObserver === "undefined");

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`achievement-section${isVisible ? " is-visible" : ""}`} id="achievement">
      {/* BACKGROUND DECORATIONS */}
      <div className="achievement-decor achievement-decor--top"></div>
      <div className="achievement-decor achievement-decor--left"></div>

      {/* FLOATING CUBE RIGHT */}
      <div className="achievement-cube achievement-cube--large">
        <img src={cubeImage} alt="" />
      </div>

      {/* SMALL CUBE LEFT */}
      <div className="achievement-cube achievement-cube--small">
        <img src={cubeImage} alt="" />
      </div>

      {/* FLOATING CHARACTER LEFT */}
      <div className="achievement-floating-person">
        <img src={floatingPerson} alt="Creative professional using a smartphone" />
      </div>

      {/* FLOATING CHAT ICON */}
      <div className="achievement-chat">
        <img src={chatImage} alt="" />
      </div>

      {/* MAIN CONTENT */}
      <div className="achievement-content">
        {/* EYEBROW */}
        <div className="achievement-eyebrow">
          <span></span>
          <p>Achievement</p>
        </div>

        {/* HEADING */}
        <h2 className="achievement-title">
          Amazing interactive design
          <br className="achievement-desktop-break" />
          and user experience for better
          <br className="achievement-desktop-break" />
          productivity.
        </h2>

        {/* DESCRIPTION */}
        <p className="achievement-description">
          Use customer data to build great and solid product
          <br className="achievement-desktop-break" />
          experiences that convert.
        </p>

        {/* CTA BUTTON */}
        <a href="#contact" className="achievement-button">
          <span>Let's Get Connected</span>

          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12H19M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      {/* PURPLE FLOATING DOT */}
      <div className="achievement-dot"></div>

      {/* ORBIT CIRCLES */}
      <div className="achievement-orbit achievement-orbit--one"></div>
      <div className="achievement-orbit achievement-orbit--two"></div>

      {/* MAIN TEAM IMAGE */}
      <div className="achievement-team-image">
        <img src={teamImage} alt="Creative team collaborating on digital projects" />
      </div>
    </section>
  );
}
