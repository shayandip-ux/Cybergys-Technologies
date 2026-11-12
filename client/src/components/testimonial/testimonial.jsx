import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./testimonial.css";

const testimonials = [
  {
    id: 1,
    rating: "4.9",
    review: "We full service digital agency that build’s fascinating users experiences...",
    name: "Ceyhan Özçivit",
    position: "Mid-Level Developer",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
  },
  {
    id: 2,
    rating: "5.0",
    review: "Amazing experience working with this team. Their creativity and attention to detail made everything better...",
    name: "Sophia Williams",
    position: "Product Designer",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
  },
  {
    id: 3,
    rating: "4.8",
    review: "Professional, reliable and incredibly talented. They delivered exactly what our business needed...",
    name: "James Anderson",
    position: "Marketing Manager",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
  },
  {
    id: 4,
    rating: "5.0",
    review: "A fantastic digital partner. The entire process was smooth, creative and results driven...",
    name: "Olivia Martin",
    position: "Business Owner",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop",
  },
];

export default function TrustedTestimonials() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(() => typeof IntersectionObserver === "undefined");
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const [animationKey, setAnimationKey] = useState(0);
  const [testimonialItems, setTestimonialItems] = useState(testimonials);

  const activeTestimonial = testimonialItems[activeIndex] ?? testimonialItems[0];

  useEffect(() => {
    let active = true;

    fetch("/api/testimonials")
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Could not load testimonials")))
      .then(({ data }) => {
        if (!active || !Array.isArray(data) || !data.length) return;
        setTestimonialItems(data.map((testimonial) => ({ ...testimonial, image: testimonial.avatarUrl ?? testimonial.image })));
        setActiveIndex(0);
      })
      .catch(() => {});

    return () => { active = false; };
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

  // Next testimonial
  const handleNext = () => {
    setDirection("next");

    setActiveIndex((prev) => (prev + 1) % testimonialItems.length);

    setAnimationKey((prev) => prev + 1);
  };

  // Previous testimonial
  const handlePrevious = () => {
    setDirection("prev");

    setActiveIndex((prev) => (prev - 1 + testimonialItems.length) % testimonialItems.length);

    setAnimationKey((prev) => prev + 1);
  };

  return (
    <section ref={sectionRef} className={`trusted-testimonials${isVisible ? " is-visible" : ""}`} id="trusted-testimonials" aria-label="Client testimonials">
      <div className="trusted-testimonials__container">
        {/* LEFT CONTENT */}
        <div className="trusted-testimonials__left">
          <h2 className="trusted-testimonials__heading">
            TRUSTED
            <br />
            CLIENTS
            <br />
            TESTIMONIAL
          </h2>

          <p className="trusted-testimonials__description">
            Consumers today rely heavily on digital
            <br className="desktop-only" />
            means to research products. We research
            <br className="desktop-only" />a brand of bldend
          </p>

          <Link to="#about" className="trusted-testimonials__explore">
            <span>
              Explore Us
              <br />
              More
            </span>
          </Link>
        </div>

        {/* RIGHT CONTENT */}
        <div className="trusted-testimonials__right">
          {/* CARD AREA */}
          <div className="trusted-testimonials__card-area">
            {/* Back decorative cards */}
            <div className="trusted-testimonials__card-shadow trusted-testimonials__card-shadow--one" />

            <div className="trusted-testimonials__card-shadow trusted-testimonials__card-shadow--two" />

            {/* Active testimonial card */}
            <article key={animationKey} className={`trusted-testimonials__card trusted-testimonials__card--${direction}`} aria-live="polite">
              {/* TOP WHITE CARD */}
              <div className="trusted-testimonials__card-top">
                <div className="trusted-testimonials__rating">
                  <strong>{activeTestimonial.rating}</strong>

                  <span className="trusted-testimonials__star">★</span>

                  <p>(out of 5 stars)</p>
                </div>

                <p className="trusted-testimonials__review">{activeTestimonial.review}</p>

                {/* Quote icon */}
                <div className="trusted-testimonials__quote">
                  <svg viewBox="0 0 48 36" fill="currentColor" aria-hidden="true">
                    <path d="M2 2h17v17L2 34V2Zm27 0h17v17L29 34V2Z" />
                  </svg>
                </div>
              </div>

              {/* BOTTOM DARK CARD */}
              <div className="trusted-testimonials__card-bottom">
                <div className="trusted-testimonials__profile">
                  <img src={activeTestimonial.image} alt={activeTestimonial.name} />

                  <div className="trusted-testimonials__profile-info">
                    <h3>{activeTestimonial.name}</h3>

                    <p>{activeTestimonial.position}</p>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* SLIDER NAVIGATION */}
          <div className="trusted-testimonials__navigation">
            <button type="button" className="trusted-testimonials__nav-btn" onClick={handlePrevious} aria-label="Previous testimonial">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M19 12H5m7-7-7 7 7 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button type="button" className="trusted-testimonials__nav-btn" onClick={handleNext} aria-label="Next testimonial">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14m-7-7 7 7-7 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
