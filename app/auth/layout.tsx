"use client";

import { useLanguage } from "@/components/ui/language-provider";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { messages } = useLanguage();
  const authLink =
    pathname === "/auth/login"
      ? { href: "/auth/sign-up", label: messages.auth.noAccount }
      : pathname === "/auth/sign-up"
        ? { href: "/auth/login", label: messages.auth.hasAccount }
        : { href: "/auth/login", label: messages.common.backToLogin };
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Link
        href="/"
        className={buttonVariants({ variant: "ghost", className: "absolute left-4 top-4 md:left-8 md:top-8" })}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {messages.common.goBack}
      </Link>
      <Link href={authLink.href} className={buttonVariants({ variant: "link", className: "mb-8" })}>
        {authLink.label}
      </Link>
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
