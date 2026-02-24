"use client";

import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from 'next/navigation'

export function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();
  return (
    <nav className="w-full py-5 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link className= {buttonVariants({ variant: "ghost" })} href="/create">
        <h1 className="text-3xl font-bold">
          Next<span className="text-purple-600">Master</span>
        </h1>
        </Link>

        <div className="flex items-center gap-2">
            <Link className={buttonVariants({ variant: "ghost" })} href="/">HOME</Link>
            <Link className={buttonVariants({ variant: "ghost"})} href="/blog">BLOG</Link>
            <Link className={buttonVariants({ variant: "ghost" })} href="/create">Create</Link>
        </div>
    </div>

    
    <div className="flex items-center gap-2">
      <div className="hidden md:block mr-2"></div>
{isLoading ? null : isAuthenticated ? (
  <Button onClick={() => authClient.signOut({
    fetchOptions: {
      onSuccess: () => { 
        toast.success("Logged out successfully!");
        router.push("/");
      },
      onError: (error) => {
        toast.error(`Logout failed: ${error.error.message}`);
      }
    },
  })}>
    logout
  </Button>
) : (<>
<Link className={buttonVariants({ variant: "default" })} href="/auth/sign-up">Sign up</Link>
        <Link className={buttonVariants({ variant: "secondary" })} href="/auth/login">Login</Link>
        </>)}

        {/* <Link className={buttonVariants({ variant: "default" })} href="/auth/sign-up">Sign up</Link>
        <Link className={buttonVariants({ variant: "secondary" })} href="/auth/login">Login</Link> */}
        <ThemeToggle />        
    </div>
    </nav>
  );
}
