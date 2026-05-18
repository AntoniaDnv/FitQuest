import { motion } from "framer-motion";

function HeroPreview() {
  return (
    <motion.div
      id="preview"
      initial={{ opacity: 0, y: 50, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
      className="mx-auto mt-20 max-w-6xl"
    >
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-3 shadow-2xl shadow-violet-950/70 backdrop-blur-2xl">
        <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/90">
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-5 py-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </div>

            <div className="rounded-full border border-white/10 bg-slate-900 px-4 py-1 text-xs text-slate-400">
              app.fitquest.com
            </div>

            <div className="text-xs text-slate-500">Live</div>
          </div>

          <div className="grid gap-4 p-5 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Weekly goal</p>
                  <h3 className="mt-1 text-3xl font-bold text-white">
                    3 / 4 workouts
                  </h3>
                </div>

                <div className="rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-200">
                  75% complete
                </div>
              </div>

              <div className="h-3 rounded-full bg-slate-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 1.2, delay: 0.8 }}
                  className="h-3 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                />
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-sm text-slate-400">Steps today</p>
                  <p className="mt-2 text-2xl font-bold text-white">7,000</p>
                  <p className="mt-1 text-sm text-lime-300">+12%</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-sm text-slate-400">Calories</p>
                  <p className="mt-2 text-2xl font-bold text-white">420</p>
                  <p className="mt-1 text-sm text-cyan-300">active</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-sm text-slate-400">Streak</p>
                  <p className="mt-2 text-2xl font-bold text-white">6 days</p>
                  <p className="mt-1 text-sm text-violet-300">new record</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-semibold text-white">Live Leaderboard</p>
                  <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300">
                    updating
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    ["Antonia", "7,000"],
                    ["Mireya", "6,250"],
                    ["Stefan", "5,800"],
                  ].map((user, index) => (
                    <div
                      key={user[0]}
                      className="flex items-center justify-between rounded-xl bg-slate-950/70 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-xs font-bold text-white">
                          {index + 1}
                        </div>
                        <span className="text-sm text-white">{user[0]}</span>
                      </div>

                      <span className="text-sm text-slate-300">
                        {user[1]} steps
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-violet-500/10 p-5">
                <p className="text-sm text-violet-200">AI plan generated</p>
                <h4 className="mt-2 text-xl font-bold text-white">
                  4-day beginner plan
                </h4>
                <p className="mt-2 text-sm text-slate-400">
                  Cardio, strength, mobility, and recovery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default HeroPreview;