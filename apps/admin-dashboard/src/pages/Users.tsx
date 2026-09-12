import { useEffect, useState } from "react";

export function Users() {
  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => {
    fetch("/api/auth/me", { headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` } })
      .then(r=>r.json()).then(d=>setUsers([d])).catch(()=>setUsers([]));
  }, []);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Alumni Management</h2>
      <div className="card overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50"><tr><th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Grad Year</th><th className="p-3">Faculty</th><th className="p-3">Tier</th></tr></thead>
          <tbody>
            {users.map(u=>(<tr key={u.id} className="border-t"><td className="p-3">{u.full_name}</td><td className="p-3">{u.email}</td><td className="p-3">{u.grad_year}</td><td className="p-3">{u.faculty}</td><td className="p-3"><span className={`px-2 py-1 rounded-full text-xs ${u.membership_tier==="atma_key"?"bg-accent/10 text-accent":"bg-gray-100 text-gray-700"}`}>{u.membership_tier}</span></td></tr>))}
          </tbody>
        </table>
      </div>
    </div>
  );
}