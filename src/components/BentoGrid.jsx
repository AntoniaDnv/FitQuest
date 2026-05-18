import { motion } from "framer-motion";

function BentoGrid() {
  const cards = [
    {
      title: "23+",
      subtitle: "Fitness actions",
      description: "Track workouts, goals, progress, and challenges.",
      className: "lg:col-span-1",
    },
    {
      title: "89%",
      subtitle: "Consistency boost",
      description: "Progress visuals help users stay motivated.",
      className: "lg:col-span-2",
    },
    {
      title: "All-in-One",
      subtitle: "Goals, workouts, AI",
      description: "Everything fits inside one clean dashboard.",
      className: "lg:col-span-1",
    },
  ];

  return (
    <section id="features" className="px-6 pb-24">
      <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-4">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.12 }}
            viewport={{ once: true, amount: 0.2 }}
            className={`group min-h-[230px] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-400/40 ${card.className}`}
          >
            <div className="flex h-full flex-col justify-between">
              <div>
                <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs text-slate-300">
                  View more
                </div>

                <h3 className="text-4xl font-semibold text-white">
                  {card.title}
                </h3>

                <p className="mt-2 font-medium text-violet-200">
                  {card.subtitle}
                </p>
              </div>

              <p className="mt-8 max-w-sm text-sm leading-6 text-slate-400">
                {card.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default BentoGrid;