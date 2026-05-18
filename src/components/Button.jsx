function Button({ children, variant = "primary", className = "", ...props }) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition duration-300";

  const variants = {
    primary:
      "bg-gradient-to-r from-violet-500 to-indigo-500 text-white shadow-lg shadow-violet-900/40 hover:-translate-y-0.5 hover:shadow-violet-700/40",
    secondary:
      "border border-white/10 bg-white/[0.04] text-white backdrop-blur-xl hover:-translate-y-0.5 hover:border-violet-400/60 hover:bg-white/[0.08]",
    ghost:
      "text-slate-300 hover:text-white",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;