import { Link } from "react-router-dom";
import Button from "../components/Button";
import AnimatedBackground from "../components/AnimatedBackground";

function Login() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <AnimatedBackground />

      <main className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-violet-950/50 backdrop-blur-xl">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            ← Back to home
          </Link>

          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Welcome back
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">
              Login to FitQuest
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Continue tracking your goals, challenges, and workout progress.
            </p>
          </div>

          <form className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Email
              </label>
              <input
                type="email"
                placeholder="antonia@example.com"
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
              />
            </div>

            <Button className="w-full">Login</Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            No account yet?{" "}
            <Link to="/register" className="font-semibold text-cyan-300">
              Create one
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Login;