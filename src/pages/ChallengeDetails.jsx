import AppLayout from "../components/AppLayout";
import Button from "../components/Button";

function ChallengeDetails() {
  const leaderboard = [
    { name: "Antonia", steps: 7000, progress: 70 },
    { name: "Mireya", steps: 6250, progress: 62 },
    { name: "Stefan", steps: 5800, progress: 58 },
    { name: "Hristofor", steps: 5100, progress: 51 },
  ];

  return (
    <AppLayout>
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          Challenge details
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          10,000 Steps Daily
        </h1>
        <p className="mt-3 max-w-2xl text-slate-400">
          Reach 10,000 steps every day for 7 days. Progress updates will later
          become real-time with Socket.IO.
        </p>
      </div>

      <section className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
          <h2 className="text-2xl font-semibold">Your progress</h2>

          <div className="mt-6 rounded-3xl bg-slate-950/60 p-6">
            <p className="text-sm text-slate-400">Today</p>
            <p className="mt-2 text-5xl font-bold">7,000</p>
            <p className="mt-2 text-slate-400">out of 10,000 steps</p>

            <div className="mt-6 h-4 rounded-full bg-slate-800">
              <div className="h-4 w-[70%] rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
            </div>

            <p className="mt-3 text-sm text-cyan-300">70% completed</p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              type="number"
              placeholder="Update steps"
              className="flex-1 rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
            />
            <Button>Update Progress</Button>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Live leaderboard</h2>
            <span className="rounded-full bg-lime-400/10 px-3 py-1 text-xs text-lime-300">
              Live
            </span>
          </div>

          <div className="space-y-3">
            {leaderboard.map((user, index) => (
              <div
                key={user.name}
                className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="font-semibold">{user.name}</p>
                  </div>

                  <p className="text-sm text-slate-300">{user.steps} steps</p>
                </div>

                <div className="h-2 rounded-full bg-slate-800">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                    style={{ width: `${user.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AppLayout>
  );
}

export default ChallengeDetails;
