import AdminNav from "../../components/AdminNav";

export default function AdminChallenges() {
  const challenges = [
    {
      id: 1,
      title: "10,000 Steps Daily",
      status: "active",
      participants: 12,
    },
    {
      id: 2,
      title: "7-Day Workout Streak",
      status: "active",
      participants: 7,
    },
    {
      id: 3,
      title: "Cardio Consistency Challenge",
      status: "upcoming",
      participants: 5,
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
          Challenges Management
        </h1>
        <p className="mt-3 text-slate-400">
          Admin can review and moderate public challenges.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {challenges.map((challenge) => (
          <article
            key={challenge.id}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold">{challenge.title}</h2>

              <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300">
                {challenge.status}
              </span>
            </div>

            <p className="text-slate-300">
              Participants: {challenge.participants}
            </p>

            <button
              onClick={() =>
                alert(
                  `${challenge.title} would be deleted after backend integration.`,
                )
              }
              className="mt-5 rounded-xl border border-red-400 px-4 py-2 text-red-300"
            >
              Delete challenge
            </button>
          </article>
        ))}
      </div>
    </main>
  );
}
