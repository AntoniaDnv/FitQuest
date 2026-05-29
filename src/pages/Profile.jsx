import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import SuccessMessage from "../components/SuccessMessage";

function Profile() {
  const [user, setUser] = useState({
    username: "User",
    email: "user@example.com",
    fitnessLevel: "beginner",
    goalType: "general_fitness",
  });

  const [formData, setFormData] = useState({
    username: "User",
    email: "user@example.com",
    fitnessLevel: "beginner",
    goalType: "general_fitness",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("fitquestUser");

    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setFormData(parsedUser);
    }
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setMessage("");
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.username || !formData.email) {
      setError("Username and email are required.");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    const updatedUser = {
      username: formData.username,
      email: formData.email,
      fitnessLevel: formData.fitnessLevel,
      goalType: formData.goalType,
    };

    setUser(updatedUser);
    localStorage.setItem("fitquestUser", JSON.stringify(updatedUser));

    setMessage("Profile updated successfully.");
  }

  const avatarLetter = user.username
    ? user.username.charAt(0).toUpperCase()
    : "U";

  return (
    <AppLayout>
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
          Profile
        </p>

        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          {user.username}’s profile
        </h1>

        <p className="mt-3 text-slate-400">
          Manage your personal fitness information.
        </p>
      </div>

      <div className="mb-6 space-y-3">
  <SuccessMessage message={message} />
  <ErrorMessage message={error} />
</div>

      <section className="grid gap-5 lg:grid-cols-[0.7fr_1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-xl">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-3xl font-bold">
            {avatarLetter}
          </div>

          <h2 className="mt-5 text-2xl font-semibold">{user.username}</h2>
          <p className="mt-2 text-slate-400">{user.email}</p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className="rounded-full bg-violet-400/10 px-4 py-2 text-sm text-violet-300">
              {user.fitnessLevel}
            </span>

            <span className="rounded-full bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
              {user.goalType}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-slate-950/60 p-4">
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs text-slate-400">Workouts</p>
            </div>

            <div className="rounded-2xl bg-slate-950/60 p-4">
              <p className="text-2xl font-bold">2</p>
              <p className="text-xs text-slate-400">Goals</p>
            </div>

            <div className="rounded-2xl bg-slate-950/60 p-4">
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs text-slate-400">Challenges</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
          <h2 className="text-2xl font-semibold">Edit profile</h2>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Username
              </label>

              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-violet-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Email
              </label>

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-violet-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Fitness level
              </label>

              <select
                name="fitnessLevel"
                value={formData.fitnessLevel}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-violet-400"
              >
                <option value="beginner">beginner</option>
                <option value="intermediate">intermediate</option>
                <option value="advanced">advanced</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Main goal
              </label>

              <select
                name="goalType"
                value={formData.goalType}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-violet-400"
              >
                <option value="general_fitness">general_fitness</option>
                <option value="weight_loss">weight_loss</option>
                <option value="muscle_gain">muscle_gain</option>
                <option value="endurance">endurance</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <Button>Save Changes</Button>
            </div>
          </form>
        </div>
      </section>
    </AppLayout>
  );
}

export default Profile;