import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { authApi } from "../api/client";

interface Alumni {
  id: number;
  email: string;
  full_name?: string;
  phone?: string;
  grad_year?: number;
  faculty?: string;
  major?: string;
  avatar_url?: string;
  consent_contacts: boolean;
  membership_tier: "free" | "atma_key";
  created_at: string;
}

interface AuthContextType {
  user: Alumni | null;
  loading: boolean;
  login: (email: string) => Promise<void>;
  verifyMagicLink: (token: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<Alumni>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_PROFILES: Record<string, Partial<Alumni>> = {
  "alice@example.com": {
    id: 1,
    email: "alice@example.com",
    full_name: "Alice Wijaya",
    faculty: "Fakultas Ekonomi",
    major: "Manajemen",
    grad_year: 1990,
    membership_tier: "atma_key",
    consent_contacts: true,
    created_at: "1990-08-01",
  },
  "bob@example.com": {
    id: 2,
    email: "bob@example.com",
    full_name: "Bob Santoso",
    faculty: "Fakultas Teknik",
    major: "Informatika",
    grad_year: 1991,
    membership_tier: "free",
    consent_contacts: true,
    created_at: "1991-08-01",
  },
  "carol@example.com": {
    id: 3,
    email: "carol@example.com",
    full_name: "Carol Lim",
    faculty: "Fakultas Hukum",
    major: "Hukum",
    grad_year: 1992,
    membership_tier: "free",
    consent_contacts: true,
    created_at: "1992-08-01",
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Alumni | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      fetchMe(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchMe = async (token: string) => {
    try {
      if (token.startsWith("demo-token-")) {
        const stored = localStorage.getItem("mock_user");
        if (stored) {
          setUser(JSON.parse(stored));
          setLoading(false);
          return;
        }
      }
      const res = await authApi.me({ headers: { Authorization: `Bearer ${token}` } });
      if (res.data) {
        setUser(res.data as unknown as Alumni);
      } else {
        const stored = localStorage.getItem("mock_user");
        if (stored) {
          setUser(JSON.parse(stored));
        } else {
          localStorage.removeItem("auth_token");
          setUser(null);
        }
      }
    } catch {
      const stored = localStorage.getItem("mock_user");
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        localStorage.removeItem("auth_token");
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string) => {
    const cleanEmail = email.toLowerCase().trim();

    // 1. Try real API first
    try {
      const res = await authApi.magicLink(cleanEmail);
      if (res.data?.token) {
        await verifyMagicLink(res.data.token);
        return;
      }
    } catch (apiErr) {
      console.warn("API magic link failed, activating offline/demo fallback:", apiErr);
    }

    // 2. Offline / Resilient Demo Fallback
    const demoProfile = DEMO_PROFILES[cleanEmail] || {
      id: 888,
      email: cleanEmail,
      full_name: cleanEmail.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      grad_year: 2020,
      faculty: "Alumni Atma Jaya",
      major: "Komunitas Alumni",
      membership_tier: "free" as const,
      consent_contacts: true,
      created_at: new Date().toISOString(),
    };

    const mockToken = "demo-token-" + btoa(cleanEmail);
    localStorage.setItem("auth_token", mockToken);
    localStorage.setItem("mock_user", JSON.stringify(demoProfile));
    setUser(demoProfile as Alumni);
  };

  const verifyMagicLink = async (token: string) => {
    try {
      const res = await authApi.verify(token);
      if (res.data?.token) {
        localStorage.setItem("auth_token", res.data.token);
        if (res.data.alumni) {
          setUser(res.data.alumni as unknown as Alumni);
        } else {
          await fetchMe(res.data.token);
        }
        return;
      }
    } catch (err) {
      console.warn("Magic link verify API failed:", err);
    }

    // Fallback if token verification failed against backend
    const stored = localStorage.getItem("mock_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("mock_user");
    setUser(null);
  }, []);

  const updateProfile = async (data: Partial<Alumni>) => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;
    try {
      if (!token.startsWith("demo-token-")) {
        const res = await authApi.updateMe(data, { headers: { Authorization: `Bearer ${token}` } });
        if (res.data) {
          setUser(res.data as unknown as Alumni);
          return;
        }
      }
    } catch (err) {
      console.warn("updateMe API error:", err);
    }

    // Local state update
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...data };
      localStorage.setItem("mock_user", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, verifyMagicLink, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}