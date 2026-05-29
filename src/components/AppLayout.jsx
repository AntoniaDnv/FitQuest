import { Link, NavLink } from "react-router-dom";
import AnimatedBackground from "./AnimatedBackground";

function AppLayout({ children }) {
  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/goals", label: "Goals" },
    { to: "/workouts", label: "Workouts" },
    { to: "/challenges", label: "Challenges" },
    { to: "/profile", label: "Profile" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <AnimatedBackground />

      <div className="relative z-10">
        <header className="border-b border-white/10 bg-slate-950/40 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 text-sm font-black text-white">
                FQ
              </div>
              <span className="text-sm font-bold tracking-wide">FitQuest</span>
            </Link>

            <nav className="hidden items-center gap-3 md:flex">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-2 text-sm transition ${
                      isActive
                        ? "bg-white/[0.08] text-white"
                        : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <Link
              to="/"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300 hover:text-white"
            >
              Logout
            </Link>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-6 py-10">{children}</main>
      </div>
    </div>
  );
}

export default AppLayout;