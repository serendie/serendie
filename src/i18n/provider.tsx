/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useMemo } from "react";
import {
  ThemeContext,
  ColorMode,
  ColorTheme,
  resolveTheme,
} from "../theme/ThemeContext";
import { useSystemColorScheme } from "../theme/useSystemColorScheme";

export type Language = "ja" | "en";

export const LanguageContext = createContext<Language | undefined>(undefined);

export interface SerendieProviderProps {
  /** 言語設定 */
  lang: Language;
  /** カラーテーマ（デフォルト: 'konjo'） */
  colorTheme?: ColorTheme;
  /** カラーモード（デフォルト: undefined = ライトモード） */
  colorMode?: ColorMode;
  children: React.ReactNode;
}

/**
 * Serendie UIの設定を提供するProvider
 * アプリケーションのルートで使用してください
 *
 * @example
 * ```tsx
 * // 基本的な使い方（言語のみ）
 * <SerendieProvider lang="ja">
 *   <App />
 * </SerendieProvider>
 *
 * // カラーモードを指定（OSの設定に従う）
 * <SerendieProvider lang="ja" colorMode="system">
 *   <App />
 * </SerendieProvider>
 *
 * // カラーテーマとモードを指定
 * <SerendieProvider lang="ja" colorTheme="asagi" colorMode="system">
 *   <App />
 * </SerendieProvider>
 * ```
 */
export function SerendieProvider({
  lang,
  colorTheme = "konjo",
  colorMode,
  children,
}: SerendieProviderProps) {
  const systemScheme = useSystemColorScheme();
  const systemPrefersDark = systemScheme === "dark";

  // テーマ名を解決
  const resolvedTheme = useMemo(() => {
    // colorModeが指定されていない場合はライトモード（後方互換性）
    const effectiveColorMode = colorMode ?? "light";
    return resolveTheme(colorTheme, effectiveColorMode, systemPrefersDark);
  }, [colorTheme, colorMode, systemPrefersDark]);

  // data-panda-theme属性を更新
  useEffect(() => {
    if (typeof document === "undefined") return;

    const html = document.documentElement;
    if (resolvedTheme) {
      html.dataset.pandaTheme = resolvedTheme;
    } else {
      // konjoライトモードの場合は属性を削除（デフォルトテーマ）
      delete html.dataset.pandaTheme;
    }

    // クリーンアップ（コンポーネントがアンマウントされた時）
    return () => {
      // アンマウント時は何もしない（他のProviderがある可能性）
    };
  }, [resolvedTheme]);

  const themeContextValue = useMemo(
    () => ({
      colorTheme,
      colorMode: colorMode ?? "light",
      resolvedTheme,
      systemPrefersDark,
    }),
    [colorTheme, colorMode, resolvedTheme, systemPrefersDark]
  );

  return (
    <LanguageContext.Provider value={lang}>
      <ThemeContext.Provider value={themeContextValue}>
        {children}
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
}

/**
 * @deprecated LanguageProvider は SerendieProvider にリネームされました
 */
export const LanguageProvider = SerendieProvider;
