import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { Button } from "@/components/ui/button";
import { useTasks, useUser } from "@/lib/store";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Tasktrail" },
      { name: "description", content: "Your Tasktrail profile and progress." },
      { property: "og:title", content: "Profile — Tasktrail" },
      { property: "og:description", content: "Your Tasktrail profile and progress." },
    ],
  }),
  component: Profile,
});

function Profile() {
  const [user, setUser, ready] = useUser();
  const [tasks] = useTasks();
  const nav = useNavigate();
  if (!ready) return <Shell><div /></Shell>;
  if (!user)
    return (
      <Shell>
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">You're not signed in.</p>
          <Button asChild className="mt-4"><Link to="/login">Sign in</Link></Button>
        </div>
      </Shell>
    );
  const done = tasks.filter((t) => t.done).length;
  const stats = [["Total", tasks.length], ["Open", tasks.length - done], ["Done", done]];
  return (
    <Shell>
      <div className="mt-10 rounded-2xl border bg-card p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary font-display text-2xl text-primary-foreground">{user.name[0]?.toUpperCase()}</div>
          <div><h1 className="font-display text-3xl">{user.name}</h1><p className="text-muted-foreground">{user.email}</p></div>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-4">
          {stats.map(([l, v]) => (
            <div key={l} className="rounded-xl bg-muted p-4"><p className="font-display text-3xl text-primary">{v}</p><p className="text-sm text-muted-foreground">{l}</p></div>
          ))}
        </div>
        <Button variant="outline" className="mt-8" onClick={() => { setUser(null); nav({ to: "/" }); }}>Sign out</Button>
      </div>
    </Shell>
  );
}
