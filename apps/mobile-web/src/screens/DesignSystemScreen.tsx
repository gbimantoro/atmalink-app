import React, { useState } from "react";
import {
  AtmaLinkLogo,
  AlumniIdCard,
  AtmaButton,
  AtmaBadge,
  EventCard,
  JobCard,
  PromoCard,
  BottomNavigation,
  TabId,
} from "@atmajaya/ui-core";

export function DesignSystemScreen() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [activeScreenTab, setActiveScreenTab] = useState<"welcome" | "home" | "profile" | "jobs" | "promo">("home");

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(label);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] text-[#0F172A] pb-32">
      {/* Top Banner / Hero Header */}
      <header className="bg-gradient-to-r from-[#006837] via-[#007A3D] to-[#005A2C] text-white px-6 py-12 relative overflow-hidden shadow-lg">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-6 w-96 h-96 opacity-10 pointer-events-none">
          <AtmaLinkLogo variant="mark" size="100%" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-semibold tracking-wider text-emerald-200 uppercase mb-4">
            Official PERLUNI UAJ Design System
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                ATMALINK <span className="text-[#FF9D73]">Design System</span>
              </h1>
              <p className="mt-2 text-base md:text-lg text-emerald-100 font-medium max-w-xl">
                Menjalin Akar, Membangun Karya Global. A unified, accessible mobile-first design language for Universitas Katolik Indonesia Atma Jaya Alumni platform.
              </p>
            </div>
            <div className="flex-shrink-0 bg-white p-4 rounded-2xl shadow-xl flex items-center justify-center">
              <AtmaLinkLogo variant="vertical" size={140} showTagline={false} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-6 pt-10 space-y-16">
        {/* =========================================================================
            SECTION 1: LOGO SUITE & BRAND MARKS (SVG)
            ========================================================================= */}
        <section id="logos" className="scroll-mt-6">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-neutral-200">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">1. ATMALINK Logo Suite (SVG)</h2>
              <p className="text-sm text-neutral-500">Vector-crisp SVG assets optimized for mobile app icons, headers, splash screens, and print.</p>
            </div>
            <a
              href="/atmalink-logo-horizontal.svg"
              download
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 inline-flex items-center gap-1"
            >
              Download SVGs ↓
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Primary Horizontal Logo */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-neutral-400 tracking-wider">Primary Horizontal Lockup</span>
                <div className="py-6 flex items-center justify-center min-h-[120px]">
                  <AtmaLinkLogo variant="horizontal" size={240} />
                </div>
              </div>
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                <span>Usage: App Bar, Web Nav, Letterhead</span>
                <button
                  onClick={() => copyToClipboard('<AtmaLinkLogo variant="horizontal" />', 'hlogo')}
                  className="font-medium text-emerald-600 hover:underline"
                >
                  {copiedToken === 'hlogo' ? 'Copied!' : 'Copy JSX'}
                </button>
              </div>
            </div>

            {/* Stacked Vertical Logo */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-neutral-400 tracking-wider">Vertical / Stacked Lockup</span>
                <div className="py-4 flex items-center justify-center min-h-[120px]">
                  <AtmaLinkLogo variant="vertical" size={150} />
                </div>
              </div>
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                <span>Usage: Splash screen, Welcome modal, Proposal cover</span>
                <button
                  onClick={() => copyToClipboard('<AtmaLinkLogo variant="vertical" />', 'vlogo')}
                  className="font-medium text-emerald-600 hover:underline"
                >
                  {copiedToken === 'vlogo' ? 'Copied!' : 'Copy JSX'}
                </button>
              </div>
            </div>

            {/* Inverted White on Forest Green Backdrop */}
            <div className="bg-gradient-to-br from-[#006837] to-[#004D28] text-white rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-emerald-200 tracking-wider">Inverted (Dark / Green Hero)</span>
                <div className="py-6 flex items-center justify-center min-h-[120px]">
                  <AtmaLinkLogo variant="white" size={240} />
                </div>
              </div>
              <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs text-emerald-100">
                <span>Usage: Dark Mode, Hero App Bar, Campaign Banners</span>
                <button
                  onClick={() => copyToClipboard('<AtmaLinkLogo variant="white" />', 'wlogo')}
                  className="font-medium text-white hover:underline"
                >
                  {copiedToken === 'wlogo' ? 'Copied!' : 'Copy JSX'}
                </button>
              </div>
            </div>

            {/* App Icon Mark (Squircle & Glyph) */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-neutral-400 tracking-wider">App Icon & Mark Emblem</span>
                <div className="py-6 flex items-center justify-center gap-8 min-h-[120px]">
                  <div className="text-center">
                    <AtmaLinkLogo variant="icon" size={68} />
                    <span className="text-[10px] block mt-2 text-neutral-500 font-medium">iOS / Android 512px</span>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shadow-xs">
                      <AtmaLinkLogo variant="mark" size={44} />
                    </div>
                    <span className="text-[10px] block mt-2 text-neutral-500 font-medium">Favicon / Avatar</span>
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                <span>Usage: Mobile App Launcher, Favicon, Watermarks</span>
                <button
                  onClick={() => copyToClipboard('<AtmaLinkLogo variant="icon" />', 'iconlogo')}
                  className="font-medium text-emerald-600 hover:underline"
                >
                  {copiedToken === 'iconlogo' ? 'Copied!' : 'Copy JSX'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: COLOR SYSTEM & ACCESSIBILITY TOKENS
            ========================================================================= */}
        <section id="colors" className="scroll-mt-6">
          <div className="mb-6 pb-3 border-b border-neutral-200">
            <h2 className="text-2xl font-bold text-neutral-900">2. Color System & Accessibility</h2>
            <p className="text-sm text-neutral-500">Institutional Atma Jaya Forest Green harmonized with PERLUNI Tangerine Orange. Tested for WCAG 2.1 AA/AAA contrast.</p>
          </div>

          <div className="space-y-6">
            {/* Atma Green Palette */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800 mb-3 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#006837]"></span>
                Primary Brand: Atma Forest & Action Green
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {[
                  { name: "Green 50", hex: "#ECFDF5", text: "#065F46", desc: "Surface Tint" },
                  { name: "Green 100", hex: "#D1FAE5", text: "#065F46", desc: "Badge Bg" },
                  { name: "Green 500", hex: "#00A859", text: "#FFFFFF", desc: "Action CTA ★" },
                  { name: "Green 600", hex: "#059669", text: "#FFFFFF", desc: "Hover State" },
                  { name: "Green 700", hex: "#006837", text: "#FFFFFF", desc: "Brand Base ★" },
                  { name: "Green 900", hex: "#064E3B", text: "#FFFFFF", desc: "Deep Header" },
                ].map((c) => (
                  <div
                    key={c.hex}
                    onClick={() => copyToClipboard(c.hex, c.name)}
                    className="p-3 rounded-xl border border-neutral-200 shadow-2xs cursor-pointer hover:scale-102 transition"
                    style={{ backgroundColor: c.hex, color: c.text }}
                  >
                    <span className="text-xs font-bold block">{c.name}</span>
                    <span className="font-mono text-[11px] block mt-1">{c.hex}</span>
                    <span className="text-[10px] opacity-85 block mt-2 font-medium">{c.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* PERLUNI Orange Palette */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-orange-700 mb-3 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#F15A24]"></span>
                Secondary Brand: PERLUNI Warm Orange
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {[
                  { name: "Orange 50", hex: "#FFF7ED", text: "#9A3412", desc: "Card Tint" },
                  { name: "Orange 100", hex: "#FFEDD5", text: "#9A3412", desc: "Highlight" },
                  { name: "Orange 400", hex: "#FB923C", text: "#FFFFFF", desc: "Gradient" },
                  { name: "Orange 500", hex: "#F15A24", text: "#FFFFFF", desc: "Accent Base ★" },
                  { name: "Orange 600", hex: "#EA580C", text: "#FFFFFF", desc: "Action Press" },
                  { name: "Orange 800", hex: "#9A3412", text: "#FFFFFF", desc: "Dark Text" },
                ].map((c) => (
                  <div
                    key={c.hex}
                    onClick={() => copyToClipboard(c.hex, c.name)}
                    className="p-3 rounded-xl border border-neutral-200 shadow-2xs cursor-pointer hover:scale-102 transition"
                    style={{ backgroundColor: c.hex, color: c.text }}
                  >
                    <span className="text-xs font-bold block">{c.name}</span>
                    <span className="font-mono text-[11px] block mt-1">{c.hex}</span>
                    <span className="text-[10px] opacity-85 block mt-2 font-medium">{c.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Semantic & Functional Palette */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-600 mb-3">
                Functional & Semantic Colors
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-emerald-500 text-white shadow-2xs">
                  <span className="text-xs font-bold block">Success / Verified</span>
                  <span className="font-mono text-[11px]">#10B981</span>
                </div>
                <div className="p-3 rounded-xl bg-amber-500 text-white shadow-2xs">
                  <span className="text-xs font-bold block">Featured / Promo</span>
                  <span className="font-mono text-[11px]">#F59E0B</span>
                </div>
                <div className="p-3 rounded-xl bg-blue-600 text-white shadow-2xs">
                  <span className="text-xs font-bold block">Info / University</span>
                  <span className="font-mono text-[11px]">#2563EB</span>
                </div>
                <div className="p-3 rounded-xl bg-rose-600 text-white shadow-2xs">
                  <span className="text-xs font-bold block">Danger / Alert</span>
                  <span className="font-mono text-[11px]">#EF4444</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: TYPOGRAPHY & SPACING TOKENS
            ========================================================================= */}
        <section id="typography" className="scroll-mt-6">
          <div className="mb-6 pb-3 border-b border-neutral-200">
            <h2 className="text-2xl font-bold text-neutral-900">3. Typography & Spacing Scale</h2>
            <p className="text-sm text-neutral-500">Geometric Sans (Plus Jakarta Sans / Inter) tailored for crisp rendering on mobile OLED/Retina screens.</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm space-y-6">
            <div className="flex items-baseline justify-between border-b border-neutral-100 pb-4">
              <div>
                <span className="text-[11px] font-mono text-neutral-400 block">Display / 32px • 800 ExtraBold</span>
                <span className="text-3xl font-extrabold text-neutral-900">Platform Alumni Atma Jaya</span>
              </div>
              <span className="text-xs text-neutral-500 font-mono">2.0rem / 32px</span>
            </div>

            <div className="flex items-baseline justify-between border-b border-neutral-100 pb-4">
              <div>
                <span className="text-[11px] font-mono text-neutral-400 block">H1 Heading / 24px • 700 Bold</span>
                <span className="text-2xl font-bold text-neutral-900">Menjalin Akar, Membangun Karya</span>
              </div>
              <span className="text-xs text-neutral-500 font-mono">1.5rem / 24px</span>
            </div>

            <div className="flex items-baseline justify-between border-b border-neutral-100 pb-4">
              <div>
                <span className="text-[11px] font-mono text-neutral-400 block">H2 Section Title / 20px • 700 Bold</span>
                <span className="text-xl font-bold text-neutral-900">Berita & Artikel PERLUNI</span>
              </div>
              <span className="text-xs text-neutral-500 font-mono">1.25rem / 20px</span>
            </div>

            <div className="flex items-baseline justify-between border-b border-neutral-100 pb-4">
              <div>
                <span className="text-[11px] font-mono text-neutral-400 block">Body Large / 16px • 400 Regular</span>
                <p className="text-base text-neutral-700 max-w-xl">
                  Universitas Katolik Indonesia Atma Jaya telah menghasilkan lebih dari 65.000 alumni sejak 1960.
                </p>
              </div>
              <span className="text-xs text-neutral-500 font-mono">1.0rem / 16px</span>
            </div>

            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[11px] font-mono text-neutral-400 block">Caption & Overline / 11px • 600 SemiBold</span>
                <span className="text-[11px] font-semibold tracking-wider uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  VERIFIED ALUMNUS • FAKULTAS TEKNIK
                </span>
              </div>
              <span className="text-xs text-neutral-500 font-mono">0.6875rem / 11px</span>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: CORE COMPONENT LIBRARY
            ========================================================================= */}
        <section id="components" className="scroll-mt-6">
          <div className="mb-6 pb-3 border-b border-neutral-200">
            <h2 className="text-2xl font-bold text-neutral-900">4. Component Library (Mobile App & Web)</h2>
            <p className="text-sm text-neutral-500">Atomic and composite components built strictly according to the proposal UI specifications.</p>
          </div>

          <div className="space-y-8">
            {/* Component 1: Digital Alumni ID Card */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-neutral-900">Digital Alumni ID Card (Kartu Alumni Digital)</h3>
                <span className="text-xs text-neutral-500 font-mono">&lt;AlumniIdCard /&gt;</span>
              </div>
              <p className="text-sm text-neutral-500 mb-6">
                Dual-tone mesh card with official Atma Jaya watermark, live status badge, and barcode toggle.
              </p>

              <div className="max-w-md mx-auto">
                <AlumniIdCard
                  name="Ivor Pasaribu"
                  memberId="0000 0000 0000 0000"
                  faculty="Fakultas Ekonomi & Bisnis"
                  graduationYear="2012"
                  status="Aktif"
                  validThru="Seumur Hidup"
                  onShowBarcode={() => alert("Menampilkan Barcode Alumni ID")}
                />
              </div>
            </div>

            {/* Component 2: Action Buttons */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-neutral-900">Buttons & Touch Targets</h3>
                <span className="text-xs text-neutral-500 font-mono">&lt;AtmaButton /&gt;</span>
              </div>
              <p className="text-sm text-neutral-500 mb-6">
                Touch targets strictly follow ≥48px height for mobile accessibility.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-neutral-500 block">Primary Green ("Daftar")</span>
                  <AtmaButton variant="primary" fullWidth>Daftar</AtmaButton>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-neutral-500 block">Secondary White ("Masuk")</span>
                  <AtmaButton variant="secondary" fullWidth>Masuk</AtmaButton>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-neutral-500 block">Accent Orange ("Reservasi")</span>
                  <AtmaButton variant="accent" fullWidth>Reservasi Now</AtmaButton>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-neutral-500 block">Outline Action</span>
                  <AtmaButton variant="outline-green" fullWidth>Lihat Detail</AtmaButton>
                </div>
              </div>
            </div>

            {/* Component 3: Badges & Status Pills */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm">
              <h3 className="font-bold text-lg text-neutral-900 mb-2">Badges & Status Indicators</h3>
              <p className="text-sm text-neutral-500 mb-6">Used across profile verification, event tags, job types, and discounts.</p>

              <div className="flex flex-wrap gap-3 items-center">
                <AtmaBadge variant="active">● Aktif</AtmaBadge>
                <AtmaBadge variant="verified">✓ Verified Alumnus</AtmaBadge>
                <AtmaBadge variant="featured">★ Featured Job</AtmaBadge>
                <AtmaBadge variant="promo">Diskon 25%</AtmaBadge>
                <AtmaBadge variant="neutral">Full-time</AtmaBadge>
                <AtmaBadge variant="outline">Remote</AtmaBadge>
                <AtmaBadge variant="neutral">Informatika '18</AtmaBadge>
              </div>
            </div>

            {/* Component 4: Event Cards */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm">
              <h3 className="font-bold text-lg text-neutral-900 mb-2">Event Cards (Kalender PERLUNI)</h3>
              <p className="text-sm text-neutral-500 mb-4">Features prominent date blocks and one-touch reservation.</p>

              <div className="max-w-md mx-auto space-y-3">
                <EventCard
                  day="12"
                  month="OKT"
                  title="Perluni UAJ Padel Club Vol.3"
                  location="Emporium Padel Arena, Jakarta"
                  actionText="Reservasi Now"
                  onAction={() => alert("Reservasi Padel Club")}
                />
                <EventCard
                  day="18"
                  month="NOV"
                  title="Jakarta Networking Night 2026"
                  location="The Ritz-Carlton Mega Kuningan"
                  actionText="Remind Me"
                  onAction={() => alert("Pengingat disimpan")}
                />
              </div>
            </div>

            {/* Component 5: Job Vacancy Cards */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm">
              <h3 className="font-bold text-lg text-neutral-900 mb-2">Job Vacancy Cards (Bursa Karir Alumni)</h3>
              <p className="text-sm text-neutral-500 mb-4">Allows verified alumni and sponsors to post career openings.</p>

              <div className="max-w-md mx-auto space-y-3">
                <JobCard
                  title="Senior Software Engineer"
                  company="TechCorp Indonesia"
                  location="Jakarta"
                  isRemote={true}
                  type="Full-time"
                  featured={true}
                  tags={["React", "Node.js", "Cloud"]}
                  onApply={() => alert("Apply clicked")}
                />
                <JobCard
                  title="Product Marketing Manager"
                  company="Global FMCG Group"
                  location="Sudirman, Jakarta"
                  isRemote={false}
                  type="Full-time"
                  tags={["Marketing", "Brand"]}
                  onApply={() => alert("Apply clicked")}
                />
              </div>
            </div>

            {/* Component 6: Promotion / Sponsorship Cards */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm">
              <h3 className="font-bold text-lg text-neutral-900 mb-2">Promosi & Sponsorship Directory</h3>
              <p className="text-sm text-neutral-500 mb-4">Promotes alumni-owned businesses and corporate partners directly to 65,000+ alumni.</p>

              <div className="max-w-md mx-auto space-y-3">
                <PromoCard
                  discount="25%"
                  partnerName="Klinik Medika Alumni"
                  title="Promo Medical Check-Up Khusus Alumni"
                  description="Nikmati potongan harga hingga 25% untuk seluruh paket pemeriksaan kesehatan berkala."
                  onClaim={() => alert("Promo diklaim")}
                />
                <PromoCard
                  discount="3%"
                  partnerName="Garuda Indonesia Travel"
                  title="Terbang Hemat dengan Diskon Alumni"
                  description="Dapatkan potongan harga tiket penerbangan domestik dan internasional."
                  onClaim={() => alert("Promo diklaim")}
                />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: INTERACTIVE MOBILE SCREEN PREVIEW
            ========================================================================= */}
        <section id="mockup" className="scroll-mt-6">
          <div className="mb-6 pb-3 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">5. Interactive Mobile App Mockup</h2>
              <p className="text-sm text-neutral-500">Live preview of key screens matching the proposal layout.</p>
            </div>

            {/* Screen selector pills */}
            <div className="inline-flex rounded-xl bg-neutral-200/80 p-1">
              {(["welcome", "home", "profile", "jobs", "promo"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveScreenTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition ${
                    activeScreenTab === tab
                      ? "bg-white text-emerald-800 shadow-xs"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Centered Phone Canvas Simulation */}
          <div className="flex justify-center py-6">
            <div className="w-full max-w-[390px] h-[780px] bg-white rounded-[44px] shadow-2xl border-[8px] border-neutral-900 overflow-hidden flex flex-col relative">
              {/* Dynamic Island / Camera Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-neutral-900 rounded-full z-50 flex items-center justify-end px-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1c1c1e] border border-neutral-700"></div>
              </div>

              {/* Status Bar */}
              <div className="h-10 bg-transparent flex items-center justify-between px-6 text-xs font-semibold text-neutral-800 z-40 pt-1">
                <span>9:41</span>
                <div className="flex items-center gap-1.5 text-xs">
                  <span>5G</span>
                  <div className="w-4 h-2.5 border border-neutral-800 rounded-xs p-0.5 flex items-center">
                    <div className="w-full h-full bg-neutral-800 rounded-2xs"></div>
                  </div>
                </div>
              </div>

              {/* Screen Body Content */}
              <div className="flex-1 overflow-y-auto">
                {/* SCREEN A: WELCOME / AUTH */}
                {activeScreenTab === "welcome" && (
                  <div
                    className="h-full flex flex-col justify-between p-6 text-center"
                    style={{
                      background: "linear-gradient(180deg, #FFF9F5 0%, #FFF3EC 40%, #E8F5E9 100%)",
                    }}
                  >
                    <div className="pt-16">
                      <AtmaLinkLogo variant="vertical" size={130} />
                    </div>

                    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-card-elevated border border-emerald-50">
                      <h2 className="text-xl font-bold text-neutral-900">Selamat Datang</h2>
                      <p className="text-xs text-neutral-500 mt-2">
                        Silahkan pilih akses masuk aplikasi Alumni Unika Atma Jaya Jakarta
                      </p>
                      <div className="mt-6 space-y-3">
                        <AtmaButton variant="primary" fullWidth>
                          Daftar
                        </AtmaButton>
                        <AtmaButton variant="secondary" fullWidth>
                          Masuk
                        </AtmaButton>
                      </div>
                    </div>

                    <p className="text-[11px] text-neutral-500 font-medium">
                      Platform Resmi Perkumpulan Alumni Unika Atma Jaya (PERLUNI)
                    </p>
                  </div>
                )}

                {/* SCREEN B: HOME / BERANDA */}
                {activeScreenTab === "home" && (
                  <div className="pb-24">
                    {/* Header bar with AtmaLink Logo & Notification Bell */}
                    <div className="px-5 py-3 flex items-center justify-between bg-white border-b border-neutral-100 sticky top-0 z-30">
                      <AtmaLinkLogo variant="horizontal" size={120} showTagline={false} />
                      <button className="relative p-2 text-neutral-700 hover:text-emerald-700">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F15A24]"></span>
                      </button>
                    </div>

                    {/* Alumni Digital Card Section */}
                    <div className="p-4">
                      <AlumniIdCard
                        name="Ivor Pasaribu"
                        memberId="0000 0000 0000 0000"
                        faculty="Fakultas Ekonomi"
                        graduationYear="2012"
                      />
                    </div>

                    {/* Artikel Terbaru Carousel */}
                    <div className="px-4 mt-2">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-sm text-neutral-900">Artikel Terbaru</h3>
                        <span className="text-xs text-emerald-700 font-semibold cursor-pointer">Lihat Semua &gt;</span>
                      </div>
                      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                        <div className="w-44 flex-shrink-0 bg-neutral-100 rounded-xl overflow-hidden shadow-2xs">
                          <div className="h-24 bg-emerald-800 flex items-center justify-center text-white text-xs font-bold p-2 text-center">
                            ADCOx PERLUNI Padel Club
                          </div>
                          <div className="p-2">
                            <span className="text-[10px] text-[#F15A24] font-bold">KOMUNITAS</span>
                            <h4 className="text-xs font-bold text-neutral-800 line-clamp-2">Keseruan Perluni UAJ Padel Club Vol. 1</h4>
                          </div>
                        </div>
                        <div className="w-44 flex-shrink-0 bg-neutral-100 rounded-xl overflow-hidden shadow-2xs">
                          <div className="h-24 bg-orange-700 flex items-center justify-center text-white text-xs font-bold p-2 text-center">
                            RAKER NASIONAL UAJ 2026
                          </div>
                          <div className="p-2">
                            <span className="text-[10px] text-emerald-700 font-bold">ORGANISASI</span>
                            <h4 className="text-xs font-bold text-neutral-800 line-clamp-2">Arah Kerja & Dampak Nyata Alumni</h4>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* List Event Section */}
                    <div className="px-4 mt-5 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-sm text-neutral-900">List Event</h3>
                        <span className="text-xs text-emerald-700 font-semibold">Kalender</span>
                      </div>
                      <EventCard
                        day="12"
                        month="OKT"
                        title="Perluni UAJ Padel Club Vol.3"
                        location="Emporium Padel Arena"
                        actionText="Reservasi Now"
                      />
                      <EventCard
                        day="18"
                        month="NOV"
                        title="Jakarta Networking Night"
                        location="The Ritz-Carlton Mega Kuningan"
                        actionText="Remind Me"
                      />
                    </div>
                  </div>
                )}

                {/* SCREEN C: PROFILE (LINKEDIN-STYLE) */}
                {activeScreenTab === "profile" && (
                  <div className="pb-24">
                    <div className="bg-gradient-to-r from-emerald-800 to-teal-900 h-24 relative">
                      <div className="absolute -bottom-8 left-4">
                        <div className="w-18 h-18 rounded-full border-4 border-white bg-neutral-200 overflow-hidden shadow-md flex items-center justify-center text-2xl font-bold text-emerald-800">
                          BS
                        </div>
                      </div>
                    </div>
                    <div className="pt-10 px-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-base text-neutral-900">Budi Santoso</h3>
                          <p className="text-xs text-neutral-600">Software Engineer at TechCorp</p>
                          <span className="text-[11px] text-neutral-500">Class of 2018 • Informatika Engineering</span>
                        </div>
                        <AtmaBadge variant="verified">✓ Verified</AtmaBadge>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <AtmaButton variant="primary" size="sm" className="flex-1">Connect</AtmaButton>
                        <AtmaButton variant="secondary" size="sm" className="flex-1">Message</AtmaButton>
                      </div>

                      {/* Verified Data Details */}
                      <div className="mt-5 p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
                        <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">Verifikasi Kampus</span>
                        <p className="text-xs font-medium text-emerald-900 mt-1">NIM: 20140101002 • Lulus 2018</p>
                        <p className="text-[11px] text-emerald-700">Official Atma Jaya Catholic University Graduate</p>
                      </div>

                      {/* Experience */}
                      <div className="mt-5">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-400 mb-2">Experience</h4>
                        <div className="bg-white p-3 rounded-xl border border-neutral-200 shadow-2xs space-y-1">
                          <h5 className="font-bold text-xs text-neutral-900">Senior Software Engineer</h5>
                          <p className="text-[11px] text-neutral-500">TechCorp • Full-time • 2021 - Present</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SCREEN D: JOB VACANCY */}
                {activeScreenTab === "jobs" && (
                  <div className="pb-24 px-4 pt-3">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-base text-neutral-900">Job Vacancies</h3>
                      <button className="text-xs font-bold text-white bg-[#F15A24] px-3 py-1 rounded-full shadow-xs">
                        + Create Post
                      </button>
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2 text-xs">
                      <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-bold">All Jobs</span>
                      <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 font-medium">Full-time</span>
                      <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 font-medium">Remote</span>
                      <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 font-medium">Tech</span>
                    </div>

                    <div className="space-y-3 mt-3">
                      <JobCard
                        title="Senior Software Engineer"
                        company="Atma Jaya IT Center"
                        location="Jakarta"
                        isRemote={true}
                        featured={true}
                        tags={["Full-time", "Tech"]}
                      />
                      <JobCard
                        title="Product Marketing Manager"
                        company="Fintech Nusantara"
                        location="SCBD, Jakarta"
                        tags={["Finance", "Creative"]}
                      />
                      <JobCard
                        title="Financial Analyst"
                        company="Bank Mandiri Group"
                        location="Jakarta"
                        tags={["Banking", "Alumni Referral"]}
                      />
                    </div>
                  </div>
                )}

                {/* SCREEN E: PROMO & SPONSORSHIP */}
                {activeScreenTab === "promo" && (
                  <div className="pb-24 px-4 pt-3">
                    <div className="rounded-2xl p-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md mb-4">
                      <span className="text-[10px] font-bold tracking-wider uppercase opacity-90">Khusus Alumni Atma Jaya</span>
                      <h3 className="text-lg font-black mt-0.5">Cashback hingga Rp 500ribu</h3>
                      <p className="text-xs opacity-90 mt-1">Dukungan dari mitra korporat & sponsor PERLUNI</p>
                    </div>

                    <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-400 mb-2">Rekomendasi dan Promo</h4>
                    <div className="space-y-3">
                      <PromoCard
                        discount="25%"
                        partnerName="Helix Laboratory"
                        title="Promo Menarik Khusus untuk Alumni"
                        description="Nikmati promo diskon hingga 25% untuk layanan Medical Checkup."
                      />
                      <PromoCard
                        discount="3%"
                        partnerName="Tiket.com Partner"
                        title="Terbang Hemat dengan Promo"
                        description="Dapatkan potongan harga tiket hingga 3% untuk setiap penerbangan."
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Nav inside Phone Frame */}
              <div className="absolute bottom-0 left-0 right-0">
                <BottomNavigation
                  activeTab={activeTab}
                  onTabChange={(id) => setActiveTab(id)}
                  className="static max-w-full rounded-b-[36px]"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
