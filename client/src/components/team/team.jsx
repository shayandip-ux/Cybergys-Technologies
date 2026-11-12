import { useState, useEffect, useMemo, useRef } from "react";

import alexImage from "../../assets/team-3-1 3.png";
import emilyImage from "../../assets/team-3-1 1.png";
import sophiaImage from "../../assets/team-3-1 2.png";
import teamCardFrame from "../../assets/Abstract-Blue-Gradient-UI-Card-with-shadow.png";
import teamBackground from "../../assets/service-background.png";
import linkedinIcon from "../../assets/white-linkedin.png";
import githubIcon from "../../assets/white-github.png";
import emailIcon from "../../assets/white-email.png";
import { getApi, mediaUrl } from "../../lib/api.js";

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
  const [members, setMembers] = useState(teamMembers);

  const [currentIndex, setCurrentIndex] = useState(3);

  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const [isAnimating, setIsAnimating] = useState(false);

  const trackRef = useRef(null);

  const teamLength = members.length;

  useEffect(() => {
    const controller = new AbortController();
    getApi("/api/teams", { signal: controller.signal }).then((data) => {
      if (!Array.isArray(data) || !data.length) return;
      setMembers(data.map((member, index) => ({
        name: member.name, role: member.designation ?? member.department ?? "Team member", description: member.short_bio ?? member.bio ?? "", image: mediaUrl(member.profile_image) ?? teamMembers[index % teamMembers.length].image,
      })));
    }).catch((error) => { if (error.name !== "AbortError") console.warn("Team content is unavailable."); });
    return () => controller.abort();
  }, []);

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
    const beforeClones = members.slice(-visibleCount);
    const afterClones = members.slice(0, visibleCount);

    return [...beforeClones, ...members, ...afterClones];
  }, [visibleCount, members]);

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
                      <img src={linkedinIcon} alt="" />
                    </SocialIcon>

                    {/* GitHub */}
                    <SocialIcon label="GitHub">
                      <img src={githubIcon} alt="" />
                    </SocialIcon>

                    {/* Email */}
                    <SocialIcon label="Email">
                      <img src={emailIcon} alt="" />
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
