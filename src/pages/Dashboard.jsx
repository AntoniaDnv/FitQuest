import App from "../App";
import AnimatedBackground from "../components/AnimatedBackground";
import AppLayout from "../components/AppLayout";
import Button from "../components/Button";

function Dashboard() {
  return (
    <AppLayout>
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <AnimatedBackground />

      <main className="relative z-10 mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Dashboard
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Welcome back, Antonia
            </h1>
            <p className="mt-3 text-slate-400">
              Here is your fitness progress for this week.
            </p>
          </div>

          <Button>+ Add Workout</Button>
        </div>

        <section className="grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <p className="text-sm text-slate-400">Weekly goal</p>
            <h2 className="mt-3 text-3xl font-bold">3 / 4 workouts</h2>
            <div className="mt-5 h-3 rounded-full bg-slate-800">
              <div className="h-3 w-3/4 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
            </div>
            <p className="mt-3 text-sm text-cyan-300">75% completed</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <p className="text-sm text-slate-400">Active challenge</p>
            <h2 className="mt-3 text-3xl font-bold">10,000 steps</h2>
            <p className="mt-3 text-sm text-slate-400">
              You are currently at 7,000 steps.
            </p>
            <p className="mt-3 text-sm text-lime-300">Rank #1 today</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <p className="text-sm text-slate-400">AI plan</p>
            <h2 className="mt-3 text-3xl font-bold">Ready</h2>
            <p className="mt-3 text-sm text-slate-400">
              4-day beginner plan generated for consistency.
            </p>
            <p className="mt-3 text-sm text-violet-300">View plan →</p>
          </div>
        </section>
      </main>
    </div>
    </ AppLayout>
  );
}

export default Dashboard;