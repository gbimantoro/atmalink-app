import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function Dashboard() {
  const [stats, setStats] = useState({ alumni:0, posts:0, events:0, jobs:0, donations:0 });
  const [series, setSeries] = useState<{date:string; signups:number}[]>([]);

  useEffect(() => {
    fetch("/api/analytics/admin/summary", { headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` } })
      .then(r=>r.json()).then(setStats).catch(console.error);
    // mock series
    setSeries(Array.from({length:7},(_,i)=>({date:new Date(Date.now()-(6-i)*864e5).toLocaleDateString(), signups:Math.floor(Math.random()*20)})));
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          {label:"Alumni", value:stats.alumni, color:"bg-primary"},
          {label:"Posts", value:stats.posts, color:"bg-blue-500"},
          {label:"Events", value:stats.events, color:"bg-green-500"},
          {label:"Jobs", value:stats.jobs, color:"bg-purple-500"},
          {label:"Donations", value:`Rp${stats.donations.toLocaleString()}`, color:"bg-accent"},
        ].map((s,i)=>(<div key={i} className="card p-6"><p className="text-caption">{s.label}</p><p className="text-3xl font-bold mt-1">{s.value}</p></div>))}
      </div>
      <div className="card p-6">
        <h3 className="font-semibold mb-4">New Signups (7 days)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={series}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="signups" stroke="#D85826" dot={{ fill: "#D85826" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}