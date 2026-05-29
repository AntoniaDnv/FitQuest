import AdminNav from "../../components/AdminNav";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Users", value: 24 },
    { label: "Active Challenges", value: 8 },
    { label: "Workouts Logged", value: 132 },
    { label: "AI Plans Generated", value: 19 },
  ];

  const recentLogs = [
    "USER_REGISTERED - antonia@test.com",
    "AI_PLAN_GENERATED - mireya@test.com",
    "PROGRESS_UPDATED - stefan@test.com",
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
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
          >
            <p className="text-sm text-slate-400">{stat.label}</p>
            <h2 className="mt-3 text-4xl font-bold">{stat.value}</h2>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
        <h2 className="text-2xl font-semibold">Recent activity</h2>

        <div className="mt-5 space-y-3">
          {recentLogs.map((log) => (
            <div
              key={log}
              className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-slate-300"
            >
              {log}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
