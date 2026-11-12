
import { useEffect, useState } from "react";
import { Bell, Menu, Settings, UserRound, X, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import avatarImage from "../assets/avatar-3.png";
import { DASHBOARD_ACTIVITY_EVENT, DASHBOARD_ACTIVITY_STORAGE_KEY, readDashboardActivities } from "../dashboardActivity";

const Header = ({ title, breadcrumb, onMenuClick }) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(readDashboardActivities);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const updateActivities = (event) => {
      setNotifications(Array.isArray(event.detail) ? event.detail : readDashboardActivities());
    };

    const updateActivitiesFromStorage = (event) => {
      if (event.key === DASHBOARD_ACTIVITY_STORAGE_KEY) {
        setNotifications(readDashboardActivities());
      }
    };

    window.addEventListener(DASHBOARD_ACTIVITY_EVENT, updateActivities);
    window.addEventListener("storage", updateActivitiesFromStorage);

    return () => {
      window.removeEventListener(DASHBOARD_ACTIVITY_EVENT, updateActivities);
      window.removeEventListener("storage", updateActivitiesFromStorage);
    };
  }, []);

  return (
    <header className="relative z-20 max-sm:z-0 box-border flex w-full max-w-full min-w-0 flex-nowrap items-center justify-between gap-2 bg-[#F5F5F0] px-3 py-2 sm:gap-4 sm:px-6 lg:px-[26px] lg:py-3">
      {/* Left: Menu and page title */}
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <button type="button" aria-label="Toggle sidebar" className="flex h-9 w-8 shrink-0 items-center justify-center text-[#111827] lg:hidden" onClick={onMenuClick}>
          <Menu size={21} strokeWidth={1.8} />
        </button>

        <div className="min-w-0 flex-1">
          <h1 className="truncate pl-0 text-base font-bold leading-6 text-[#111827] sm:text-[22px] lg:pl-[20px]">{title}</h1>
          {breadcrumb && <p className="mt-0.5 truncate text-[10px] text-[#8d98a5]">{breadcrumb}</p>}
        </div>
      </div>

      {/* Right: Notification and profile */}
      <div className="ml-auto flex shrink-0 items-center justify-end gap-2 sm:gap-[20px]">
        {/* Notifications */}
        <div className="relative shrink-0">
          <button type="button" aria-label="Toggle notifications" aria-expanded={notificationsOpen} className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#111827] hover:bg-white sm:h-10 sm:w-10" onClick={() => { setNotificationsOpen((isOpen) => !isOpen); setProfileOpen(false); }}>
            {notificationsOpen ? <X size={21} /> : <Bell size={21} strokeWidth={1.8} />}
            {notifications.length > 0 && <span className="absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#ff7a00] px-1 text-[10px] font-bold text-white">{notifications.length}</span>}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 top-11 z-[100] w-[min(330px,calc(100vw-24px))] overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-[0_12px_30px_rgba(15,23,42,0.15)]">
              <div className="flex items-center justify-between border-b border-[#edf0f4] px-4 py-3">
                <h2 className="text-sm font-semibold">Recent activity</h2>
                <span className="text-xs text-[#64748b]">{notifications.length} {notifications.length === 1 ? "item" : "items"}</span>
              </div>

              <div className="max-h-[320px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="px-4 py-6 text-center text-xs text-[#64748b]">No recent activity.</p>
                ) : (
                  notifications.map((notification) => (
                    <div key={notification.id} className="border-b border-[#f1f3f5] px-4 py-3 last:border-b-0">
                      <p className="text-[13px] font-semibold text-[#111827]">{notification.title}</p>
                      <p className="mt-1 text-xs text-[#64748b]">{notification.detail}</p>
                      <p className="mt-1 text-[11px] text-[#94a3b8]">{notification.date} · {notification.time}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative shrink-0">
          <button type="button" aria-label="Toggle user profile menu" aria-expanded={profileOpen} className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full p-0.5 sm:h-11 sm:w-11" onClick={() => { setProfileOpen((isOpen) => !isOpen); setNotificationsOpen(false); }}>
            <img src={avatarImage} alt="Admin profile" className="h-full w-full rounded-full object-cover" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-12 z-[100] w-[min(280px,calc(100vw-24px))] overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-[0_12px_30px_rgba(15,23,42,0.15)]">
              <div className="border-b border-[#edf0f4] px-4 py-3">
                <p className="text-sm font-semibold text-[#111827]">Admin</p>
                <p className="mt-1 truncate text-xs text-[#64748b]">admin@cybergys.com</p>
              </div>

              <div className="p-2">
                <button type="button" className="cursor-pointer flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-[13px] text-[#334155] hover:bg-[#f8fafc]">
                  <UserRound size={16} />
                  My profile
                </button>

                <button type="button" className="cursor-pointer flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-[13px] text-[#334155] hover:bg-[#f8fafc]">
                  <Settings size={16} />
                  Account settings
                </button>

                <button type="button" onClick={async () => { await fetch("/api/auth/logout", { method: "POST" }); navigate("/admin/login"); }} className="cursor-pointer flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-[13px] text-[#dc2626] hover:bg-[#fef2f2]">
                  <LogOut size={16} />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
