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
      const res = await authApi.me({ headers: { Authorization: `Bearer ${token}` } });
      if (res.data) setUser(res.data as unknown as Alumni);
      else { localStorage.removeItem("auth_token"); setUser(null); }
    } catch { localStorage.removeItem("auth_token"); setUser(null); }
    finally { setLoading(false); }
  };

  const login = async (email: string) => {
    const res = await authApi.magicLink(email);
    // In dev, token returned directly. Automatically verify into JWT session.
    if (res.data?.token) {
      await verifyMagicLink(res.data.token);
    }
  };

  const verifyMagicLink = async (token: string) => {
    const res = await authApi.verify(token);
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
    const res = await authApi.updateMe(data, { headers: { Authorization: `Bearer ${token}` } });
    if (res.data) setUser(res.data as unknown as Alumni);
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