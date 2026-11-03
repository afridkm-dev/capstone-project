import { useEffect, useState } from "react";

export type Task = { id: string; title: string; due?: string | undefined; done: boolean };
export type User = { name: string; email: string };

function useStored<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const raw = localStorage.getItem(key);
    if (raw) setValue(JSON.parse(raw));
    setReady(true);
  }, [key]);
  useEffect(() => {
    if (ready) localStorage.setItem(key, JSON.stringify(value));
  }, [key, value, ready]);
  return [value, setValue, ready] as const;
}

export const useUser = () => useStored<User | null>("tt-user", null);
export const useTasks = () => useStored<Task[]>("tt-tasks", []);
