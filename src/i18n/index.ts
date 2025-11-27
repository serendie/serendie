import { useContext } from "react";
import { dictionary } from "./dictionary";
import { LanguageContext, type Language } from "./provider";

export { LanguageProvider, type Language } from "./provider";

export type TranslationKey = keyof (typeof dictionary)[Language];

/**
 * 翻訳関数を生成するヘルパー
 * Context不要な場合や、サーバーサイドで直接使う場合に使用
 */
export function getTranslations(lang: Language) {
  return function t(
    key: TranslationKey,
    params?: Record<string, string | number>
  ): string {
    let text: string = dictionary[lang][key] || dictionary["ja"][key];

    // プレースホルダー {{key}} を置換
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        text = text.replace(
          new RegExp(`\\{\\{${key}\\}\\}`, "g"),
          String(value)
        );
      });
    }

    return text;
  };
}

/**
 * 翻訳関数を取得するReact Hook
 * LanguageProviderがない場合はデフォルト言語（ja）を使用します
 */
export function useTranslations() {
  const lang = useContext(LanguageContext);

  // Contextが取れない場合はデフォルト言語を使用（後方互換性）
  return getTranslations(lang || "ja");
}

/**
 * 言語に合わせて日付文字列をフォーマットする
 * @param date ISO形式などDateが解釈できる文字列
 * @param lang 言語
 */
export function formatDateByLang(date: string, lang: Language) {
  return new Date(date).toLocaleDateString(lang === "en" ? "en-US" : "ja-JP");
}
