"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/ui/language-provider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { loginSchema } from "../../schemas/auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

function getAuthErrorMessage(error: unknown, fallback: string) {
  if (typeof error === "string") return error;
  if (error && typeof error === "object") {
    const e = error as { error?: { message?: string }; message?: string };
    return e.error?.message ?? e.message ?? fallback;
  }
  return fallback;
}

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const { messages } = useLanguage();
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof loginSchema>) {
    const normalizedEmail = data.email.trim().toLowerCase();
    startTransition(() => {
      void authClient.signIn.email({
        email: normalizedEmail,
        password: data.password,
        fetchOptions: {
          onSuccess: () => {
            toast.success(messages.auth.loginSuccess);
            router.push("/");
          },
          onError: (error) => {
            console.error("Login failed", error);
            toast.error(`${messages.auth.loginFailed}: ${getAuthErrorMessage(error, messages.common.requestFailed)}`);
          },
        },
      });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{messages.auth.loginTitle}</CardTitle>
        <CardDescription>{messages.auth.loginDescription}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>{messages.common.email}</FieldLabel>
                  <Input
                    type="email"
                    autoComplete="username"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    aria-invalid={fieldState.invalid}
                    placeholder="john@example.com"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={fieldState.error ? [fieldState.error] : undefined} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>{messages.common.password}</FieldLabel>
                  <Input
                    type="password"
                    autoComplete="current-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="******"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={fieldState.error ? [fieldState.error] : undefined} />
                  )}
                </Field>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span className="sr-only">{messages.common.loading}</span>
                </>
              ) : (
                messages.auth.loginTitle
              )}
            </Button>
          </FieldGroup>
        </form>
        <div className="flex items-center justify-center gap-3 text-sm">
          <Link
            href="/auth/find-id"
            className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            {messages.auth.findId}
          </Link>
          <span className="text-muted-foreground/60">|</span>
          <Link
            href="/auth/forgot-password"
            className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            {messages.auth.forgotPassword}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
