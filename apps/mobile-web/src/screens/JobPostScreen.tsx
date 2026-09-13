import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppHeader } from "../components/AppHeader";
import { JobCard } from "../components/JobCard";
import { useAuth } from "../context/AuthContext";

export function JobPostScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Form State
  const [title, setTitle] = useState("Senior Frontend Engineer (React/TypeScript)");
  const [companyName, setCompanyName] = useState("PT Teknologi Finansial Nusantara");
  const [companyLogo, setCompanyLogo] = useState("https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=120&q=80");
  const [industry, setIndustry] = useState("Teknologi & Fintech");
  const [location, setLocation] = useState("Jakarta Selatan (Kuningan)");
  const [jobType, setJobType] = useState<"Full-time" | "Part-time" | "Contract" | "Internship">("Full-time");
  const [remoteType, setRemoteType] = useState<"Hybrid" | "Remote" | "On-site">("Hybrid");
  const [experienceLevel, setExperienceLevel] = useState("3 - 5 Tahun");
  const [salaryMin, setSalaryMin] = useState<number>(18000000);
  const [salaryMax, setSalaryMax] = useState<number>(28000000);
  const [showSalary, setShowSalary] = useState(true);
  const [priorityAlumni, setPriorityAlumni] = useState(true);
  const [description, setDescription] = useState(
    "Kami mencari Senior Frontend Engineer yang bersemangat membangun antarmuka web modern dengan performa tinggi. Alumnus Unika Atma Jaya sangat diprioritaskan untuk bergabung dengan tim core tech kami."
  );
  const [requirements, setRequirements] = useState(
    "- Minimal 3 tahun pengalaman dengan React, TypeScript, Tailwind CSS.\n- Berpengalaman dengan state management dan integrasi REST API / GraphQL.\n- Memiliki komunikasi yang baik dan pemahaman UI/UX yang kuat."
  );
  const [applyUrl, setApplyUrl] = useState("https://careers.teknologinusantara.co.id");
  const [applyEmail, setApplyEmail] = useState("recruitment@teknologinusantara.co.id");

  // Selected Perks
  const [selectedPerks, setSelectedPerks] = useState<string[]>([
    "BPJS Kesehatan & Ketenagakerjaan",
    "Asuransi Rawat Inap Swasta",
    "Laptop MacBook Pro disediakan",
    "Jam Kerja Fleksibel",
  ]);

  const AVAILABLE_PERKS = [
    "BPJS Kesehatan & Ketenagakerjaan",
    "Asuransi Rawat Inap Swasta",
    "Laptop MacBook Pro disediakan",
    "Jam Kerja Fleksibel",
    "Tunjangan Pembelajaran / Sertifikasi",
    "Bonus Kinerja Tahunan",
    "Catering / Makan Siang",
    "Fasilitas Gym / Wellness",
  ];

  // Submission States
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const togglePerk = (perk: string) => {
    setSelectedPerks((prev) =>
      prev.includes(perk) ? prev.filter((p) => p !== perk) : [...prev, perk]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !companyName.trim() || !location.trim()) {
      alert("Harap isi semua kolom wajib!");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setShowSuccessModal(true);
    }, 1000);
  };

  return (
    <div className="pb-28 bg-gray-50 min-h-screen">
      {/* 1. Pure White Header */}
      <AppHeader
        title="Pasang Lowongan Karir"
        showBack={true}
        onBack={() => navigate("/jobs")}
      />

      <div className="p-4 space-y-4 max-w-xl mx-auto">
        {/* Banner Motivasi */}
        <div className="bg-gradient-to-r from-primary to-emerald-700 p-4 rounded-2xl text-white shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 bg-white/20 rounded text-[11px] font-bold uppercase tracking-wider">
              PERLUNI Career Hub
            </span>
            {user?.full_name && (
              <span className="text-xs text-white/80">• Oleh {user.full_name}</span>
            )}
          </div>
          <h2 className="text-sm font-bold leading-snug">
            Buka Peluang Emas untuk Alumnus Atma Jaya!
          </h2>
          <p className="text-xs text-white/90 mt-1">
            Lowongan yang Anda pasang akan langsung terdistribusi ke puluhan ribu alumni terverifikasi lintas fakultas.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Section 1: Informasi Posisi & Perusahaan */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">1</span>
              Posisi & Perusahaan
            </h3>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Judul Posisi / Jabatan <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Senior Frontend Engineer"
                required
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  Nama Perusahaan <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Nama PT / Brand"
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:border-primary outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  Industri / Sektor
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:border-primary bg-white outline-none"
                >
                  <option>Teknologi & Fintech</option>
                  <option>Perbankan & Keuangan</option>
                  <option>Kesehatan & Farmasi</option>
                  <option>Konsultan Hukum & Bisnis</option>
                  <option>FMCG & Ritel</option>
                  <option>Pendidikan</option>
                  <option>Lainnya</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                URL Logo Perusahaan (Opsional)
              </label>
              <input
                type="url"
                value={companyLogo}
                onChange={(e) => setCompanyLogo(e.target.value)}
                placeholder="https://... (logo gambar)"
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-primary outline-none text-gray-600"
              />
            </div>
          </div>

          {/* Section 2: Tipe Pekerjaan & Lokasi */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">2</span>
              Lokasi & Kebijakan Kerja
            </h3>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Tipe Kontrak</label>
                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value as any)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:border-primary bg-white outline-none"
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Model Kerja</label>
                <select
                  value={remoteType}
                  onChange={(e) => setRemoteType(e.target.value as any)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:border-primary bg-white outline-none"
                >
                  <option>Hybrid</option>
                  <option>Remote</option>
                  <option>On-site</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Kota / Lokasi Kantor <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Contoh: Jakarta Selatan atau BSD Tangerang"
                required
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:border-primary outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Tingkat Pengalaman</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:border-primary bg-white outline-none"
              >
                <option>Fresh Graduate / Lulusan Baru</option>
                <option>1 - 3 Tahun</option>
                <option>3 - 5 Tahun</option>
                <option>5+ Tahun (Senior / Lead)</option>
                <option>Executive / Management</option>
              </select>
            </div>
          </div>

          {/* Section 3: Kompensasi & Benefit */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">3</span>
              Gaji & Fasilitas
            </h3>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-gray-600 block mb-1">Gaji Min (IDR/bln)</label>
                <input
                  type="number"
                  step="500000"
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm font-semibold border border-gray-300 rounded-xl focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-gray-600 block mb-1">Gaji Max (IDR/bln)</label>
                <input
                  type="number"
                  step="500000"
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm font-semibold border border-gray-300 rounded-xl focus:border-primary outline-none"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showSalary}
                onChange={(e) => setShowSalary(e.target.checked)}
                className="w-4 h-4 rounded text-primary focus:ring-primary border-gray-300"
              />
              <span className="text-xs text-gray-700">Tampilkan perkiraan gaji ke pelamar</span>
            </label>

            {/* Special Atma Jaya Badge */}
            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={priorityAlumni}
                  onChange={(e) => setPriorityAlumni(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded text-amber-600 focus:ring-amber-500 border-amber-300"
                />
                <div>
                  <span className="text-xs font-bold text-amber-900 block">
                    ★ Berikan Label "Prioritas Alumnus Atma Jaya"
                  </span>
                  <p className="text-[11px] text-amber-700 mt-0.5">
                    Lowongan akan ditandai khusus dan dipromosikan di halaman utama aplikasi.
                  </p>
                </div>
              </label>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-2">Benefit & Fasilitas</label>
              <div className="grid grid-cols-2 gap-1.5">
                {AVAILABLE_PERKS.map((perk) => (
                  <button
                    type="button"
                    key={perk}
                    onClick={() => togglePerk(perk)}
                    className={`p-2 rounded-xl text-left text-[11px] border transition-all ${
                      selectedPerks.includes(perk)
                        ? "bg-emerald-50 text-emerald-900 border-emerald-300 font-bold"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {selectedPerks.includes(perk) ? "✓ " : "+ "}
                    {perk}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: Deskripsi & Kualifikasi */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">4</span>
              Deskripsi & Cara Melamar
            </h3>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Deskripsi Pekerjaan & Tanggung Jawab
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-primary outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Kualifikasi & Persyaratan
              </label>
              <textarea
                rows={3}
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-primary outline-none font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Link Portal Karir</label>
                <input
                  type="url"
                  value={applyUrl}
                  onChange={(e) => setApplyUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-primary outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Email Penerimaan CV</label>
                <input
                  type="email"
                  value={applyEmail}
                  onChange={(e) => setApplyEmail(e.target.value)}
                  placeholder="hr@perusahaan.com"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-primary outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Live Card Preview */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
              Pratinjau Tampilan di Halaman Karir:
            </span>
            <div className="bg-white p-4 rounded-2xl border-2 border-emerald-200 shadow-sm relative">
              {priorityAlumni && (
                <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 bg-amber-500 text-white text-[10px] font-black rounded-full shadow-xs">
                  PRIORITAS ALUMNI
                </span>
              )}
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex-shrink-0 overflow-hidden flex items-center justify-center border border-gray-200">
                  {companyLogo ? (
                    <img src={companyLogo} alt={companyName} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-bold text-gray-400 text-xs">{companyName.slice(0, 2)}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-gray-900 truncate leading-snug">{title || "Judul Posisi"}</h4>
                  <p className="text-xs text-primary font-semibold mt-0.5">{companyName || "Nama Perusahaan"}</p>
                  <p className="text-[11px] text-gray-500 mt-1 flex items-center gap-1">
                    📍 {location || "Lokasi"} • {jobType} • {remoteType}
                  </p>
                  {showSalary && salaryMin && salaryMax ? (
                    <span className="inline-block mt-2 px-2 py-0.5 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200">
                      Rp {(salaryMin / 1000000).toFixed(0)} jt - Rp {(salaryMax / 1000000).toFixed(0)} jt/bln
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 bg-primary hover:bg-primary/95 active:scale-98 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Menerbitkan Lowongan...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 4v16m8-8H4" />
                </svg>
                Terbitkan Lowongan Karir Sekarang
              </>
            )}
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Lowongan Berhasil Diterbitkan!</h3>
              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                Posisi <b>{title}</b> di <b>{companyName}</b> kini aktif dan dapat dilihat oleh seluruh alumni di portal karir PERLUNI Atma Jaya.
              </p>
            </div>
            <div className="pt-2 flex gap-2">
              <button
                onClick={() => navigate("/jobs")}
                className="w-full py-2.5 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl text-xs transition-colors"
              >
                Lihat Daftar Lowongan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
