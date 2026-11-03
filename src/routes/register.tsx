import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/AuthForm";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create account — Tasktrail" },
      { name: "description", content: "Create a free Tasktrail account." },
      { property: "og:title", content: "Create account — Tasktrail" },
      { property: "og:description", content: "Create a free Tasktrail account." },
    ],
  }),
  component: () => <AuthForm mode="register" />,
});
