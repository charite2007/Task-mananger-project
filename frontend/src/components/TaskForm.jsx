import { useState } from "react";

const initialForm = {
  title: "",
  description: "",
  priority: "medium",
};

export default function TaskForm({ onSubmit, onClose }) {
  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit({
        ...formData,
        title: formData.title.trim(),
        description: formData.description.trim(),
      });
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl shadow-orange-500/10">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-orange-400">NEW TASK</p>
            <h3 className="mt-1 text-2xl font-semibold text-white">
              Create task
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-zinc-400 transition hover:bg-white/5 hover:text-white"
            aria-label="Close task form"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-300">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-white outline-none transition focus:border-orange-500/60"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-300">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Add details about this task"
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-white outline-none transition focus:border-orange-500/60"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-300">
              Priority
            </label>
            <div className="relative">
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full appearance-none rounded-xl border border-orange-500/40 bg-zinc-950/80 px-4 py-2.5 pr-10 text-sm font-medium text-white outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-500/25"
              >
                <option value="low" className="bg-zinc-900 text-emerald-300">
                  Low
                </option>
                <option value="medium" className="bg-zinc-900 text-yellow-300">
                  Medium
                </option>
                <option value="high" className="bg-zinc-900 text-orange-300">
                  High
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <span className="text-orange-400">▾</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Saving..." : "Create task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
