import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Layout } from "./components/Layout";
import { HomeScreen } from "./screens/HomeScreen";
import { NewsScreen } from "./screens/NewsScreen";
import { AlumniScreen } from "./screens/AlumniScreen";
import { EventsScreen } from "./screens/EventsScreen";
import { JobsScreen } from "./screens/JobsScreen";
import { DonateScreen } from "./screens/DonateScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { ChatScreen } from "./screens/ChatScreen";
import { ChatRoomScreen } from "./screens/ChatRoomScreen";

import { DesignSystemScreen } from "./screens/DesignSystemScreen";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  return user ? <Navigate to="/" replace /> : <>{children}</>;
}

export function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<PublicRoute><LoginScreen /></PublicRoute>} />
        <Route path="/design-system" element={<DesignSystemScreen />} />
        <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/news" element={<NewsScreen />} />
          <Route path="/alumni" element={<AlumniScreen />} />
          <Route path="/alumni/:id" element={<div>Alumni Detail</div>} />
          <Route path="/events" element={<EventsScreen />} />
          <Route path="/events/:id" element={<div>Event Detail</div>} />
          <Route path="/jobs" element={<JobsScreen />} />
          <Route path="/jobs/:id" element={<div>Job Detail</div>} />
          <Route path="/jobs/post" element={<div>Post Job</div>} />
          <Route path="/donate" element={<DonateScreen />} />
          <Route path="/donate/:id" element={<div>Campaign Detail</div>} />
          <Route path="/chat" element={<ChatScreen />} />
          <Route path="/chat/:roomId" element={<ChatRoomScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}