import { Link } from "react-router-dom";
import Button from "./Button";

function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-slate-950/40 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 text-sm font-black text-white shadow-lg shadow-violet-900/40">
            FQ
          </div>

          <span className="text-sm font-bold tracking-wide text-white">
            FitQuest
          </span>
        </div>

        <nav className="hidden items-center gap-10 text-sm text-slate-300 md:flex">
          <a href="#features" className="transition hover:text-white">
            Features
          </a>
          <a href="#preview" className="transition hover:text-white">
            Preview
          </a>
          <a href="#how-it-works" className="transition hover:text-white">
            How to use
          </a>
          <a href="#start" className="transition hover:text-white">
            Start
          </a>
        </nav>

        <div className="hidden md:block">
          <Link to="/register">
  <Button>Get Started</Button>
</Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;