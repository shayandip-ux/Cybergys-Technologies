import { useState, useEffect } from "react";
import heroBanner from "../../assets/hero_banner.png";
import developerAvatar from "../../assets/img-s-60.webp";
import customerAvatars from "../../assets/banner-user-icons.png";
import heroShape from "../../assets/hero-shape-3-1.png";
import teamPhoto from "../../assets/banner-right-main.webp";
import scrollDownImage from "../../assets/scroll-downs.png";
import companyVideo from "../../assets/Lovable-20-is-SnapYT.App.mp4";
import "./banner.css";

function Banner() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    if (!isVideoOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsVideoOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVideoOpen]);

  return (
    <>
      <section
        className="w-full bg-cover bg-center bg-no-repeat banner_outsection"
        style={{
          backgroundImage: `url(${heroBanner})`,
        }}
      >
        <div className="mx-auto grid grid-cols-1 items-center gap-8 overflow-hidden p-6 sm:p-10 lg:grid-cols-2 lg:gap-12 lg:p-14 bannerinner_mainboxsection">
          {/* LEFT CONTENT */}
          <div className="w-full min-w-0">
            <h1 className="fstleftheading_textdesign banner-heading-enter">
              WE ARE
              <br />
              SKILLED IN
            </h1>

            <div className="relative flex w-full items-center px-5 py-5 sm:px-8 banner-title-row-enter">
              <div className="flex shrink-0 flex-col fstdownleft_textdesign">
                <span>WEB</span>
                <span>DESIGN</span>
              </div>

              <h1 className="banner-and ml-3 shrink-0 fstleftheading_textdesign">AND</h1>

              <div className="banner-development relative flex shrink-0 items-center justify-center rounded-[30px] bg-[#C8F31D] sm:h-[100px] sm:w-[100px] greenbox_Section">
                <span className="banner-development__text absolute rotate_textdesign">development</span>

                <div className="banner-development__avatar absolute -right-[34px] top-1/2 flex -translate-y-1/2 items-center justify-center overflow-hidden">
                  <img src={developerAvatar} alt="Developer avatar" className="w-[70px]" />
                </div>
              </div>
            </div>

            {/* CUSTOMER INFORMATION */}
            <div className="flex bannerleft_laststructure banner-customer-enter">
              <img src={customerAvatars} alt="Customer avatars" className="w-[130px]" />

              <span className="usericontext_design">We have 24k+ customers in worldwide</span>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="relative flex w-full min-w-0 items-center justify-center">
            <img src={heroShape} alt="" aria-hidden="true" className="bulbimg_design banner-shape-enter" />

            <img src={teamPhoto} alt="Our creative team" className="rightimg_design banner-image-enter" />

            {/* ANIMATED VIDEO BUTTON */}
            <button type="button" aria-label="Play company video" onClick={() => setIsVideoOpen(true)} className="group cursor-pointer relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-[3px] border-white bg-black text-white transition-transform duration-300 hover:scale-105 sm:h-[80px] sm:w-[80px] circlebtn_animatedesign banner-video-button-enter">
              <span className="absolute inset-0 rounded-full border-2 border-white animate-pulse-ring" />

              <span className="absolute inset-0 rounded-full border-2 border-white animate-pulse-ring animation-delay-700" />

              <svg viewBox="0 0 24 24" className="relative z-10 ml-1 h-7 w-7 fill-current" aria-hidden="true">
                <path d="M7 4.8C7 3.7 8.2 3 9.2 3.6l11.2 7.1c.9.6.9 2 0 2.6L9.2 20.4c-1 .6-2.2-.1-2.2-1.2V4.8Z" />
              </svg>
            </button>
          </div>
        </div>

        {/* SCROLL INDICATOR */}
        <div className="banner-scroll-indicator">
          <button
            type="button"
            className="banner-scroll-indicator__button"
            aria-label="Scroll down to the next section"
            onClick={() => {
              window.scrollBy({
                top: window.innerHeight * 0.85,
                behavior: "smooth",
              });
            }}
          >
            <svg className="banner-scroll-indicator__arrow" viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M16 3V43M4 31L16 44L28 31" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <img src={scrollDownImage} className="scroll_downimgdesign" alt="" />
        </div>
      </section>

      {/* VIDEO POPUP */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm" onClick={() => setIsVideoOpen(false)} role="dialog" aria-modal="true" aria-label="Company introduction video">
          <div className="relative w-full max-w-5xl overflow-hidden rounded-xl bg-black shadow-2xl" onClick={(event) => event.stopPropagation()}>
            {/* CLOSE BUTTON */}
            <button type="button" onClick={() => setIsVideoOpen(false)} aria-label="Close video" className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-3xl leading-none text-white transition hover:bg-white hover:text-black">
              &times;
            </button>

            {/* VIDEO PLAYER */}
            <video key={isVideoOpen ? "video-open" : "video-closed"} className="block aspect-video w-full bg-black" controls autoPlay playsInline preload="metadata">
              <source src={companyVideo} type="video/mp4" />
              Your browser does not support HTML video.
            </video>
          </div>
        </div>
      )}
    </>
  );
}

export default Banner;
