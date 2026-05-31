import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

export default function AdminNav() {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
      <div className="flex flex-wrap gap-3">
        <Link
          className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-200 hover:border-cyan-400"
          to="/admin"
        >
          Dashboard
        </Link>
        <Link
          className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-200 hover:border-cyan-400"
          to="/admin/users"
        >
          Users
        </Link>
        <Link
          className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-200 hover:border-cyan-400"
          to="/admin/challenges"
        >
          Challenges
        </Link>
        <Link
          className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-200 hover:border-cyan-400"
          to="/admin/logs"
        >
          Logs
        </Link>
        <Link
          className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-200 hover:border-cyan-400"
          to="/admin/ai-outputs"
        >
          AI Outputs
        </Link>
      </div>

      <button
        onClick={handleLogout}
        className="rounded-xl border border-red-400 px-4 py-2 text-sm text-red-300"
      >
        Logout
      </button>
    </nav>
  );
}
    