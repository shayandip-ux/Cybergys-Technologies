import { useEffect, useRef, useState } from "react";
import projectImage from "../../assets/hero-thumb-1.png";
import "./quick-projects.css";

const teamImages = [
  {
    id: 1,
    className: "quick-projects__avatar--one",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    alt: "Team member",
  },
  {
    id: 2,
    className: "quick-projects__avatar--two",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
    alt: "Team member",
  },
  {
    id: 3,
    className: "quick-projects__avatar--three",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
    alt: "Team member",
  },
  {
    id: 4,
    className: "quick-projects__avatar--four",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    alt: "Team member",
  },
];

export default function QuickProjects() {
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
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`quick-projects${isVisible ? " is-visible" : ""}`} id="quick-projects">
      {/* Background effects */}
      <div className="quick-projects__background" aria-hidden="true" />

      <div className="quick-projects__container">
        {/* LEFT VISUAL AREA */}
        <div className="quick-projects__visual">
          {/* <div className="quick-projects__blue-circle" />
          <div className="quick-projects__orbit quick-projects__orbit--one" />
          <div className="quick-projects__orbit quick-projects__orbit--two" />
          <div className="quick-projects__main-person">
            <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000&h=1200&fit=crop" alt="Professional working on a laptop" />
          </div>
          {teamImages.map((member) => (
            <div className={`quick-projects__avatar ${member.className}`} key={member.id}>
              <img src={member.image} alt={member.alt} />
            </div>
          ))} */}
          <img src={projectImage} alt="" />
        </div>

        {/* RIGHT CONTENT AREA */}
        <div className="quick-projects__content">
          {/* Small label */}
          <div className="quick-projects__label">
            <span>Have a Projects?</span>
          </div>

          {/* Main heading */}
          <h2 className="quick-projects__title">
            Have A Project? Speak With
            <br className="desktop-break" />
            Our expert.
          </h2>

          {/* Contact information */}
          <a href="tel:+9198567451263" className="quick-projects__contact">
            {/* Phone icon */}
            <span className="quick-projects__phone-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.56 3.58.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.19 2.46.56 3.58a1 1 0 0 1-.25 1.01l-2.19 2.2Z" />
              </svg>
            </span>

            {/* Phone text */}
            <span className="quick-projects__contact-text">
              <span className="quick-projects__contact-label">Call Us For Service</span>

              <strong>+91-98567451263</strong>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
