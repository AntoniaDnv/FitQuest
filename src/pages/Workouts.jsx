import { useState } from "react";
import AppLayout from "../components/AppLayout";
import Button from "../components/Button";
import EmptyState from "../components/EmptyState";
function Workouts() {
  const [workouts, setWorkouts] = useState([
    {
      id: 1,
      title: "Morning Cardio",
      type: "cardio",
      duration: 30,
      calories: 260,
      notes: "Easy pace treadmill session.",
    },
    {
      id: 2,
      title: "Full Body Strength",
      type: "strength",
      duration: 45,
      calories: 380,
      notes: "Squats, push-ups, rows, and core work.",
    },
    {
      id: 3,
      title: "Mobility Recovery",
      type: "flexibility",
      duration: 20,
      calories: 90,
      notes: "Stretching and light mobility.",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    type: "cardio",
    duration: "",
    calories: "",
    notes: "",
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

    if (!formData.title || !formData.duration) {
      return;
    }

    const newWorkout = {
      id: Date.now(),
      title: formData.title,
      type: formData.type,
      duration: Number(formData.duration),
      calories: Number(formData.calories) || 0,
      notes: formData.notes || "No notes added.",
    };

    setWorkouts((previousWorkouts) => [newWorkout, ...previousWorkouts]);

    setFormData({
      title: "",
      type: "cardio",
      duration: "",
      calories: "",
      notes: "",
    });
  }

  function deleteWorkout(workoutId) {
    setWorkouts((previousWorkouts) =>
      previousWorkouts.filter((workout) => workout.id !== workoutId)
    );
  }

  const totalDuration = workouts.reduce(
    (sum, workout) => sum + workout.duration,
    0
  );

  const totalCalories = workouts.reduce(
    (sum, workout) => sum + workout.calories,
    0
  );

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
      </div>

      <section className="mb-8 grid gap-5 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
          <p className="text-sm text-slate-400">Total workouts</p>
          <p className="mt-2 text-4xl font-bold">{workouts.length}</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
          <p className="text-sm text-slate-400">Total minutes</p>
          <p className="mt-2 text-4xl font-bold">{totalDuration}</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
          <p className="text-sm text-slate-400">Calories burned</p>
          <p className="mt-2 text-4xl font-bold">{totalCalories}</p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
        >
          <h2 className="text-2xl font-semibold text-white">
            Add new workout
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Log your latest training session.
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Workout title
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                type="text"
                placeholder="Morning Cardio"
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-violet-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-violet-400"
              >
                <option value="cardio">cardio</option>
                <option value="strength">strength</option>
                <option value="flexibility">flexibility</option>
                <option value="mixed">mixed</option>
              </select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Duration
                </label>
                <input
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  type="number"
                  placeholder="30"
                  className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-violet-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Calories
                </label>
                <input
                  name="calories"
                  value={formData.calories}
                  onChange={handleChange}
                  type="number"
                  placeholder="260"
                  className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-violet-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="How did the workout feel?"
                rows="4"
                className="w-full resize-none rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-violet-400"
              />
            </div>

            <Button className="w-full">Add Workout</Button>
          </div>
        </form>

        <div className="space-y-5">
          {workouts.length === 0 ? (
            <EmptyState
  title="No workouts yet"
  description="Add your first workout to start building consistency."
/>
          ) : (
            workouts.map((workout) => (
              <div
                key={workout.id}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition hover:border-violet-400/40"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="rounded-full bg-violet-400/10 px-3 py-1 text-xs text-violet-300">
                      {workout.type}
                    </span>

                    <h2 className="mt-4 text-2xl font-semibold">
                      {workout.title}
                    </h2>
                  </div>

                  <button
                    onClick={() => deleteWorkout(workout.id)}
                    className="text-sm text-red-300 transition hover:text-red-200"
                  >
                    Delete
                  </button>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-slate-950/60 p-4">
                    <p className="text-sm text-slate-400">Duration</p>
                    <p className="mt-1 text-xl font-bold">
                      {workout.duration}m
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-950/60 p-4">
                    <p className="text-sm text-slate-400">Calories</p>
                    <p className="mt-1 text-xl font-bold">
                      {workout.calories}
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-6 text-slate-400">
                  {workout.notes}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </AppLayout>
  );
}

export default Workouts;