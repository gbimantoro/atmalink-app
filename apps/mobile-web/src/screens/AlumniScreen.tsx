import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { SectionHeader } from "../components/SectionHeader";

interface Alumni {
  id: number;
  full_name: string;
  grad_year?: number;
  faculty?: string;
  major?: string;
  avatar_url?: string;
  occupation?: string;
  membership_tier: "free" | "atma_key";
}

export function AlumniScreen() {
  const { user } = useAuth();
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [filtered, setFiltered] = useState<Alumni[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Mock data - replace with API call
  useEffect(() => {
    const mockData: Alumni[] = [
      { id: 1, full_name: "Alice Wijaya", grad_year: 1990, faculty: "Fakultas Ekonomi", major: "Manajemen", occupation: "CEO at TechCorp", membership_tier: "atma_key", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice" },
      { id: 2, full_name: "Bob Santoso", grad_year: 1991, faculty: "Fakultas Teknik", major: "Informatika", occupation: "Senior Engineer", membership_tier: "free", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob" },
      { id: 3, full_name: "Carol Lim", grad_year: 1992, faculty: "Fakultas Hukum", major: "Hukum", occupation: "Legal Counsel", membership_tier: "free", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=carol" },
      { id: 4, full_name: "David Chen", grad_year: 1995, faculty: "Fakultas Kedokteran", major: "Kedokteran", occupation: "Doctor", membership_tier: "atma_key", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=david" },
      { id: 5, full_name: "Eva Suryani", grad_year: 1998, faculty: "Fakultas Psikologi", major: "Psikologi", occupation: "Psychologist", membership_tier: "free", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=eva" },
      { id: 6, full_name: "Frank Tan", grad_year: 2000, faculty: "Fakultas Teknik", major: "Elektro", occupation: "Hardware Engineer", membership_tier: "free", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=frank" },
      { id: 7, full_name: "Grace Lim", grad_year: 2002, faculty: "Fakultas Ekonomi", major: "Akuntansi", occupation: "CFO", membership_tier: "atma_key", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=grace" },
      { id: 8, full_name: "Henry Wong", grad_year: 2005, faculty: "Fakultas Hukum", major: "Hukum Bisnis", occupation: "Corporate Lawyer", membership_tier: "free", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=henry" },
    ];
    setAlumni(mockData);
    setFiltered(mockData);
    setLoading(false);
  }, []);

  useEffect(() => {
    const result = alumni.filter((a) =>
      a.full_name.toLowerCase().includes(search.toLowerCase()) ||
      a.faculty?.toLowerCase().includes(search.toLowerCase()) ||
      a.major?.toLowerCase().includes(search.toLowerCase()) ||
      a.occupation?.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, alumni]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;

  return (
    <div className="pb-24">
      {/* Header with Search */}
      <div className="px-4 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
        <h1 className="text-xl font-bold mb-4">Direktori Alumni</h1>
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input
            type="text"
            placeholder="Cari nama, angkatan, fakultas, pekerjaan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-12"
          />
        </div>
      </div>

      {/* Suggestions - ATMA KEY members */}
      {user?.membership_tier === "atma_key" && (
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-caption">Saran untuk Anda</span>
            <span className="px-2 py-0.5 bg-primary text-white text-xs rounded-full">ATMA KEY</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {alumni.filter(a => a.membership_tier === "atma_key").slice(0, 5).map((a) => (
              <Link key={a.id} to={`/alumni/${a.id}`} className="flex-shrink-0 w-40 card p-3 text-center">
                <img src={a.avatar_url} alt={a.full_name} className="w-16 h-16 rounded-full mx-auto mb-2 object-cover ring-2 ring-primary" />
                <p className="text-sm font-medium truncate">{a.full_name}</p>
                <p className="text-caption truncate">{a.occupation}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Alumni List */}
      <div className="px-4 py-3">
        <div className="space-y-1">
          {filtered.map((a) => (
            <Link key={a.id} to={`/alumni/${a.id}`} className="flex items-center gap-3 px-3 py-3 card">
              <img
                src={a.avatar_url}
                alt={a.full_name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-text-primary truncate">{a.full_name}</p>
                <p className="text-caption truncate">
                  {a.major} • {a.grad_year} • {a.faculty}
                </p>
              </div>
              {a.membership_tier === "atma_key" && (
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">KEY</span>
              )}
            </Link>
          ))}
          {filtered.length === 0 && <p className="text-center text-caption py-8">Tidak ada alumni ditemukan</p>}
        </div>
      </div>
    </div>
  );
}