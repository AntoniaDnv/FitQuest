import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import HomeStats from "../components/HomeStats";
import CTASection from "../components/CTASection";

function Home() {
  const features = [
    {
      icon: "🎯",
      title: "Fitness Goals",
      description:
        "Create personal goals, track your progress, and stay focused on your weekly fitness targets.",
    },
    {
      icon: "🔥",
      title: "Live Challenges",
      description:
        "Join challenges with friends and watch the leaderboard update in real time.",
    },
    {
      icon: "🤖",
      title: "AI Workout Plans",
      description:
        "Get workout plans based on your goal, fitness level, available days, and limitations.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main>
        <Hero />

        <HomeStats />

        <section id="features" className="px-6 pb-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-300">
                Features
              </p>

              <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">
                Everything you need to stay consistent
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-slate-400">
                FitQuest combines progress tracking, social motivation, and AI
                workout planning in one modern platform.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {features.map((feature) => (
                <FeatureCard
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="px-6 pb-24">
          <div className="mx-auto max-w-6xl rounded-3xl border border-slate-800 bg-slate-900/40 p-8 md:p-12">
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
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
                  <p className="font-semibold text-white">1. Create a goal</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Example: Train 4 times per week.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
                  <p className="font-semibold text-white">2. Get an AI plan</p>
                  <p className="mt-1 text-sm text-slate-400">
                    FitQuest suggests a safe weekly workout plan.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
                  <p className="font-semibold text-white">
                    3. Join a challenge
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Compete with friends and follow live progress.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
    </div>
  );
}

export default Home;