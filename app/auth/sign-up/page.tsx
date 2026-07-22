"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/ui/language-provider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { signUpSchema } from "../../schemas/auth";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

function getAuthErrorMessage(error: unknown, fallback: string) {
  if (typeof error === "string") return error;
  if (error && typeof error === "object") {
    const e = error as { error?: { message?: string }; message?: string };
    return e.error?.message ?? e.message ?? fallback;
  }
  return fallback;
}

export default function SignUpPage() {
  const [isPending, startTransition] = useTransition();
  const { messages } = useLanguage();
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof signUpSchema>) {
    const normalizedEmail = data.email.trim().toLowerCase();
    startTransition(() => {
      void authClient.signUp.email({
        name: data.name.trim(),
        email: normalizedEmail,
        password: data.password,
        fetchOptions: {
          onSuccess: () => {
            toast.success(messages.auth.signUpSuccess);
            router.push("/");
          },
          onError: (error) => {
            console.error("Sign up failed", error);
            toast.error(`${messages.auth.signUpFailed}: ${getAuthErrorMessage(error, messages.common.requestFailed)}`);
          },
        },
      });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{messages.auth.signUpTitle}</CardTitle>
        <CardDescription>{messages.auth.signUpDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>{messages.common.name}</FieldLabel>
                  <Input
                    type="text"
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                    placeholder={messages.common.name}
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={fieldState.error ? [fieldState.error] : undefined} />
                  )}
                </Field>
              )}
            />
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
                    autoComplete="new-password"
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
                messages.auth.signUpTitle
              )}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
