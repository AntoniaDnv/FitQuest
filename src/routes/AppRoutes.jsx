import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Unauthorized from "../pages/Unauthorized";
import NotFound from "../pages/NotFound";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminChallenges from "../pages/admin/AdminChallenges";
import AdminLogs from "../pages/admin/AdminLogs";
import AdminAIOutputs from "../pages/admin/AdminAIOutputs";

import AdminRoute from "./AdminRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <AdminUsers />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/challenges"
        element={
          <AdminRoute>
            <AdminChallenges />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/logs"
        element={
          <AdminRoute>
            <AdminLogs />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/ai-outputs"
        element={
          <AdminRoute>
            <AdminAIOutputs />
          </AdminRoute>
        }
      />

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
