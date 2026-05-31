import AdminNav from "../../components/AdminNav";
import { getAdminStats, getAdminLogs } from "../../services/adminService";

export default function AdminDashboard() {
  const stats = getAdminStats();
  const recentLogs = getAdminLogs().slice(0, 3);

  const demoFeatures = [
    "Role-based admin route protection",
    "User moderation with local UI state",
    "Challenge moderation with local UI state",
    "AI output validation simulation",
    "System log monitoring",
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <AdminNav />

      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          Admin Panel
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Admin Dashboard
        </h1>
        <p className="mt-3 text-slate-400">
          System overview, activity monitoring, and moderation tools.
        </p>
      </div>

      <section className="grid gap-5 md:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
          >
            <p className="text-sm text-slate-400">{stat.label}</p>
            <h2 className="mt-3 text-4xl font-bold">{stat.value}</h2>
          </article>
        ))}
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
          <h2 className="text-2xl font-semibold">Recent Activity</h2>

          <div className="mt-5 space-y-3">
            {recentLogs.map((log) => (
              <div
                key={log.id}
                className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
              >
                <p className="font-semibold text-cyan-300">{log.action}</p>
                <p className="text-slate-300">User: {log.user}</p>
                <p className="text-slate-500">Date: {log.date}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
          <h2 className="text-2xl font-semibold">Admin Demo Features</h2>
          <p className="mt-3 text-slate-400">
            These features simulate the final admin workflow before backend
            integration.
          </p>

          <ul className="mt-5 space-y-3">
            {demoFeatures.map((feature) => (
              <li
                key={feature}
                className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-slate-300"
              >
                ✓ {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
