import Button from "./Button";

function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-36 text-center">
      <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-600/20 blur-3xl"></div>
      <div className="absolute right-20 top-40 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"></div>

      <div className="relative mx-auto max-w-4xl">
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl border border-slate-700 bg-slate-900/80 shadow-2xl shadow-purple-900/30">
          <span className="text-4xl">⚡</span>
        </div>

        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          AI-Powered Fitness Platform
        </p>

        <h1 className="text-5xl font-extrabold tracking-tight text-white md:text-7xl">
          Start your next{" "}
          <span className="bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
            FitQuest
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          Create fitness goals, join challenges with friends, track your
          progress live, and get AI-generated workout plans made for your level.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button>Get Started</Button>
          <Button variant="secondary">View Demo</Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;