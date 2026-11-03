import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Trash2 } from "lucide-react";
import { Shell } from "@/components/Shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useTasks } from "@/lib/store";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "My tasks — Tasktrail" },
      { name: "description", content: "Add, complete and remove your tasks." },
      { property: "og:title", content: "My tasks — Tasktrail" },
      { property: "og:description", content: "Add, complete and remove your tasks." },
    ],
  }),
  component: Tasks,
});

function Tasks() {
  const [tasks, setTasks, ready] = useTasks();
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<"all" | "open" | "done">("all");

  const add = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return setError("Title is required.");
    setTasks([{ id: crypto.randomUUID(), title: title.trim(), due: due || undefined, done: false }, ...tasks]);
    setTitle(""); setDue(""); setError("");
  };
  const shown = tasks.filter((t) => filter === "all" || (filter === "done" ? t.done : !t.done));
  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <Shell>
      <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-display text-4xl">My tasks</h1>
        <p className="text-muted-foreground">{doneCount} of {tasks.length} done</p>
      </div>
      <form onSubmit={add} className="mt-6 flex flex-col gap-3 rounded-2xl border bg-card p-4 md:flex-row">
        <Input placeholder="What needs doing?" value={title} onChange={(e) => setTitle(e.target.value)} aria-label="Task title" />
        <Input type="date" value={due} onChange={(e) => setDue(e.target.value)} className="md:w-44" aria-label="Due date" />
        <Button type="submit">Add task</Button>
      </form>
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
      <div className="mt-6 flex gap-2">
        {(["all", "open", "done"] as const).map((f) => (
          <Button key={f} size="sm" variant={filter === f ? "default" : "outline"} onClick={() => setFilter(f)} className="capitalize">{f}</Button>
        ))}
      </div>
      <ul className="mt-4 divide-y rounded-2xl border bg-card">
        {ready && shown.length === 0 && <li className="p-8 text-center text-muted-foreground">No tasks here yet.</li>}
        {shown.map((t) => (
          <li key={t.id} className="flex items-center gap-3 p-4">
            <Checkbox checked={t.done} onCheckedChange={() => setTasks(tasks.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)))} aria-label="Mark done" />
            <div className="flex-1">
              <p className={t.done ? "text-muted-foreground line-through" : ""}>{t.title}</p>
              {t.due && <p className="text-xs text-muted-foreground">Due {new Date(t.due).toLocaleDateString()}</p>}
            </div>
            <Button size="icon" variant="ghost" onClick={() => setTasks(tasks.filter((x) => x.id !== t.id))} aria-label="Delete task"><Trash2 className="h-4 w-4" /></Button>
          </li>
        ))}
      </ul>
    </Shell>
  );
}
