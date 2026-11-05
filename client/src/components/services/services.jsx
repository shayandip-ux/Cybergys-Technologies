import { useEffect, useRef, useState } from "react";
import "./services.css";
import servicesBackground from "../../assets/service-background.png";
import { services } from "./services-data.js";

export default function Services() {
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
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(heading);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className={`services-section bg-cover bg-top bg-no-repeat${isVisible ? " is-visible" : ""}`} style={{ backgroundImage: `url(${servicesBackground})` }} aria-labelledby="services-title">
      <div className="services-inner">
        <div ref={headingRef} className="services-intro services-enter-up">
          <span className="services-intro__eyebrow">[ EXPLORE SERVICES ]</span>
          <h2 id="services-title">
            RELIABLE IT SOLUTION
            <br />
            FOR A SMARTER
          </h2>
          <a className="services-intro__link" href="/services">
            <span>Learn More</span>
            <span className="services-intro__link-icon" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>

        {services.map(({ slug, number, title, description, image, imageAlt }, index) => (
          <article className="services-card services-enter-up" style={{ "--services-stagger": `${index * 100}ms` }} key={number}>
            <span className="services-card__number">{number}</span>
            <div className="services-card__surface">
              <img className="services-card__image" src={image} alt={imageAlt} />
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
            <a className="services-card__link" href={`/services/${slug}`}>
              Learn More
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="m6 3 5 5-5 5" />
              </svg>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
