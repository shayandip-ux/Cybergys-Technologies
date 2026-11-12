import { NavLink } from "react-router-dom";

function SidebarItem({ icon: Icon, label, to, active = false }) {
  const commonClass = ["flex h-[49px] min-w-0 cursor-pointer items-center gap-3 rounded-l-[40px] px-3 text-[12px] font-medium transition lg:text-[14px]", Icon ? "" : "pl-3 text-[12px] lg:text-[14px]"].join(" ");

  if (!to) {
    return (
      <div className={[commonClass, active ? "bg-[#fffafb] text-[#ff7a00]" : "text-white hover:bg-white/[0.04]"].join(" ")}>
        {Icon && <Icon size={21} strokeWidth={active ? 2.5 : 2} className={["h-[21px] w-[21px] shrink-0 lg:h-6 lg:w-6", active ? "text-[#ff7a00]" : "text-white"].join(" ")} />}
        <span className={["truncate", active ? "text-[#ff7a00]" : "text-white"].join(" ")}>{label}</span>
      </div>
    );
  }

  return (
    <NavLink to={to} end={to === "/admin"} className={({ isActive }) => [commonClass, isActive || active ? "bg-[#fffafb] text-[#ff7a00]" : "text-white hover:bg-white/[0.04]"].join(" ")}>
      {({ isActive }) => (
        <>
          {Icon && <Icon size={21} strokeWidth={isActive || active ? 2.5 : 2} className={["h-[21px] w-[21px] shrink-0 lg:h-6 lg:w-6", isActive || active ? "text-[#ff7a00]" : "text-white"].join(" ")} />}
          <span className={["truncate", isActive || active ? "text-[#ff7a00]" : "text-white"].join(" ")}>{label}</span>
        </>
      )}
    </NavLink>
  );
}

export default SidebarItem;
