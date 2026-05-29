
export default function LoadingSpinner({ text = "Loading..." }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-10 text-center">
      <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-cyan-300" />
      <p className="mt-5 text-slate-300">{text}</p>
    </div>
  );
}
