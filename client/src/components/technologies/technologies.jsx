import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import teamImage from "../../assets/technologies-right.avif";
import html5Image from "../../assets/html5.png";
import cssImage from "../../assets/css.png";
import bootstrapImage from "../../assets/bootstrap.png";
import javascriptImage from "../../assets/javascript.png";
import jqueryImage from "../../assets/jquery.png";
import phpImage from "../../assets/php.png";
import mysqlImage from "../../assets/mysql.png";
import laravelImage from "../../assets/laravel.png";
import pythonImage from "../../assets/python.png";
import angularImage from "../../assets/angular.png";
import wordpressImage from "../../assets/wordpress.png";
import highLevelImage from "../../assets/ghl.png";
import leadsHookImage from "../../assets/leadshook.png";
import webflowImage from "../../assets/webflow.png";
import photoshopImage from "../../assets/photoshop.png";
import figmaImage from "../../assets/figma.png";
import companyBackground from "../../assets/mitech-home-infotechno-section-company-bg.webp";
import "./technologies.css";

const technologies = [
  { name: "HTML5", image: html5Image },
  { name: "CSS3", image: cssImage },
  { name: "Bootstrap", image: bootstrapImage },
  { name: "JavaScript", image: javascriptImage },
  { name: "jQuery", image: jqueryImage },
  { name: "PHP", image: phpImage },
  { name: "MySQL", image: mysqlImage },
  { name: "Laravel", image: laravelImage },
  { name: "Python", image: pythonImage },
  { name: "Angular", image: angularImage },
  { name: "WordPress", image: wordpressImage },
  { name: "HighLevel", image: highLevelImage },
  { name: "LeadsHook", image: leadsHookImage },
  { name: "Webflow", image: webflowImage },
  { name: "Photoshop", image: photoshopImage },
  { name: "Figma", image: figmaImage },
];

const technologyColumns = Array.from({ length: 4 }, (_, columnIndex) =>
  technologies.filter((_, technologyIndex) => technologyIndex % 4 === columnIndex),
);

export default function Technologies() {
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
    <section ref={sectionRef} className={`technologies-section${isVisible ? " is-visible" : ""}`} id="technologies" aria-labelledby="technologies-title">
      <div className="technologies-section__decoration" aria-hidden="true">
        <span className="technologies-section__orb" />
      </div>

      <div className="technologies-section__content">
        <Link className="technologies-section__label" to="#technologies">
          <span>Technologies We Use</span>
          <span className="technologies-section__arrow" aria-hidden="true">
            →
          </span>
        </Link>

        <h2 className="technologies-section__title" id="technologies-title">
          We use technology that
          <br />
          is built to last
        </h2>

        <div className="technologies-section__grid" aria-label="Technology stack">
          {technologyColumns.map((column, columnIndex) => (
            <div className="technologies-section__column" key={column[0].name}>
              <div className={`technologies-section__track${columnIndex % 2 === 1 ? " is-reversed" : ""}`}>
                {[0, 1].map((copy) => (
                  <div
                    className="technologies-section__column-set"
                    key={copy}
                    aria-hidden={copy === 1 ? "true" : undefined}
                  >
                    {column.map(({ name, image }) => (
                      <div className="technologies-section__tile" key={name}>
                        <img src={image} alt={copy === 0 ? name : ""} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="technologies-section__team">
        <img src={teamImage} alt="Colleagues collaborating together in their office" />
      </div>
      <div className="backshape_section" aria-hidden="true">
        <img src={companyBackground} className="backshape_imgdesign" alt="" />
      </div>
    </section>
  );
}
