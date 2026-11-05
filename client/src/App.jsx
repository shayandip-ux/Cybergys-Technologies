import Homepage from './pages/home/Homepage.jsx'
import Aboutus from './pages/about-us/Aboutus.jsx'
import ServicesPage from './pages/services/ServicesPage.jsx'
import ServiceDetailsPage from './pages/service-details/ServiceDetailsPage.jsx'

function App() {
  const pathname = window.location.pathname.replace(/\/+$/, "").toLowerCase();

  if (pathname === "/about-us") {
    return <Aboutus />;
  }

  if (pathname === "/services") {
    return <ServicesPage />;
  }

  if (pathname.startsWith("/services/")) {
    return <ServiceDetailsPage />;
  }

  return <Homepage />
}

export default App;
