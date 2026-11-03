import { Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Shell } from "@/components/Shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/lib/store";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const [, setUser] = useUser();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (mode === "register" && !name.trim()) return setError("Please enter your name.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Please enter a valid email.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    setUser({ name: name.trim() || email.split("@")[0] || "User", email });
    nav({ to: "/tasks" });
  };

  const isReg = mode === "register";
  return (
    <Shell>
      <div className="mx-auto mt-12 max-w-md rounded-2xl border bg-card p-8 shadow-sm">
        <h1 className="font-display text-3xl">{isReg ? "Create your account" : "Welcome back"}</h1>
        <form onSubmit={submit} className="mt-6 space-y-4">
          {isReg && (
            <div className="space-y-1.5"><Label htmlFor="n">Name</Label><Input id="n" value={name} onChange={(e) => setName(e.target.value)} /></div>
          )}
          <div className="space-y-1.5"><Label htmlFor="e">Email</Label><Input id="e" type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <div className="space-y-1.5"><Label htmlFor="p">Password</Label><Input id="p" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full">{isReg ? "Sign up" : "Sign in"}</Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          {isReg ? "Already have an account? " : "New here? "}
          <Link to={isReg ? "/login" : "/register"} className="font-medium text-primary">{isReg ? "Sign in" : "Create one"}</Link>
        </p>
      </div>
    </Shell>
  );
}
