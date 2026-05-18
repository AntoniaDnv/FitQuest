import { Link } from "react-router-dom";
import Button from "../components/Button";
import AnimatedBackground from "../components/AnimatedBackground";

function Register() {
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

          <form className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Username
              </label>
              <input
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
                type="password"
                placeholder="Create a password"
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Fitness level
              </label>
              <select className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-violet-400">
                <option>beginner</option>
                <option>intermediate</option>
                <option>advanced</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Main goal
              </label>
              <select className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-violet-400">
                <option>general_fitness</option>
                <option>weight_loss</option>
                <option>muscle_gain</option>
                <option>endurance</option>
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