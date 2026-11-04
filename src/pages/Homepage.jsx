import Navbar from "../components/navbar/Navbar.jsx";
import Banner from "../components/banner/banner.jsx";
import Aboutus from "../components/aboutus/aboutus.jsx";
import Services from "../components/services/services.jsx";
import Technologies from "../components/technologies/technologies.jsx";
import EmpoweringSkillsSection from "../components/empowering-skills-section/empowering-skills-section.jsx";
import HowWeWork from "../components/how-we-work/how-we-work.jsx";
import StatisticsSection from "../components/statistics-section/statistics-section.jsx";
import FAQ from "../components/faq/faq.jsx";
import WorkShowcase from "../components/work-showcase/work-showcase.jsx";
import QuickProjects from "../components/quick-projects/quick-projects.jsx";
import Testimonial from "../components/testimonial/testimonial.jsx";
import Team from "../components/team/team.jsx";
import TrustedPartner from "../components/trusted-partner/trusted-partner.jsx";
import Achievement from "../components/achievement-section/achievement-section.jsx";
import Footer from "../components/footer/footer.jsx";

function Homepage() {
  return (
    <>
      <Navbar />
      <Banner />
      <Aboutus />
      <Services />
      <EmpoweringSkillsSection />
      <HowWeWork />
      <StatisticsSection />
      <FAQ />
      <WorkShowcase />
      <Technologies />
      <QuickProjects />
      <Testimonial />
      <Team />
      <TrustedPartner />
      <Achievement />
      <Footer />
    </>
  );
}

export default Homepage;
