import { useEffect, useRef, useState } from "react";
import "./empowering-skills-section.css";

import creativityImage from "../../assets/empower-11.png";
import relationshipsImage from "../../assets/empower-12.png";
import responsibilityImage from "../../assets/empower-11.png";
import costImage from "../../assets/empower-12.png";

import creativityIcon from "../../assets/empower-1.webp";
import relationshipsIcon from "../../assets/empower-2.webp";
import responsibilityIcon from "../../assets/empower-3.webp";
import costIcon from "../../assets/empower-4.webp";

const skillAreas = [
  {
    icon: "creativity",
    iconImage: creativityIcon,
    title: "CREATIVITY",
    image: creativityImage,
    imageAlt: "Team collaborating around a laptop",
  },
  {
    icon: "relationships",
    iconImage: relationshipsIcon,
    title: "RELATIONSHIPS",
    image: relationshipsImage,
    imageAlt: "Colleagues working together in an office",
  },
  {
    icon: "responsibility",
    iconImage: responsibilityIcon,
    title: "RESPONSIBILITY",
    image: responsibilityImage,
    imageAlt: "Colleagues sharing ideas in a meeting",
  },
  {
    icon: "cost",
    iconImage: costIcon,
    title: "COST EFFECTIVE",
    image: costImage,
    imageAlt: "Team discussing a project in their office",
  },
];

export default function EmpoweringSkillsSection() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);

  const [isVisible, setIsVisible] = useState(() => typeof IntersectionObserver === "undefined");

  const [activeIndex, setActiveIndex] = useState(0);

  // =========================================
  // INTERSECTION OBSERVER
  // =========================================

  useEffect(() => {
    const stage = stageRef.current;

    if (!stage || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      },
    );

    observer.observe(stage);

    return () => observer.disconnect();
  }, []);

  // =========================================
  // RESPONSIVE SCROLL-BASED IMAGE SWITCHING
  // =========================================

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;

    if (!section || !stage) return;

    let frameId = null;

    const updateActiveIndex = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(() => {
        const sectionHeight = section.getBoundingClientRect().height;
        const stageHeight = stage.getBoundingClientRect().height;

        const scrollRange = sectionHeight - stageHeight;

        if (scrollRange <= 0) return;

        const sectionTop = section.getBoundingClientRect().top;

        const progress = Math.min(1, Math.max(0, -sectionTop / scrollRange));

        const nextIndex = Math.min(skillAreas.length - 1, Math.floor(progress * skillAreas.length));

        setActiveIndex((currentIndex) => (currentIndex === nextIndex ? currentIndex : nextIndex));
      });
    };

    updateActiveIndex();

    window.addEventListener("scroll", updateActiveIndex, {
      passive: true,
    });

    window.addEventListener("resize", updateActiveIndex);

    const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateActiveIndex) : null;

    resizeObserver?.observe(section);
    resizeObserver?.observe(stage);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);

      window.removeEventListener("scroll", updateActiveIndex);
      window.removeEventListener("resize", updateActiveIndex);

      resizeObserver?.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className={`empowering-skills${isVisible ? " is-visible" : ""}`} aria-label="Empowering skills">
      <div ref={stageRef} className="empowering-skills__stage">
        <div className="empowering-skills__inner">
          {/* HEADING */}

          <header className="empowering-skills__heading">
            <h2>
              Empowering skills
              <br />
              to help you!
            </h2>
          </header>

          {/* INTRO */}

          <p className="empowering-skills__intro">Add the best talent on the market, an agile skilled management &amp; seamless involvement</p>

          {/* SKILLS LIST */}

          <div className="empowering-skills__list" aria-label="Our strengths">
            {skillAreas.map(({ icon, iconImage, title }, index) => (
              <article className={`empowering-skills__item${activeIndex === index ? " is-active" : ""}`} key={icon}>
                <span className="empowering-skills__icon">
                  <img src={iconImage} alt="" aria-hidden="true" />
                </span>

                <div className="empowering-skills__copy">
                  <h3>{title}</h3>

                  <p>Add the best talent on the market, an agile skilled management &amp; seamless involvement</p>
                </div>
              </article>
            ))}
          </div>

          {/* RIGHT IMAGE */}

          <div className="empowering-skills__visual">
            {skillAreas.map(({ icon, image, imageAlt }, index) => (
              <img className={`empowering-skills__team-image${activeIndex === index ? " is-active" : ""}`} src={image} alt={imageAlt} key={icon} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
