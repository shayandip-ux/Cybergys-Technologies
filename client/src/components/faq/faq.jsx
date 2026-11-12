import { useEffect, useRef, useState } from "react";
import "./faq.css";
import faqCollage from "../../assets/faqs.png";
import rotatingShape from "../../assets/img-s-27.webp";
import { getApi } from "../../lib/api.js";

const questions = [
  {
    question: "What is your software development process?",
    answer: "Our process begins with understanding your business goals and requirements. We then plan, design, develop, and thoroughly test your solution before launch, ensuring every stage aligns with your vision.",
  },
  {
    question: "How long does it take to complete a software development project?",
    answer: "The timeline depends on the scope, features, and complexity of your project. After understanding your requirements, we provide a clear project plan with delivery milestones.",
  },
  {
    question: "Can you develop software tailored to my business needs?",
    answer: "Yes. We build software around your workflows, goals, and users, so the final solution supports the way your business works.",
  },
];

export default function FAQ() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(() => typeof IntersectionObserver === "undefined");
  const [openIndex, setOpenIndex] = useState(0);
  const [faqItems, setFaqItems] = useState(questions);

  useEffect(() => {
    const controller = new AbortController();
    getApi("/api/faqs?page=home", { signal: controller.signal }).then((data) => {
      if (Array.isArray(data) && data.length) setFaqItems(data);
    }).catch((error) => { if (error.name !== "AbortError") console.warn("FAQ content is unavailable."); });
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

  return (
    <section ref={sectionRef} className={`faq-section${isVisible ? " is-visible" : ""}`} aria-labelledby="faq-title">
      <img className="faq-section__decoration" src={rotatingShape} alt="" aria-hidden="true" />
      <div className="faq-section__inner">
        <div className="faq-section__visual">
          <img src={faqCollage} alt="Collage of teams working together in an office" />
        </div>

        <div className="faq-section__content">
          <header className="faq-section__heading">
            <h2 id="faq-title">FAQ</h2>
            <p>Everything You Need to Know</p>
          </header>

          <div className="faq-section__list">
            {faqItems.map(({ question, answer }, index) => {
              const isOpen = openIndex === index;
              const answerId = `faq-answer-${index + 1}`;

              return (
                <article className={`faq-section__item${isOpen ? " is-open" : ""}`} key={question}>
                  <h3>
                    <button className="faq-section__question" type="button" aria-expanded={isOpen} aria-controls={answerId} onClick={() => setOpenIndex(isOpen ? -1 : index)}>
                      <span className="faq-section__question-copy">
                        <span className="faq-section__number">{String(index + 1).padStart(2, "0")}.</span>
                        <span>{question}</span>
                      </span>
                      <span className="faq-section__toggle" aria-hidden="true" />
                    </button>
                  </h3>
                  <div className="faq-section__answer" id={answerId} hidden={!isOpen}>
                    <p>{answer}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
