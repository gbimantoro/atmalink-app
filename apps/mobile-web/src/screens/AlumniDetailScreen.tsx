import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AppHeader } from "../components/AppHeader";
import { AlumniIdCard, AtmaBadge } from "@atmajaya/ui-core";
import { useAuth } from "../context/AuthContext";

interface AlumniProfile {
  id: number;
  full_name: string;
  degree?: string;
  member_id: string;
  grad_year: number;
  faculty: string;
  major: string;
  avatar_url: string;
  headline: string;
  company: string;
  location: string;
  bio: string;
  membership_tier: "free" | "atma_key";
  open_for_mentoring: boolean;
  open_for_hiring: boolean;
  email: string;
  linkedin: string;
  experiences: {
    role: string;
    company: string;
    period: string;
    description: string;
    is_current?: boolean;
  }[];
  educations: {
    institution: string;
    degree: string;
    field: string;
    period: string;
    honors?: string;
  }[];
  skills: { name: string; endorsements: number }[];
  communities: string[];
}

const ALUMNI_DATABASE: Record<number, AlumniProfile> = {
  1: {
    id: 1,
    full_name: "Alice Wijaya",
    degree: "S.E., MBA",
    member_id: "UAJ-1990-00128",
    grad_year: 1990,
    faculty: "Fakultas Ekonomi dan Bisnis",
    major: "Manajemen Keuangan",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice",
    headline: "Chief Executive Officer & Founder at TechCorp Nusantara",
    company: "TechCorp Nusantara",
    location: "Jakarta, Indonesia",
    bio: "Eksekutif senior dengan lebih dari 25 tahun pengalaman di bidang transformasi bisnis digital dan fintech di Asia Tenggara. Berdedikasi tinggi membangun ekosistem kewirausahaan alumni Atma Jaya.",
    membership_tier: "atma_key",
    open_for_mentoring: true,
    open_for_hiring: true,
    email: "alice.wijaya@alumni.atmajaya.ac.id",
    linkedin: "https://linkedin.com/in/alice-wijaya-sample",
    experiences: [
      {
        role: "Chief Executive Officer",
        company: "TechCorp Nusantara",
        period: "2018 - Sekarang",
        description: "Memimpin strategi pertumbuhan korporasi, ekspansi regional 4 negara, dan 500+ talenta teknologi.",
        is_current: true,
      },
      {
        role: "Managing Director",
        company: "Global Ventures Capital",
        period: "2010 - 2018",
        description: "Mengelola portofolio investasi tahap awal (Seed-Series B) di sektor e-commerce dan edutech.",
      },
      {
        role: "Senior Finance Manager",
        company: "Multinational FMCG Group",
        period: "1998 - 2010",
        description: "Perencanaan keuangan jangka panjang dan pengawasan restrukturisasi merger.",
      },
    ],
    educations: [
      {
        institution: "Universitas Katolik Indonesia Atma Jaya",
        degree: "Sarjana Ekonomi (S.E.)",
        field: "Manajemen Keuangan",
        period: "1986 - 1990",
        honors: "Lulusan Terbaik FEB • Ketua BEM",
      },
      {
        institution: "NUS Business School",
        degree: "Master of Business Administration (MBA)",
        field: "Strategic Management",
        period: "1994 - 1996",
      },
    ],
    skills: [
      { name: "Executive Leadership", endorsements: 64 },
      { name: "Corporate Finance", endorsements: 52 },
      { name: "Venture Capital & M&A", endorsements: 49 },
      { name: "Digital Transformation", endorsements: 38 },
      { name: "Business Strategy", endorsements: 44 },
    ],
    communities: [
      "Dewan Penasihat PERLUNI UAJ",
      "Komunitas CEO Alumni Atma Jaya",
      "PERLUNI Golf Club",
      "Atma Jaya Women in Leadership",
    ],
  },
  2: {
    id: 2,
    full_name: "Budi Santoso",
    degree: "S.Kom.",
    member_id: "UAJ-2018-04821",
    grad_year: 2018,
    faculty: "Fakultas Teknik",
    major: "Teknik Informatika",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob",
    headline: "Senior Software Engineer (Cloud Architecture) at GoTo Financial",
    company: "GoTo Financial",
    location: "Jakarta Selatan, Indonesia",
    bio: "Pengembang perangkat lunak berpengalaman membangun sistem pembayaran terdistribusi berdaya tampung jutaan transaksi per detik. Terbuka untuk mentoring junior Teknik Informatika Atma Jaya.",
    membership_tier: "atma_key",
    open_for_mentoring: true,
    open_for_hiring: false,
    email: "budi.santoso@alumni.atmajaya.ac.id",
    linkedin: "https://linkedin.com/in/budi-santoso-sample",
    experiences: [
      {
        role: "Senior Software Engineer",
        company: "GoTo Financial",
        period: "2021 - Sekarang",
        description: "Merancang microservices payment gateway dengan Go, Kubernetes, Kafka, dan Cloudflare Workers.",
        is_current: true,
      },
      {
        role: "Backend Engineer",
        company: "Tokopedia",
        period: "2018 - 2021",
        description: "Mengoptimasi sistem checkout keranjang belanja dan kampanye promo Waktu Indonesia Belanja.",
      },
    ],
    educations: [
      {
        institution: "Universitas Katolik Indonesia Atma Jaya",
        degree: "Sarjana Komputer (S.Kom.)",
        field: "Teknik Informatika",
        period: "2014 - 2018",
        honors: "IPK 3.82 • Juara 1 Hackathon Mahasiswa UAJ",
      },
    ],
    skills: [
      { name: "Cloud Architecture (GCP/AWS)", endorsements: 42 },
      { name: "Golang & TypeScript", endorsements: 38 },
      { name: "Microservices & Distributed Systems", endorsements: 35 },
      { name: "Kafka & Redis", endorsements: 29 },
    ],
    communities: [
      "PERLUNI Tech & Innovators Network",
      "Komunitas Alumni Informatika Atma Jaya",
      "Atma Jaya Runners (ALRUN)",
    ],
  },
  3: {
    id: 3,
    full_name: "Carol Lim",
    degree: "S.H., LL.M.",
    member_id: "UAJ-1992-00941",
    grad_year: 1992,
    faculty: "Fakultas Hukum",
    major: "Hukum Perdata & Bisnis",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=carol",
    headline: "General Legal Counsel at Southeast Asia Banking Corp",
    company: "Southeast Asia Banking Corp",
    location: "Jakarta Pusat, Indonesia",
    bio: "Praktisi hukum perbankan dan arbitrase komersial dengan pengalaman menangani kepatuhan regulasi OJK & BI.",
    membership_tier: "free",
    open_for_mentoring: true,
    open_for_hiring: true,
    email: "carol.lim@alumni.atmajaya.ac.id",
    linkedin: "https://linkedin.com/in/carol-lim-sample",
    experiences: [
      {
        role: "Head of Legal & Compliance",
        company: "Southeast Asia Banking Corp",
        period: "2015 - Sekarang",
        description: "Memimpin divisi legal corporate untuk operasional pembiayaan sindikasi.",
        is_current: true,
      },
      {
        role: "Partner",
        company: "Lim & Rekan Law Firm",
        period: "2000 - 2015",
        description: "Litigasi dan konsultasi hukum merger akuisisi korporasi perbankan.",
      },
    ],
    educations: [
      {
        institution: "Universitas Katolik Indonesia Atma Jaya",
        degree: "Sarjana Hukum (S.H.)",
        field: "Hukum Perdata",
        period: "1988 - 1992",
      },
      {
        institution: "University of Melbourne",
        degree: "Master of Laws (LL.M.)",
        field: "Commercial Law",
        period: "1996 - 1997",
      },
    ],
    skills: [
      { name: "Banking Regulations & OJK", endorsements: 56 },
      { name: "Corporate Compliance", endorsements: 47 },
      { name: "Contract Negotiation", endorsements: 41 },
    ],
    communities: ["PERLUNI Lawyers Association", "Ikatan Alumni Fakultas Hukum Atma Jaya"],
  },
  4: {
    id: 4,
    full_name: "dr. David Chen",
    degree: "Sp.A, M.Kes",
    member_id: "UAJ-1995-00431",
    grad_year: 1995,
    faculty: "Fakultas Kedokteran dan Ilmu Kesehatan",
    major: "Pendidikan Dokter",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    headline: "Dokter Spesialis Anak & Konsultan Tumbuh Kembang RS Atma Jaya",
    company: "Rumah Sakit Atma Jaya",
    location: "Jakarta Utara, Indonesia",
    bio: "Dokter spesialis anak di Rumah Sakit Atma Jaya Pluit. Senantiasa aktif dalam misi kemanusiaan dan bakti sosial kesehatan PERLUNI.",
    membership_tier: "atma_key",
    open_for_mentoring: true,
    open_for_hiring: false,
    email: "david.chen@alumni.atmajaya.ac.id",
    linkedin: "https://linkedin.com/in/dr-david-chen-sample",
    experiences: [
      {
        role: "Dokter Spesialis Anak Konsultan",
        company: "Rumah Sakit Atma Jaya",
        period: "2004 - Sekarang",
        description: "Layanan medis anak intensif & pengajar klinis di FKIK Atma Jaya.",
        is_current: true,
      },
    ],
    educations: [
      {
        institution: "Universitas Katolik Indonesia Atma Jaya",
        degree: "Dokter Umum (dr.)",
        field: "Pendidikan Dokter",
        period: "1989 - 1995",
      },
      {
        institution: "Universitas Indonesia",
        degree: "Spesialis Anak (Sp.A)",
        field: "Ilmu Kesehatan Anak",
        period: "1999 - 2004",
      },
    ],
    skills: [
      { name: "Pediatric Intensive Care", endorsements: 71 },
      { name: "Clinical Teaching", endorsements: 53 },
      { name: "Public Health Advocacy", endorsements: 45 },
    ],
    communities: [
      "Ikatan Alumni FKIK Atma Jaya",
      "Tim Tanggap Medis Darurat PERLUNI Peduli",
    ],
  },
};

