import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { AtmaLinkLogo, AtmaButton, AtmaBadge } from "@atmajaya/ui-core";

export function LoginScreen() {
  const { login, verifyMagicLink } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<"email" | "verify">("email");
  const [token, setToken] = useState(searchParams.get("token") || "");

  // Handle direct magic link token if present in URL query string
  if (token && step === "email") {
    setToken(token);
    setStep("verify");
    verifyMagicLink(token)
      .then(() => navigate("/"))
      .catch(() => {
        setStep("email");
        setError("Token tautan magic tidak valid atau telah kedaluwarsa.");
      });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Silakan masukkan email alumni atau NIM Anda.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await login(email.trim());
      navigate("/");
    } catch (err: any) {
      console.error(err);
      setError("Gagal masuk. Pastikan API lokal aktif atau coba gunakan salah satu akun demo di bawah.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("bebas123");
    setError(null);
    setLoading(true);
    try {
      await login(demoEmail);
      navigate("/");
    } catch (err: any) {
      console.error(err);
      setError("Gagal masuk dengan akun demo. Coba refresh server dev API.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) return;
    setError(null);
    setLoading(true);
    try {
      await verifyMagicLink(token.trim());
      navigate("/");
    } catch (err: any) {
      console.error(err);
      setError("Token verifikasi tidak valid atau telah kedaluwarsa.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-[#003B1C] via-[#005A2B] to-[#002410] text-[#0F172A] overflow-x-hidden">
      {/* Background Decorative Ambience & Watermark */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#00A859]/15 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#EF5B2A]/10 blur-3xl" />
        <div className="absolute right-6 bottom-12 w-80 h-80 opacity-5">
          <AtmaLinkLogo variant="mark" size="100%" />
        </div>
      </div>

      {/* Main Container Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header Branding */}
        <div className="text-center text-white mb-6">
          <div className="inline-flex items-center justify-center px-6 py-3 bg-white rounded-2xl shadow-2xl border border-white/20 mb-4 transform hover:scale-102 transition-transform">
            <AtmaLinkLogo variant="horizontal" size={185} alt="ATMALINK Unika Atma Jaya" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Welcome Home</h1>
          <p className="mt-1 text-sm text-emerald-100/90 font-medium">
            Platform Resmi Alumni Unika Atma Jaya (PERLUNI UAJ)
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-50 relative overflow-hidden">
          {/* Subtle Top Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#006633] via-[#00A859] to-[#EF5B2A]" />

          {/* Heading inside Card */}
          <div className="mb-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-neutral-900">
                {step === "email" ? "Masuk ke Akun" : "Verifikasi OTP"}
              </h2>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Secure SSO
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              {step === "email"
                ? "Gunakan email alumni, NIM, atau pilih akun demo pengujian."
                : "Masukkan token OTP yang telah diterbitkan untuk akun Anda."}
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2 animate-fadeIn">
              <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {step === "email" ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Student ID / Email */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                  Student ID / Email Alumni
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alumni@atmajaya.ac.id"
                    required
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-neutral-50 hover:bg-neutral-100/60 focus:bg-white border border-neutral-300 focus:border-[#006633] rounded-xl text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-4 focus:ring-[#006633]/15 transition"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password Field (With Clear Explanation) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Password (Opsional di Dev)
                  </label>
                  <span className="text-[11px] text-emerald-700 font-semibold">Passwordless Ready</span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Bebas / apa saja (contoh: 123456)"
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-neutral-50 hover:bg-neutral-100/60 focus:bg-white border border-neutral-300 focus:border-[#006633] rounded-xl text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-4 focus:ring-[#006633]/15 transition"
                    autoComplete="current-password"
                  />
                </div>
                <div className="bg-emerald-50/90 border border-emerald-200/80 rounded-xl p-2.5 text-[11px] text-emerald-900 flex items-start gap-2 mt-2">
                  <span className="text-emerald-700 font-bold flex-shrink-0">ℹ️ Info:</span>
                  <div className="leading-snug">
                    Sistem memakai <strong>Passwordless Auth</strong> (tanpa password). Di mode dev ini, Anda dapat mengisi password apa saja atau langsung klik tombol <strong>Login</strong>.
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <AtmaButton
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={loading}
                  className="shadow-md shadow-emerald-800/20"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Memproses Masuk...
                    </span>
                  ) : (
                    "Login ke ATMALINK →"
                  )}
                </AtmaButton>
              </div>

              {/* Quick Demo 1-Click Login Section */}
              <div className="pt-4 border-t border-neutral-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block text-center mb-2.5">
                  Atau Masuk 1-Klik Akun Demo (Seeded)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleDemoLogin("alice@example.com")}
                    disabled={loading}
                    className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100/80 text-left transition flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-xs font-bold text-emerald-950 block">Alice Wijaya</span>
                      <span className="text-[10px] text-emerald-700">FEB '90 • Atma Key VIP</span>
                    </div>
                    <span className="text-xs text-emerald-700 font-bold group-hover:translate-x-0.5 transition-transform">
                      →
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDemoLogin("bob@example.com")}
                    disabled={loading}
                    className="p-2.5 rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-left transition flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-xs font-bold text-neutral-900 block">Bob Santoso</span>
                      <span className="text-[10px] text-neutral-500">Teknik Informatika '91</span>
                    </div>
                    <span className="text-xs text-neutral-400 font-bold group-hover:translate-x-0.5 transition-transform">
                      →
                    </span>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* OTP Verification Step */
            <form onSubmit={handleVerify} className="space-y-4 text-center">
              <div className="w-16 h-16 mx-auto bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-200">
                <svg className="w-8 h-8 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>

              <div>
                <h3 className="text-lg font-bold text-neutral-900">Verifikasi Token Sesi</h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Masukkan token verifikasi yang diterbitkan untuk akun Anda
                </p>
              </div>

              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Contoh: uuid-token..."
                required
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-center font-mono text-sm tracking-wider text-neutral-900 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-600/15"
              />

              <AtmaButton type="submit" variant="primary" fullWidth disabled={loading}>
                {loading ? "Memverifikasi..." : "Verifikasi & Masuk"}
              </AtmaButton>

              <button
                type="button"
                onClick={() => { setStep("email"); setError(null); }}
                className="text-xs text-emerald-700 font-semibold hover:underline mt-2 inline-block"
              >
                ← Kembali ke Halaman Login
              </button>
            </form>
          )}

          {/* Footer Links inside Card */}
          <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
            <Link to="/design-system" className="text-emerald-700 hover:text-emerald-800 font-semibold">
              🎨 Design System
            </Link>
            <span className="text-neutral-300">•</span>
            <a
              href="mailto:alumni@atmajaya.ac.id"
              className="hover:text-neutral-700 transition"
            >
              Bantuan Akun
            </a>
          </div>
        </div>

        {/* Bottom Tagline */}
        <p className="text-center text-xs text-emerald-100/70 mt-6 font-medium">
          Menjalin Akar, Membangun Karya Global • © 2026 PERLUNI UAJ
        </p>
      </div>
    </div>
  );
}