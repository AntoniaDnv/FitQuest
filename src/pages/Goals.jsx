import AppLayout from "../components/AppLayout";
import Button from "../components/Button";

function Goals() {
  const goals = [
    {
      title: "Train 4 times this week",
      progress: 75,
      current: 3,
      target: 4,
      unit: "workouts",
      status: "active",
    },
    {
      title: "Run 20 km this month",
      progress: 45,
      current: 9,
      target: 20,
      unit: "km",
      status: "active",
    },
  ];

  return (
    <AppLayout>
      <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Goals
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            Your fitness goals
          </h1>
          <p className="mt-3 text-slate-400">
            Create goals and track your progress over time.
          </p>
        </div>

        <Button>+ New Goal</Button>
      </div>

      <section className="grid gap-5 md:grid-cols-2">
        {goals.map((goal) => (
          <div
            key={goal.title}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">{goal.title}</h2>
                <p className="mt-2 text-sm text-slate-400">
                  {goal.current} / {goal.target} {goal.unit}
                </p>
              </div>

              <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300">
                {goal.status}
              </span>
            </div>

            <div className="mt-6 h-3 rounded-full bg-slate-800">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                style={{ width: `${goal.progress}%` }}
              />
            </div>

            <p className="mt-3 text-sm text-slate-400">
              {goal.progress}% completed
            </p>
          </div>
        ))}
      </section>
    </AppLayout>
  );
}

export default Goals;