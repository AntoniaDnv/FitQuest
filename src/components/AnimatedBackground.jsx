function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#3b0764_0%,transparent_35%),radial-gradient(circle_at_center,#111827_0%,#020617_55%)]" />

      <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-purple-600/20 blur-[130px]" />

      <div className="absolute right-[-120px] top-80 h-80 w-80 rounded-full bg-cyan-500/10 blur-[110px]" />

      <div className="absolute left-[-120px] top-96 h-80 w-80 rounded-full bg-purple-500/10 blur-[110px]" />

      <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.16)_1px,transparent_1px)] bg-[size:42px_42px] opacity-20" />
    </div>
  );
}

export default AnimatedBackground;