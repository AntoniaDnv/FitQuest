import Button from "./Button";

function CTASection() {
  return (
    <section id="start" className="px-6 pb-24">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-10 text-center shadow-2xl shadow-purple-950/40">
        <h2 className="text-3xl font-bold text-white md:text-5xl">
          Ready to begin your quest?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-slate-400">
          Set your first goal, generate a workout plan, and challenge your
          friends to stay consistent.
        </p>

        <div className="mt-8">
          <Button>Join FitQuest</Button>
        </div>
      </div>
    </section>
  );
}

export default CTASection;