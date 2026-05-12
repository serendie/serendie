import { useContext } from "react";
import { dictionary } from "./dictionary";
import { LanguageContext, type Language } from "./provider";

export {
  SerendieProvider,
  LanguageProvider,
  type Language,
  type SerendieProviderProps,
} from "./provider";

export type TranslationKey = keyof typeof dictionary.ja;

/**
 * 翻訳関数を生成するヘルパー
 * Context不要な場合や、サーバーサイドで直接使う場合に使用
 */
export function getTranslations(lang: Language) {
  return function t(
    key: TranslationKey,
    params?: Record<string, string | number>
  ): string {
    let text: string = dictionary[lang][key];
    if (!text && lang !== "ja") {
      text = dictionary["ja"][key];
    }
    if (!text) {
      console.warn(`Translation key "${key}" not found`);
      return key;
    }

    // プレースホルダー {{key}} を置換
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        const placeholder = `{{${key}}}`;
        if (!text.includes(placeholder)) {
          console.warn(
            `Placeholder "${placeholder}" not found in translation "${text}"`
          );
        }
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
 * SerendieProviderがない場合はデフォルト言語（ja）を使用します
 */
export function useTranslations() {
  const lang = useContext(LanguageContext);

  if (!lang && process.env.NODE_ENV === "development") {
    console.warn(
      "SerendieProvider is not found. Using default language 'ja'. " +
        "Consider wrapping your app with <SerendieProvider lang='ja'>"
    );
  }

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
