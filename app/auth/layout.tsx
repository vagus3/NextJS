import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Link
        href="/"
        className={buttonVariants({ variant: "ghost", className: "absolute left-4 top-4 md:left-8 md:top-8" })}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Go Back
      </Link>
      <Link href="/auth/login" className={buttonVariants({ variant: "link", className: "mb-8" })}>
        Already have an account? Sign In
      </Link>
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}