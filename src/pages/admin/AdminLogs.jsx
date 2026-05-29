import AdminNav from "../../components/AdminNav";

export default function AdminLogs() {
  const logs = [
    {
      id: 1,
      action: "USER_REGISTERED",
      user: "antonia@test.com",
      date: "2026-05-18",
    },
    {
      id: 2,
      action: "AI_PLAN_GENERATED",
      user: "mireya@test.com",
      date: "2026-05-18",
    },
    {
      id: 3,
      action: "PROGRESS_UPDATED",
      user: "user@test.com",
      date: "2026-05-18",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <AdminNav />

      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          Admin Panel
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          System Logs
        </h1>
        <p className="mt-3 text-slate-400">
          Admin can monitor important system events.
        </p>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-white/10 text-sm text-slate-400">
              <th className="p-4">Action</th>
              <th className="p-4">User</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-b border-white/5">
                <td className="p-4 font-semibold text-cyan-300">
                  {log.action}
                </td>
                <td className="p-4 text-slate-300">{log.user}</td>
                <td className="p-4 text-slate-400">{log.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
