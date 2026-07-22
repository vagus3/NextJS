"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/ui/language-provider";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export default function ForgotPasswordPage() {
  const [isPending, startTransition] = useTransition();
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const { messages } = useLanguage();
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof forgotPasswordSchema>) {
    const normalizedEmail = data.email.trim().toLowerCase();

    startTransition(() => {
      void fetch("/api/auth/request-password-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
          redirectTo: `${window.location.origin}/auth/reset-password`,
        }),
      })
        .then(async (response) => {
          const payload = (await response.json().catch(() => null)) as { message?: string } | null;

          if (!response.ok) {
            throw new Error(payload?.message ?? "Failed to start password reset.");
          }

          setSubmittedEmail(normalizedEmail);
          toast.success(messages.auth.resetEmailSent);
          form.reset({ email: normalizedEmail });
        })
        .catch((error: unknown) => {
          const message =
            error instanceof Error && error.message ? error.message : messages.auth.resetEmailFailed;
          toast.error(message);
        });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{messages.auth.forgotPassword}</CardTitle>
        <CardDescription>{messages.auth.forgotPasswordDescription}</CardDescription>
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
                    autoComplete="email"
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
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span className="sr-only">{messages.common.loading}</span>
                </>
              ) : (
                messages.auth.sendResetEmail
              )}
            </Button>
          </FieldGroup>
        </form>

        <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
          {messages.auth.resetEmailHelp}
        </div>

        {submittedEmail && (
          <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">{messages.auth.resetRequestTitle}</p>
            <p className="mt-1">{submittedEmail}</p>
            <p className="mt-2">
              {messages.auth.resetRequestDescription}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-3">
        <Button asChild className="flex-1">
          <Link href="/auth/login">{messages.common.backToLogin}</Link>
        </Button>
        <Button asChild variant="outline" className="flex-1">
          <Link href="/auth/sign-up">{messages.auth.signUpTitle}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
