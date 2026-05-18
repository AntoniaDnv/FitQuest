export default function AdminDashboard() {
  const stats = {
    users: 24,
    activeChallenges: 8,
    workouts: 132,
    aiPlans: 19,
  };

  return (
    <main className="admin-page">
      <h1>Admin Dashboard</h1>
      <p>System overview for FitQuest administrators.</p>

      <section className="admin-stats">
        <div className="admin-card">
          <h2>{stats.users}</h2>
          <p>Total Users</p>
        </div>

        <div className="admin-card">
          <h2>{stats.activeChallenges}</h2>
          <p>Active Challenges</p>
        </div>

        <div className="admin-card">
          <h2>{stats.workouts}</h2>
          <p>Workouts Logged</p>
        </div>

        <div className="admin-card">
          <h2>{stats.aiPlans}</h2>
          <p>AI Plans Generated</p>
        </div>
      </section>
    </main>
  );
}
