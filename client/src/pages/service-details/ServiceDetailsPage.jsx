import { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar.jsx";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb.jsx";
import Achievement from "../../components/achievement-section/achievement-section.jsx";
import Footer from "../../components/footer/footer.jsx";
import "./service-details.css";

// Keep service content in one place so cards are easy to update.
const serviceItems = [
  {
    number: "01",
    category: "CREATIVE SOLUTIONS",
    title: "Custom Website Design",
    description: "Striving to create a unique brand identity? A custom website design helps your business stand out. Whether you have a creative design idea or want a long-lasting digital presence, we create websites that make a memorable impression.",
    extra: "Here's what we do to make your website purposeful and functional:",
    features: ["In-depth study and analysis of your business", "Detailed research on your target audience", "Custom mockups and tailored website layouts", "Optimized HTML, CSS and JavaScript", "Responsive designs across all devices and browsers"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Analytics dashboard displayed on a laptop for a custom website project",
    tag: "Custom design",
    icon: "✳",
  },
  {
    number: "02",
    category: "ONLINE BUSINESS",
    title: "eCommerce Website Design",
    description: "Looking for an effective eCommerce website on Shopify, Magento or WooCommerce? We create engaging online stores with intuitive shopping experiences and conversion-focused functionality.",
    extra: "Our eCommerce solutions include:",
    features: ["Minimalist designs that improve communication", "Visual testimonials and customer loyalty features", "Conversion-focused shopping experiences", "Optimized coding for faster loading times", "High-resolution images and responsive layouts"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Customer completing an online shopping payment",
    tag: "eCommerce",
    icon: "↗",
  },
  {
    number: "03",
    category: "HOSPITALITY SOLUTIONS",
    title: "Restaurant Website Design",
    description: "A restaurant website should communicate the quality of your food, atmosphere and customer experience. We combine attractive visuals with intuitive functionality to create a memorable online identity.",
    extra: "Features that help your restaurant stand out:",
    features: ["Modern designs with social media integration", "Responsive layouts for mobile devices", "Dynamic promotional banners and special offers", "Online reservations and payment integration", "Google Maps integration for easy accessibility", "Professional food photography and image galleries"],
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Elegant restaurant dining table and food presentation",
    tag: "Hospitality",
    icon: "✳",
  },
  {
    number: "04",
    category: "PROFESSIONAL SERVICES",
    title: "Law-Firm Website Design",
    description: "Law-firm website design requires professionalism, credibility and clarity. Your website should showcase your expertise, achievements, attorneys and practice areas while making it easy for potential clients to connect with your firm.",
    extra: "Essential features for a professional law-firm website:",
    features: ["Downloadable PDF resources and documents", "Organized news and legal insights sections", "Easy navigation to practice areas and case studies", "Professional attorney and team profiles", "Clear contact forms and consultation CTAs"],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Law books and legal reference materials",
    tag: "Legal",
    icon: "⚖",
  },
  {
    number: "05",
    category: "HEALTHCARE SOLUTIONS",
    title: "Medical Website Design",
    description: "Medical website design requires a balance of professionalism, trust and accessibility. We create modern healthcare websites that communicate treatment information, highlight expertise and help patients find the right healthcare services.",
    extra: "We focus on the following features:",
    features: ["Patient reviews and informative medical content", "Fast-loading and optimized web pages", "Google Maps integration for clinic accessibility", "Mobile-friendly and accessible page layouts", "Professional treatment and service presentations"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Healthcare professional using a digital medical device",
    tag: "Healthcare",
    icon: "✚",
  },
];

const benefits = [
  {
    number: "01",
    icon: "✳",
    title: "Creative Approach",
    description: "Unique designs that reflect your brand identity and business goals.",
  },
  {
    number: "02",
    icon: "⌘",
    title: "Modern Technology",
    description: "Latest technologies and optimized development for better performance.",
  },
  {
    number: "03",
    icon: "◈",
    title: "Responsive Design",
    description: "Seamless experiences across desktops, tablets and mobile devices.",
  },
  {
    number: "04",
    icon: "↗",
    title: "Result Oriented",
    description: "Strategic digital experiences designed to support business growth.",
  },
];

export default function ServiceDetailsPage() {
  useEffect(() => {
    const elements = document.querySelectorAll(".service-details .sd-reveal");

    // Reveal content as it enters the viewport. If IntersectionObserver is
    // unavailable, show everything rather than hiding page content.
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -45px 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />

      <main className="service-details sd-theme">
        <Breadcrumb title="Service Details" />

        {/* HERO */}
        <section className="sd-hero">
          <div className="sd-hero__grid-pattern" aria-hidden="true" />
          <div className="sd-hero__orb sd-hero__orb--one" aria-hidden="true" />
          <div className="sd-hero__orb sd-hero__orb--two" aria-hidden="true" />

          <div className="sd-container sd-hero__container">
            <div className="sd-hero__visual sd-reveal">
              <div className="sd-hero__image-backplate" />
              <div className="sd-hero__image-shell">
                <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=90" alt="Creative developer working at a modern website development workspace" className="sd-hero__image" fetchPriority="high" />
                <div className="sd-hero__image-shade" />
                <div className="sd-hero__image-bottom">
                  <span className="sd-hero__image-index">
                    01 <i /> 05
                  </span>
                  <span>IDEAS INTO DIGITAL EXPERIENCES</span>
                </div>
              </div>

              <div className="sd-hero__orbit" aria-hidden="true">
                <span />
              </div>

              <div className="sd-float-card sd-float-card--design">
                <span className="sd-float-card__symbol">✳</span>
                <span>
                  <small>OUR APPROACH</small>
                  <strong>Thoughtful design</strong>
                </span>
              </div>

              <div className="sd-float-card sd-float-card--responsive">
                <span className="sd-float-card__check">✓</span>
                <span>
                  <small>BUILT FOR EVERY SCREEN</small>
                  <strong>Responsive by design</strong>
                </span>
              </div>

              <span className="sd-hero__vertical-note">DESIGN · DEVELOP · GROW</span>
            </div>

            <div className="sd-hero__content sd-reveal">
              <div className="sd-eyebrow">
                <span className="sd-eyebrow__dot" />
                <span>CREATIVE DIGITAL AGENCY</span>
                <span className="sd-eyebrow__line" />
              </div>

              <p className="sd-hero__overline">YOUR IDEAS, BUILT FOR THE DIGITAL WORLD</p>

              <h1>
                We create
                <br />
                digital experiences
                <br />
                that <em>move you</em>
                <br />
                forward<span className="sd-heading-period">.</span>
              </h1>

              <p className="sd-hero__description">Your website is more than a digital presence. It is your brand's first impression. We combine creativity, technology and strategy to build experiences that help your business stand out.</p>

              <div className="sd-hero__actions">
                <a href="/contact" className="sd-button sd-button--orange">
                  Let's Discuss Your Project <span>↗</span>
                </a>
                <a href="#sd-services" className="sd-button sd-button--link">
                  Explore our services <span>↓</span>
                </a>
              </div>

              <div className="sd-hero__meta">
                <div className="sd-hero__meta-mark">C.</div>
                <div>
                  <strong>Creative. Professional. Reliable.</strong>
                  <span>Digital solutions designed around your business.</span>
                </div>
                <span className="sd-hero__meta-arrow">↗</span>
              </div>
            </div>
          </div>

          <div className="sd-hero__scroll-cue" aria-hidden="true">
            <span />
            SCROLL TO EXPLORE
          </div>
        </section>

        {/* INTRO */}
        <section className="sd-intro">
          <div className="sd-container sd-intro__layout">
            <div className="sd-intro__heading sd-reveal">
              <span className="sd-kicker">A BETTER DIGITAL PRESENCE</span>
              <h2>
                Building digital
                <br />
                experiences that
                <br />
                <span>drive success.</span>
              </h2>
              <div className="sd-intro__shape" aria-hidden="true">
                ✳
              </div>
            </div>

            <div className="sd-intro__copy sd-reveal">
              <p>Whether you're a startup with a limited budget or an established business looking to grow online, Cybergy Technologies delivers affordable website design solutions that blend creativity, functionality and technology.</p>
              <p>From custom website development to conversion-focused eCommerce experiences, we create intuitive digital platforms that engage your audience and support your business goals.</p>
              <div className="sd-intro__statement">
                <span>✳</span>
                <strong>Your vision. Our creativity. One powerful digital experience.</strong>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="sd-services" id="sd-services">
          <div className="sd-container">
            <div className="sd-section-heading sd-reveal">
              <div>
                <span className="sd-kicker">WHAT WE CAN DO FOR YOU</span>
                <h2>
                  Solutions built
                  <br />
                  <span>for every business.</span>
                </h2>
              </div>
              <p>From the first sketch to the final launch, we create purposeful digital experiences shaped around your goals.</p>
            </div>

            <div className="sd-service-list">
              {serviceItems.map((service, index) => (
                <article className={`sd-service-row sd-reveal ${index % 2 ? "sd-service-row--reverse" : ""}`} key={service.number} style={{ "--sd-card-index": index }}>
                  <div className="sd-service-row__visual">
                    <div className="sd-service-row__image-frame">
                      <img src={service.image} alt={service.imageAlt} loading="lazy" />
                      <div className="sd-service-row__image-gradient" />
                      <span className="sd-service-row__image-number">{service.number}</span>
                      <span className="sd-service-row__image-tag">{service.tag}</span>
                    </div>
                    <span className="sd-service-row__shape" aria-hidden="true" />
                  </div>

                  <div className="sd-service-row__body">
                    <div className="sd-service-row__topline">
                      <span className="sd-service-row__category">
                        <i />
                        {service.category}
                      </span>
                      <span className="sd-service-row__count">SERVICE / {service.number}</span>
                    </div>

                    <div className="sd-service-row__title-line">
                      <h3>{service.title}</h3>
                      <span className="sd-service-row__icon">{service.icon}</span>
                    </div>

                    <p className="sd-service-row__description">{service.description}</p>

                    <div className="sd-service-row__rule" />

                    <h4>{service.extra}</h4>
                    <ul className="sd-feature-list">
                      {service.features.map((feature) => (
                        <li key={feature}>
                          <span>✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <a href="/contact" className="sd-text-link">
                      Discuss your project <span>↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="sd-benefits">
          <div className="sd-container">
            <div className="sd-benefits__heading sd-reveal">
              <span className="sd-kicker">THE CYBERGY DIFFERENCE</span>
              <h2>
                More than just
                <br />
                <span>website design.</span>
              </h2>
              <p>We bring creative thinking, practical expertise and modern technology together to make every digital interaction count.</p>
            </div>

            <div className="sd-benefits__grid">
              {benefits.map((benefit, index) => (
                <article className="sd-benefit-card sd-reveal" key={benefit.number} style={{ "--sd-card-index": index }}>
                  <div className="sd-benefit-card__top">
                    <span>{benefit.number}</span>
                    <i>{benefit.icon}</i>
                  </div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                  <div className="sd-benefit-card__bottom">
                    <span>EXPLORE THE DIFFERENCE</span>
                    <b>↗</b>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="sd-cta">
          <div className="sd-container">
            <div className="sd-cta__panel sd-reveal">
              <div className="sd-cta__grid" aria-hidden="true" />
              <div className="sd-cta__ring sd-cta__ring--one" aria-hidden="true" />
              <div className="sd-cta__ring sd-cta__ring--two" aria-hidden="true" />
              <div className="sd-cta__content">
                <span className="sd-kicker">HAVE A PROJECT IN MIND?</span>
                <h2>
                  Have an idea?
                  <br />
                  <span>Let's make it happen.</span>
                </h2>
                <p>Tell us what you're planning. We'll help turn your idea into a thoughtful, effective digital experience.</p>
                <a href="/contact" className="sd-button sd-button--orange">
                  Start a Conversation <span>↗</span>
                </a>
              </div>
              <div className="sd-cta__graphic" aria-hidden="true">
                <div className="sd-cta__graphic-inner">
                  <span>✳</span>
                  <strong>GOOD IDEAS</strong>
                  <strong>START HERE</strong>
                  <small>CYBERGY TECHNOLOGIES</small>
                </div>
                <i className="sd-cta__spark sd-cta__spark--one" />
                <i className="sd-cta__spark sd-cta__spark--two" />
              </div>
              <span className="sd-cta__corner-mark" aria-hidden="true">
                C.
              </span>
            </div>
          </div>
        </section>
      </main>

      <Achievement />
      <Footer />
    </>
  );
}
