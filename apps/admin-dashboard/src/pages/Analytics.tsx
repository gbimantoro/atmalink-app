import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function Analytics() {
  const data = [
    { name: "Mon", dau: 120 },
    { name: "Tue", dau: 150 },
    { name: "Wed", dau: 170 },
    { name: "Thu", dau: 140 },
    { name: "Fri", dau: 200 },
    { name: "Sat", dau: 230 },
    { name: "Sun", dau: 210 },
  ];
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Analytics</h2>
      <div className="card p-6">
        <h3 className="font-semibold mb-4">Daily Active Users</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="dau" fill="#D85826" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}