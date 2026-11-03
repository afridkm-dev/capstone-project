import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tasktrail — Track your work, one task at a time" },
      { name: "description", content: "A simple MERN capstone task tracker: add tasks, set due dates, and mark them done." },
      { property: "og:title", content: "Tasktrail — Track your work" },
      { property: "og:description", content: "A simple MERN capstone task tracker." },
    ],
  }),
  component: Index,
});

const features = [
  ["Add in seconds", "Type a title, pick a due date, done."],
  ["Stay on track", "See what's open and what's finished at a glance."],
  ["Yours only", "Each account sees just its own tasks."],
];

function Index() {
  return (
    <Shell>
      <section className="py-20">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">MERN Capstone Project</p>
        <h1 className="max-w-3xl font-display text-5xl leading-tight md:text-7xl">
          Track your work, <em className="text-primary">one task</em> at a time.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Tasktrail is a calm, focused task tracker for students and small teams.
        </p>
        <div className="mt-10 flex gap-3">
          <Button asChild size="lg"><Link to="/register">Create account</Link></Button>
          <Button asChild size="lg" variant="outline"><Link to="/tasks">View tasks</Link></Button>
        </div>
      </section>
      <section className="grid gap-6 border-t pt-12 md:grid-cols-3">
        {features.map(([t, d], i) => (
          <div key={t}>
            <span className="font-display text-3xl text-accent">0{i + 1}</span>
            <h3 className="mt-2 text-lg font-semibold">{t}</h3>
            <p className="text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>
    </Shell>
  );
}
