import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export function ProfileScreen() {
  const { user, updateProfile, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    full_name: user?.full_name || "",
    phone: user?.phone || "",
    grad_year: user?.grad_year || "",
    faculty: user?.faculty || "",
    major: user?.major || "",
  });

  const handleSave = async () => {
    await updateProfile(form);
    setEditing(false);
  };

  const tierColors = {
    free: "bg-gray-100 text-gray-700",
    atma_key: "bg-accent/10 text-accent",
  };

  return (
    <div className="pb-16">
      <div className="bg-gradient-to-r from-primary to-primary-light p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold">
            {user?.full_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "A"}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user?.full_name || "Alumni UAJ"}</h2>
            <p className="text-sm opacity-90">{user?.email}</p>
            <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${tierColors[user?.membership_tier || "free"]}`}>
              {user?.membership_tier === "atma_key" ? "ATMA KEY" : "Free Member"}
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Profile Info */}
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <h3 className="font-semibold mb-3">Profil Alumni</h3>
          {Object.entries(form).map(([key, value]) => (
            <div key={key} className="mb-3">
              <label className="text-xs text-gray-500 block mb-1">{key.replace(/_/g, " ")}</label>
              {editing ? (
                <input
                  type={key === "grad_year" ? "number" : "text"}
                  value={value}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              ) : (
                <p className="text-gray-900">{value || "-"}</p>
              )}
            </div>
          ))}
          {!editing ? (
            <button onClick={() => setEditing(true)} className="w-full py-2 bg-primary text-white rounded-lg font-medium">
              Edit Profil
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={handleSave} className="flex-1 py-2 bg-primary text-white rounded-lg font-medium">Simpan</button>
              <button onClick={() => setEditing(false)} className="flex-1 py-2 border border-gray-300 rounded-lg font-medium">Batal</button>
            </div>
          )}
        </div>

        {/* Membership Info */}
        {user?.membership_tier === "free" && (
          <div className="bg-accent/10 border border-accent/30 rounded-xl p-4">
            <h3 className="font-semibold text-accent mb-1">Upgrade ke ATMA KEY</h3>
            <p className="text-sm text-gray-600 mb-3">Dapatkan akses kontak alumni, job posting, full chat, dan benefit eksklusif. Rp200.000/tahun.</p>
            <button className="w-full py-2 bg-accent text-white rounded-lg font-medium">Upgrade Sekarang</button>
          </div>
        )}

        {/* Settings */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <button className="w-full flex items-center justify-between p-4">
            <span className="font-medium">Notifikasi</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
          <div className="border-t border-gray-100" />
          <button className="w-full flex items-center justify-between p-4">
            <span className="font-medium">Privasi & Keamanan</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
          <div className="border-t border-gray-100" />
          <button className="w-full flex items-center justify-between p-4">
            <span className="font-medium">Bantuan & Dukungan</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        {/* Logout */}
        <button onClick={logout} className="w-full py-3 text-red-600 font-medium border border-red-200 rounded-xl">
          Keluar
        </button>
      </div>
    </div>
  );
}