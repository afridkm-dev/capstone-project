import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link to="/" className="font-display text-2xl font-semibold text-primary">Tasktrail</Link>
        <nav className="flex gap-5 text-sm font-medium">
          <Link to="/tasks" className="hover:text-primary" activeProps={{ className: "text-primary" }}>Tasks</Link>
          <Link to="/profile" className="hover:text-primary" activeProps={{ className: "text-primary" }}>Profile</Link>
          <Link to="/login" className="hover:text-primary" activeProps={{ className: "text-primary" }}>Sign in</Link>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-6 pb-20">{children}</main>
    </div>
  );
}
