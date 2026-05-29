import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import AnimatedBackground from "../components/AnimatedBackground";
import ErrorMessage from "../components/ErrorMessage";
function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fitnessLevel: "beginner",
    goalType: "general_fitness",
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setError("Please fill in username, email, and password.");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }
    const newUser = {
  username: formData.username,
  email: formData.email,
  fitnessLevel: formData.fitnessLevel,
  goalType: formData.goalType,
};

localStorage.setItem("fitquestUser", JSON.stringify(newUser));

    navigate("/dashboard");
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <AnimatedBackground />

      <main className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-violet-950/50 backdrop-blur-xl">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            ← Back to home
          </Link>

          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
              Start your quest
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">
              Create your account
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Tell FitQuest a little about your fitness level so your dashboard
              can feel personalized.
            </p>
          </div>

         <div className="mb-5">
  <ErrorMessage message={error} />
</div>

          <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Username
              </label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                type="text"
                placeholder="Antonia"
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Email
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="antonia@example.com"
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Password
              </label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                placeholder="Create a password"
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Fitness level
              </label>
              <select
                name="fitnessLevel"
                value={formData.fitnessLevel}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-violet-400"
              >
                <option value="beginner">beginner</option>
                <option value="intermediate">intermediate</option>
                <option value="advanced">advanced</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Main goal
              </label>
              <select
                name="goalType"
                value={formData.goalType}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-violet-400"
              >
                <option value="general_fitness">general_fitness</option>
                <option value="weight_loss">weight_loss</option>
                <option value="muscle_gain">muscle_gain</option>
                <option value="endurance">endurance</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <Button className="w-full">Create account</Button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-cyan-300">
              Login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Register;