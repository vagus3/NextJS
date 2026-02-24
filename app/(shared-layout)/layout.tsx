import { Navbar } from "@/components/web/Navbar";

export default function SharedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center flex-col bg-zinc-50 font-sans dark:bg-black">
      <Navbar />
      {children}
    </div>
  );
}