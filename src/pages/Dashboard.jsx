
import AppLayout from "../components/AppLayout";
import Button from "../components/Button";
import { useEffect, useState } from "react";

function Dashboard() {
  const [aiForm, setAiForm] = useState({
    goal: "general_fitness",
    fitnessLevel: "beginner",
    availableDays: "4",
    duration: "45",
    limitations: "",
  });
  const [user, setUser] = useState({
  username: "User",
  email: "user@example.com",
  fitnessLevel: "beginner",
  goalType: "general_fitness",
});

useEffect(() => {
  const savedUser = localStorage.getItem("fitquestUser");

  if (savedUser) {
    setUser(JSON.parse(savedUser));
  }
}, []);

  const [aiPlan, setAiPlan] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setAiForm((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function generatePlan(event) {
    event.preventDefault();

    setIsGenerating(true);
    setAiPlan(null);

    setTimeout(() => {
      const plan = {
        title: `${aiForm.availableDays}-day ${aiForm.fitnessLevel} plan`,
        goal: aiForm.goal.replace("_", " "),
        difficulty:
          aiForm.fitnessLevel === "beginner"
            ? "Easy to moderate"
            : aiForm.fitnessLevel === "intermediate"
            ? "Moderate"
            : "Advanced",
        weeklyPlan: [
          {
            day: "Monday",
            workout: "Cardio + Core",
            duration: `${aiForm.duration} minutes`,
            exercises: ["Light jog", "Plank", "Mountain climbers"],
          },
          {
            day: "Wednesday",
            workout: "Strength Training",
            duration: `${aiForm.duration} minutes`,
            exercises: ["Squats", "Push-ups", "Rows"],
          },
          {
            day: "Friday",
            workout: "Mobility + Recovery",
            duration: "30 minutes",
            exercises: ["Stretching", "Yoga flow", "Breathing"],
          },
          {
            day: "Sunday",
            workout: "Full Body Circuit",
            duration: `${aiForm.duration} minutes`,
            exercises: ["Lunges", "Jumping jacks", "Dead bugs"],
          },
        ].slice(0, Number(aiForm.availableDays)),
        safetyNotes:
          aiForm.limitations.trim() !== ""
            ? `Avoid exercises that may affect: ${aiForm.limitations}. This is not medical advice.`
            : "Warm up before training and stop if you feel pain. This is not medical advice.",
      };

      setAiPlan(plan);
      setIsGenerating(false);
    }, 900);
  }

  return (
    <AppLayout>
      <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Dashboard
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Welcome back, {user.username}
          </h1>
          <p className="mt-3 text-slate-400">
            Here is your fitness progress and AI workout planning area.
          </p>
        </div>

        <Button>+ Add Workout</Button>
      </div>

      <section className="mb-8 grid gap-5 md:grid-cols-3">
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
          <h2 className="mt-3 text-3xl font-bold">
            {aiPlan ? "Generated" : "Ready"}
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            {aiPlan
              ? aiPlan.title
              : "Create a workout plan based on your goal and level."}
          </p>
          <p className="mt-3 text-sm text-violet-300">AI powered demo</p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <form
          onSubmit={generatePlan}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
        >
          <h2 className="text-2xl font-semibold text-white">
            Generate AI workout plan
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            This simulates the AI feature before the real backend integration.
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Goal
              </label>
              <select
                name="goal"
                value={aiForm.goal}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-violet-400"
              >
                <option value="general_fitness">general_fitness</option>
                <option value="weight_loss">weight_loss</option>
                <option value="muscle_gain">muscle_gain</option>
                <option value="endurance">endurance</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Fitness level
              </label>
              <select
                name="fitnessLevel"
                value={aiForm.fitnessLevel}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-violet-400"
              >
                <option value="beginner">beginner</option>
                <option value="intermediate">intermediate</option>
                <option value="advanced">advanced</option>
              </select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Days per week
                </label>
                <input
                  name="availableDays"
                  value={aiForm.availableDays}
                  onChange={handleChange}
                  type="number"
                  min="1"
                  max="7"
                  className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-violet-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Minutes/session
                </label>
                <input
                  name="duration"
                  value={aiForm.duration}
                  onChange={handleChange}
                  type="number"
                  min="10"
                  max="120"
                  className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-violet-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Limitations or injuries
              </label>
              <textarea
                name="limitations"
                value={aiForm.limitations}
                onChange={handleChange}
                placeholder="Example: no knee-intensive exercises"
                rows="4"
                className="w-full resize-none rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-violet-400"
              />
            </div>

            <Button className="w-full" disabled={isGenerating}>
              {isGenerating ? "Generating..." : "Generate Plan"}
            </Button>
          </div>
        </form>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                AI workout result
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                The real version will come from the AI backend endpoint.
              </p>
            </div>

            <span className="rounded-full bg-violet-400/10 px-3 py-1 text-xs text-violet-300">
              JSON-like output
            </span>
          </div>

          {!aiPlan && !isGenerating && (
            <div className="rounded-3xl border border-dashed border-white/10 bg-slate-950/50 p-10 text-center">
              <p className="text-2xl font-semibold text-white">
                No AI plan yet
              </p>
              <p className="mt-3 text-slate-400">
                Fill the form and generate your first plan.
              </p>
            </div>
          )}

          {isGenerating && (
            <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-10 text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-cyan-300" />
              <p className="mt-5 text-slate-300">
                Generating safe workout plan...
              </p>
            </div>
          )}

          {aiPlan && !isGenerating && (
            <div className="space-y-5">
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
                <p className="text-sm text-slate-400">Plan title</p>
                <h3 className="mt-2 text-2xl font-bold text-white">
                  {aiPlan.title}
                </h3>
                <p className="mt-2 text-sm text-violet-300">
                  Goal: {aiPlan.goal} · Difficulty: {aiPlan.difficulty}
                </p>
              </div>

              <div className="space-y-3">
                {aiPlan.weeklyPlan.map((day) => (
                  <div
                    key={day.day}
                    className="rounded-2xl border border-white/10 bg-slate-950/60 p-5"
                  >
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                      <div>
                        <p className="font-semibold text-white">{day.day}</p>
                        <p className="mt-1 text-sm text-slate-400">
                          {day.workout}
                        </p>
                      </div>

                      <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300">
                        {day.duration}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {day.exercises.map((exercise) => (
                        <span
                          key={exercise}
                          className="rounded-full bg-white/[0.05] px-3 py-1 text-xs text-slate-300"
                        >
                          {exercise}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-5">
                <p className="text-sm font-semibold text-yellow-200">
                  Safety notes
                </p>
                <p className="mt-2 text-sm leading-6 text-yellow-100/80">
                  {aiPlan.safetyNotes}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </AppLayout>
  );
}

export default Dashboard;