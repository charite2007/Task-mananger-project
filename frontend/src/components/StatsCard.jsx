export default function StatsCard({ label, value, description, icon }) {
  return (
    <div
      className="
        my-9
        mx-2
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-white/4
        p-5
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-orange-500/30
        hover:bg-white/6
      "
    >
      {/* Orange glow */}
      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-orange-500/10 blur-3xl transition-all duration-300 group-hover:bg-orange-500/20" />

      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm text-orange-400">{label}</span>

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-400/40 text-orange-400">
            {icon}
          </div>
        </div>

        <div className="text-3xl font-bold tracking-tight text-white">
          {value}
        </div>

        <p className="mt-1 text-xs text-zinc-500">{description}</p>
      </div>
    </div>
  );
}
