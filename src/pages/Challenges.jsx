import { Link } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import Button from "../components/Button";

function Challenges() {
  const challenges = [
    {
      id: 1,
      title: "10,000 Steps Daily",
      description: "Reach 10,000 steps every day for 7 days.",
      participants: 5,
      progress: 70,
      status: "active",
    },
    {
      id: 2,
      title: "4 Workouts This Week",
      description: "Complete four workouts before Sunday.",
      participants: 3,
      progress: 50,
      status: "active",
    },
    {
      id: 3,
      title: "30 Minute Cardio Streak",
      description: "Do 30 minutes of cardio for five days.",
      participants: 8,
      progress: 35,
      status: "upcoming",
    },
  ];

  return (
    <AppLayout>
      <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Challenges
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            Join a challenge
          </h1>
          <p className="mt-3 text-slate-400">
            Compete with friends and follow live progress updates.
          </p>
        </div>

        <Button>+ Create Challenge</Button>
      </div>

      <section className="grid gap-5 md:grid-cols-3">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-400/40"
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300">
                {challenge.status}
              </span>

              <span className="text-sm text-slate-400">
                {challenge.participants} users
              </span>
            </div>

            <h2 className="text-2xl font-semibold">{challenge.title}</h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              {challenge.description}
            </p>

            <div className="mt-6 h-3 rounded-full bg-slate-800">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                style={{ width: `${challenge.progress}%` }}
              />
            </div>

            <div className="mt-6 flex gap-3">
              <Link to={`/challenges/${challenge.id}`} className="flex-1">
                <Button className="w-full">View</Button>
              </Link>

              <Button variant="secondary" className="flex-1">
                Join
              </Button>
            </div>
          </div>
        ))}
      </section>
    </AppLayout>
  );
}

export default Challenges;
