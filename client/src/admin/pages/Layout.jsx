import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 1024);
  const location = useLocation();
  const pageTitle =
    {
      "/admin": "Dashboard",
      "/admin/users": "Users",
      "/admin/content/banner": "Banner",
      "/admin/content/services": "Services",
      "/admin/content/testimonials": "Testimonials",
      "/admin/content/technologies": "Technologies",
      "/admin/content/portfolio": "Portfolio",
      "/admin/content/contact": "Contact",
      "/admin/configuration/regions": "Regions",
      "/admin/configuration/site-settings": "Site Settings",
      "/admin/configuration/navigation": "Navigation",
      "/admin/configuration/home-page": "Home Page",
      "/admin/partners-tracking/partners": "Partners",
      "/admin/partners-tracking/tracking-scripts": "Tracking Scripts",
      "/admin/partners-tracking/partner-enquiries": "Partner Enquiries",
      "/admin/partners-tracking/partner-form": "Partner Form",
      "/admin/settings": "Settings",
    }[location.pathname] ?? "Dashboard";

  return (
    <div className="min-h-screen bg-[#f8fafc] font-['Inter',sans-serif] text-[#111827]">
      <div className="flex min-h-screen">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen((isOpen) => !isOpen)} />
        {sidebarOpen && <button aria-label="Close sidebar" className="fixed inset-0 z-20 bg-black/30 lg:hidden" onClick={() => setSidebarOpen(false)} />}
        <main className={["min-h-screen min-w-0 flex-1", "transition-[margin] duration-300 ease-in-out", sidebarOpen ? "lg:ml-[220px]" : "lg:ml-0"].join(" ")}>
          <Header title={pageTitle} onMenuClick={() => setSidebarOpen((isOpen) => !isOpen)} />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
