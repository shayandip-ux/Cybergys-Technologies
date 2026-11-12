import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Code2,
  LockKeyhole,
  Mail,
  Megaphone,
  Palette,
  Headphones,
  ShoppingCart,
  Smartphone,
} from "lucide-react";
import logo from "../../assets/cybergys-logo.png";
import "./login.css";

const categories = [
  { label: "Web Design", Icon: Palette },
  { label: "Web Development", Icon: Code2 },
  { label: "App Development", Icon: Smartphone },
  { label: "Digital Marketing", Icon: Megaphone },
  { label: "Ecommerce Support", Icon: ShoppingCart },
  { label: "Customer Service", Icon: Headphones },
];

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setIsSubmitting(true); setError("");
    try {
      const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: form.get("email"), password: form.get("password") }) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "Unable to sign in.");
      navigate("/admin");
    } catch (loginError) { setError(loginError.message); } finally { setIsSubmitting(false); }
  };

  return (
    <main className="login-page min-h-screen lg:grid lg:grid-cols-[1.08fr_0.92fr]">
      <section className="left_sidebar login-brand relative isolate flex min-h-[390px] flex-col justify-center overflow-hidden px-5 py-10 text-white sm:px-10 sm:py-12 lg:min-h-screen lg:px-12 xl:px-16">
        <div className="login-brand-shape pointer-events-none absolute inset-0 -z-10" />
        <div className="login-brand-glow pointer-events-none absolute -bottom-36 -left-28 -z-10 h-80 w-80 rounded-full" />

        <div className="mx-auto w-full max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-white/95 sm:mb-9">
            <span className="h-2 w-2 rounded-full bg-white" />
            CYBERGYS ADMIN PORTAL
          </div>

          <h1 className="max-w-2xl text-[2rem] font-extrabold leading-[1.08] tracking-[-0.045em] sm:text-5xl xl:text-[2.5rem]">
            Empowering digital ideas with technology that delivers.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/85 sm:mt-5 sm:text-base sm:leading-7">
            Manage your website content, services, projects, and client experiences from one secure workspace.
          </p>

          <div className="login-category-slider mt-7 space-y-2.5 sm:mt-9 sm:space-y-3.5" aria-label="Cybergys digital services">
            {[categories.slice(0, 3), categories.slice(3, 6)].map((row, rowIndex) => (
              <div className="login-marquee" key={rowIndex}>
                <div className={`login-marquee-track ${rowIndex === 0 ? "login-marquee-track--right" : "login-marquee-track--left"}`}>
                  {[0, 1].map((copy) => (
                    <div className="login-marquee-group" key={copy} aria-hidden={copy === 1}>
                      {row.map(({ label, Icon }) => (
                        <div key={label} className="login-category-card">
                          <Icon aria-hidden="true" className="h-8 w-8 text-[#ff7a00]" strokeWidth={1.8} />
                          <span className="text-[16px] font-bold">{label}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-8 w-full max-w-2xl text-xs text-white/80 lg:absolute lg:bottom-7 lg:left-12 lg:mt-0 xl:left-16">
          © {new Date().getFullYear()} Cybergys Technologies
        </p>
      </section>

      <section className="right_sidebar login-form-area relative flex min-h-[650px] items-center justify-center overflow-hidden px-4 py-10 sm:px-8 sm:py-12 lg:min-h-screen lg:px-8 xl:px-12">
        <div className="login-form-orbit pointer-events-none absolute -right-32 -top-28 h-96 w-96 rounded-full" />
        <div className="login-form-orbit login-form-orbit-lower pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full" />

        <div className="login-card relative z-10 w-full max-w-[470px] rounded-2xl border border-white/90 bg-white/95 px-5 py-7 shadow-[0_24px_80px_rgba(117,19,52,0.13)] backdrop-blur sm:rounded-[22px] sm:px-9 sm:py-9 xl:px-11 xl:py-10">
          <div className="mx-auto mb-6 flex justify-center sm:mb-7">
            <img src={logo} alt="Cybergys Technologies" className="h-auto w-[260px] max-w-full" />
          </div>

          <div className="mb-6 text-center sm:mb-7">
            <p className="mb-2 text-sm font-bold text-[#ff7a00]">Welcome back</p>
            <h2 className="text-[1.75rem] font-extrabold tracking-[-0.04em] text-slate-950 sm:text-3xl">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Enter your credentials to continue to your workspace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
                Email address
              </label>
              <div className="relative">
                <Mail aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  className="login-input h-12 w-full rounded-lg border border-slate-200 bg-[#f7f9fd] pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#ff7a00] focus:bg-white focus:ring-4 focus:ring-[#ff7a00]/10"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label htmlFor="password" className="text-sm font-semibold text-slate-700">
                  Password
                </label>
                <button type="button" className="text-xs font-semibold text-[#ff7a00] transition hover:text-[#a90935] sm:text-sm">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <LockKeyhole aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="Enter your password"
                  className="login-input h-12 w-full rounded-lg border border-slate-200 bg-[#f7f9fd] pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#ff7a00] focus:bg-white focus:ring-4 focus:ring-[#ff7a00]/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-lg text-slate-400 transition hover:text-[#ff7a00] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#ff7a00]"
                >
                  {showPassword ? <EyeOff aria-hidden="true" className="h-5 w-5" /> : <Eye aria-hidden="true" className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <label className="flex cursor-pointer items-center gap-2.5 pt-0.5 text-sm text-slate-600">
              <input type="checkbox" name="remember" className="h-4 w-4 rounded border-slate-300 accent-[#ff7a00] focus:ring-[#ff7a00]" />
              Remember me
            </label>

            {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer group flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#ff7a00] text-sm font-bold text-white shadow-[0_8px_20px_rgba(213,13,67,0.2)] transition hover:-translate-y-0.5 hover:bg-[#d96600] hover:shadow-[0_12px_26px_rgba(213,13,67,0.25)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#ff7a00]/25 active:translate-y-0"
            >
              {isSubmitting ? "Signing in…" : "Sign in"}
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>

          {/* <div className="my-5 flex items-center gap-3 sm:my-6">
            <span className="h-px flex-1 bg-slate-200" />
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Secure access</span>
            <span className="h-px flex-1 bg-slate-200" />
          </div>
          <div className="flex gap-3 rounded-xl border border-[#f5dce4] bg-[#fff8fa] p-3.5 sm:p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#ff7a00] shadow-sm ring-1 ring-[#f7e7ec]">
              <ShieldCheck aria-hidden="true" className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-slate-800">Your account is protected</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">Your login information is securely processed.</p>
            </div>
            <Check aria-hidden="true" className="ml-auto mt-1 h-4 w-4 shrink-0 text-[#ff7a00]" />
          </div>
          <p className="mt-5 text-center text-sm text-slate-500">
            Don’t have an account?{" "}
            <button type="button" className="font-bold text-[#ff7a00] underline-offset-4 hover:underline">
              Create account
            </button>
          </p> */}

        </div>
      </section>
    </main>
  );
};

export default Login;
