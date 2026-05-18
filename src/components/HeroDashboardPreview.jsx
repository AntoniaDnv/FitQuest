function HeroDashboardPreview() {
  return (
    <div className="mx-auto mt-16 max-w-5xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-purple-950/50 backdrop-blur-xl">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-5">
          <p className="text-sm text-slate-400">Weekly goal</p>
          <p className="mt-2 text-2xl font-bold text-white">3 / 4 workouts</p>

          <div className="mt-4 h-2 rounded-full bg-slate-800">
            <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400" />
          </div>

          <p className="mt-3 text-sm text-cyan-300">75% completed</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-5">
          <p className="text-sm text-slate-400">Live challenge</p>
          <p className="mt-2 text-2xl font-bold text-white">7,000 steps</p>

          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-slate-400">Target</span>
            <span className="text-white">10,000</span>
          </div>

          <p className="mt-3 text-sm text-lime-300">+12% today</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-5">
          <p className="text-sm text-slate-400">AI plan</p>
          <p className="mt-2 text-2xl font-bold text-white">Ready</p>

          <div className="mt-4 space-y-2 text-sm text-slate-400">
            <p>Mon · Cardio 30 min</p>
            <p>Wed · Strength 45 min</p>
            <p>Fri · Mobility 20 min</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroDashboardPreview;