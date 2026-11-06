import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Homepage from "./pages/home/Homepage.jsx";
import Aboutus from "./pages/about-us/Aboutus.jsx";
import ServicesPage from "./pages/services/ServicesPage.jsx";
import ServiceDetailsPage from "./pages/service-details/ServiceDetailsPage.jsx";
import TechnologiesPage from "./pages/technologies/TechnologiesPage.jsx";
import PortfolioPage from "./pages/portfolio/PortfolioPage.jsx";
import ContactUsPage from "./pages/contact-us/ContactUsPage.jsx";

function RouteScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (hash) {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (target) {
          target.scrollIntoView();
          return;
        }
      }

      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <>
      <RouteScrollManager />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about-us" element={<Aboutus />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailsPage />} />
        <Route path="/technologies" element={<TechnologiesPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="*" element={<Homepage />} />
      </Routes>
    </>
  );
}

export default App;
