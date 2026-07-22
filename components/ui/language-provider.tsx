"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { languageLabels, messages, type AppMessages, type Language } from "@/lib/i18n";

const STORAGE_KEY = "nextmaster-language";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  labels: typeof languageLabels;
  messages: AppMessages;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLanguage(): Language {
  if (typeof window === "undefined") {
    return "ko";
  }

  const savedLanguage = window.localStorage.getItem(STORAGE_KEY);
  if (savedLanguage === "ko" || savedLanguage === "en") {
    return savedLanguage;
  }

  return window.navigator.language.toLowerCase().startsWith("ko") ? "ko" : "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      labels: languageLabels,
      messages: messages[language],
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider.");
  }

  return context;
}
