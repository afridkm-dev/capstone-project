import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/AuthForm";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Tasktrail" },
      { name: "description", content: "Sign in to your Tasktrail account." },
      { property: "og:title", content: "Sign in — Tasktrail" },
      { property: "og:description", content: "Sign in to your Tasktrail account." },
    ],
  }),
  component: () => <AuthForm mode="login" />,
});
