"use client";

import { useLanguage } from "@/components/ui/language-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function FindIdPage() {
  const { messages } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{messages.auth.findIdTitle}</CardTitle>
        <CardDescription>{messages.auth.findIdDescription}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-muted-foreground">
        <div className="rounded-lg border bg-muted/30 p-4">
          {messages.auth.findIdBody}
        </div>
        <div className="space-y-2">
          <p>{messages.auth.findIdChecklistIntro}</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>{messages.auth.findIdChecklistOne}</li>
            <li>{messages.auth.findIdChecklistTwo}</li>
            <li>{messages.auth.findIdChecklistThree}</li>
          </ul>
        </div>
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
