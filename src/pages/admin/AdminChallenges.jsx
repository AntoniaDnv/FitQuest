export default function AdminChallenges() {
  const challenges = [
    {
      id: 1,
      title: "10 000 steps daily",
      status: "active",
      participants: 12,
    },
    {
      id: 2,
      title: "7-day workout streak",
      status: "active",
      participants: 7,
    },
  ];

  return (
    <main className="admin-page">
      <h1>Challenges Management</h1>
      <p>Admin can review and moderate challenges.</p>

      <div className="admin-list">
        {challenges.map((challenge) => (
          <article className="admin-card" key={challenge.id}>
            <h2>{challenge.title}</h2>
            <p>Status: {challenge.status}</p>
            <p>Participants: {challenge.participants}</p>
            <button>Delete challenge</button>
          </article>
        ))}
      </div>
    </main>
  );
}
