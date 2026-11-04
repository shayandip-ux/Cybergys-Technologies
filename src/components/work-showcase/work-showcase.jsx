import { useEffect, useRef, useState } from "react";
import "./work-showcase.css";
import webDevelopmentImage from "../../assets/img-s-1.webp";
import webDesignImage from "../../assets/img-s-2.webp";
import ecommerceImage from "../../assets/img-s-33.webp";
import campaignImage from "../../assets/img-s-44.webp";
import showcaseBackground from "../../assets/service-background.png";

const projects = [
  {
    title: "Web Development",
    category: "Branding - 2026",
    image: webDevelopmentImage,
    imageAlt: "Web design project illustration",
  },
  {
    title: "Web Design",
    category: "Branding - 2026",
    image: webDesignImage,
    imageAlt: "Web development project illustration",
  },
  {
    title: "Web Development",
    category: "Branding - 2026",
    image: ecommerceImage,
    imageAlt: "Application development project illustration",
  },
  {
    title: "Web Design",
    category: "Branding - 2026",
    image: campaignImage,
    imageAlt: "Digital marketing project illustration",
  },
];

export default function WorkShowcase() {
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
    <section ref={sectionRef} className={`work-showcase${isVisible ? " is-visible" : ""}`} style={{ "--work-showcase-background": `url("${showcaseBackground}")` }} aria-labelledby="work-showcase-title">
      <div className="work-showcase__inner">
        <header className="work-showcase__heading">
          <span className="work-showcase__eyebrow">WORK SHOWCASE</span>
          <h2 id="work-showcase-title">
            SOME FEATURED
            <br />
            WORKS
          </h2>
        </header>

        <div className="work-showcase__grid">
          {projects.map(({ title, category, image, imageAlt }, index) => (
            <article className="work-showcase__card" key={`${title}-${index}`} style={{ "--project-index": index }}>
              <a className="work-showcase__image-link" href="#contact" aria-label={`Learn more about ${title} project`}>
                <img className="work-showcase__image" src={image} alt={imageAlt} />
              </a>
              <h3>{title}</h3>
              <p>{category}</p>
            </article>
          ))}
        </div>
        <a className="work-showcase__all-link" href="#contact">
          <span>View All Works</span>
          <span className="work-showcase__all-icon" aria-hidden="true">
            ↗
          </span>
        </a>
      </div>
    </section>
  );
}
