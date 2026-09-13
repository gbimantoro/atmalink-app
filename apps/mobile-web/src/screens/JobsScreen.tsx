import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jobsApi } from "../api/client";
import { SectionHeader } from "../components/SectionHeader";

function FilterChip({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-1.5 bg-surface rounded-full text-sm font-medium flex items-center gap-1 whitespace-nowrap"
      >
        {label}{value && <span className="text-primary">: {value}</span>}
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-100 py-1 min-w-[140px] z-10">
          <button onClick={() => { onChange(""); setOpen(false); }} className={`w-full px-4 py-2 text-left text-sm ${!value ? "bg-primary/10 text-primary" : ""}`}>Semua</button>
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`w-full px-4 py-2 text-left text-sm ${value === opt ? "bg-primary/10 text-primary" : ""}`}
            >{opt}</button>
          ))}
        </div>
      )}
    </div>
  );
}

function TagChip({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`px-2 py-0.5 bg-surface text-caption rounded-full ${className}`}>{children}</span>;
}

interface Job {
  id: number;
  title: string;
  company?: { name: string; logo_url?: string };
  location?: string;
  salary_min?: number;
  salary_max?: number;
  job_type?: string;
  remote_type?: string;
  posted_at: string;
}

import { AppHeader } from "../components/AppHeader";

const SAMPLE_JOBS: Job[] = [
  {
    id: 1,
    title: "Senior Frontend Engineer (React/TypeScript)",
    company: { name: "PT Fintek Karya Nusantara (LinkAja)", logo_url: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=120&q=80" },
    location: "Jakarta Selatan",
    salary_min: 18000000,
    salary_max: 28000000,
    job_type: "Full-time",
    remote_type: "Hybrid",
    posted_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Corporate Legal Associate",
    company: { name: "Wong & Partners Law Firm", logo_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&q=80" },
    location: "Jakarta Pusat",
    salary_min: 14000000,
    salary_max: 22000000,
    job_type: "Full-time",
    remote_type: "On-site",
    posted_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 3,
    title: "Product Manager - Digital Banking",
    company: { name: "PT Bank Central Asia Tbk", logo_url: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=120&q=80" },
    location: "Jakarta Barat / BSD",
    salary_min: 22000000,
    salary_max: 35000000,
    job_type: "Full-time",
    remote_type: "Hybrid",
    posted_at: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: 4,
    title: "Junior Data Analyst & BI Specialist",
    company: { name: "TechCorp Nusantara", logo_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=120&q=80" },
    location: "Remote - Indonesia",
    salary_min: 9000000,
    salary_max: 14000000,
    job_type: "Full-time",
    remote_type: "Remote",
    posted_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
];

export function JobsScreen() {
  const [jobs, setJobs] = useState<Job[]>(SAMPLE_JOBS);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [remoteFilter, setRemoteFilter] = useState("");

  useEffect(() => {
    jobsApi.list("published").then((res) => {
      if (res.data && res.data.length > 0) {
        setJobs(res.data);
      }
    }).catch(() => {});
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) ||
      (job.company?.name || "").toLowerCase().includes(search.toLowerCase());
    const matchesLocation = !locationFilter || (job.location || "").toLowerCase().includes(locationFilter.toLowerCase());
    const matchesType = !typeFilter || (job.job_type || "").toLowerCase().includes(typeFilter.toLowerCase());
    const matchesRemote = !remoteFilter || (job.remote_type || "").toLowerCase().includes(remoteFilter.toLowerCase());
    return matchesSearch && matchesLocation && matchesType && matchesRemote;
  });

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;

  return (
    <div className="pb-24 bg-gray-50 min-h-screen">
      {/* Header */}
      <AppHeader
        title="Lowongan Karir"
        showSearch={true}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari posisi, perusahaan, atau keahlian..."
        rightAction={
          <Link
            to="/jobs/post"
            className="px-3 py-1.5 bg-primary hover:bg-primary/95 active:scale-95 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1"
          >
            <span>+</span>
            <span>Pasang</span>
          </Link>
        }
      />

      {/* Filter Chips Bar */}
      <div className="bg-white px-4 py-2.5 border-b border-gray-100 flex gap-2 overflow-x-auto">
        <FilterChip label="Lokasi" value={locationFilter} onChange={setLocationFilter} options={["Jakarta", "Bandung", "Surabaya", "Remote", "Luar Negeri"]} />
        <FilterChip label="Tipe" value={typeFilter} onChange={setTypeFilter} options={["Full-time", "Part-time", "Contract", "Internship"]} />
        <FilterChip label="Model" value={remoteFilter} onChange={setRemoteFilter} options={["Remote", "Hybrid", "On-site"]} />
      </div>

      {/* Job List */}
      <div className="px-4 py-4 space-y-3">
        {filteredJobs.map((job) => (
          <Link key={job.id} to={`/jobs/${job.id}`} className="block card p-4">
            <div className="flex items-start gap-3">
              <div className="w-14 h-14 rounded-lg bg-surface flex-shrink-0 overflow-hidden flex items-center justify-center">
                {job.company?.logo_url ? (
                  <img src={job.company.logo_url} alt={job.company.name} className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-7 h-7 text-text-secondary" fill="currentColor" viewBox="0 0 24 24"><path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-text-primary truncate">{job.title}</h3>
                  <time className="text-caption whitespace-nowrap">{new Date(job.posted_at).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}</time>
                </div>
                <p className="text-sm text-text-secondary truncate mt-0.5">{job.company?.name}</p>
                <div className="flex items-center gap-2 mt-2 text-caption">
                  {job.location && (
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                      {job.location}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {job.job_type && <TagChip>{job.job_type}</TagChip>}
                  {job.remote_type && <TagChip>{job.remote_type}</TagChip>}
                  {job.salary_min && job.salary_max && <TagChip className="bg-accent/10 text-accent">Rp{job.salary_min.toLocaleString()} - Rp{job.salary_max.toLocaleString()}</TagChip>}
                </div>
              </div>
            </div>
          </Link>
        ))}
        {filteredJobs.length === 0 && <p className="text-center text-caption py-8">Tidak ada lowongan yang cocok</p>}
      </div>
    </div>
  );
}