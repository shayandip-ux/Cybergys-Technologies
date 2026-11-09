import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";

import "./work-showcase.css";

import webDevelopmentImage from "../../assets/img-s-1.webp";
import webDesignImage from "../../assets/img-s-2.webp";
import ecommerceImage from "../../assets/img-s-33.webp";
import campaignImage from "../../assets/img-s-44.webp";
import showcaseBackground from "../../assets/service-background.png";

const projects = [
  {
    id: 1,
    title: "Web Development",
    category: "Branding - 2026",
    filter: "web-development",
    image: webDevelopmentImage,
    imageAlt: "Web development dashboard project",
  },
  {
    id: 2,
    title: "Web Design",
    category: "Branding - 2026",
    filter: "web-design",
    image: webDesignImage,
    imageAlt: "Website design project",
  },
  {
    id: 3,
    title: "Web Development",
    category: "Branding - 2026",
    filter: "ecommerce",
    image: ecommerceImage,
    imageAlt: "Ecommerce website development project",
  },
  {
    id: 4,
    title: "Web Design",
    category: "Branding - 2026",
    filter: "web-design",
    image: campaignImage,
    imageAlt: "Creative branding and web design project",
  },
  {
    id: 5,
    title: "Web Development",
    category: "Branding - 2026",
    filter: "web-development",
    image: webDevelopmentImage,
    imageAlt: "Web development dashboard project",
  },
  {
    id: 6,
    title: "Web Design",
    category: "Branding - 2026",
    filter: "web-design",
    image: webDesignImage,
    imageAlt: "Website design project",
  },
];

const filters = [
  {
    label: "All Works",
    value: "all",
  },
  {
    label: "Web Development",
    value: "web-development",
  },
  {
    label: "Web Design",
    value: "web-design",
  },
  {
    label: "E-commerce",
    value: "ecommerce",
  },
];

export default function WorkShowcase({ showAllLink = true }) {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const previousPositions = useRef(new Map());
  const animationFrame = useRef(null);
  const transitionTimer = useRef(null);

  const [activeFilter, setActiveFilter] = useState("all");

  const [isVisible, setIsVisible] = useState(() => typeof IntersectionObserver === "undefined");

  // =====================================
  // SCROLL REVEAL
  // =====================================

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || typeof IntersectionObserver === "undefined") {
      return;
    }

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

  // =====================================
  // CAPTURE PREVIOUS CARD POSITIONS
  // =====================================

  const handleFilter = (filterValue) => {
    if (filterValue === activeFilter) return;

    const cards = gridRef.current?.querySelectorAll(".work-showcase__card");

    const positions = new Map();

    cards?.forEach((card) => {
      positions.set(card.dataset.projectId, card.getBoundingClientRect());
    });

    previousPositions.current = positions;

    // Cancel any previous pending animation.
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }

    if (transitionTimer.current) {
      clearTimeout(transitionTimer.current);
    }

    setActiveFilter(filterValue);
  };

  // =====================================
  // FLIP ANIMATION
  // Smooth Isotope-style rearrangement
  // =====================================

  useLayoutEffect(() => {
    const grid = gridRef.current;

    if (!grid || previousPositions.current.size === 0) {
      return;
    }

    const cards = grid.querySelectorAll(".work-showcase__card:not(.is-hidden)");

    const movingCards = [];

    cards.forEach((card) => {
      const previousRect = previousPositions.current.get(card.dataset.projectId);

      if (!previousRect) return;

      const newRect = card.getBoundingClientRect();

      const deltaX = previousRect.left - newRect.left;
      const deltaY = previousRect.top - newRect.top;

      if (Math.abs(deltaX) < 1 && Math.abs(deltaY) < 1) {
        return;
      }

      // INVERT
      card.style.transition = "none";

      card.style.transform = `
        translate(${deltaX}px, ${deltaY}px)
      `;

      movingCards.push(card);
    });

    // Force browser to apply initial positions.
    grid.offsetHeight;

    // PLAY
    animationFrame.current = requestAnimationFrame(() => {
      movingCards.forEach((card) => {
        card.style.transition = `
          transform 750ms cubic-bezier(0.22, 1, 0.36, 1)
        `;

        card.style.transform = "translate(0, 0)";
      });
    });

    previousPositions.current.clear();

    // Clean inline styles after animation.
    transitionTimer.current = setTimeout(() => {
      movingCards.forEach((card) => {
        card.style.transition = "";
        card.style.transform = "";
      });
    }, 850);

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }

      if (transitionTimer.current) {
        clearTimeout(transitionTimer.current);
      }
    };
  }, [activeFilter]);

  // =====================================
  // FILTERED PROJECTS
  // =====================================

  const filteredProjects = activeFilter === "all" ? projects : projects.filter((project) => project.filter === activeFilter);

  return (
    <section
      ref={sectionRef}
      className={`work-showcase ${isVisible ? "is-visible" : ""}`}
      id="portfolio"
      style={{
        "--work-showcase-background": `url("${showcaseBackground}")`,
      }}
      aria-labelledby="work-showcase-title"
    >
      <div className="work-showcase__inner">
        {/* =================================
            SECTION HEADING
        ================================= */}

        <header className="work-showcase__heading">
          <span className="work-showcase__eyebrow">WORK SHOWCASE</span>

          <h2 id="work-showcase-title">
            SOME FEATURED
            <br />
            WORKS
          </h2>
        </header>

        {/* =================================
            FILTER BUTTONS
        ================================= */}

        <div className="work-showcase__filters" role="group" aria-label="Filter portfolio projects">
          {filters.map((filter) => (
            <button key={filter.value} type="button" className={`work-showcase__filter ${activeFilter === filter.value ? "active" : ""}`} onClick={() => handleFilter(filter.value)} aria-pressed={activeFilter === filter.value}>
              {filter.label}
            </button>
          ))}
        </div>

        {/* =================================
            PROJECT GRID
        ================================= */}

        <div ref={gridRef} className="work-showcase__grid" aria-live="polite">
          {projects.map((project, index) => {
            const isHidden = activeFilter !== "all" && project.filter !== activeFilter;

            return (
              <article
                key={project.id}
                data-project-id={project.id}
                className={`work-showcase__card ${isHidden ? "is-hidden" : ""}`}
                style={{
                  "--project-index": index,
                }}
                aria-hidden={isHidden}
                inert={isHidden ? true : undefined}
              >
                <Link className="work-showcase__image-link" to="/#quick-projects" tabIndex={isHidden ? -1 : 0} aria-label={`Learn more about ${project.title} project`}>
                  <img className="work-showcase__image" src={project.image} alt={project.imageAlt} loading="lazy" />

                  {/* HOVER OVERLAY */}

                  <span className="work-showcase__image-overlay">
                    <span className="work-showcase__view-icon">↗</span>
                  </span>
                </Link>

                {/* PROJECT INFORMATION */}

                <div className="work-showcase__card-content">
                  <div>
                    <h3>{project.title}</h3>

                    <p>{project.category}</p>
                  </div>

                  <span className="work-showcase__card-number">{String(project.id).padStart(2, "0")}</span>
                </div>
              </article>
            );
          })}
        </div>

        {/* =================================
            VIEW ALL BUTTON
        ================================= */}

        {showAllLink && (
          <Link className="work-showcase__all-link" to="/portfolio">
            <span>View All Works</span>

            <span className="work-showcase__all-icon" aria-hidden="true">
              ↗
            </span>
          </Link>
        )}
      </div>
    </section>
  );
}
