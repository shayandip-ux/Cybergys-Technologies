import AboutUsSection from "../components/aboutus/aboutus.jsx";
import Achievement from "../components/achievement-section/achievement-section.jsx";
import Breadcrumb from "../components/breadcrumb/Breadcrumb.jsx";
import Footer from "../components/footer/footer.jsx";
import Navbar from "../components/navbar/Navbar.jsx";
import TrustedPartner from "../components/trusted-partner/trusted-partner.jsx";

export default function Aboutus() {
  return (
    <>
      <Navbar />
      <main className="about-page">
        <Breadcrumb title="About Us" />
        <AboutUsSection />
      </main>
      <TrustedPartner />
      <Achievement />
      <Footer />
    </>
  );
}
