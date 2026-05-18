import AppLayout from "../components/AppLayout";
import Button from "../components/Button";

function Workouts() {
  const workouts = [
    {
      title: "Morning Cardio",
      type: "cardio",
      duration: 30,
      calories: 260,
      notes: "Easy pace treadmill session.",
    },
    {
      title: "Full Body Strength",
      type: "strength",
      duration: 45,
      calories: 380,
      notes: "Squats, push-ups, rows, and core work.",
    },
    {
      title: "Mobility Recovery",
      type: "flexibility",
      duration: 20,
      calories: 90,
      notes: "Stretching and light mobility.",
    },
  ];

  return (
    <AppLayout>
      <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
            Workouts
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            Your workout log
          </h1>
          <p className="mt-3 text-slate-400">
            Add workouts and keep track of your activity.
          </p>
        </div>

        <Button>+ Add Workout</Button>
      </div>

      <section className="grid gap-5 md:grid-cols-3">
        {workouts.map((workout) => (
          <div
            key={workout.title}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-violet-400/40"
          >
            <span className="rounded-full bg-violet-400/10 px-3 py-1 text-xs text-violet-300">
              {workout.type}
            </span>

            <h2 className="mt-5 text-2xl font-semibold">{workout.title}</h2>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-slate-950/60 p-4">
                <p className="text-sm text-slate-400">Duration</p>
                <p className="mt-1 text-xl font-bold">{workout.duration}m</p>
              </div>

              <div className="rounded-2xl bg-slate-950/60 p-4">
                <p className="text-sm text-slate-400">Calories</p>
                <p className="mt-1 text-xl font-bold">{workout.calories}</p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-400">
              {workout.notes}
            </p>
          </div>
        ))}
      </section>
    </AppLayout>
  );
}

export default Workouts;