import { useState } from "react";
import AppLayout from "../components/AppLayout";
import Button from "../components/Button";

function Goals() {
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Train 4 times this week",
      current: 3,
      target: 4,
      unit: "workouts",
      status: "active",
    },
    {
      id: 2,
      title: "Run 20 km this month",
      current: 9,
      target: 20,
      unit: "km",
      status: "active",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    current: "",
    target: "",
    unit: "workouts",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.title || !formData.target) {
      return;
    }

    const newGoal = {
      id: Date.now(),
      title: formData.title,
      current: Number(formData.current) || 0,
      target: Number(formData.target),
      unit: formData.unit,
      status: "active",
    };

    setGoals((previousGoals) => [newGoal, ...previousGoals]);

    setFormData({
      title: "",
      current: "",
      target: "",
      unit: "workouts",
    });
  }

  function deleteGoal(goalId) {
    setGoals((previousGoals) =>
      previousGoals.filter((goal) => goal.id !== goalId),
    );
  }

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
      </div>

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
        >
          <h2 className="text-2xl font-semibold text-white">Create new goal</h2>
          <p className="mt-2 text-sm text-slate-400">
            Add a fitness target you want to complete.
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Goal title
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                type="text"
                placeholder="Train 4 times this week"
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Current value
                </label>
                <input
                  name="current"
                  value={formData.current}
                  onChange={handleChange}
                  type="number"
                  placeholder="0"
                  className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Target value
                </label>
                <input
                  name="target"
                  value={formData.target}
                  onChange={handleChange}
                  type="number"
                  placeholder="4"
                  className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Unit
              </label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-400"
              >
                <option value="workouts">workouts</option>
                <option value="steps">steps</option>
                <option value="minutes">minutes</option>
                <option value="km">km</option>
                <option value="kg">kg</option>
              </select>
            </div>

            <Button className="w-full">Create Goal</Button>
          </div>
        </form>

        <div className="space-y-5">
          {goals.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center backdrop-blur-xl">
              <p className="text-2xl font-semibold text-white">No goals yet</p>
              <p className="mt-3 text-slate-400">
                Create your first goal to start tracking progress.
              </p>
            </div>
          ) : (
            goals.map((goal) => {
              const progress =
                goal.target > 0
                  ? Math.min(
                      Math.round((goal.current / goal.target) * 100),
                      100,
                    )
                  : 0;

              return (
                <div
                  key={goal.id}
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
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm text-slate-400">
                      {progress}% completed
                    </p>

                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="text-sm text-red-300 transition hover:text-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </AppLayout>
  );
}

export default Goals;
