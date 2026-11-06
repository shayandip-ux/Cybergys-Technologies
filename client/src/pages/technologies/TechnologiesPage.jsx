import Achievement from "../../components/achievement-section/achievement-section.jsx";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb.jsx";
import Footer from "../../components/footer/footer.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import Technologies from "../../components/technologies/technologies.jsx";
import QuickProjects from "../../components/quick-projects/quick-projects.jsx";

export default function TechnologiesPage() {
  return (
    <>
      <Navbar />
      <main>
        <Breadcrumb title="Technologies" />
        <Technologies />
      </main>
      <QuickProjects />
      <Achievement />
      <Footer />
    </>
  );
}
