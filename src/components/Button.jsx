function Button({ children, variant = "primary", className = "", ...props }) {
  const baseStyles =
    "rounded-xl px-6 py-3 font-semibold transition duration-200";

  const variants = {
    primary:
      "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-900/30 hover:opacity-90",
    secondary:
      "border border-slate-700 bg-slate-900/60 text-white hover:border-cyan-400 hover:text-cyan-300",
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