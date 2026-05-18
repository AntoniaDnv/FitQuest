import Button from "./Button";

function CTASection() {
  return (
    <section id="start" className="px-6 pb-24">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-950/70 via-slate-950 to-slate-950 p-10 text-center shadow-2xl shadow-violet-950/50 backdrop-blur-xl md:p-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
            Start your quest
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Ready to build better habits?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-400">
            Create your first goal, generate a workout plan, and challenge your
            friends to stay consistent.
          </p>

          <div className="mt-8 flex justify-center">
            <Button>Join FitQuest</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;