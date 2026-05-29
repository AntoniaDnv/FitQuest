export default function EmptyState({ title, description }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center backdrop-blur-xl">
      <p className="text-2xl font-semibold text-white">{title}</p>
      <p className="mt-3 text-slate-400">{description}</p>
    </div>
  );
}

