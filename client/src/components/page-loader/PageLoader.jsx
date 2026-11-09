import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import companyLogo from "../../assets/logo.png";
import "./page-loader.css";

function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const overlayRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const progress = progressRef.current;

    if (!overlay || !progress) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const startedAt = performance.now();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minimumDuration = reduceMotion ? 150 : 1000;
    document.body.style.overflow = "hidden";

    const intro = gsap.timeline();
    intro
      .fromTo(
        overlay.querySelector(".page-loader__logo"),
        { opacity: 0, y: 16, clipPath: "inset(0 100% 0 0)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0% 0 0)",
          duration: reduceMotion ? 0.01 : 1,
          ease: "power3.out",
        },
      )
      .fromTo(
        overlay.querySelector(".page-loader__message"),
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: reduceMotion ? 0.01 : 0.55, ease: "power3.out" },
        "-=0.35",
      );

    const progressTween = gsap.to(progress, {
      scaleX: 0.82,
      duration: 1.8,
      ease: "power2.out",
    });

    let completion;
    let readyTimer;

    const finishLoading = () => {
      const remainingTime = Math.max(0, minimumDuration - (performance.now() - startedAt));
      readyTimer = window.setTimeout(() => {
        completeLoading();
      }, remainingTime);
    };

    const completeLoading = () => {
      progressTween.kill();
      completion = gsap.timeline({
        defaults: { ease: "power4.inOut" },
        onComplete: () => {
          document.body.style.overflow = previousOverflow;
          setIsVisible(false);
        },
      });
      completion
        .to(progress, {
          scaleX: 1,
          duration: reduceMotion ? 0.01 : 0.35,
          ease: "power2.inOut",
        })
        .to(overlay, {
          yPercent: -100,
          duration: reduceMotion ? 0.01 : 0.85,
          delay: reduceMotion ? 0 : 0.12,
        });
    };

    if (document.readyState === "complete") {
      readyTimer = window.setTimeout(finishLoading, 400);
    } else {
      window.addEventListener("load", finishLoading, { once: true });
    }

    return () => {
      window.clearTimeout(readyTimer);
      window.removeEventListener("load", finishLoading);
      intro.kill();
      progressTween.kill();
      completion?.kill();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="page-loader"
      ref={overlayRef}
      role="status"
      aria-label="Loading Cybergys Technologies"
    >
      <div className="page-loader__content">
        <div className="page-loader__logo">
          <img src={companyLogo} alt="Cybergys Technologies" />
        </div>
        <div className="page-loader__message">
          <p className="page-loader__eyebrow">TECHNOLOGY WITH PURPOSE</p>
          <h1>Building what&apos;s next.</h1>
          <p className="page-loader__caption">Preparing your experience</p>
        </div>

        <div className="page-loader__track" aria-hidden="true">
          <span className="page-loader__progress" ref={progressRef} />
        </div>
      </div>
      <span className="page-loader__index" aria-hidden="true">
        CYBERGYS TECHNOLOGIES
      </span>
    </div>
  );
}

export default PageLoader;
