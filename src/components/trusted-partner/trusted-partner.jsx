import { useEffect, useRef, useState } from "react";
import partnerOne from "../../assets/66fd0508939785ac8c1a707b_company-logo-1.svg";
import partnerTwo from "../../assets/66fd050884d8f6dc7b913c41_company-logo-2.svg";
import partnerThree from "../../assets/66fd0508b86eefe0fd1f5169_company-logo-3.svg";
import partnerFour from "../../assets/66fd0508b9c60c2d231471e3_company-logo-4.svg";
import partnerFive from "../../assets/66fd050813ae75901866acbe_company-logo-5.svg";
import "./trusted-partner.css";

const partners = [
  { name: "Partner 1", logo: partnerOne },
  { name: "Partner 2", logo: partnerTwo },
  { name: "Partner 3", logo: partnerThree },
  { name: "Partner 4", logo: partnerFour },
  { name: "Partner 5", logo: partnerFive },
];

export default function TrustedPartner() {
  const logosTrackRef = useRef(null);
  const logosGroupRef = useRef(null);
  const offsetRef = useRef(0);
  const activePageRef = useRef(0);
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    const track = logosTrackRef.current;
    const group = logosGroupRef.current;
    if (!track || !group) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return undefined;

    let groupWidth = group.getBoundingClientRect().width;
    let previousTime = 0;
    let animationFrame;

    function updatePosition() {
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      if (!groupWidth) return;

      const page = Math.floor((offsetRef.current / groupWidth) * 3);
      const nextPage = Math.min(page, 2);
      if (activePageRef.current !== nextPage) {
        activePageRef.current = nextPage;
        setActivePage(nextPage);
      }
    }

    function animate(time) {
      if (previousTime && !document.hidden) {
        const elapsed = Math.min(time - previousTime, 50);
        offsetRef.current += (elapsed * 36) / 1000;
        if (groupWidth > 0) offsetRef.current %= groupWidth;
        updatePosition();
      }

      previousTime = time;
      animationFrame = window.requestAnimationFrame(animate);
    }

    function handleResize() {
      groupWidth = group.getBoundingClientRect().width;
      if (groupWidth > 0) offsetRef.current %= groupWidth;
      updatePosition();
    }

    function handleVisibilityChange() {
      previousTime = 0;
    }

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  function goToPage(page) {
    const group = logosGroupRef.current;
    const track = logosTrackRef.current;
    if (!group || !track) return;

    const groupWidth = group.getBoundingClientRect().width;
    offsetRef.current = (groupWidth * page) / 3;
    track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
    activePageRef.current = page;
    setActivePage(page);
  }

  return (
    <section className="trusted-partner" aria-labelledby="trusted-partner-title">
      <div className="trusted-partner__inner">
        <header className="trusted-partner__heading">
          <h2 className="trusted-partner__title" id="trusted-partner-title">
            Our Trusted Partners
          </h2>
          <span className="trusted-partner__divider" aria-hidden="true" />
        </header>

        <div className="trusted-partner__viewport" role="region" aria-roledescription="carousel" aria-label="Partner logos">
          <div className="trusted-partner__logos" ref={logosTrackRef}>
            {[0, 1].map((copy) => (
              <div className="trusted-partner__group" key={copy} ref={copy === 0 ? logosGroupRef : undefined} aria-hidden={copy === 1 ? "true" : undefined}>
                {partners.map(({ name, logo }) => (
                  <div className="trusted-partner__logo" key={name}>
                    <img src={logo} alt={copy === 0 ? name : ""} loading="lazy" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="trusted-partner__pagination" aria-label="Partner logo pages">
          {[0, 1, 2].map((page) => (
            <button className={`trusted-partner__dot${activePage === page ? " is-active" : ""}`} type="button" key={page} aria-label={`Show partner logos page ${page + 1}`} aria-current={activePage === page ? "true" : undefined} onClick={() => goToPage(page)} />
          ))}
        </div>
      </div>
    </section>
  );
}
