import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { api } from "../api/client";

interface Alumni {
  id: number;
  email: string;
  full_name?: string;
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
      const res = await api.auth.me({ headers: { Authorization: `Bearer ${token}` } });
      if (res.data) setUser(res.data);
      else { localStorage.removeItem("auth_token"); setUser(null); }
    } catch { localStorage.removeItem("auth_token"); setUser(null); }
    finally { setLoading(false); }
  };

  const login = async (email: string) => {
    const res = await api.auth.magicLink({ email });
    // In dev, token returned directly. In prod, check email.
    if (res.data?.token) {
      localStorage.setItem("auth_token", res.data.token);
      await fetchMe(res.data.token);
    }
  };

  const verifyMagicLink = async (token: string) => {
    const res = await api.auth.verify({ token });
    if (res.data?.token) {
      localStorage.setItem("auth_token", res.data.token);
      await fetchMe(res.data.token);
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem("auth_token");
    setUser(null);
  }, []);

  const updateProfile = async (data: Partial<Alumni>) => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;
    const res = await api.auth.updateMe(data, { headers: { Authorization: `Bearer ${token}` } });
    if (res.data) setUser(res.data);
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