function FeatureCard({ icon, title, description }) {
  return (
    <div className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg transition duration-200 hover:-translate-y-1 hover:border-cyan-400/60 hover:bg-slate-900">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-2xl text-cyan-300 group-hover:bg-cyan-400/10">
        {icon}
      </div>

      <h3 className="text-xl font-semibold text-white">{title}</h3>

      <p className="mt-3 leading-7 text-slate-400">{description}</p>
    </div>
  );
}

export default FeatureCard;