import { useState } from "react";
import { UserRound, LockKeyhole, Bell, ShieldCheck, Settings as SettingsIcon, Eye, EyeOff, CheckCircle2, AlertCircle, LogOut, Save, X } from "lucide-react";

/* =========================================================
   SETTINGS PAGE
========================================================= */

export default function Settings() {
  /* =======================================================
     PROFILE
  ======================================================= */

  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@cybergys.com",
    username: "admin",
  });

  const [profileMessage, setProfileMessage] = useState("");
  const [profileError, setProfileError] = useState("");

  /* =======================================================
     PASSWORD
  ======================================================= */

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordMessage, setPasswordMessage] = useState("");

  const [passwordError, setPasswordError] = useState("");

  /* =======================================================
     NOTIFICATIONS
  ======================================================= */

  const [notifications, setNotifications] = useState({
    email: true,
    system: true,
  });

  /* =======================================================
     SECURITY
  ======================================================= */

  const [security, setSecurity] = useState({
    twoFactor: true,
  });

  const [securityMessage, setSecurityMessage] = useState("");

  /*
    Custom logout confirmation modal.

    IMPORTANT:
    This replaces window.confirm().
  */
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  /* =======================================================
     GENERAL
  ======================================================= */

  const [general, setGeneral] = useState({
    timezone: "(GMT+05:30) India Standard Time (IST)",
    dateFormat: "May 31, 2026 (MM DD, YYYY)",
  });

  const [generalMessage, setGeneralMessage] = useState("");

  /* =======================================================
     PROFILE HANDLERS
  ======================================================= */

  const handleProfileChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));

    setProfileMessage("");
    setProfileError("");
  };

  const handleProfileSave = (event) => {
    event.preventDefault();

    setProfileMessage("");
    setProfileError("");

    if (!profile.name.trim()) {
      setProfileError("Name is required.");
      return;
    }

    if (!profile.email.trim()) {
      setProfileError("Email is required.");
      return;
    }

    if (!isValidEmail(profile.email)) {
      setProfileError("Please enter a valid email address.");
      return;
    }

    if (!profile.username.trim()) {
      setProfileError("Username is required.");
      return;
    }

    /*
      Replace this section with your API call.

      Example:

      await updateProfile(profile);
    */

    setProfileMessage("Profile updated successfully.");

    clearMessageAfterDelay(setProfileMessage);
  };

  /* =======================================================
     PASSWORD HANDLERS
  ======================================================= */

  const handlePasswordChange = (field, value) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setPasswordMessage("");
    setPasswordError("");
  };

  const handleChangePassword = (event) => {
    event.preventDefault();

    setPasswordMessage("");
    setPasswordError("");

    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword) {
      setPasswordError("Please enter your current password.");
      return;
    }

    if (!newPassword) {
      setPasswordError("Please enter a new password.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("New password must contain at least 8 characters.");
      return;
    }

    if (!confirmPassword) {
      setPasswordError("Please confirm your new password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      setPasswordError("New password must be different from your current password.");
      return;
    }

    /*
      Replace this section with your API call.

      Example:

      await changePassword({
        currentPassword,
        newPassword,
      });
    */

    setPasswordMessage("Password changed successfully.");

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    clearMessageAfterDelay(setPasswordMessage);
  };

  /* =======================================================
     NOTIFICATION HANDLERS
  ======================================================= */

  const toggleNotification = (field) => {
    setNotifications((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  /* =======================================================
     SECURITY HANDLERS
  ======================================================= */

  const toggleTwoFactor = () => {
    setSecurity((prev) => ({
      ...prev,
      twoFactor: !prev.twoFactor,
    }));

    setSecurityMessage(security.twoFactor ? "Two-factor authentication disabled." : "Two-factor authentication enabled.");

    clearMessageAfterDelay(setSecurityMessage);
  };

  /*
    OPEN CUSTOM LOGOUT MODAL

    Do NOT use window.confirm here.
  */
  const handleLogoutAllDevices = () => {
    setLogoutModalOpen(true);
  };

  /*
    CLOSE CUSTOM LOGOUT MODAL
  */
  const handleCancelLogout = () => {
    setLogoutModalOpen(false);
  };

  /*
    CONFIRM LOGOUT

    Put your real logout-all-devices API call here.
  */
  const handleConfirmLogout = () => {
    setLogoutModalOpen(false);

    /*
      Replace this section with your API call.

      Example:

      await logoutAllDevices();
    */

    setSecurityMessage("All other devices have been logged out.");

    clearMessageAfterDelay(setSecurityMessage);
  };

  /* =======================================================
     GENERAL HANDLERS
  ======================================================= */

  const handleGeneralChange = (field, value) => {
    setGeneral((prev) => ({
      ...prev,
      [field]: value,
    }));

    setGeneralMessage("");
  };

  const handleGeneralSave = (event) => {
    event.preventDefault();

    /*
      Replace this section with your API call.

      Example:

      await updateGeneralSettings(general);
    */

    setGeneralMessage("General settings updated successfully.");

    clearMessageAfterDelay(setGeneralMessage);
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>
      <div className="min-h-[calc(100vh-0px)] w-full bg-[#f8fafc] px-3 py-3 sm:px-4 sm:py-4 lg:px-5 lg:py-4">
        <div className="mx-auto w-full max-w-none">
          {/* =================================================
              TOP GRID
          ================================================= */}

          <div className="grid w-full grid-cols-1 gap-4 xl:grid-cols-2">
            {/* ===============================================
                PROFILE
            =============================================== */}

            <SettingsCard icon={<UserRound size={23} strokeWidth={2} />} iconType="brand" title="Profile" description="View and update your profile information.">
              <form onSubmit={handleProfileSave}>
                <div className="space-y-3.5">
                  <SettingsField label="Name" value={profile.name} onChange={(value) => handleProfileChange("name", value)} placeholder="Enter your name" />

                  <SettingsField label="Email" type="email" value={profile.email} onChange={(value) => handleProfileChange("email", value)} placeholder="Enter your email" />

                  <SettingsField label="Username" value={profile.username} onChange={(value) => handleProfileChange("username", value)} placeholder="Enter username" />
                </div>

                {profileError && <MessageBox type="error" message={profileError} />}

                {profileMessage && <MessageBox type="success" message={profileMessage} />}

                <div className="mt-5 flex justify-end">
                  <PrimaryButton type="submit" icon={<Save size={16} />}>
                    Save Changes
                  </PrimaryButton>
                </div>
              </form>
            </SettingsCard>

            {/* ===============================================
                CHANGE PASSWORD
            =============================================== */}

            <SettingsCard icon={<LockKeyhole size={23} strokeWidth={2} />} iconType="blue" title="Change Password" description="Update your password to keep your account secure.">
              <form onSubmit={handleChangePassword}>
                <div className="space-y-3.5">
                  <PasswordField label="Current Password" placeholder="Enter current password" value={passwordData.currentPassword} show={showCurrentPassword} onChange={(value) => handlePasswordChange("currentPassword", value)} onToggle={() => setShowCurrentPassword((prev) => !prev)} />

                  <PasswordField label="New Password" placeholder="Enter new password" value={passwordData.newPassword} show={showNewPassword} onChange={(value) => handlePasswordChange("newPassword", value)} onToggle={() => setShowNewPassword((prev) => !prev)} />

                  <PasswordField label="Confirm Password" placeholder="Confirm new password" value={passwordData.confirmPassword} show={showConfirmPassword} onChange={(value) => handlePasswordChange("confirmPassword", value)} onToggle={() => setShowConfirmPassword((prev) => !prev)} />
                </div>

                <p className="mt-2.5 pl-0 text-[10px] leading-4 text-[#64748b] sm:pl-[139px]">Password must contain at least 8 characters.</p>

                {passwordError && <MessageBox type="error" message={passwordError} />}

                {passwordMessage && <MessageBox type="success" message={passwordMessage} />}

                <div className="mt-5 flex justify-end">
                  <PrimaryButton type="submit" icon={<LockKeyhole size={14} />}>
                    Change Password
                  </PrimaryButton>
                </div>
              </form>
            </SettingsCard>

            {/* ===============================================
                NOTIFICATIONS
            =============================================== */}

            <SettingsCard icon={<Bell size={23} strokeWidth={2} />} iconType="purple" title="Notifications" description="Manage your notification preferences.">
              <div className="divide-y divide-[#edf0f4]">
                <SettingToggleRow title="Email Notifications" description="Receive important updates via email." enabled={notifications.email} onChange={() => toggleNotification("email")} />

                <SettingToggleRow title="System Notifications" description="Receive in-app notifications for system updates." enabled={notifications.system} onChange={() => toggleNotification("system")} />
              </div>
            </SettingsCard>

            {/* ===============================================
                SECURITY
            =============================================== */}

            <SettingsCard icon={<ShieldCheck size={23} strokeWidth={2} />} iconType="orange" title="Security" description="Manage your account security settings.">
              <div className="divide-y divide-[#edf0f4]">
                <SettingToggleRow title="Two-Factor Authentication" description="Add an extra layer of security to your account." enabled={security.twoFactor} onChange={toggleTwoFactor} />

                <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-[14px] font-bold text-[#172033]">Logout from All Devices</p>

                    <p className="mt-1 text-[12px] leading-4 text-[#64748b]">Sign out from all devices where your account is currently logged in.</p>
                  </div>

                  <button type="button" onClick={handleLogoutAllDevices} className="inline-flex h-[36px] shrink-0 items-center justify-center gap-1.5 rounded-md border border-[#ff7a00] bg-white px-4 text-[12px] font-semibold text-[#ff7a00] transition hover:bg-orange-50 active:scale-[0.98]">
                    <LogOut size={14} />
                    Logout All Devices
                  </button>
                </div>
              </div>

              {securityMessage && <MessageBox type="success" message={securityMessage} />}
            </SettingsCard>
          </div>

          {/* =================================================
              GENERAL
          ================================================= */}

          <div className="mt-4 w-full">
            <SettingsCard icon={<SettingsIcon size={23} strokeWidth={2} />} iconType="brand" title="General" description="Set your preferred time zone and date format.">
              <form onSubmit={handleGeneralSave}>
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                  {/* TIME ZONE */}

                  <SelectField label="Time Zone" value={general.timezone} onChange={(value) => handleGeneralChange("timezone", value)} options={["(GMT+05:30) India Standard Time (IST)", "(GMT+00:00) Greenwich Mean Time (GMT)", "(GMT-05:00) Eastern Standard Time (EST)", "(GMT-06:00) Central Standard Time (CST)", "(GMT-07:00) Mountain Standard Time (MST)", "(GMT-08:00) Pacific Standard Time (PST)", "(GMT+01:00) Central European Time (CET)", "(GMT+08:00) Singapore Standard Time (SGT)", "(GMT+09:00) Japan Standard Time (JST)", "(GMT+10:00) Australian Eastern Standard Time (AEST)"]} />

                  {/* DATE FORMAT */}

                  <SelectField label="Date Format" value={general.dateFormat} onChange={(value) => handleGeneralChange("dateFormat", value)} options={["May 31, 2026 (MM DD, YYYY)", "31 May, 2026 (DD MM, YYYY)", "2026-05-31 (YYYY-MM-DD)", "05/31/2026 (MM/DD/YYYY)", "31/05/2026 (DD/MM/YYYY)"]} />
                </div>

                {generalMessage && <MessageBox type="success" message={generalMessage} />}

                <div className="mt-5 flex justify-end">
                  <PrimaryButton type="submit" icon={<Save size={14} />}>
                    Save Changes
                  </PrimaryButton>
                </div>
              </form>
            </SettingsCard>
          </div>
        </div>
      </div>

      {/* =====================================================
          CUSTOM LOGOUT CONFIRMATION MODAL
      ===================================================== */}

      {logoutModalOpen && <LogoutConfirmationModal onCancel={handleCancelLogout} onConfirm={handleConfirmLogout} />}
    </>
  );
}

/* =========================================================
   LOGOUT CONFIRMATION MODAL
========================================================= */

function LogoutConfirmationModal({ onCancel, onConfirm }) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0f172a]/45 px-4 py-5 backdrop-blur-[3px]"
      onMouseDown={(event) => {
        /*
          Clicking the dark background closes the modal.
          Clicking inside the modal does not.
        */
        if (event.target === event.currentTarget) {
          onCancel();
        }
      }}
    >
      <div role="dialog" aria-modal="true" aria-labelledby="logout-modal-title" aria-describedby="logout-modal-description" className="relative w-full max-w-[385px] overflow-hidden rounded-[10px] border border-[#e5e7eb] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.22)]">
        {/* CLOSE BUTTON */}

        <button type="button" onClick={onCancel} aria-label="Close" className="absolute right-3.5 top-3.5 flex h-7 w-7 items-center justify-center rounded-md text-[#64748b] transition hover:bg-[#f1f5f9] hover:text-[#172033]">
          <X size={17} />
        </button>

        {/* MODAL CONTENT */}

        <div className="px-5 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6">
          {/* ICON */}

          <div className="mb-4 flex h-[42px] w-[42px] items-center justify-center rounded-full bg-orange-50 text-[#ff7a00]">
            <LogOut size={20} strokeWidth={2} />
          </div>

          {/* TITLE */}

          <h3 id="logout-modal-title" className="pr-8 text-[15px] font-bold leading-5 text-[#172033]">
            Logout from all devices?
          </h3>

          {/* DESCRIPTION */}

          <p id="logout-modal-description" className="mt-2 max-w-[330px] text-[11px] leading-[18px] text-[#64748b]">
            Are you sure you want to logout from all devices? This action will sign you out from all currently active sessions.
          </p>

          {/* ACTIONS */}

          <div className="mt-6 flex items-center justify-end gap-2.5">
            <button type="button" onClick={onCancel} className="inline-flex h-[36px] min-w-[76px] items-center justify-center rounded-md border border-[#dbe2ea] bg-white px-4 text-[11px] font-semibold text-[#475569] transition hover:bg-[#f8fafc] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-slate-200">
              Cancel
            </button>

            <button type="button" onClick={onConfirm} className="inline-flex h-[36px] min-w-[82px] items-center justify-center gap-1.5 rounded-md bg-[#ff7a00] px-4 text-[11px] font-semibold text-white shadow-sm transition hover:bg-[#d96600] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#ff7a00]/20">
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SETTINGS CARD
========================================================= */

function SettingsCard({ icon, iconType = "brand", title, description, children }) {
  const iconClasses = {
    brand: "bg-orange-50 text-[#ff7a00]",
    blue: "bg-[#edf5ff] text-[#1473ea]",
    purple: "bg-[#f4ecff] text-[#7c3aed]",
    orange: "bg-[#fff4e8] text-[#f59e0b]",
  };

  return (
    <section className="w-full overflow-hidden rounded-[9px] border border-[#edf0f4] bg-white shadow-[0_1px_8px_rgba(15,23,42,0.02)]">
      {/* HEADER */}

      <div className="flex items-start gap-4 px-5 pb-4 pt-5 sm:px-5">
        <div className={`flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[9px] ${iconClasses[iconType]}`}>{icon}</div>

        <div className="min-w-0 pt-0.5">
          <h2 className="text-[16px] font-bold leading-5 text-[#172033]">{title}</h2>

          <p className="mt-1 text-[11px] leading-4 text-[#52627c]">{description}</p>
        </div>
      </div>

      {/* BODY */}

      <div className="px-5 pb-5 sm:px-5">{children}</div>
    </section>
  );
}

/* =========================================================
   NORMAL INPUT
========================================================= */

function SettingsField({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-[126px_minmax(0,1fr)] sm:items-center sm:gap-3">
      <label className="text-[13px] font-semibold text-[#172033]">{label}</label>

      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="h-[36px] w-full rounded-md border border-[#dfe5ed] bg-white px-3 text-[13px] text-[#334155] outline-none transition placeholder:text-[#8190a8] focus:border-[#ff7a00] focus:ring-2 focus:ring-[#ff7a00]/10" />
    </div>
  );
}

/* =========================================================
   PASSWORD INPUT
========================================================= */

function PasswordField({ label, value, onChange, placeholder, show, onToggle }) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-[126px_minmax(0,1fr)] sm:items-center sm:gap-3">
      <label className="text-[13px] font-semibold text-[#172033]">{label}</label>

      <div className="relative">
        <input type={show ? "text" : "password"} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="h-[36px] w-full rounded-md border border-[#dfe5ed] bg-white px-3 pr-10 text-[12px] text-[#334155] outline-none transition placeholder:text-[#8190a8] focus:border-[#ff7a00] focus:ring-2 focus:ring-[#ff7a00]/10" />

        <button type="button" onClick={onToggle} aria-label={show ? "Hide password" : "Show password"} className="absolute right-0 top-0 flex h-[36px] w-[38px] items-center justify-center text-[#718096] transition hover:text-[#334155]">
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   SELECT FIELD
========================================================= */

function SelectField({ label, value, onChange, options }) {
  return (
    <div className="w-full">
      <label className="mb-1.5 block text-[14px] font-semibold text-[#172033]">{label}</label>

      <div className="relative">
        <select value={value} onChange={(event) => onChange(event.target.value)} className="h-[37px] w-full appearance-none rounded-md border border-[#dfe5ed] bg-white px-3 pr-9 text-[12px] text-[#334155] outline-none transition focus:border-[#ff7a00] focus:ring-2 focus:ring-[#ff7a00]/10">
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
          <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L6 6L11 1" stroke="#172033" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   TOGGLE ROW
========================================================= */

function SettingToggleRow({ title, description, enabled, onChange }) {
  return (
    <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="text-[14px] font-bold text-[#172033]">{title}</p>

        <p className="mt-1 text-[12px] leading-4 text-[#64748b]">{description}</p>
      </div>

      <Toggle enabled={enabled} onChange={onChange} />
    </div>
  );
}

/* =========================================================
   TOGGLE
========================================================= */

function Toggle({ enabled, onChange }) {
  return (
    <button type="button" role="switch" aria-checked={enabled} onClick={onChange} className={`relative flex h-[24px] w-[42px] shrink-0 items-center rounded-full p-[3px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff7a00]/20 ${enabled ? "bg-[#ff7a00]" : "bg-[#c5ced9]"}`}>
      <span className={`h-[18px] w-[18px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition-transform duration-200 ${enabled ? "translate-x-[18px]" : "translate-x-0"}`} />
    </button>
  );
}

/* =========================================================
   PRIMARY BUTTON
========================================================= */

function PrimaryButton({ children, type = "button", icon }) {
  return (
    <button type={type} className="inline-flex h-[37px] cursor-pointer items-center justify-center gap-2 rounded-md bg-[#ff7a00] px-7 text-[14px] font-semibold text-white shadow-sm transition hover:bg-[#d96600] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#ff7a00]/20">
      {icon}
      {children}
    </button>
  );
}

/* =========================================================
   MESSAGE BOX
========================================================= */

function MessageBox({ type, message }) {
  const success = type === "success";

  return (
    <div className={`mt-3 flex items-center gap-2 rounded-md border px-3 py-2 text-[10px] ${success ? "border-orange-100 bg-orange-50 text-[#ff7a00]" : "border-red-100 bg-red-50 text-red-600"}`}>
      {success ? <CheckCircle2 size={14} className="shrink-0" /> : <AlertCircle size={14} className="shrink-0" />}

      <span>{message}</span>
    </div>
  );
}

/* =========================================================
   EMAIL VALIDATION
========================================================= */

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* =========================================================
   CLEAR MESSAGE
========================================================= */

function clearMessageAfterDelay(setter) {
  window.setTimeout(() => {
    setter("");
  }, 3000);
}
