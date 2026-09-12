import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { campaignsApi, donationsApi } from "../api/client";

export function DonateScreen() {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [myDonations, setMyDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [donating, setDonating] = useState<number | null>(null);

  useEffect(() => {
    campaignsApi.list().then((res) => setCampaigns(res.data || []));
    if (user) donationsApi.myDonations().then((res) => setMyDonations(res.data || []));
    setLoading(false);
  }, [user]);

  const handleDonate = async (campaignId: number) => {
    if (!user) return alert("Silakan login terlebih dahulu");
    const amount = prompt("Masukkan nominal donasi (Rp):");
    if (!amount) return;
    const numAmount = parseInt(amount.replace(/\D/g, ""));
    if (isNaN(numAmount) || numAmount < 10000) return alert("Minimal donasi Rp10.000");
    setDonating(campaignId);
    try {
      await donationsApi.create({ donor_id: user.id, campaign_id: campaignId, amount: numAmount });
      alert("Donasi berhasil! Terima kasih atas kontribusi Anda.");
      campaignsApi.list().then((res) => setCampaigns(res.data || []));
      donationsApi.myDonations().then((res) => setMyDonations(res.data || []));
    } catch (e) {
      console.error(e);
      alert("Gagal memproses donasi");
    } finally {
      setDonating(null);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;

  const mainCampaign = campaigns[0];

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-100">
        <h1 className="text-xl font-bold">Donasi</h1>
      </div>

      {/* Main Donation Card - Large with background image */}
      {mainCampaign && (
        <Link to={`/donate/${mainCampaign.id}`} className="block m-4">
          <div className="relative rounded-card-lg overflow-hidden aspect-[4/5] min-h-[400px]">
            <img
              src={mainCampaign.banner_url || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80"}
              alt={mainCampaign.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 gradient-overlay" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">{mainCampaign.title}</h2>
              <p className="text-white/90 mb-4 max-w-xs">Bantu kami mencapai target donasi untuk membangun gedung alumni dan mendukung program-program komunitas.</p>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Terkumpul</span>
                  <span className="font-semibold">Rp{mainCampaign.collected_amount.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: `${mainCampaign.goal_amount > 0 ? (mainCampaign.collected_amount / mainCampaign.goal_amount) * 100 : 0}%` }} />
                </div>
                <p className="text-xs text-white/70 mt-1">Target: Rp{mainCampaign.goal_amount.toLocaleString()}</p>
              </div>
              <button className="btn-primary w-full">
                Donasi Sekarang
              </button>
            </div>
          </div>
        </Link>
      )}

      {/* Other Campaigns */}
      {campaigns.length > 1 && (
        <div className="px-4 py-4">
          <h2 className="text-lg font-bold mb-3">Kampanye Lainnya</h2>
          <div className="space-y-3">
            {campaigns.slice(1).map((c) => (
              <Link key={c.id} to={`/donate/${c.id}`} className="block card p-4">
                <div className="flex gap-3">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-surface">
                    {c.banner_url ? <img src={c.banner_url} alt={c.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-text-secondary">🎯</div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-text-primary truncate">{c.title}</h3>
                    <p className="text-caption mt-1">Terkumpul: Rp{c.collected_amount.toLocaleString()} / Rp{c.goal_amount.toLocaleString()}</p>
                    <div className="h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${c.goal_amount > 0 ? (c.collected_amount / c.goal_amount) * 100 : 0}%` }} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* My Donations */}
      {user && myDonations.length > 0 && (
        <div className="px-4 py-4 border-t border-gray-100">
          <h2 className="text-lg font-bold mb-3">Riwayat Donasi Saya</h2>
          <div className="space-y-2">
            {myDonations.map((d) => (
              <div key={d.id} className="card p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">{d.campaign?.title || "Kampanye"}</p>
                  <p className="text-caption">Rp{d.amount.toLocaleString()} • {d.status}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  d.status === "paid" ? "bg-green-100 text-green-700" :
                  d.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                  "bg-gray-100 text-gray-700"
                }`}>{d.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}