import { motion } from "framer-motion";
import Button from "./Button";
import HeroPreview from "./HeroPreview";

function Hero() {
  return (
    <section className="relative px-6 pb-24 pt-36 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto max-w-5xl"
      >
        <div className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-slate-300 shadow-lg backdrop-blur-xl">
          <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-slate-950">
            NEW
          </span>
          AI-powered fitness challenges
        </div>

        <h1 className="mx-auto max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-7xl">
          Level up your fitness with{" "}
          <span className="bg-gradient-to-r from-violet-300 via-white to-cyan-300 bg-clip-text text-transparent">
            live challenges
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 md:text-lg">
          Create goals, generate AI workout plans, compete with friends, and
          watch your challenge progress update in real time.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button>Get Started</Button>
          <Button variant="secondary">View Demo →</Button>
        </div>
      </motion.div>

      <HeroPreview />
    </section>
  );
}

export default Hero;