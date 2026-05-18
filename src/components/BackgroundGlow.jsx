function BackgroundGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[-10%] top-20 h-80 w-80 rounded-full bg-purple-600/30 blur-[120px]" />
      <div className="absolute right-[-10%] top-96 h-96 w-96 rounded-full bg-cyan-500/20 blur-[130px]" />
      <div className="absolute left-1/3 top-[760px] h-72 w-72 rounded-full bg-lime-400/10 blur-[120px]" />
    </div>
  );
}

export default BackgroundGlow;