const priorityStyles = {
  low: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  medium: "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
  high: "border-orange-500/20 bg-orange-500/10 text-orange-400",
};

const TaskCard = ({ task, onToggle, onDelete }) => {
  const priorityStyle =
    priorityStyles[task.priority] || priorityStyles.medium;

  return (
    <article
      className={`
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-white/[0.04]
        p-5
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-orange-500/30
        hover:bg-white/[0.06]
        hover:shadow-2xl
        hover:shadow-orange-500/5
        ${task.completed ? "opacity-70" : ""}
      `}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 gap-4">

          {/* Completion button */}
          <button
            type="button"
            onClick={() => onToggle(task)}
            className={`
              mt-1
              flex
              h-5
              w-5
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              transition-all
              duration-200
              ${
                task.completed
                  ? "border-orange-500 bg-orange-500 text-black"
                  : "border-zinc-600 hover:border-orange-500 hover:bg-orange-500/10"
              }
            `}
          >
            {task.completed && (
              <span className="text-xs font-bold">✓</span>
            )}
          </button>

          <div className="min-w-0">
            <h3
              className={`
                truncate text-base font-semibold
                ${
                  task.completed
                    ? "text-zinc-500 line-through"
                    : "text-white"
                }
              `}
            >
              {task.title}
            </h3>

            <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-400">
              {task.description || "No description provided."}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onDelete(task._id)}
          className="rounded-lg px-2 py-1 text-zinc-500 transition-colors hover:bg-red-500/10 hover:text-red-400"
          title="Delete task"
        >
          ✕
        </button>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span
          className={`rounded-full border px-3 py-1 text-xs font-medium capitalize ${priorityStyle}`}
        >
          {task.priority}
        </span>

        <span className="text-xs text-zinc-500">
          {task.completed ? "Completed" : "In progress"}
        </span>
      </div>
    </article>
  );
};

export default TaskCard;