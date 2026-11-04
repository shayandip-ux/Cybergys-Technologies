import { useEffect, useRef, useState } from "react";
import "./services.css";
import webDesignImage from "../../assets/srv_1.png";
import webDevelopmentImage from "../../assets/srv_2.png";
import appDevelopmentImage from "../../assets/app-development.png";
import digitalMarketingImage from "../../assets/ad-campaign-5841146-4884476.png";
import customerServiceImage from "../../assets/customer-care.png";

const services = [
  {
    number: "01.",
    title: "Web Designing",
    description: "We craft custom designs with unparalleled creativity. Our goal is to balance innovation and user-experience to promote engagement as well as conversion!",
    image: webDesignImage,
    imageAlt: "Web designer working at a computer",
  },
  {
    number: "02.",
    title: "Web Development",
    description: "Experience tailored website development services at affordable prices. Get in touch with our professional developers and benefit from their expertise in cutting edge technologies.",
    image: webDevelopmentImage,
    imageAlt: "Web developer working at a computer",
  },
  {
    number: "03.",
    title: "App Development",
    description: "Our in-house application developers offer you top-notch services within the stipulated time. At Cybergys, we aim at developing robust mobile applications and offer the best user experience too.",
    image: appDevelopmentImage,
    imageAlt: "Application development illustration",
  },
  {
    number: "04.",
    title: "Digital Marketing",
    description: "Cybergys team includes efficient professionals to offer the best digital marketing services. SEO, SMM, Content creation and marketing—we have it all at a reasonable cost.",
    image: digitalMarketingImage,
    imageAlt: "Digital marketing illustration",
  },
  {
    number: "05.",
    title: "Ecommerce Customer Service",
    description: "Applying some photoshop skills to upgrade product images and optimizing their titles and descriptions with high-ranking keywords are essential to run your online store!",
    image: customerServiceImage,
    imageAlt: "Customer service representative illustration",
  },
];

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
    <section id="services" className={`services-section bg-[url('src/assets/service-background.png')] bg-cover bg-top bg-no-repeat${isVisible ? " is-visible" : ""}`} aria-labelledby="services-title">
      <div className="services-inner">
        <div ref={headingRef} className="services-intro services-enter-up">
          <span className="services-intro__eyebrow">[ EXPLORE SERVICES ]</span>
          <h2 id="services-title">
            RELIABLE IT SOLUTION
            <br />
            FOR A SMARTER
          </h2>
          <a className="services-intro__link" href="#contact">
            <span>Learn More</span>
            <span className="services-intro__link-icon" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>

        {services.map(({ number, title, description, image, imageAlt }, index) => (
          <article className="services-card services-enter-up" style={{ "--services-stagger": `${index * 100}ms` }} key={number}>
            <span className="services-card__number">{number}</span>
            <div className="services-card__surface">
              <img className="services-card__image" src={image} alt={imageAlt} />
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
            <a className="services-card__link" href="#contact">
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
