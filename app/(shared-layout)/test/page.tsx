"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Home() {
  const currentUser = useQuery(api.auth.getCurrentUser);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <pre>{JSON.stringify(currentUser, null, 2)}</pre>
    </main>
  );
}
