import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import aboutShape from "../../assets/img-s-66.webp";
import aboutImage from "../../assets/img-s-4.webp";
import codeImage from "../../assets/code-1.png";
import aboutRightImage from "../../assets/about-right.png";
import "./aboutus.css";
import { CmsText } from "../../cms/PageContent.jsx";

export default function AboutUs() {
  const headingRef = useRef(null);

  const [isVisible, setIsVisible] = useState(() => typeof IntersectionObserver === "undefined");

  useEffect(() => {
    const heading = headingRef.current;

    if (!heading || typeof IntersectionObserver === "undefined") return;

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

    observer.observe(heading);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className={`aboutus_mainoutsection${isVisible ? " is-visible" : ""}`} aria-label="About us">
      {/* HEADING SECTION */}

      <div ref={headingRef} className="aboutus_firstoutsection aboutus-heading-enter">
        <CmsText as="span" className="aboutus_fstheading" contentKey="about.eyebrow" fallback="1. WHO WE ARE" />

        <span className="aboutus_secondoutsection">
          <CmsText contentKey="about.heading_line_one" fallback="HAVE A BRILLIANT" />
          <br />
          <CmsText contentKey="about.heading_line_two" fallback="IDEA BOOST THE" /> {" "}
          <CmsText as="span" className="aboutus_graytext aboutus-growth" contentKey="about.highlight_growth" fallback="GROWTH" />
          <br />
          <CmsText as="span" className="aboutus_graytext aboutus-development" contentKey="about.highlight_development" fallback="DEVELOPMENT" /> {" "}
          <CmsText contentKey="about.heading_agency" fallback="AGENCY" />
          <br />
          <CmsText contentKey="about.heading_branding" fallback="YOUR BRANDING!" />
        </span>

        <img src={aboutShape} className="aboutus_rightshapedesign aboutus-shape-enter" alt="" aria-hidden="true" />
      </div>

      {/* ABOUT CONTENT */}

      <div className="aboutus_secondstructureoutsection">
        {/* LEFT CONTENT */}

        <div className="aboutus_secondstructureleft aboutus-left-enter">
          <img src={aboutImage} alt="" />

          <div className="aboutus-counter">
            <CmsText as="span" className="aboutus_leftnumbertextdesign" contentKey="about.client_count" fallback="32k+" />

            <CmsText as="span" className="aboutus_leftrotatetetxtdesign" contentKey="about.client_caption" fallback="happy clients of our services" />
          </div>
        </div>

        {/* RIGHT CONTENT */}

        <div className="aboutus_secondstructureright aboutus-right-enter">
          <CmsText as="p" contentKey="about.intro" fallback="Welcome to Cybergys Technologies – Empowering Technological Excellence Since 2006." />

          <CmsText as="p" contentKey="about.description" fallback="Our expertise spans a spectrum of services, including Web development, Web design, Application development, Digital marketing, BPO/KPO and Customer support services. Specializing in Web development, our professionals bring innovation and expertise to every project." />

          <Link className="explore_btndesign" to="/about-us" aria-label="Explore more about us">
            <CmsText as="span" contentKey="about.cta" fallback="Explore Us More" />
          </Link>
        </div>
      </div>

      {/* BOTTOM IMAGES */}

      <div className="aboutus-bottom-section">
        <div className="aboutdown_leftsection aboutus-bottom-left-enter">
          <img src={codeImage} alt="" />
        </div>

        <div className="aboutdown_rightsection aboutus-bottom-right-enter">
          <img src={aboutRightImage} alt="" />
        </div>
      </div>
    </section>
  );
}
