"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/ui/language-provider";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { z } from "zod";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8).max(30),
    confirmPassword: z.string().min(8).max(30),
  });

export default function ResetPasswordPage() {
  const [isPending, startTransition] = useTransition();
  const { messages } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const error = searchParams.get("error");
  const isInvalidToken = !token || error === "INVALID_TOKEN";

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof resetPasswordSchema>) {
    if (!token) {
      toast.error(messages.auth.resetPasswordMissingToken);
      return;
    }

    if (data.password !== data.confirmPassword) {
      form.setError("confirmPassword", { message: messages.auth.passwordMismatch });
      toast.error(messages.auth.passwordMismatch);
      return;
    }

    form.clearErrors("confirmPassword");

    startTransition(() => {
      void fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          newPassword: data.password,
        }),
      })
        .then(async (response) => {
          const payload = (await response.json().catch(() => null)) as { message?: string } | null;

          if (!response.ok) {
            throw new Error(payload?.message ?? "Failed to reset password.");
          }

          toast.success(messages.auth.resetPasswordSuccess);
          router.push("/auth/login");
        })
        .catch((error: unknown) => {
          const message = error instanceof Error && error.message ? error.message : messages.auth.resetPasswordFailed;
          toast.error(message);
        });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{messages.auth.resetPasswordTitle}</CardTitle>
        <CardDescription>{messages.auth.resetPasswordDescription}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {isInvalidToken ? (
          <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
            {messages.auth.resetPasswordInvalidLink}
          </div>
        ) : (
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>{messages.auth.newPassword}</FieldLabel>
                    <Input
                      type="password"
                      autoComplete="new-password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Minimum 8 characters"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={fieldState.error ? [fieldState.error] : undefined} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>{messages.auth.confirmPassword}</FieldLabel>
                    <Input
                      type="password"
                      autoComplete="new-password"
                      aria-invalid={fieldState.invalid}
                      placeholder={messages.auth.confirmPassword}
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
                  messages.auth.resetPasswordSubmit
                )}
              </Button>
            </FieldGroup>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex gap-3">
        <Button asChild className="flex-1">
          <Link href="/auth/login">{messages.common.backToLogin}</Link>
        </Button>
        <Button asChild variant="outline" className="flex-1">
          <Link href="/auth/forgot-password">{messages.auth.forgotPassword}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
