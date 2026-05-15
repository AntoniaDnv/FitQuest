import Button from "./Button";

function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-cyan-400 font-bold text-white">
            FQ
          </div>

          <span className="text-xl font-bold text-white">FitQuest</span>
        </div>

        <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          <a href="#features" className="hover:text-cyan-300">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-cyan-300">
            How it works
          </a>
          <a href="#start" className="hover:text-cyan-300">
            Start
          </a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="secondary">Login</Button>
          <Button>Get Started</Button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;