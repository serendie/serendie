import { createContext } from "react";

export type Language = "ja" | "en";

export const LanguageContext = createContext<Language | undefined>(undefined);

/**
 * Serendie UIの設定を提供するProvider
 * アプリケーションのルートで使用してください
 */
export function SerendieProvider({
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

/**
 * @deprecated LanguageProvider は SerendieProvider にリネームされました
 */
export const LanguageProvider = SerendieProvider;
