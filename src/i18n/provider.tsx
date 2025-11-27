import { createContext } from "react";

export type Language = "ja" | "en";

export const LanguageContext = createContext<Language | undefined>(undefined);

/**
 * 言語を提供するProvider
 * アプリケーションのルートで使用してください
 */
export function LanguageProvider({
  lang,
  children,
}: {
  lang: Language;
  children: React.ReactNode;
}) {
  return (
    <LanguageContext.Provider value={lang}>{children}</LanguageContext.Provider>
  );
}
