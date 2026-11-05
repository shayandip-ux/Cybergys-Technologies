import Achievement from "../../components/achievement-section/achievement-section.jsx";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb.jsx";
import Footer from "../../components/footer/footer.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import Services from "../../components/services/services.jsx";
import StatisticsSection from "../../components/statistics-section/statistics-section.jsx";
import "./services-page.css";

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="services-page">
        <Breadcrumb title="Our Services" />
      </main>
      <StatisticsSection />
      <Services />
      <Achievement />
      <Footer />
    </>
  );
}
