import Achievement from "../../components/achievement-section/achievement-section.jsx";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb.jsx";
import Footer from "../../components/footer/footer.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import WorkShowcase from "../../components/work-showcase/work-showcase.jsx";
import floatingTeamImage from "../../assets/floating-team.png";
import "./portfolio-page.css";

export default function PortfolioPage() {
  return (
    <>
      <Navbar />

      <main className="!w-full">
        {/* BREADCRUMB */}
        <Breadcrumb title="Our Portfolio" />

        {/* HERO SECTION */}
        <section className="!w-full !min-h-[678px] !overflow-hidden">
          <div className="!w-full !max-w-[1440px] !mx-auto !px-5 lg:!px-10 xl:!px-14 !min-h-[678px] !grid !grid-cols-1 lg:!grid-cols-2 !items-center !gap-10 lg:!gap-12">
            {/* LEFT IMAGE AREA */}
            <div className="portfolio-hero__image !w-full !max-w-[620px] !min-h-[450px] lg:!min-h-[600px] !flex !items-center !justify-center !mx-auto !order-1 lg:!pl-[50px]">
              <img src={floatingTeamImage} alt="Software development team illustration" className="!block !w-full !max-w-[620px] !h-auto !object-contain" />
            </div>

            {/* RIGHT CONTENT */}
            <div className="portfolio-hero__content !w-full !max-w-[560px] !py-12 lg:!py-0 !z-10 !mx-auto lg:!ml-auto !order-2">
              {/* HEADING */}
              <h1 className="!text-[#191a20] !text-[38px] sm:!text-[48px] lg:!text-[58px] xl:!text-[62px] !leading-[1.12] !font-semibold !tracking-[-1.8px]">Creating software products and digital excellence</h1>

              {/* DESCRIPTION */}
              <p className="!text-[#74777c] !text-[16px] sm:!text-[18px] !leading-[28px] !mt-6 lg:!mt-8 !max-w-[530px]">Accounting is a more diverse profession stability of a long with huge Profitability than it is often given credit.</p>

              {/* BUTTONS */}
              <div className="!flex !flex-wrap !items-center !gap-[15px] !mt-[30px]">
                <a href="#" className="!min-h-[50px] !px-[35px] sm:!px-[50px] !bg-[#f27d2f] hover:!bg-[#df6920] !text-white !rounded-[4px] !flex !items-center !justify-center !text-[16px] !font-semibold !transition-all !duration-300">
                  Start Free Trial
                </a>

                <a href="#" className="!min-h-[50px] !px-[35px] sm:!px-[50px] !border !border-black hover:!bg-black hover:!text-white !text-black !rounded-[4px] !flex !items-center !justify-center !text-[16px] !font-semibold !transition-all !duration-300">
                  Our Features
                </a>
              </div>

              {/* DIVIDER */}
              <div className="!w-full !h-px !bg-[#00000014] !mt-[25px]"></div>

              {/* FEATURES */}
              <div className="!flex !flex-wrap !gap-x-8 !gap-y-5 !mt-[20px]">
                {/* FEATURE 1 */}
                <div className="!flex !items-start !gap-[15px]">
                  <span className="!w-[21px] !h-[21px] !min-w-[21px] !rounded-full !bg-[#ffc83d] !flex !items-center !justify-center !text-black !text-[13px] !font-bold !mt-[3px]">✓</span>

                  <p className="!text-[#171b25] !text-[16px] !leading-[28px]">
                    Powered by intellect
                    <br />
                    driven by values
                  </p>
                </div>

                {/* FEATURE 2 */}
                <div className="!flex !items-start !gap-[15px]">
                  <span className="!w-[21px] !h-[21px] !min-w-[21px] !rounded-full !bg-[#ffc83d] !flex !items-center !justify-center !text-black !text-[13px] !font-bold !mt-[3px]">✓</span>

                  <p className="!text-[#171b25] !text-[16px] !leading-[28px]">
                    Development solution
                    <br />& regenerating easily
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PORTFOLIO SHOWCASE */}
        <WorkShowcase showAllLink={false} />
      </main>

      {/* ACHIEVEMENT */}
      <Achievement />

      {/* FOOTER */}
      <Footer />
    </>
  );
}
