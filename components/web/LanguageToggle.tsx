"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Check, Languages } from "lucide-react";
import { useLanguage } from "@/components/ui/language-provider";

export function LanguageToggle({ className }: { className?: string }) {
  const { language, labels, messages, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={cn("min-w-16 gap-2 px-3 uppercase", className)}>
          <Languages className="size-4" />
          {labels[language]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="justify-between" onClick={() => setLanguage("ko")}>
          <span>{messages.language.korean}</span>
          {language === "ko" ? <Check className="size-4" /> : null}
        </DropdownMenuItem>
        <DropdownMenuItem className="justify-between" onClick={() => setLanguage("en")}>
          <span>{messages.language.english}</span>
          {language === "en" ? <Check className="size-4" /> : null}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
