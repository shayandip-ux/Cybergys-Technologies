import { useState, useEffect, useMemo, useRef } from "react";

import alexImage from "../../assets/team-3-1 3.png";
import emilyImage from "../../assets/team-3-1 1.png";
import sophiaImage from "../../assets/team-3-1 2.png";
import teamCardFrame from "../../assets/Abstract-Blue-Gradient-UI-Card-with-shadow.png";
import teamBackground from "../../assets/service-background.png";

import "./team.css";

const teamMembers = [
  {
    name: "Alex Carter",
    role: "UI/UX Designer",
    description: "Create user-friendly designs that are modern, beautiful and driven by real user needs.",
    image: alexImage,
  },
  {
    name: "Emily Watson",
    role: "Lead Developer",
    description: "Love clean code, scalable systems, and turning complex challenges into simple solutions.",
    image: emilyImage,
  },
  {
    name: "Sophia Mitchell",
    role: "AI Developer",
    description: "Focus on turning ideas into meaningful digital experiences that solve real problems.",
    image: sophiaImage,
  },
];

function SocialIcon({ label, children }) {
  return (
    <span className="team-card__social-icon" aria-label={label} role="img">
      {children}
    </span>
  );
}

export default function Team() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(() => typeof IntersectionObserver === "undefined");
  const [visibleCount, setVisibleCount] = useState(3);

  const [currentIndex, setCurrentIndex] = useState(3);

  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const [isAnimating, setIsAnimating] = useState(false);

  const trackRef = useRef(null);

  const teamLength = teamMembers.length;

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

  // Responsive visible cards
  useEffect(() => {
    function updateVisibleCount() {
      if (window.innerWidth <= 767) {
        setVisibleCount(1);
      } else if (window.innerWidth <= 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    }

    updateVisibleCount();

    window.addEventListener("resize", updateVisibleCount);

    return () => {
      window.removeEventListener("resize", updateVisibleCount);
    };
  }, []);

  // Create cloned cards for infinite carousel
  const sliderMembers = useMemo(() => {
    const beforeClones = teamMembers.slice(-visibleCount);
    const afterClones = teamMembers.slice(0, visibleCount);

    return [...beforeClones, ...teamMembers, ...afterClones];
  }, [visibleCount]);

  // Reset position when responsive layout changes
  useEffect(() => {
    setTransitionEnabled(false);
    setCurrentIndex(visibleCount);
    setIsAnimating(false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTransitionEnabled(true);
      });
    });
  }, [visibleCount]);

  // Next slide
  function showNext() {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentIndex((index) => index + 1);
  }

  // Previous slide
  function showPrevious() {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentIndex((index) => index - 1);
  }

  // Handle infinite loop without visible jump
  function handleTransitionEnd(event) {
    if (event.target !== trackRef.current || event.propertyName !== "transform") {
      return;
    }

    if (currentIndex >= visibleCount + teamLength) {
      setTransitionEnabled(false);
      setCurrentIndex(visibleCount);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
          setIsAnimating(false);
        });
      });

      return;
    }

    if (currentIndex < visibleCount) {
      setTransitionEnabled(false);

      setCurrentIndex(visibleCount + teamLength - 1);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
          setIsAnimating(false);
        });
      });

      return;
    }

    setIsAnimating(false);
  }

  return (
    <section ref={sectionRef} className={`team-section bg-cover bg-top bg-no-repeat${isVisible ? " is-visible" : ""}`} style={{ backgroundImage: `url(${teamBackground})` }} id="team" aria-labelledby="team-title">
      <div className="team-section__inner">
        {/* SECTION HEADING */}
        <header className="team-section__heading">
          <span className="team-section__eyebrow">OUR TEAM</span>

          <h2 id="team-title">
            Dedicated <span>Professionals</span> With
            <br />a Diverse Expertise
          </h2>
        </header>

        {/* SLIDER VIEWPORT */}
        <div className="team-section__viewport" aria-live="polite">
          {/* SLIDER TRACK */}
          <div
            ref={trackRef}
            className={`team-section__track ${transitionEnabled ? "is-animated" : ""}`}
            onTransitionEnd={handleTransitionEnd}
            style={{
              "--total-slides": sliderMembers.length,
              "--visible-count": visibleCount,
              "--current-index": currentIndex,
            }}
          >
            {sliderMembers.map(({ name, role, description, image }, index) => (
              <article className="team-card" key={`${name}-${index}`}>
                {/* CARD FRAME */}
                <img className="team-card__frame" src={teamCardFrame} alt="" aria-hidden="true" />

                {/* MEMBER IMAGE */}
                <div className="team-card__portrait">
                  <img src={image} alt={name} />
                </div>

                {/* MEMBER DETAILS */}
                <div className="team-card__details">
                  <h3>{name}</h3>

                  <p className="team-card__role">{role}</p>

                  <p className="team-card__description">{description}</p>

                  {/* SOCIAL ICONS */}
                  <div className="team-card__socials" aria-label={`${name} social links`}>
                    {/* LinkedIn */}
                    <SocialIcon label="LinkedIn">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M6.5 8.5v9M6.5 6v.1M10.5 17.5v-9h3.7v1.3c.6-.9 1.5-1.5 2.8-1.5 2.1 0 3.5 1.3 3.5 4v5.2" />
                      </svg>
                    </SocialIcon>

                    {/* GitHub */}
                    <SocialIcon label="GitHub">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.2 19.5c-4.2 1.3-4.2-2.1-5.9-2.5m11.8 5v-3.2a2.8 2.8 0 0 0-.8-2.2c2.8-.3 5.7-1.4 5.7-6.3a4.9 4.9 0 0 0-1.3-3.4 4.5 4.5 0 0 0-.1-3.4s-1.1-.3-3.5 1.3a12 12 0 0 0-6.4 0C5.3 3.2 4.2 3.5 4.2 3.5a4.5 4.5 0 0 0-.1 3.4 4.9 4.9 0 0 0-1.3 3.4c0 4.9 2.9 6 5.7 6.3a2.8 2.8 0 0 0-.8 2.2V22" />
                      </svg>
                    </SocialIcon>

                    {/* Email */}
                    <SocialIcon label="Email">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />

                        <path d="m4.5 7 7.5 6 7.5-6" />
                      </svg>
                    </SocialIcon>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* SLIDER CONTROLS */}
        <div className="team-section__controls" aria-label="Team carousel controls">
          {/* PREVIOUS */}
          <button type="button" onClick={showPrevious} disabled={isAnimating} aria-label="Previous team members">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m15 5-7 7 7 7" />
            </svg>
          </button>

          {/* NEXT */}
          <button type="button" onClick={showNext} disabled={isAnimating} aria-label="Next team members">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m9 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
