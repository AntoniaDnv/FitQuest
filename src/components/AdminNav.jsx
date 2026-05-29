import { Link } from "react-router-dom";

export default function AdminNav() {
  return (
    <nav className="mb-8 flex flex-wrap gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
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
    </nav>
  );
}
