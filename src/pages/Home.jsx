import AnimatedBackground from "../components/AnimatedBackground";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BentoGrid from "../components/BentoGrid";
import CTASection from "../components/CTASection";

function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <AnimatedBackground />

      <div className="relative z-10">
        <Navbar />

        <main>
          <Hero />
          <BentoGrid />

          <section id="how-it-works" className="px-6 pb-24">
            <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-violet-950/40 backdrop-blur-xl md:p-12">
              <div className="grid gap-10 md:grid-cols-2 md:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                    How it works
                  </p>

                  <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">
                    From goal to progress in minutes
                  </h2>

                  <p className="mt-5 leading-8 text-slate-400">
                    Register, create your fitness goal, receive an AI workout
                    plan, and join a challenge where your progress updates live.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    ["1. Create a goal", "Example: Train 4 times per week."],
                    ["2. Get an AI plan", "FitQuest suggests a safe weekly plan."],
                    ["3. Join a challenge", "Compete with friends in real time."],
                  ].map((step) => (
                    <div
                      key={step[0]}
                      className="rounded-2xl border border-white/10 bg-slate-950/60 p-5"
                    >
                      <p className="font-semibold text-white">{step[0]}</p>
                      <p className="mt-1 text-sm text-slate-400">{step[1]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <CTASection />
        </main>
      </div>
    </div>
  );
}

export default Home;