"use client";

import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./LanguageToggle";
import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Menu, Monitor, Moon, Sun, X } from "lucide-react";
import { useLanguage } from "@/components/ui/language-provider";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", labelKey: "home" },
  { href: "/blog", labelKey: "blog" },
  { href: "/create", labelKey: "create" },
];

export function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { setTheme, theme } = useTheme();
  const { messages } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  function handleLogout() {
    setIsMobileMenuOpen(false);
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success(messages.auth.logoutSuccess);
          router.push("/");
        },
        onError: (error) => {
          toast.error(`${messages.auth.logoutFailed}: ${error.error.message}`);
        },
      },
    });
  }

  function handleThemeChange(nextTheme: "light" | "dark" | "system") {
    setTheme(nextTheme);
    setIsMobileMenuOpen(false);
  }

  function isActiveLink(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  }

  return (
    <>
      <nav className="relative z-40 flex w-full items-center justify-between border-b border-border/60 bg-background/95 px-4 py-4 backdrop-blur md:px-6">
        <div className="flex items-center gap-3 md:gap-8">
          <Link className={buttonVariants({ variant: "ghost" })} href="/create">
            <h1 className="text-2xl font-bold md:text-3xl">
              Next<span className="text-purple-600">Master</span>
            </h1>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => (
              <Link key={link.href} className={buttonVariants({ variant: "ghost" })} href={link.href}>
                {messages.nav[link.labelKey as keyof typeof messages.nav]}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {isLoading ? null : isAuthenticated ? (
            <Button onClick={handleLogout}>
              {messages.nav.logout}
            </Button>
          ) : (
            <>
              <Link className={buttonVariants({ variant: "default" })} href="/auth/sign-up">
                {messages.nav.signUp}
              </Link>
              <Link className={buttonVariants({ variant: "secondary" })} href="/auth/login">
                {messages.nav.login}
              </Link>
            </>
          )}
          <LanguageToggle />
          <ThemeToggle />
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="md:hidden"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-sidebar-menu"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMobileMenuOpen((current) => !current)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </nav>

      {isMobileMenuOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/45 md:hidden"
            aria-label="Close mobile menu overlay"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <aside
            id="mobile-sidebar-menu"
            className="fixed inset-y-0 right-0 z-50 flex w-[min(22rem,88vw)] flex-col border-l border-border bg-background px-5 pb-6 pt-24 shadow-2xl md:hidden"
          >
            <div className="space-y-2">
              <p className="px-1 text-xs font-semibold tracking-[0.24em] text-muted-foreground">{messages.nav.navigation}</p>
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={buttonVariants({
                      variant: isActiveLink(link.href) ? "secondary" : "ghost",
                      className: "w-full justify-start",
                    })}
                  >
                    {messages.nav[link.labelKey as keyof typeof messages.nav]}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-8 space-y-2">
              <p className="px-1 text-xs font-semibold tracking-[0.24em] text-muted-foreground">{messages.nav.account}</p>
              <div className="flex flex-col gap-2">
                {isLoading ? null : isAuthenticated ? (
                  <Button className="w-full justify-start" onClick={handleLogout}>{messages.nav.logout}</Button>
                ) : (
                  <>
                    <Link
                      href="/auth/sign-up"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={buttonVariants({ variant: "default", className: "w-full justify-start" })}
                    >
                      {messages.nav.signUp}
                    </Link>
                    <Link
                      href="/auth/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={buttonVariants({ variant: "secondary", className: "w-full justify-start" })}
                    >
                      {messages.nav.login}
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="mt-8 space-y-2">
              <p className="px-1 text-xs font-semibold tracking-[0.24em] text-muted-foreground">{messages.nav.language}</p>
              <LanguageToggle className="w-full justify-between" />
            </div>

            <div className="mt-8 space-y-2">
              <p className="px-1 text-xs font-semibold tracking-[0.24em] text-muted-foreground">{messages.nav.theme}</p>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant={theme === "light" ? "default" : "outline"}
                  className={cn("w-full", theme === "light" && "shadow-sm")}
                  onClick={() => handleThemeChange("light")}
                >
                  <Sun />
                  {messages.nav.light}
                </Button>
                <Button
                  type="button"
                  variant={theme === "dark" ? "default" : "outline"}
                  className={cn("w-full", theme === "dark" && "shadow-sm")}
                  onClick={() => handleThemeChange("dark")}
                >
                  <Moon />
                  {messages.nav.dark}
                </Button>
                <Button
                  type="button"
                  variant={theme === "system" ? "default" : "outline"}
                  className={cn("w-full", theme === "system" && "shadow-sm")}
                  onClick={() => handleThemeChange("system")}
                >
                  <Monitor />
                  {messages.nav.auto}
                </Button>
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
