import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { campaignsApi, donationsApi } from "../api/client";
import { AppHeader } from "../components/AppHeader";
import { AtmaLinkLogo } from "@atmajaya/ui-core";

interface Campaign {
  id: number;
  title: string;
  description?: string;
  target_amount: number;
  collected_amount: number;
  banner_url?: string;
  category?: string;
  donor_count?: number;
  days_left?: number;
}

interface DonationRecord {
  id: string | number;
  campaign_title: string;
  amount: number;
  donor_name: string;
  created_at: string;
  payment_method: string;
  invoice_id: string;
  status: "LUNAS" | "PENDING";
}

const PRESET_AMOUNTS = [25000, 50000, 100000, 250000, 500000, 1000000, 2500000];

const SAMPLE_CAMPAIGNS: Campaign[] = [
  {
    id: 1,
    title: "Dana Beasiswa Mahasiswa Berprestasi & Prasejahtera 2026",
    description: "Bantuan biaya pendidikan semester & tunjangan buku untuk 100+ mahasiswa aktif Unika Atma Jaya dari keluarga prasejahtera.",
    target_amount: 500000000,
    collected_amount: 385500000,
    banner_url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    category: "Beasiswa",
    donor_count: 1248,
    days_left: 42,
  },
  {
    id: 2,
    title: "Dana Abadi (Endowment Fund) Atma Jaya untuk Riset & AI",
    description: "Pengembangan pusat riset kecerdasan buatan, bio-teknologi, dan penguatan akreditasi internasional almamater tercinta.",
    target_amount: 1000000000,
    collected_amount: 742000000,
    banner_url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80",
    category: "Riset & Kampus",
    donor_count: 2190,
    days_left: 120,
  },
  {
    id: 3,
    title: "Solidaritas Alumni: Bantuan Tanggap Bencana & Kesehatan Darurat",
    description: "Dana darurat PERLUNI Peduli untuk santunan alumni/keluarga yang tertimpa musibah medis kritis serta aksi tanggap bencana alam.",
    target_amount: 200000000,
    collected_amount: 168000000,
    banner_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    category: "Sosial & Medis",
    donor_count: 892,
    days_left: 18,
  },
  {
    id: 4,
    title: "Revitalisasi Fasilitas Laboratorium Kampus Semanggi & BSD",
    description: "Modernisasi perangkat workshop rekayasa teknik, studio simulasi peradilan hukum, dan inkubator startup mahasiswa.",
    target_amount: 750000000,
    collected_amount: 425000000,
    banner_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    category: "Infrastruktur",
    donor_count: 645,
    days_left: 65,
  },
];

