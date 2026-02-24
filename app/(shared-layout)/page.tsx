import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center flex-row bg-zinc-50 font-sans dark:bg-black">
      <h1>Hello Page</h1>
      <Link href="/abc">Go to ABC Page</Link>
    </div>
  );
}
