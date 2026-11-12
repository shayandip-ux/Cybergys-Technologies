
import { useState } from "react";
import {
  FileText,
  Settings2,
  Code2,
  Check,
  Save,
  Info,
  ArrowUpRight,
  Copy,
  CheckCircle2,
} from "lucide-react";

const initialSettings = {
  integrationName: "",
  webhookUrl: "",
  destinationEmail: "",
  forwardSubmissions: true,
};

export default function PartnerFormPage() {
  const [activeTab, setActiveTab] = useState("edit");
  const [settings, setSettings] = useState(initialSettings);
  const [savedSettings, setSavedSettings] = useState(null);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");
  const [copied, setCopied] = useState(false);

  const updateField = (field, value) => {
    setSettings((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: "",
    }));

    setNotice("");
  };

  const handleSave = (event) => {
    event.preventDefault();

    const nextErrors = {};

    if (!settings.integrationName.trim()) {
      nextErrors.integrationName = "Please enter an integration name.";
    }

    if (settings.webhookUrl.trim()) {
      try {
        const url = new URL(settings.webhookUrl);

        if (!["http:", "https:"].includes(url.protocol)) {
          nextErrors.webhookUrl = "Enter a valid HTTP or HTTPS URL.";
        }
      } catch {
        nextErrors.webhookUrl = "Enter a valid webhook URL.";
      }
    }

    if (
      settings.destinationEmail.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        settings.destinationEmail.trim()
      )
    ) {
      nextErrors.destinationEmail = "Enter a valid email address.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setNotice("");
      return;
    }

    // Demo-only save: updates local component state.
    // Connect this handler to your backend API for persistent storage.
    setSavedSettings({ ...settings });
    setNotice("Settings saved in this page session.");
  };

  const handleCopy = () => {
    const payload = JSON.stringify(
      {
        integration_name: settings.integrationName,
        webhook_url: settings.webhookUrl,
        destination_email: settings.destinationEmail,
        forward_submissions: settings.forwardSubmissions,
      },
      null,
      2
    );

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(payload)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        })
        .catch(() => setNotice("Unable to copy automatically. Please copy the JSON manually."));
    } else {
      setNotice("Clipboard access is not available in this browser.");
    }
  };

  const inputClass =
    "mt-2 block min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-[#ff7a00] focus:ring-2 focus:ring-orange-100";

  const labelClass = "block text-sm font-semibold text-slate-800";

  return (
    <main className="min-h-[calc(100vh-61px)] bg-[#fff9fa] px-3 py-5 sm:px-6 sm:py-7 lg:px-8">
      <div className="mx-auto w-full max-w-[1600px]">

        {/* Page heading */}
        <header className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div className="flex min-w-0 items-start gap-3 sm:gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-[#ff7a00] sm:h-14 sm:w-14">
              <FileText size={25} />
            </span>

            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#ff7a00] sm:text-xs">
                Partners &amp; Tracking
              </p>

              <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
                Partner Form
              </h1>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 sm:text-base">
                Controls where Partner With Us submissions are delivered.
                Every submission is also stored under Partner Enquiries.
              </p>
            </div>
          </div>

          {/* Edit / API navigation */}
          <div className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-white p-1 sm:w-auto">
            <button
              type="button"
              onClick={() => {
                setActiveTab("edit");
                setNotice("");
              }}
              aria-pressed={activeTab === "edit"}
              className={`flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold sm:flex-none ${
                activeTab === "edit"
                  ? "bg-orange-50 text-[#ff7a00]"
                  : "text-slate-600"
              }`}
            >
              <Settings2 size={16} />
              Edit
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("api");
                setNotice("");
              }}
              aria-pressed={activeTab === "api"}
              className={`flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold sm:flex-none ${
                activeTab === "api"
                  ? "bg-orange-50 text-[#ff7a00]"
                  : "text-slate-600"
              }`}
            >
              <Code2 size={16} />
              API
            </button>
          </div>
        </header>

        {/* Demo notice */}
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-orange-100 bg-orange-50 p-3.5 text-sm text-orange-900 sm:p-4">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[#ff7a00]">
            <Info size={15} />
          </span>

          <div>
            <p className="font-bold">Integration settings</p>
            <p className="mt-1 leading-5 text-orange-800">
              Configure how new partner enquiries should be forwarded.
              Changes made here are a local demo until connected to your backend.
            </p>
          </div>
        </div>

        {/* Save toolbar */}
        <div className="mb-5 flex flex-col justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:flex-row sm:items-center sm:px-5">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            {savedSettings ? (
              <>
                <CheckCircle2 size={17} className="text-emerald-600" />
                <span>Local settings snapshot available</span>
              </>
            ) : (
              <>
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <span>Configuration not connected to a live API</span>
              </>
            )}
          </div>

          {activeTab === "edit" && (
            <button
              type="submit"
              form="partner-form-settings"
              className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#ff7a00] px-5 py-2.5 text-sm font-bold text-white sm:w-auto"
            >
              <Save size={16} />
              Save settings
            </button>
          )}
        </div>

        {notice && (
          <div
            role="status"
            className="mb-5 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-sm text-emerald-800"
          >
            <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
            <p>{notice}</p>
          </div>
        )}

        {activeTab === "edit" ? (
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_18px_rgba(15,23,42,0.04)]">
            <div className="border-b border-slate-100 px-4 py-5 sm:px-6 lg:px-8">
              <h2 className="text-lg font-extrabold text-slate-950">
                Delivery configuration
              </h2>
              <p className="mt-1 text-sm leading-5 text-slate-500">
                Set up an optional webhook and notification email for incoming enquiries.
              </p>
            </div>

            <form
              id="partner-form-settings"
              onSubmit={handleSave}
              className="space-y-6 p-4 sm:p-6 lg:p-8"
              noValidate
            >
              {/* Integration name */}
              <div>
                <label htmlFor="integrationName" className={labelClass}>
                  Integration name
                  <span className="ml-1 text-[#ff7a00]">*</span>
                </label>

                <input
                  id="integrationName"
                  name="integrationName"
                  type="text"
                  value={settings.integrationName}
                  onChange={(event) =>
                    updateField("integrationName", event.target.value)
                  }
                  placeholder="e.g. GoHighLevel, Zapier, or Make"
                  aria-invalid={Boolean(errors.integrationName)}
                  className={`${inputClass} ${
                    errors.integrationName ? "border-red-400" : ""
                  }`}
                />

                <p className="mt-2 text-xs leading-5 text-slate-500 sm:text-sm">
                  An internal label to identify the service receiving your partner enquiries.
                </p>

                {errors.integrationName && (
                  <p className="mt-1.5 text-sm text-red-600">
                    {errors.integrationName}
                  </p>
                )}
              </div>

              {/* Webhook URL */}
              <div>
                <label htmlFor="webhookUrl" className={labelClass}>
                  Delivery webhook URL
                </label>

                <input
                  id="webhookUrl"
                  name="webhookUrl"
                  type="url"
                  value={settings.webhookUrl}
                  onChange={(event) =>
                    updateField("webhookUrl", event.target.value)
                  }
                  placeholder="https://your-service.com/webhook"
                  aria-invalid={Boolean(errors.webhookUrl)}
                  className={`${inputClass} ${
                    errors.webhookUrl ? "border-red-400" : ""
                  }`}
                />

                <p className="mt-2 text-xs leading-5 text-slate-500 sm:text-sm">
                  Each new enquiry can be sent here as a JSON payload.
                  Leave blank to keep submissions in the CMS only.
                </p>

                {errors.webhookUrl && (
                  <p className="mt-1.5 text-sm text-red-600">
                    {errors.webhookUrl}
                  </p>
                )}
              </div>

              {/* Destination email */}
              <div>
                <label htmlFor="destinationEmail" className={labelClass}>
                  Destination email
                </label>

                <input
                  id="destinationEmail"
                  name="destinationEmail"
                  type="email"
                  value={settings.destinationEmail}
                  onChange={(event) =>
                    updateField("destinationEmail", event.target.value)
                  }
                  placeholder="partners@yourcompany.com"
                  aria-invalid={Boolean(errors.destinationEmail)}
                  className={`${inputClass} ${
                    errors.destinationEmail ? "border-red-400" : ""
                  }`}
                />

                <p className="mt-2 text-xs leading-5 text-slate-500 sm:text-sm">
                  Include an email address if your automation needs to know
                  which mailbox should receive notifications.
                </p>

                {errors.destinationEmail && (
                  <p className="mt-1.5 text-sm text-red-600">
                    {errors.destinationEmail}
                  </p>
                )}
              </div>

              <div className="border-t border-slate-100 pt-5">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    name="forwardSubmissions"
                    checked={settings.forwardSubmissions}
                    onChange={(event) =>
                      updateField("forwardSubmissions", event.target.checked)
                    }
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[#ff7a00]"
                  />

                  <span>
                    <span className="block text-sm font-semibold text-slate-800">
                      Forward new submissions
                    </span>
                    <span className="mt-1 block text-sm leading-5 text-slate-500">
                      Enable forwarding for new enquiries when a delivery
                      integration is configured.
                    </span>
                  </span>
                </label>
              </div>

              <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-5 text-slate-500">
                  * Integration name is required. Settings are not sent to a server.
                </p>

                <button
                  type="submit"
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#ff7a00] px-5 py-2.5 text-sm font-bold text-white sm:w-auto"
                >
                  <Check size={16} />
                  Save configuration
                </button>
              </div>
            </form>
          </section>
        ) : (
          /* API tab */
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_18px_rgba(15,23,42,0.04)]">
            <div className="border-b border-slate-100 px-4 py-5 sm:px-6 lg:px-8">
              <h2 className="text-lg font-extrabold text-slate-950">
                API and payload preview
              </h2>
              <p className="mt-1 text-sm leading-5 text-slate-500">
                Preview the configuration structure your backend could use.
              </p>
            </div>

            <div className="space-y-5 p-4 sm:p-6 lg:p-8">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Example delivery method
                </p>
                <p className="mt-2 font-mono text-sm font-bold text-slate-900">
                  POST · application/json
                </p>
                <p className="mt-2 text-sm leading-5 text-slate-500">
                  The endpoint and delivery behavior must be implemented in your
                  backend before real submissions can be forwarded.
                </p>
              </div>

              <div>
                <div className="mb-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <h3 className="text-sm font-bold text-slate-800">
                    Current configuration JSON
                  </h3>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex min-h-9 items-center justify-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700"
                  >
                    {copied ? <Check size={15} /> : <Copy size={15} />}
                    {copied ? "Copied" : "Copy JSON"}
                  </button>
                </div>

                <pre className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-950 p-4 text-xs leading-6 text-orange-100 sm:text-sm">
{JSON.stringify(
  {
    integration_name: settings.integrationName,
    webhook_url: settings.webhookUrl,
    destination_email: settings.destinationEmail,
    forward_submissions: settings.forwardSubmissions,
  },
  null,
  2
)}
                </pre>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-orange-100 bg-orange-50 p-4">
                <Info size={18} className="mt-0.5 shrink-0 text-[#ff7a00]" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Backend integration required
                  </h3>
                  <p className="mt-1 text-sm leading-5 text-slate-600">
                    This preview does not send requests or expose API credentials.
                    Connect the save action and submission-forwarding workflow
                    to your actual backend when it is ready.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab("edit")}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#ff7a00]"
                  >
                    Back to configuration
                    <ArrowUpRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
