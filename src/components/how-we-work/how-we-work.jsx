import { useEffect, useRef, useState } from "react";
import "./how-we-work.css";
import planningImage from "../../assets/process-1-1.png";
import developmentImage from "../../assets/process-1-2.png";
import launchImage from "../../assets/process-1-3.png";
import processArrow from "../../assets/process-one-arrow.png";

const steps = [
  {
    number: "01",
    title: "Initiation & Planning",
    description: "We define your goals, understand your requirements, and build a strategic roadmap for success.",
    image: planningImage,
    imageAlt: "Team planning a website layout",
  },
  {
    number: "02",
    title: "Execution & Development",
    description: "We transform your vision into powerful digital solutions through thoughtful design and expert development.",
    image: developmentImage,
    imageAlt: "Team collaborating on a digital design",
  },
  {
    number: "03",
    title: "Testing & Maintenance",
    description: "We ensure quality, security, and performance through rigorous testing and continuous improvement.",
    image: launchImage,
    imageAlt: "Team celebrating a successful project launch",
  },
];

export default function HowWeWork() {
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
    <section id="how-we-work" ref={sectionRef} className={`how-we-work${isVisible ? " is-visible" : ""}`} aria-labelledby="how-we-work-title">
      <div className="how-we-work__inner">
        <header className="how-we-work__heading">
          <h2 id="how-we-work-title">How We Work</h2>
          <p>Turning Ideas Into Powerful Digital Solutions</p>
        </header>

        <div className="how-we-work__steps">
          {steps.map(({ number, title, description, image, imageAlt }, index) => (
            <article className="how-we-work__step" key={number} style={{ "--step-index": index }}>
              <div className="how-we-work__illustration">
                <img src={image} alt={imageAlt} />
              </div>
              <h3>{title}</h3>
              <p className="how-we-work__description">{description}</p>
              <div className="how-we-work__step-footer">
                <span className="how-we-work__number">{number}</span>
                {index < steps.length - 1 && <img className="how-we-work__arrow" src={processArrow} alt="" aria-hidden="true" />}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
