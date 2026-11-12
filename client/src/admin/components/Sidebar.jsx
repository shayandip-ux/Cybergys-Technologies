import { ChevronDown, ChevronRight, FolderOpen, Handshake, LayoutDashboard, Settings, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useState } from "react";

import Logo from "./ui/Logo";
import SidebarItem from "./ui/SidebarItem";

const Sidebar = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const isContentRoute = location.pathname.startsWith("/admin/content/");
  const isAdminRoute = location.pathname.startsWith("/admin/users");
  const isConfigurationRoute = location.pathname.startsWith("/admin/configuration/");
  const isPartnersTrackingRoute = location.pathname.startsWith("/admin/partners-tracking/");
  const [contentOpen, setContentOpen] = useState(isContentRoute);
  const [adminOpen, setAdminOpen] = useState(isAdminRoute);
  const [configurationOpen, setConfigurationOpen] = useState(isConfigurationRoute);
  const [partnersTrackingOpen, setPartnersTrackingOpen] = useState(isPartnersTrackingRoute);
  const contentSections = [
    { label: "Banner", path: "banner" },
    { label: "Services", path: "services" },
    { label: "Testimonials", path: "testimonials" },
    { label: "Technologies", path: "technologies" },
    { label: "Portfolio", path: "portfolio" },
    { label: "Contact", path: "contact" },
  ];
  const configurationSections = [
    { label: "Regions", path: "regions" },
    { label: "Site Settings", path: "site-settings" },
    { label: "Navigation", path: "navigation" },
    { label: "Home Page", path: "home-page" },
  ];
  const partnersTrackingSections = [
    { label: "Partners", path: "partners" },
    { label: "Tracking Scripts", path: "tracking-scripts" },
    { label: "Partner Enquiries", path: "partner-enquiries" },
    { label: "Partner Form", path: "partner-form" },
  ];

  return (
    <aside className={["fixed left-0 top-0 z-30 flex h-screen w-[230px] flex-col bg-[#071322] transition-transform duration-200", isOpen ? "translate-x-0" : "-translate-x-full"].join(" ")}>
      <div className="px-[18px] pt-[12px]">
        <Logo />
      </div>

      <nav className="mt-[18px] min-h-0 flex-1 space-y-2 overflow-y-auto px-[10px] mr-[-10px]">
        <SidebarItem icon={LayoutDashboard} label="Dashboard" to="/admin" />
        <div>
          <button type="button" aria-expanded={adminOpen} aria-controls="admin-submenu" className={["flex h-[49px] w-full cursor-pointer items-center gap-3 rounded-l-[40px] px-3 text-left text-[12px] font-medium transition lg:text-[14px]", isAdminRoute ? "bg-[#fffafb] text-[#ff7a00]" : "text-white hover:bg-white/[0.04]"].join(" ")} onClick={() => setAdminOpen((isOpen) => !isOpen)}>
            <ShieldCheck size={21} strokeWidth={isAdminRoute ? 2.5 : 2} className={["h-[21px] w-[21px] shrink-0 lg:h-6 lg:w-6", isAdminRoute ? "text-[#ff7a00]" : "text-white"].join(" ")} />
            <span className="flex-1">Admin</span>
            <ChevronDown size={16} className={["transition-transform", adminOpen ? "rotate-180" : ""].join(" ")} />
          </button>

          {adminOpen && (
            <div id="admin-submenu" className="ml-8 border-l border-[#2a3948] pl-2 mt-[20px]">
              <SidebarItem label="Users" to="/admin/users" />
            </div>
          )}
        </div>
        <div>
          <button type="button" aria-expanded={contentOpen} aria-controls="content-submenu" className={["flex h-[49px] w-full cursor-pointer items-center gap-3 rounded-l-[40px] px-3 text-left text-[12px] font-medium transition lg:text-[14px]", isContentRoute ? "bg-[#fffafb] text-[#ff7a00]" : "text-white hover:bg-white/[0.04]"].join(" ")} onClick={() => setContentOpen((isOpen) => !isOpen)}>
            <FolderOpen size={21} strokeWidth={isContentRoute ? 2.5 : 2} className={["h-[21px] w-[21px] shrink-0 lg:h-6 lg:w-6", isContentRoute ? "text-[#ff7a00]" : "text-white"].join(" ")} />
            <span className="flex-1">Content</span>
            <ChevronDown size={16} className={["transition-transform", contentOpen ? "rotate-180" : ""].join(" ")} />
          </button>

          {contentOpen && (
            <div id="content-submenu" className="ml-8 border-l border-[#2a3948] pl-2 mt-[20px]">
              {contentSections.map(({ label, path }) => (
                <SidebarItem key={path} label={label} to={`/admin/content/${path}`} />
              ))}
            </div>
          )}
        </div>
        <div>
          <button type="button" aria-expanded={configurationOpen} aria-controls="configuration-submenu" className={["flex h-[49px] w-full cursor-pointer items-center gap-3 rounded-l-[40px] px-3 text-left text-[12px] font-medium transition lg:text-[14px]", isConfigurationRoute ? "bg-[#fffafb] text-[#ff7a00]" : "text-white hover:bg-white/[0.04]"].join(" ")} onClick={() => setConfigurationOpen((isOpen) => !isOpen)}>
            <SlidersHorizontal size={21} strokeWidth={isConfigurationRoute ? 2.5 : 2} className={["h-[21px] w-[21px] shrink-0 lg:h-6 lg:w-6", isConfigurationRoute ? "text-[#ff7a00]" : "text-white"].join(" ")} />
            <span className="flex-1">Configuration</span>
            <ChevronDown size={16} className={["transition-transform", configurationOpen ? "rotate-180" : ""].join(" ")} />
          </button>

          {configurationOpen && (
            <div id="configuration-submenu" className="mt-[20px] ml-8 border-l border-[#2a3948] pl-2">
              {configurationSections.map(({ label, path }) => (
                <SidebarItem key={path} label={label} to={`/admin/configuration/${path}`} />
              ))}
            </div>
          )}
        </div>
        <div>
          <button type="button" aria-expanded={partnersTrackingOpen} aria-controls="partners-tracking-submenu" className={["flex h-[49px] w-full cursor-pointer items-center gap-3 rounded-l-[40px] px-3 text-left text-[12px] font-medium transition lg:text-[14px]", isPartnersTrackingRoute ? "bg-[#fffafb] text-[#ff7a00]" : "text-white hover:bg-white/[0.04]"].join(" ")} onClick={() => setPartnersTrackingOpen((isOpen) => !isOpen)}>
            <Handshake size={21} strokeWidth={isPartnersTrackingRoute ? 2.5 : 2} className={["h-[21px] w-[21px] shrink-0 lg:h-6 lg:w-6", isPartnersTrackingRoute ? "text-[#ff7a00]" : "text-white"].join(" ")} />
            <span className="min-w-0 flex-1 leading-tight">Partners &amp; Tracking</span>
            <ChevronDown size={16} className={["shrink-0 transition-transform", partnersTrackingOpen ? "rotate-180" : ""].join(" ")} />
          </button>

          {partnersTrackingOpen && (
            <div id="partners-tracking-submenu" className="mt-[20px] ml-8 border-l border-[#2a3948] pl-2">
              {partnersTrackingSections.map(({ label, path }) => (
                <SidebarItem key={path} label={label} to={`/admin/partners-tracking/${path}`} />
              ))}
            </div>
          )}
        </div>
        <SidebarItem icon={Settings} label="Settings" to="/admin/settings" />
      </nav>

      <div className="mt-auto px-[18px] pb-[28px]">
        <div className="mb-[20px] h-px bg-[#1e2a39]" />

        <p className="text-[13px] font-medium text-white">© 2026 Cybergys</p>

        <p className="mt-[5px] text-[11px] text-[#c3cbd6]">All rights reserved</p>

        <button aria-label={isOpen ? "Hide sidebar" : "Show sidebar"} className="absolute cursor-pointer border-[3px] border-[#f8fafc] bottom-[22px] right-[-32px] flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#ff7a00]" onClick={onToggle}>
          <ChevronRight size={16} className={["text-[#d5dce5] transition-transform", isOpen ? "rotate-180" : ""].join(" ")} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
