import { useState } from "react";
import AppLayout from "../components/AppLayout";
import Button from "../components/Button";

function ChallengeDetails() {
  const targetValue = 10000;

  const [progressInput, setProgressInput] = useState("");

  const [notification, setNotification] = useState(
    "Antonia joined the challenge."
  );

  const [leaderboard, setLeaderboard] = useState([
    { id: 1, name: "Antonia", value: 7000 },
    { id: 2, name: "Mireya", value: 6250 },
    { id: 3, name: "Stefan", value: 5800 },
    { id: 4, name: "Hristofor", value: 5100 },
  ]);

  const antonia = leaderboard.find((user) => user.name === "Antonia");
  const antoniaProgress = Math.min(
    Math.round((antonia.value / targetValue) * 100),
    100
  );

  const sortedLeaderboard = [...leaderboard].sort((a, b) => b.value - a.value);

  function handleUpdateProgress(event) {
    event.preventDefault();

    const newValue = Number(progressInput);

    if (!newValue || newValue < 0) {
      return;
    }

    setLeaderboard((previousLeaderboard) =>
      previousLeaderboard.map((user) => {
        if (user.name !== "Antonia") {
          return user;
        }

        return {
          ...user,
          value: Math.min(newValue, targetValue),
        };
      })
    );

    const newProgress = Math.min(Math.round((newValue / targetValue) * 100), 100);

    setNotification(`Antonia reached ${newProgress}% of the daily goal.`);

    setProgressInput("");
  }

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
          Reach 10,000 steps every day for 7 days. This page currently simulates
          live progress updates on the frontend.
        </p>
      </div>

      {notification && (
        <div className="mb-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm text-cyan-100 backdrop-blur-xl">
          🔔 {notification}
        </div>
      )}

      <section className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
          <h2 className="text-2xl font-semibold">Your progress</h2>

          <div className="mt-6 rounded-3xl bg-slate-950/60 p-6">
            <p className="text-sm text-slate-400">Today</p>

            <p className="mt-2 text-5xl font-bold">
              {antonia.value.toLocaleString()}
            </p>

            <p className="mt-2 text-slate-400">
              out of {targetValue.toLocaleString()} steps
            </p>

            <div className="mt-6 h-4 rounded-full bg-slate-800">
              <div
                className="h-4 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-700"
                style={{ width: `${antoniaProgress}%` }}
              />
            </div>

            <p className="mt-3 text-sm text-cyan-300">
              {antoniaProgress}% completed
            </p>
          </div>

          <form
            onSubmit={handleUpdateProgress}
            className="mt-6 flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="number"
              value={progressInput}
              onChange={(event) => setProgressInput(event.target.value)}
              placeholder="Update steps"
              className="flex-1 rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
            />

            <Button>Update Progress</Button>
          </form>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="font-semibold text-white">Demo tip</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Try entering <span className="text-cyan-300">8500</span> or{" "}
              <span className="text-cyan-300">10000</span>. The progress bar,
              leaderboard, and notification will update immediately.
            </p>
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
            {sortedLeaderboard.map((user, index) => {
              const progress = Math.min(
                Math.round((user.value / targetValue) * 100),
                100
              );

              return (
                <div
                  key={user.id}
                  className={`rounded-2xl border p-4 transition ${
                    user.name === "Antonia"
                      ? "border-cyan-400/40 bg-cyan-400/10"
                      : "border-white/10 bg-slate-950/60"
                  }`}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-sm font-bold">
                        {index + 1}
                      </div>

                      <p className="font-semibold">
                        {user.name}
                        {user.name === "Antonia" && (
                          <span className="ml-2 text-xs text-cyan-300">
                            you
                          </span>
                        )}
                      </p>
                    </div>

                    <p className="text-sm text-slate-300">
                      {user.value.toLocaleString()} steps
                    </p>
                  </div>

                  <div className="h-2 rounded-full bg-slate-800">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-700"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </AppLayout>
  );
}

export default ChallengeDetails;