export function AlumniDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"about" | "experience" | "education">("about");
  const [copiedLink, setCopiedLink] = useState(false);

  // Retrieve selected profile or fallback to dynamic profile
  const alumniId = parseInt(id || "1", 10);
  const profile: AlumniProfile = ALUMNI_DATABASE[alumniId] || {
    id: alumniId,
    full_name: user?.full_name || "Alumni Unika Atma Jaya",
    degree: "S.T.",
    member_id: `UAJ-2020-0${alumniId}89`,
    grad_year: user?.grad_year || 2020,
    faculty: user?.faculty || "Fakultas Teknik",
    major: user?.major || "Teknik Elektro",
    avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=alumni-${alumniId}`,
    headline: "Professional Alumni & Industry Practitioner",
    company: "PT Inovasi Berdikari",
    location: "Jakarta, Indonesia",
    bio: "Alumni berdedikasi tinggi yang aktif berkontribusi bagi almamater dan kemajuan jejaring PERLUNI UAJ.",
    membership_tier: "atma_key",
    open_for_mentoring: true,
    open_for_hiring: true,
    email: "alumni@alumni.atmajaya.ac.id",
    linkedin: "https://linkedin.com",
    experiences: [
      {
        role: "Lead Specialist",
        company: "PT Inovasi Berdikari",
        period: "2021 - Sekarang",
        description: "Pengembangan proyek teknologi berkelanjutan.",
        is_current: true,
      },
    ],
    educations: [
      {
        institution: "Universitas Katolik Indonesia Atma Jaya",
        degree: "Sarjana Teknik (S.T.)",
        field: "Teknik Elektro",
        period: "2016 - 2020",
      },
    ],
    skills: [
      { name: "Project Leadership", endorsements: 22 },
      { name: "Engineering Design", endorsements: 19 },
    ],
    communities: ["PERLUNI Muda", "Atma Jaya Professional Network"],
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="pb-24 bg-gray-50 min-h-screen">
      {/* 1. White Header with Back Navigation */}
      <AppHeader
        title="Detail Profil Alumni"
        showBack={true}
        onBack={() => navigate("/alumni")}
        rightAction={
          <button
            onClick={handleShare}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full active:scale-95 transition-transform"
            title="Bagikan Profil"
          >
            {copiedLink ? (
              <span className="text-xs font-bold text-emerald-600">Disalin!</span>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            )}
          </button>
        }
      />

      <div className="p-4 space-y-4">
        {/* 2. Official Alumni ID Card Preview Component */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">KTA Digital Terverifikasi</span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              ✓ Anggota PERLUNI UAJ
            </span>
          </div>
          <AlumniIdCard
            name={profile.full_name}
            memberId={profile.member_id}
            faculty={profile.faculty}
            graduationYear={profile.grad_year}
            avatarUrl={profile.avatar_url}
            status="Aktif"
            validThru="Seumur Hidup"
          />
        </div>

        {/* 3. Hero Profile Information Card */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 border-2 border-emerald-100 shadow-sm flex-shrink-0">
              <img src={profile.avatar_url} alt={profile.full_name} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="text-lg font-bold text-gray-900 leading-tight">
                  {profile.full_name}
                </h2>
                {profile.degree && (
                  <span className="text-xs font-semibold text-gray-500">{profile.degree}</span>
                )}
              </div>

              <p className="text-xs font-semibold text-primary mt-1 leading-snug">
                {profile.headline}
              </p>

              <p className="text-[11px] text-gray-500 mt-1 flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {profile.location}
              </p>
            </div>
          </div>

          {/* Badges Bar */}
          <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-gray-100">
            {profile.membership_tier === "atma_key" && (
              <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-full">
                ★ ATMA KEY
              </span>
            )}
            {profile.open_for_mentoring && (
              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-full border border-emerald-200">
                🤝 Siap Mentoring
              </span>
            )}
            {profile.open_for_hiring && (
              <span className="px-2.5 py-0.5 bg-blue-50 text-blue-800 text-xs font-semibold rounded-full border border-blue-200">
                💼 Hiring / Rekrutmen
              </span>
            )}
            <span className="px-2.5 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
              {profile.major} '{String(profile.grad_year).slice(-2)}
            </span>
          </div>

          {/* Direct CTA Buttons */}
          <div className="grid grid-cols-2 gap-2.5 mt-4">
            <Link
              to={`/chat`}
              className="py-2.5 px-3 bg-primary hover:bg-primary/95 active:scale-98 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Kirim Pesan
            </Link>

            <a
              href={`mailto:${profile.email}`}
              className="py-2.5 px-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Alumni
            </a>
          </div>
        </div>

        {/* 4. Tab Navigation for Details */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
          <div className="flex border-b border-gray-100 bg-gray-50/50">
            <button
              onClick={() => setActiveTab("about")}
              className={`flex-1 py-3 text-xs font-bold border-b-2 transition-colors ${
                activeTab === "about" ? "border-primary text-primary bg-white" : "border-transparent text-gray-500"
              }`}
            >
              Tentang & Karir
            </button>
            <button
              onClick={() => setActiveTab("education")}
              className={`flex-1 py-3 text-xs font-bold border-b-2 transition-colors ${
                activeTab === "education" ? "border-primary text-primary bg-white" : "border-transparent text-gray-500"
              }`}
            >
              Pendidikan
            </button>
            <button
              onClick={() => setActiveTab("experience")}
              className={`flex-1 py-3 text-xs font-bold border-b-2 transition-colors ${
                activeTab === "experience" ? "border-primary text-primary bg-white" : "border-transparent text-gray-500"
              }`}
            >
              Keahlian
            </button>
          </div>

          <div className="p-5">
            {/* --- TAB 1: TENTANG & KARIR --- */}
            {activeTab === "about" && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Tentang Saya</h3>
                  <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                    {profile.bio}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
                    Riwayat Karir & Pengalaman
                  </h3>
                  <div className="space-y-4 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                    {profile.experiences.map((exp, idx) => (
                      <div key={idx} className="relative pl-6">
                        <div className="absolute left-0.5 top-1.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-primary flex items-center justify-center">
                          {exp.is_current && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                        </div>
                        <h4 className="text-xs font-bold text-gray-900 leading-tight">{exp.role}</h4>
                        <span className="text-[11px] font-semibold text-primary block mt-0.5">{exp.company}</span>
                        <time className="text-[10px] text-gray-400 block">{exp.period}</time>
                        <p className="text-xs text-gray-600 mt-1">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Communities */}
                <div>
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Komunitas Alumni</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.communities.map((c, i) => (
                      <span key={i} className="px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-medium border border-emerald-100">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* --- TAB 2: PENDIDIKAN --- */}
            {activeTab === "education" && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Riwayat Akademik</h3>
                <div className="space-y-3">
                  {profile.educations.map((edu, idx) => (
                    <div key={idx} className="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="flex items-start gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs flex-shrink-0">
                          🎓
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-gray-900">{edu.institution}</h4>
                          <p className="text-xs font-semibold text-emerald-800 mt-0.5">
                            {edu.degree} — {edu.field}
                          </p>
                          <span className="text-[10px] text-gray-400 block mt-0.5">{edu.period}</span>
                          {edu.honors && (
                            <span className="inline-block mt-1.5 px-2 py-0.5 bg-white text-gray-700 text-[10px] font-medium rounded border border-gray-200">
                              🏆 {edu.honors}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* --- TAB 3: KEAHLIAN --- */}
            {activeTab === "experience" && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
                  Keahlian & Endorsements
                </h3>
                <p className="text-[11px] text-gray-500 mb-3">
                  Keahlian profesional yang telah divalidasi oleh rekan alumni dan industri:
                </p>
                <div className="space-y-2">
                  {profile.skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 bg-gray-50 hover:bg-gray-100/80 rounded-xl border border-gray-100 transition-colors"
                    >
                      <span className="text-xs font-bold text-gray-800">{skill.name}</span>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        +{skill.endorsements} endorse
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
