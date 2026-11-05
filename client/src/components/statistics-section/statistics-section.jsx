import { useEffect, useRef, useState } from "react";
import "./statistics-section.css";
import planningIcon from "../../assets/63d0d174f0864e6099686241_Respected Clients.svg";
import clientIcon from "../../assets/63d0d17fa383ceb5fca61d55_Businesses Guided.svg";
import projectsIcon from "../../assets/63d0d20850e4e9119aed66e0_Businesses guided.svg";
import qualityIcon from "../../assets/63d0d179b378db3bae0d4166_Experienced People.svg";

const statistics = [
  {
    target: 18,
    suffix: "k+",
    spokenValue: "18,000+",
    description: "Nam Erat Enim, Porta At Turpis Quis.",
    icon: planningIcon,
  },
  {
    target: 864,
    suffix: "+",
    spokenValue: "864+",
    description: "Nunc Non Dui Non Diam Imperdiet Accumsan.",
    icon: clientIcon,
  },
  {
    target: 243,
    suffix: "+",
    spokenValue: "243+",
    description: "Phasellus At Orci Id Justo Blandit Tincidunt Ut.",
    icon: projectsIcon,
  },
  {
    target: 96,
    suffix: "+",
    spokenValue: "96+",
    description: "Aliquam Ex Nunc, Bibendum Ut Mollis Non",
    icon: qualityIcon,
  },
];

export default function StatisticsSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(() => typeof IntersectionObserver === "undefined");
  const [counts, setCounts] = useState(() => {
    const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return statistics.map(({ target }) => (prefersReducedMotion ? target : 0));
  });

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

  useEffect(() => {
    if (!isVisible) return undefined;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return undefined;

    const duration = 1800;
    let frameId = 0;
    let startTime;

    const animateCounts = (timestamp) => {
      if (startTime === undefined) startTime = timestamp;
      const progress = Math.min(1, (timestamp - startTime) / duration);
      const easedProgress = 1 - (1 - progress) ** 3;

      setCounts(statistics.map(({ target }) => Math.round(target * easedProgress)));

      if (progress < 1) {
        frameId = requestAnimationFrame(animateCounts);
      }
    };

    frameId = requestAnimationFrame(animateCounts);
    return () => cancelAnimationFrame(frameId);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className={`statistics-section${isVisible ? " is-visible" : ""}`} aria-label="Company statistics">
      <div className="statistics-section__grid">
        {statistics.map(({ suffix, spokenValue, description, icon }, index) => (
          <article
            className="statistics-section__item"
            key={spokenValue}
            style={{ "--statistic-index": index }}
          >
            <img className="statistics-section__icon" src={icon} alt="" aria-hidden="true" />
            <strong aria-label={spokenValue} aria-live="off">
              {counts[index]}
              {suffix}
            </strong>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
