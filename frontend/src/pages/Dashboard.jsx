import { useEffect, useState } from "react";

import Navbar from "../components/Navbar.jsx";
import StatsCard from "../components/StatsCard.jsx";
import TaskList from "../components/TaskList.jsx";
import TaskForm from "../components/TaskForm.jsx";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService.js";

const Dashboard = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTasks();

      setTasks(data);
    } catch (error) {
      console.error(error);
      setError("Unable to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);

      setTasks((currentTasks) => [newTask, ...currentTasks]);
    } catch (error) {
      console.error(error);
      setError("Unable to create task.");
    }
  };

  const handleToggleTask = async (task) => {
    try {
      const updatedTask = await updateTask(task._id, {
        title: task.title,
        description: task.description,
        priority: task.priority,
        completed: !task.completed,
      });

      setTasks((currentTasks) =>
        currentTasks.map((currentTask) =>
          currentTask._id === updatedTask._id ? updatedTask : currentTask,
        ),
      );
    } catch (error) {
      console.error(error);
      setError("Unable to update task.");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task._id !== id),
      );
    } catch (error) {
      console.error(error);
      setError("Unable to delete task.");
    }
  };

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.completed).length;

  const pendingTasks = tasks.filter((task) => !task.completed).length;

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "high",
  ).length;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-0 h-125 w-125 -translate-x-1/2 rounded-full bg-orange-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-10 lg:py-14">
          {/* Hero */}
          <section className="mb-10">
            <p className="mb-3 text-sm font-medium text-orange-400">
              YOUR WORKSPACE
            </p>

            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Stay focused.
              <span className="block text-zinc-500">Get things done.</span>
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400">
              Organize your work, prioritize what matters, and keep track of
              your progress from one simple workspace.
            </p>
          </section>

          <div className="mb-6 flex justify-end">
            <button
              type="button"
              onClick={() => setShowTaskForm(true)}
              className="rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-orange-400"
            >
              + New Task
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Stats */}
          <section className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              label="Total Tasks"
              value={totalTasks}
              description="All tasks in workspace"
              icon="✓"
            />

            <StatsCard
              label="Completed"
              value={completedTasks}
              description="Tasks you've completed"
              icon="✓"
            />

            <StatsCard
              label="Pending"
              value={pendingTasks}
              description="Tasks still in progress"
              icon="○"
            />

            <StatsCard
              label="High Priority"
              value={highPriorityTasks}
              description="Tasks needing attention"
              icon="!"
            />
          </section>

          {/* Tasks */}
          <section>
            <div className="mb-5">
              <h2 className="text-xl font-semibold">Your Tasks</h2>

              <p className="mt-1 text-sm text-zinc-500">
                Keep your work organized and moving forward.
              </p>
            </div>

            {loading ? (
              <div className="grid gap-4 md:grid-cols-2">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="h-48 animate-pulse rounded-2xl border border-white/10 bg-white/3"
                  />
                ))}
              </div>
            ) : (
              <TaskList
                tasks={tasks}
                onToggle={handleToggleTask}
                onDelete={handleDeleteTask}
              />
            )}
          </section>
        </div>
      </main>
      {showTaskForm && (
        <TaskForm
          onSubmit={handleCreateTask}
          onClose={() => setShowTaskForm(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
