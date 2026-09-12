import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useSearchParams, useNavigate } from "react-router-dom";

export function LoginScreen() {
  const { login, verifyMagicLink } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"email" | "verify">("email");
  const [token, setToken] = useState(searchParams.get("token") || "");

  if (token && step === "email") {
    setToken(token);
    setStep("verify");
    verifyMagicLink(token).then(() => navigate("/")).catch(() => setStep("email"));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    try {
      await login(email);
      navigate("/");
    } catch (e) {
      console.error(e);
      alert("Login gagal. Periksa kredensial Anda.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    try {
      await verifyMagicLink(token);
      navigate("/");
    } catch (e) {
      console.error(e);
      alert("Token tidak valid atau kadaluarsa");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80"
          alt="Atma Jaya Campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo & Welcome */}
        <div className="text-center text-white mb-10">
          <img
            src="https://upload.wikimedia.org/wikipedia/id/thumb/3/3a/Logo_Universitas_Katolika_Atma_Jaya.png/320px-Logo_Universitas_Katolika_Atma_Jaya.png"
            alt="PERLUNI UAJ"
            className="w-20 h-20 mx-auto mb-4 object-contain"
          />
          <h1 className="text-3xl font-bold">Welcome Home</h1>
          <p className="mt-2 text-white/80">Masuk ke komunitas alumni Atma Jaya</p>
        </div>

        {/* Form Card with curved top */}
        <div className="relative bg-white rounded-t-3xl overflow-hidden">
          {/* Orange curved top indicator */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-primary rounded-b-full" style={{ clipPath: "ellipse(60% 50% at 50% 0%)" }} />

          <div className="relative p-8 pt-16">
            {step === "email" ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Student ID / Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alumni@atmajaya.ac.id"
                    required
                    className="input-field"
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="input-field"
                    autoComplete="current-password"
                  />
                </div>
                <button type="submit" disabled={loading} className="btn-primary mt-2">
                  {loading ? "Memproses..." : "Login"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerify} className="space-y-4 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <h3 className="text-xl font-bold">Verifikasi Email</h3>
                <p className="text-caption">Masukkan token yang dikirim ke email Anda</p>
                <input
                  type="text"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Token verifikasi"
                  required
                  className="input-field text-center text-lg tracking-widest"
                />
                <button type="submit" disabled={loading} className="btn-primary mt-2">
                  {loading ? "Memverifikasi..." : "Verifikasi & Masuk"}
                </button>
                <button type="button" onClick={() => setStep("email")} className="text-caption underline mt-4 block">Kembali ke login</button>
              </form>
            )}

            <p className="text-center text-caption underline mt-8">First time logging in?</p>
          </div>
        </div>
      </div>
    </div>
  );
}