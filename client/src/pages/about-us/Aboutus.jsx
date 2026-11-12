import AboutUsSection from "../../components/aboutus/aboutus.jsx";
import Achievement from "../../components/achievement-section/achievement-section.jsx";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb.jsx";
import Footer from "../../components/footer/footer.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import Team from "../../components/team/team.jsx";
import { PageContentProvider } from "../../cms/PageContent.jsx";

export default function Aboutus() {
  return (
    <PageContentProvider page="about-us">
      <Navbar />
      <main className="about-page">
        <Breadcrumb title="About Us" />
        <AboutUsSection />
      </main>
      <Team />
      <Achievement />
      <Footer />
    </PageContentProvider>
  );
}
