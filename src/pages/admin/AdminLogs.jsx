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
    <main className="admin-page">
      <h1>System Logs</h1>
      <p>Admin can monitor important system events.</p>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Action</th>
            <th>User</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.action}</td>
              <td>{log.user}</td>
              <td>{log.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
