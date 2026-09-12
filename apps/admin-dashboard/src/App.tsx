import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./pages/Dashboard";
import { Users } from "./pages/Users";
import { Posts } from "./pages/Posts";
import { Events } from "./pages/Events";
import { Jobs } from "./pages/Jobs";
import { Donations } from "./pages/Donations";
import { Banners } from "./pages/Banners";
import { Analytics } from "./pages/Analytics";

function Layout() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-auto ml-64">
        <header className="sticky top-0 bg-surface border-b border-gray-200 px-6 py-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="posts" element={<Posts />} />
        <Route path="events" element={<Events />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="donations" element={<Donations />} />
        <Route path="banners" element={<Banners />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}