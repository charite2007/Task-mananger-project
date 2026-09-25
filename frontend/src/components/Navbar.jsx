export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-800/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 shadow-lg shadow-orange-500/20">
            <span className="text-lg font-black text-black">T</span>
          </div>

          <div>
            <h1 className="text-lg font-bold text-zinc-400 tracking-tight">
              Task<span className="text-orange-500">Flow</span>
            </h1>

            <p className="text-xs text-zinc-500">Task Management</p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <div className="hidden text-right sm:block">
            <p className="text-lg font-medium text-white">Welcome back</p>

            <p className="text-sm text-zinc-500">Stay productive</p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/10">
            <span className="text-lg font-semibold text-orange-400">N</span>
          </div>
        </div>
      </div>
    </header>
  );
}
