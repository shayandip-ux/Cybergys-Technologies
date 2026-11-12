import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard.jsx";
import Layout from "./pages/Layout.jsx";
import SiteContentPage from "./pages/content/SiteContentPage.jsx";
import Login from "./pages/login/Login.jsx";
import "./admin.css";

function AdminRoot() {
  return (
    <div className="admin-app">
      <Outlet />
    </div>
  );
}

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminRoot />}>
        <Route path="login" element={<Login />} />
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<SiteContentPage title="Users" endpoint="/api/admin/users" description="Manage admin users stored in PostgreSQL." />} />
          <Route path="content/banner" element={<SiteContentPage title="Banner" endpoint="/api/banner" description="Homepage banner copy and video settings." />} />
          <Route path="content/services" element={<SiteContentPage title="Services" endpoint="/api/services" description="Service cards and service-detail content." />} />
          <Route path="content/testimonials" element={<SiteContentPage title="Testimonials" endpoint="/api/testimonials" description="Customer testimonials shown on the website." />} />
          <Route path="content/technologies" element={<SiteContentPage title="Technologies" endpoint="/api/technologies" description="Technology stack displayed on the website." />} />
          <Route path="content/portfolio" element={<SiteContentPage title="Portfolio" endpoint="/api/portfolio" description="Portfolio projects and featured-work content." />} />
          <Route path="content/contact" element={<SiteContentPage title="Contact" endpoint="/api/contact" description="Contact details and form subject options." />} />
          <Route path="content/categories" element={<SiteContentPage title="Categories" endpoint="/api/admin/categories" description="Manage content categories in PostgreSQL." />} />
          <Route path="content/listings" element={<SiteContentPage title="Listings" endpoint="/api/admin/listings" description="Manage listings in PostgreSQL." />} />
          <Route path="content/posts" element={<SiteContentPage title="Posts" endpoint="/api/admin/posts" description="Manage posts in PostgreSQL." />} />
          <Route path="content/pages" element={<SiteContentPage title="Pages" endpoint="/api/admin/pages" description="Manage pages in PostgreSQL." />} />
          <Route path="configuration/regions" element={<SiteContentPage title="Regions" endpoint="/api/admin/regions" description="Manage regions in PostgreSQL." />} />
          <Route path="configuration/site-settings" element={<SiteContentPage title="Site settings" endpoint="/api/admin/site-settings" description="Manage site settings in PostgreSQL." />} />
          <Route path="configuration/navigation" element={<SiteContentPage title="Navigation" endpoint="/api/admin/navigation" description="Manage navigation in PostgreSQL." />} />
          <Route path="configuration/home-page" element={<SiteContentPage title="Home page" endpoint="/api/admin/home-page" description="Manage home-page configuration in PostgreSQL." />} />
          <Route path="partners-tracking/partners" element={<SiteContentPage title="Partners" endpoint="/api/admin/partners" description="Manage partners in PostgreSQL." />} />
          <Route path="partners-tracking/tracking-scripts" element={<SiteContentPage title="Tracking scripts" endpoint="/api/admin/tracking-scripts" description="Manage tracking scripts in PostgreSQL." />} />
          <Route path="partners-tracking/partner-enquiries" element={<SiteContentPage title="Partner enquiries" endpoint="/api/admin/partner-enquiries" description="Manage partner enquiries in PostgreSQL." />} />
          <Route path="partners-tracking/partner-form" element={<SiteContentPage title="Partner form" endpoint="/api/admin/partner-form" description="Manage partner form configuration in PostgreSQL." />} />
          <Route path="settings" element={<SiteContentPage title="Settings" endpoint="/api/admin/settings" description="Manage dashboard settings in PostgreSQL." />} />
        </Route>
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
}
