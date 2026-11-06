import Achievement from "../../components/achievement-section/achievement-section.jsx";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb.jsx";
import Footer from "../../components/footer/footer.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import "./contact-us-page.css";

export default function ContactUsPage() {
  return (
    <>
      <Navbar />
      <main className="contact-us-page">
        <Breadcrumb title="Contact Us" />
      </main>
      <Achievement />
      <Footer />
    </>
  );
}
