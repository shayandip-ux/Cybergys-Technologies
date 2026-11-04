import { useEffect, useRef, useState } from "react";
import "./aboutus.css";

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
        <span className="aboutus_fstheading">1. WHO WE ARE</span>

        <span className="aboutus_secondoutsection">
          HAVE A BRILLIANT
          <br />
          IDEA BOOST THE <span className="aboutus_graytext aboutus-growth">GROWTH</span>
          <br />
          <span className="aboutus_graytext aboutus-development">DEVELOPMENT</span> AGENCY
          <br />
          YOUR BRANDING!
        </span>

        <img src="src/assets/img-s-66.webp" className="aboutus_rightshapedesign aboutus-shape-enter" alt="" aria-hidden="true" />
      </div>

      {/* ABOUT CONTENT */}

      <div className="aboutus_secondstructureoutsection">
        {/* LEFT CONTENT */}

        <div className="aboutus_secondstructureleft aboutus-left-enter">
          <img src="src/assets/img-s-4.webp" alt="" />

          <div className="aboutus-counter">
            <span className="aboutus_leftnumbertextdesign">32k+</span>

            <span className="aboutus_leftrotatetetxtdesign">
              happy clients
              <br />
              of our
              <br />
              services
            </span>
          </div>
        </div>

        {/* RIGHT CONTENT */}

        <div className="aboutus_secondstructureright aboutus-right-enter">
          <p>Welcome to Cybergys Technologies – Empowering Technological Excellence Since 2006. Cybergys has emerged as a leading company in the digital realm headquartered in Kolkata, India. Since its establishment, the company thrives to provide services globally.</p>

          <p>Our expertise spans a spectrum of services, including Web development, Web design, Application development, Digital marketing, BPO/KPO and Customer support services. Specializing in Web development, our professionals bring innovation and expertise to every project.</p>

          <button className="explore_btndesign">
            Explore Us
            <br />
            More
          </button>
        </div>
      </div>

      {/* BOTTOM IMAGES */}

      <div className="aboutus-bottom-section">
        <div className="aboutdown_leftsection aboutus-bottom-left-enter">
          <img src="src/assets/code-1.png" alt="" />
        </div>

        <div className="aboutdown_rightsection aboutus-bottom-right-enter">
          <img src="src/assets/about-right.png" alt="" />
        </div>
      </div>
    </section>
  );
}
