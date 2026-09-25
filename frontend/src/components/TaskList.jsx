import TaskCard from "./TaskCard.jsx";

const TaskList = ({ tasks, onToggle, onDelete }) => {
  if (!tasks.length) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-12 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-2xl">
          📋
        </div>

        <h3 className="mt-4 text-lg font-semibold text-white">
          No tasks yet
        </h3>

        <p className="mt-2 text-sm text-zinc-500">
          Create your first task and start getting things done.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;