export function DonateScreen() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"campaigns" | "history">("campaigns");
  const [campaigns, setCampaigns] = useState<Campaign[]>(SAMPLE_CAMPAIGNS);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  // Donation Checkout Form States
  const [step, setStep] = useState<"amount" | "payment" | "success">("amount");
  const [amount, setAmount] = useState<number>(100000);
  const [customAmountStr, setCustomAmountStr] = useState<string>("");
  const [donorName, setDonorName] = useState(user?.full_name || "");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [donorEmail, setDonorEmail] = useState(user?.email || "");
  const [donorPhone, setDonorPhone] = useState(user?.phone || "");
  const [donorPrayer, setDonorPrayer] = useState("");

  // Payment Method Selection
  const [paymentMethod, setPaymentMethod] = useState<"qris" | "va" | "card">("qris");
  const [selectedBank, setSelectedBank] = useState<"BCA" | "Mandiri" | "BNI" | "BRI" | "Permata">("BCA");
  const [copiedVA, setCopiedVA] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [countdown, setCountdown] = useState(899); // 14:59

  // Card Inputs
  const [cardNumber, setCardNumber] = useState("4111 2222 3333 4444");
  const [cardHolder, setCardHolder] = useState(user?.full_name || "ALUMNI ATMA JAYA");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvv, setCardCvv] = useState("888");
  const [show3DSModal, setShow3DSModal] = useState(false);
  const [otpCode, setOtpCode] = useState("123456");

  // Completed Receipt Data
  const [lastReceipt, setLastReceipt] = useState<DonationRecord | null>(null);
  const [donationHistory, setDonationHistory] = useState<DonationRecord[]>([
    {
      id: "REC-101",
      campaign_title: "Dana Beasiswa Mahasiswa Berprestasi & Prasejahtera 2026",
      amount: 250000,
      donor_name: user?.full_name || "Budi Santoso",
      created_at: "2026-09-10 14:32",
      payment_method: "QRIS (GoPay)",
      invoice_id: "XND-UAJ-20260910-8491",
      status: "LUNAS",
    },
    {
      id: "REC-102",
      campaign_title: "Dana Abadi (Endowment Fund) Atma Jaya untuk Riset & AI",
      amount: 500000,
      donor_name: user?.full_name || "Budi Santoso",
      created_at: "2026-08-25 09:15",
      payment_method: "BCA Virtual Account",
      invoice_id: "XND-UAJ-20260825-3912",
      status: "LUNAS",
    },
  ]);

  // Sync API campaigns if available
  useEffect(() => {
    campaignsApi.list().then((res) => {
      if (res.data && res.data.length > 0) {
        // Merge API data with enhanced presentation fields
        const merged = res.data.map((c: any, i: number) => ({
          ...SAMPLE_CAMPAIGNS[i % SAMPLE_CAMPAIGNS.length],
          id: c.id,
          title: c.title || SAMPLE_CAMPAIGNS[i % SAMPLE_CAMPAIGNS.length].title,
          target_amount: c.target_amount || SAMPLE_CAMPAIGNS[i % SAMPLE_CAMPAIGNS.length].target_amount,
          collected_amount: c.collected_amount || SAMPLE_CAMPAIGNS[i % SAMPLE_CAMPAIGNS.length].collected_amount,
        }));
        setCampaigns(merged);
      }
    }).catch(() => {});
  }, []);

  // Timer countdown for QRIS simulation
  useEffect(() => {
    if (selectedCampaign && paymentMethod === "qris" && step === "payment") {
      const timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [selectedCampaign, paymentMethod, step]);

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const handleOpenDonateModal = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setStep("amount");
    setAmount(100000);
    setCustomAmountStr("");
    setDonorName(user?.full_name || "");
    setDonorEmail(user?.email || "");
    setDonorPhone(user?.phone || "081289123456");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    setCustomAmountStr(raw);
    const parsed = parseInt(raw, 10);
    if (!isNaN(parsed)) {
      setAmount(parsed);
    }
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount < 10000) {
      alert("Minimal nominal donasi adalah Rp 10.000");
      return;
    }
    if (!isAnonymous && !donorName.trim()) {
      alert("Silakan masukkan nama donatur atau pilih donasi anonim");
      return;
    }
    setStep("payment");
  };

  const handleCopyVA = (vaNum: string) => {
    navigator.clipboard?.writeText(vaNum);
    setCopiedVA(true);
    setTimeout(() => setCopiedVA(false), 2000);
  };

  const executeSuccessfulDonation = async (methodLabel: string) => {
    setIsProcessing(true);
    try {
      // Create record in API
      if (user && selectedCampaign) {
        try {
          await donationsApi.create({
            donor_id: user.id,
            campaign_id: selectedCampaign.id,
            amount: amount,
          });
        } catch {
          // Fallback gracefully for preview mode
        }
      }

      // Generate invoice
      const invoiceId = `XND-UAJ-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;
      const newRecord: DonationRecord = {
        id: `REC-${Date.now()}`,
        campaign_title: selectedCampaign?.title || "Program Donasi Atma Jaya",
        amount,
        donor_name: isAnonymous ? "Hamba Allah (Anonim)" : donorName,
        created_at: new Date().toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" }),
        payment_method: methodLabel,
        invoice_id: invoiceId,
        status: "LUNAS",
      };

      setLastReceipt(newRecord);
      setDonationHistory((prev) => [newRecord, ...prev]);

      // Update local campaign collected amount
      if (selectedCampaign) {
        setCampaigns((prev) =>
          prev.map((c) =>
            c.id === selectedCampaign.id
              ? { ...c, collected_amount: c.collected_amount + amount, donor_count: (c.donor_count || 0) + 1 }
              : c
          )
        );
      }

      setTimeout(() => {
        setIsProcessing(false);
        setShow3DSModal(false);
        setStep("success");
      }, 1000);
    } catch (err) {
      setIsProcessing(false);
      alert("Gagal memproses transaksi: " + err);
    }
  };

  // Virtual Account Numbers Generator
  const getVANumber = () => {
    switch (selectedBank) {
      case "BCA":
        return "8277 0812 8492 1042";
      case "Mandiri":
        return "8902 2012 3901 8490";
      case "BNI":
        return "9881 2891 0492 8410";
      case "BRI":
        return "1284 9012 8492 0182";
      case "Permata":
        return "8528 0192 8491 0294";
    }
  };

  return (
    <div className="pb-24 bg-gray-50 min-h-screen">
      {/* 1. Header with Clean White Background */}
      <AppHeader title="Donasi Alumni" />

      {/* 2. Navigation Tabs (Program Donasi vs Riwayat Donasi) */}
      <div className="bg-white px-4 pt-2 border-b border-gray-200">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab("campaigns")}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors relative ${
              activeTab === "campaigns"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            Program Donasi
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors relative ${
              activeTab === "history"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            Riwayat Donasi Saya ({donationHistory.length})
          </button>
        </div>
      </div>

      {activeTab === "campaigns" ? (
        <div className="p-4 space-y-4">
          {/* Main Hero Campaign Card */}
          {campaigns.length > 0 && (
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                <img
                  src={campaigns[0].banner_url}
                  alt={campaigns[0].title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-primary text-white text-xs font-bold rounded-lg shadow-sm">
                  {campaigns[0].category}
                </span>
                <span className="absolute top-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-lg">
                  {campaigns[0].days_left} hari tersisa
                </span>
              </div>

              <div className="p-4">
                <h2 className="text-base font-bold text-gray-900 leading-snug">
                  {campaigns[0].title}
                </h2>
                <p className="text-xs text-gray-600 mt-1.5 line-clamp-2">
                  {campaigns[0].description}
                </p>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">Terkumpul</span>
                    <span className="font-bold text-primary">
                      {Math.min(100, Math.round((campaigns[0].collected_amount / campaigns[0].target_amount) * 100))}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-amber-500 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, (campaigns[0].collected_amount / campaigns[0].target_amount) * 100)}%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between items-baseline mt-2">
                    <div>
                      <span className="text-sm font-bold text-gray-900 block">
                        {formatIDR(campaigns[0].collected_amount)}
                      </span>
                      <span className="text-[11px] text-gray-400">
                        dari target {formatIDR(campaigns[0].target_amount)}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-gray-500">
                      {campaigns[0].donor_count?.toLocaleString()} Donatur
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenDonateModal(campaigns[0])}
                  className="w-full mt-4 py-2.5 bg-primary hover:bg-primary/95 active:scale-98 text-white font-bold rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Donasi Sekarang
                </button>
              </div>
            </div>
          )}

          {/* Section: Other Campaigns */}
          <div className="pt-2">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
              Program Donasi Lainnya
            </h3>
            <div className="space-y-3">
              {campaigns.slice(1).map((campaign) => {
                const percent = Math.min(100, Math.round((campaign.collected_amount / campaign.target_amount) * 100));
                return (
                  <div
                    key={campaign.id}
                    className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-xs flex flex-col gap-3"
                  >
                    <div className="flex gap-3">
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          src={campaign.banner_url}
                          alt={campaign.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px] font-semibold">
                          {campaign.category}
                        </span>
                        <h4 className="text-xs font-bold text-gray-900 mt-1 line-clamp-2 leading-snug">
                          {campaign.title}
                        </h4>
                        <p className="text-[11px] text-gray-500 mt-1">
                          Terkumpul: <b className="text-gray-800">{formatIDR(campaign.collected_amount)}</b>
                        </p>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1.5 overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${percent}%` }} />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <span className="text-[11px] text-gray-500 font-medium">
                        {campaign.donor_count} Donatur • {campaign.days_left} hari lagi
                      </span>
                      <button
                        onClick={() => handleOpenDonateModal(campaign)}
                        className="px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-lg text-xs transition-colors"
                      >
                        Donasi
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* History Tab */
        <div className="p-4 space-y-3">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-800 flex items-start gap-2">
            <svg className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-bold">Dampak Nyata Kontribusi Anda</p>
              <p className="text-emerald-700 mt-0.5">
                Total donasi Anda: <b>{formatIDR(donationHistory.reduce((acc, d) => acc + d.amount, 0))}</b> melalui platform resmi PERLUNI UAJ.
              </p>
            </div>
          </div>

          {donationHistory.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                  {item.status}
                </span>
                <span className="text-[11px] text-gray-400">{item.created_at}</span>
              </div>
              <h4 className="text-xs font-bold text-gray-900 leading-snug">{item.campaign_title}</h4>
              <div className="flex justify-between items-baseline mt-2.5 pt-2 border-t border-gray-100">
                <div>
                  <span className="text-[11px] text-gray-400 block">Metode: {item.payment_method}</span>
                  <span className="text-xs text-gray-500 font-mono text-[10px]">Inv: {item.invoice_id}</span>
                </div>
                <span className="text-sm font-bold text-primary">{formatIDR(item.amount)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =========================================================================
          XENDIT-STYLE PAYMENT GATEWAY CHECKOUT MODAL
         ========================================================================= */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-200">
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  UAJ
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 leading-none">
                    {step === "amount" ? "Pilih Donasi" : step === "payment" ? "Pembayaran Xendit" : "Konfirmasi Berhasil"}
                  </h3>
                  <span className="text-[11px] text-gray-500">PERLUNI Atma Jaya Care</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedCampaign(null)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200"
              >
                ✕
              </button>
            </div>

            {/* Modal Body: STEP 1 - PILIH NOMINAL */}
            {step === "amount" && (
              <form onSubmit={handleProceedToPayment} className="p-5 space-y-4">
                <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-100">
                  <span className="text-[11px] font-semibold text-emerald-800 block">Tujuan Donasi:</span>
                  <p className="text-xs font-bold text-gray-900 mt-0.5 line-clamp-2">
                    {selectedCampaign.title}
                  </p>
                </div>

                {/* Preset Chips */}
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-2">Pilih Nominal Donasi</label>
                  <div className="grid grid-cols-3 gap-2">
                    {PRESET_AMOUNTS.map((val) => (
                      <button
                        type="button"
                        key={val}
                        onClick={() => {
                          setAmount(val);
                          setCustomAmountStr("");
                        }}
                        className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all ${
                          amount === val && !customAmountStr
                            ? "bg-primary text-white border-primary shadow-xs"
                            : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {formatIDR(val).replace(",00", "")}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Amount */}
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Nominal Lainnya (Rp)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-gray-500 text-sm">Rp</span>
                    <input
                      type="text"
                      placeholder="Contoh: 150000"
                      value={customAmountStr}
                      onChange={handleCustomAmountChange}
                      className="w-full pl-10 pr-3 py-2.5 text-sm font-bold bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    />
                  </div>
                  <span className="text-[11px] text-gray-400 mt-1 block">Minimal donasi Rp 10.000</span>
                </div>

                {/* Donor Information */}
                <div className="pt-2 border-t border-gray-100 space-y-3">
                  <label className="text-xs font-bold text-gray-700 block">Data Donatur</label>

                  <div>
                    <input
                      type="text"
                      placeholder="Nama Lengkap"
                      value={donorName}
                      disabled={isAnonymous}
                      onChange={(e) => setDonorName(e.target.value)}
                      className={`w-full px-3 py-2 text-sm border rounded-xl outline-none ${
                        isAnonymous ? "bg-gray-100 text-gray-400" : "bg-white border-gray-300 focus:border-primary"
                      }`}
                    />
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="w-4 h-4 rounded text-primary focus:ring-primary border-gray-300"
                    />
                    <span className="text-xs text-gray-700 font-medium">Sembunyikan nama saya (Donasi Anonim / Hamba Allah)</span>
                  </label>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="email"
                      placeholder="Email (untuk e-struk)"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-primary outline-none"
                    />
                    <input
                      type="tel"
                      placeholder="No. WhatsApp"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-primary outline-none"
                    />
                  </div>

                  <div>
                    <textarea
                      placeholder="Doa atau pesan dukungan untuk Atma Jaya (opsional)"
                      value={donorPrayer}
                      onChange={(e) => setDonorPrayer(e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-primary outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  Lanjut ke Pembayaran ({formatIDR(amount)})
                </button>
              </form>
            )}

            {/* Modal Body: STEP 2 - XENDIT PAYMENT GATEWAY MOCKUP */}
            {step === "payment" && (
              <div className="p-5 space-y-4">
                {/* Xendit Security Banner */}
                <div className="bg-slate-900 text-white p-3 rounded-xl flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-emerald-500 flex items-center justify-center text-slate-900 font-black text-xs">
                      X
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block tracking-wider uppercase">Secured by</span>
                      <span className="text-xs font-bold tracking-tight">Xendit Payment Gateway</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Total Tagihan</span>
                    <span className="text-sm font-black text-emerald-400">{formatIDR(amount)}</span>
                  </div>
                </div>

                {/* Payment Method Pills */}
                <div className="flex p-1 bg-gray-100 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("qris")}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                      paymentMethod === "qris" ? "bg-white text-gray-900 shadow-xs" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    QRIS
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("va")}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                      paymentMethod === "va" ? "bg-white text-gray-900 shadow-xs" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Virtual Account
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                      paymentMethod === "card" ? "bg-white text-gray-900 shadow-xs" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Kartu Kredit/Debit
                  </button>
                </div>

                {/* --- METHOD 1: QRIS --- */}
                {paymentMethod === "qris" && (
                  <div className="bg-white border border-gray-200 rounded-2xl p-4 text-center space-y-3">
                    <div className="flex items-center justify-between text-xs text-gray-500 pb-2 border-b border-gray-100">
                      <span>Batas Waktu Bayar:</span>
                      <span className="font-mono font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                        {formatTimer(countdown)}
                      </span>
                    </div>

                    {/* QRIS Graphic Mockup */}
                    <div className="inline-block p-3 bg-white border-2 border-gray-800 rounded-2xl shadow-sm">
                      <div className="w-48 h-48 bg-gray-50 rounded-xl relative flex flex-col items-center justify-center p-2 border border-gray-200">
                        {/* QR Grid Pattern Simulation */}
                        <svg className="w-40 h-40" viewBox="0 0 100 100" fill="currentColor">
                          <path d="M0 0h30v30H0zM10 10h10v10H10zM70 0h30v30H70zM80 10h10v10H80zM0 70h30v30H0zM10 80h10v10H10zM35 5h10v10H35zM50 5h10v15H50zM5 35h10v10H5zM20 40h15v10H20zM40 35h20v20H40zM70 40h15v10H70zM85 35h10v20H85zM35 70h15v10H35zM55 65h10v15H55zM75 75h20v20H75zM45 85h15v10H45z" />
                        </svg>
                        {/* Center Logo */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-lg bg-white p-1 shadow-md border border-gray-200 flex items-center justify-center">
                            <AtmaLinkLogo variant="mark" size={24} />
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold tracking-wider text-gray-800 block mt-1">QRIS STANDAR NASIONAL</span>
                    </div>

                    <p className="text-[11px] text-gray-500">
                      Mendukung BCA Mobile, Livin Mandiri, GoPay, OVO, ShopeePay, DANA, dan semua m-banking/e-wallet.
                    </p>

                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={() => executeSuccessfulDonation("QRIS Instant (Xendit)")}
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Memverifikasi Transaksi Xendit...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Simulasikan Scan & Pembayaran QRIS
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* --- METHOD 2: VIRTUAL ACCOUNT --- */}
                {paymentMethod === "va" && (
                  <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3">
                    <label className="text-xs font-bold text-gray-700 block">Pilih Bank Virtual Account</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["BCA", "Mandiri", "BNI", "BRI", "Permata"] as const).map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setSelectedBank(b)}
                          className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all ${
                            selectedBank === b
                              ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                              : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>

                    {/* VA Number Card */}
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                      <span className="text-[10px] text-gray-400 uppercase font-semibold">Nomor Virtual Account {selectedBank}</span>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-base font-mono font-bold text-gray-900 tracking-wider">
                          {getVANumber()}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyVA(getVANumber())}
                          className="px-2.5 py-1 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 active:scale-95"
                        >
                          {copiedVA ? "Tersalin! ✓" : "Salin"}
                        </button>
                      </div>
                    </div>

                    <div className="text-[11px] text-gray-500 space-y-1">
                      <p className="font-semibold text-gray-700">Petunjuk Pembayaran M-Banking:</p>
                      <p>1. Buka Mobile Banking {selectedBank} Anda &gt; Menu Pembayaran &gt; Virtual Account.</p>
                      <p>2. Masukkan nomor VA di atas dan pastikan nama penerima <b>PERLUNI UAJ / XENDIT</b>.</p>
                      <p>3. Konfirmasi PIN dan donasi akan otomatis terverifikasi tanpa upload struk.</p>
                    </div>

                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={() => executeSuccessfulDonation(`${selectedBank} Virtual Account`)}
                      className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Memverifikasi Pembayaran VA...
                        </>
                      ) : (
                        "Simulasikan Pelunasan VA Bank"
                      )}
                    </button>
                  </div>
                )}

                {/* --- METHOD 3: KARTU KREDIT / DEBIT --- */}
                {paymentMethod === "card" && (
                  <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                      <span className="text-xs font-bold text-gray-700">Kartu Kredit / Debit Online</span>
                      <div className="flex gap-1.5 text-[10px] font-black text-gray-500">
                        <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-200">VISA</span>
                        <span className="px-1.5 py-0.5 bg-orange-50 text-orange-700 rounded border border-orange-200">MC</span>
                        <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 rounded border border-emerald-200">JCB</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] text-gray-500 block mb-1">Nomor Kartu</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 text-xs font-mono font-bold bg-white border border-gray-300 rounded-xl focus:border-primary outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-gray-500 block mb-1">Nama di Kartu</label>
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        className="w-full px-3 py-2 text-xs uppercase font-bold bg-white border border-gray-300 rounded-xl focus:border-primary outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] text-gray-500 block mb-1">Masa Berlaku</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-3 py-2 text-xs font-mono bg-white border border-gray-300 rounded-xl focus:border-primary outline-none text-center"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-gray-500 block mb-1">CVV</label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full px-3 py-2 text-xs font-mono bg-white border border-gray-300 rounded-xl focus:border-primary outline-none text-center"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShow3DSModal(true)}
                      className="w-full py-2.5 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl text-xs transition-all shadow-sm"
                    >
                      Bayar {formatIDR(amount)} dengan Kartu
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setStep("amount")}
                  className="w-full text-center text-xs text-gray-500 hover:text-gray-800 font-semibold"
                >
                  ← Kembali ubah nominal
                </button>
              </div>
            )}

            {/* Modal Body: STEP 3 - SUCCESS CONFIRMATION & E-RECEIPT */}
            {step === "success" && lastReceipt && (
              <div className="p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <div>
                  <h3 className="text-lg font-black text-gray-900">Donasi Anda Berhasil!</h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Terima kasih atas kepedulian Anda bagi Unika Atma Jaya dan sesama alumni.
                  </p>
                </div>

                {/* E-Receipt Struk Digital */}
                <div className="bg-gray-50 p-4 rounded-2xl border border-dashed border-gray-300 text-left space-y-2 text-xs">
                  <div className="flex justify-between pb-2 border-b border-gray-200">
                    <span className="text-gray-500">No. Transaksi</span>
                    <span className="font-mono font-bold text-gray-800">{lastReceipt.invoice_id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Program Donasi</span>
                    <span className="font-bold text-gray-800 text-right truncate max-w-[200px]">
                      {lastReceipt.campaign_title}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Donatur</span>
                    <span className="font-semibold text-gray-800">{lastReceipt.donor_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Metode</span>
                    <span className="font-semibold text-gray-800">{lastReceipt.payment_method}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status</span>
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      {lastReceipt.status}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200 text-sm">
                    <span className="font-bold text-gray-700">Total Dibayar</span>
                    <span className="font-black text-primary">{formatIDR(lastReceipt.amount)}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      alert("Tanda terima donasi digital telah disiapkan dan dikirimkan ke email Anda.");
                    }}
                    className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl text-xs transition-colors"
                  >
                    Unduh Struk
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCampaign(null);
                      setActiveTab("history");
                    }}
                    className="flex-1 py-2.5 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl text-xs transition-colors"
                  >
                    Lihat Riwayat
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3DS Bank OTP Simulation Modal */}
      {show3DSModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-5 text-center shadow-2xl space-y-3">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto font-bold text-sm">
              3DS
            </div>
            <h4 className="text-sm font-bold text-gray-900">Verifikasi Keamanan Kartu</h4>
            <p className="text-xs text-gray-500">
              Bank penerbit kartu telah mengirimkan kode OTP simulasi ke nomor handphone Anda.
            </p>
            <div className="py-2">
              <input
                type="text"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                maxLength={6}
                className="w-36 mx-auto tracking-widest text-center text-lg font-mono font-black py-2 border-2 border-primary rounded-xl focus:outline-none"
              />
              <span className="text-[10px] text-gray-400 block mt-1">Kode OTP Demo: 123456</span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShow3DSModal(false)}
                className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={isProcessing}
                onClick={() => executeSuccessfulDonation("Credit/Debit Card (3D Secure)")}
                className="flex-1 py-2 bg-primary hover:bg-primary/95 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5"
              >
                {isProcessing ? "Verifikasi..." : "Konfirmasi"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}