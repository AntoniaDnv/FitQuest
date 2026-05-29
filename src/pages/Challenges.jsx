import { useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import Button from "../components/Button";
import EmptyState from "../components/EmptyState";
function Challenges() {
  const [challenges, setChallenges] = useState([
    {
      id: 1,
      title: "10,000 Steps Daily",
      description: "Reach 10,000 steps every day for 7 days.",
      participants: 5,
      progress: 70,
      targetValue: 10000,
      unit: "steps",
      status: "active",
      joined: true,
    },
    {
      id: 2,
      title: "4 Workouts This Week",
      description: "Complete four workouts before Sunday.",
      participants: 3,
      progress: 50,
      targetValue: 4,
      unit: "workouts",
      status: "active",
      joined: false,
    },
    {
      id: 3,
      title: "30 Minute Cardio Streak",
      description: "Do 30 minutes of cardio for five days.",
      participants: 8,
      progress: 35,
      targetValue: 30,
      unit: "minutes",
      status: "upcoming",
      joined: false,
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    targetValue: "",
    unit: "steps",
    durationDays: "",
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

    if (!formData.title || !formData.description || !formData.targetValue) {
      return;
    }

    const newChallenge = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      participants: 1,
      progress: 0,
      targetValue: Number(formData.targetValue),
      unit: formData.unit,
      status: "active",
      joined: true,
    };

    setChallenges((previousChallenges) => [
      newChallenge,
      ...previousChallenges,
    ]);

    setFormData({
      title: "",
      description: "",
      targetValue: "",
      unit: "steps",
      durationDays: "",
    });
  }

  function joinChallenge(challengeId) {
    setChallenges((previousChallenges) =>
      previousChallenges.map((challenge) => {
        if (challenge.id !== challengeId || challenge.joined) {
          return challenge;
        }

        return {
          ...challenge,
          joined: true,
          participants: challenge.participants + 1,
        };
      })
    );
  }

  function deleteChallenge(challengeId) {
    setChallenges((previousChallenges) =>
      previousChallenges.filter((challenge) => challenge.id !== challengeId)
    );
  }

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
      </div>

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
        >
          <h2 className="text-2xl font-semibold text-white">
            Create challenge
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Start a new fitness challenge and invite others to join.
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Challenge title
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                type="text"
                placeholder="10,000 Steps Daily"
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Reach 10,000 steps every day for 7 days."
                rows="4"
                className="w-full resize-none rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Target value
                </label>
                <input
                  name="targetValue"
                  value={formData.targetValue}
                  onChange={handleChange}
                  type="number"
                  placeholder="10000"
                  className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
                />
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
                  <option value="steps">steps</option>
                  <option value="workouts">workouts</option>
                  <option value="minutes">minutes</option>
                  <option value="km">km</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Duration days
              </label>
              <input
                name="durationDays"
                value={formData.durationDays}
                onChange={handleChange}
                type="number"
                placeholder="7"
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
              />
            </div>

            <Button className="w-full">Create Challenge</Button>
          </div>
        </form>

        <div className="space-y-5">
          {challenges.length === 0 ? (
           <EmptyState
  title="No challenges yet"
  description="Create the first challenge and start competing."
/>
          ) : (
            challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition hover:border-cyan-400/40"
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300">
                      {challenge.status}
                    </span>

                    {challenge.joined && (
                      <span className="rounded-full bg-lime-400/10 px-3 py-1 text-xs text-lime-300">
                        joined
                      </span>
                    )}
                  </div>

                  <span className="text-sm text-slate-400">
                    {challenge.participants} users
                  </span>
                </div>

                <h2 className="text-2xl font-semibold">{challenge.title}</h2>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {challenge.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-300">
                  <span className="rounded-xl bg-slate-950/60 px-3 py-2">
                    Target: {challenge.targetValue} {challenge.unit}
                  </span>
                  <span className="rounded-xl bg-slate-950/60 px-3 py-2">
                    Progress: {challenge.progress}%
                  </span>
                </div>

                <div className="mt-6 h-3 rounded-full bg-slate-800">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                    style={{ width: `${challenge.progress}%` }}
                  />
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link to={`/challenges/${challenge.id}`} className="flex-1">
                    <Button className="w-full">View</Button>
                  </Link>

                  <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={() => joinChallenge(challenge.id)}
                    disabled={challenge.joined}
                  >
                    {challenge.joined ? "Joined" : "Join"}
                  </Button>

                  <button
                    onClick={() => deleteChallenge(challenge.id)}
                    className="rounded-xl border border-red-400/20 px-5 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-400/10"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </AppLayout>
  );
}

export default Challenges;