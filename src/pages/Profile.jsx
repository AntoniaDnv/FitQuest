import AppLayout from "../components/AppLayout";
import Button from "../components/Button";

function Profile() {
  return (
    <AppLayout>
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
          Profile
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Antonia’s profile
        </h1>
        <p className="mt-3 text-slate-400">
          Manage your personal fitness information.
        </p>
      </div>

      <section className="grid gap-5 lg:grid-cols-[0.7fr_1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-xl">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-3xl font-bold">
            A
          </div>

          <h2 className="mt-5 text-2xl font-semibold">Antonia</h2>
          <p className="mt-2 text-slate-400">antonia@example.com</p>

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

          <form className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Username
              </label>
              <input
                defaultValue="Antonia"
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none focus:border-violet-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Email
              </label>
              <input
                defaultValue="antonia@example.com"
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none focus:border-violet-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Fitness level
              </label>
              <select className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none focus:border-violet-400">
                <option>beginner</option>
                <option>intermediate</option>
                <option>advanced</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Main goal
              </label>
              <select className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none focus:border-violet-400">
                <option>general_fitness</option>
                <option>weight_loss</option>
                <option>muscle_gain</option>
                <option>endurance</option>
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