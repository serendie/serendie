import { createContext, useContext } from "react";

/**
 * カラーモード
 * - 'system': OSの設定に従う
 * - 'light': ライトモード固定
 * - 'dark': ダークモード固定
 */
export type ColorMode = "system" | "light" | "dark";

/**
 * カラーテーマ
 * Serendie UIで利用可能なカラーテーマ
 */
export type ColorTheme = "konjo" | "asagi" | "sumire" | "tsutsuji" | "kurikawa";

export interface ThemeContextValue {
  /** 現在のカラーテーマ */
  colorTheme: ColorTheme;
  /** 現在のカラーモード設定 */
  colorMode: ColorMode;
  /** 解決後のテーマ名（data-panda-themeに設定される値） */
  resolvedTheme: string;
  /** システムが現在ダークモードかどうか */
  systemPrefersDark: boolean;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);

/**
 * テーマコンテキストを取得するフック
 *
 * @returns ThemeContextValue | undefined
 *
 * @example
 * ```tsx
 * function Component() {
 *   const theme = useThemeContext();
 *   if (theme) {
 *     console.log(theme.resolvedTheme); // 'konjo' or 'konjo-dark' etc.
 *   }
 * }
 * ```
 */
export function useThemeContext(): ThemeContextValue | undefined {
  return useContext(ThemeContext);
}

/**
 * テーマ名を解決する
 *
 * @param colorTheme - カラーテーマ（konjo, asagi等）
 * @param colorMode - カラーモード（system, light, dark）
 * @param systemPrefersDark - システムがダークモードかどうか
 * @returns 解決後のテーマ名（data-panda-themeに設定する値）
 *
 * @example
 * ```ts
 * resolveTheme('konjo', 'system', true);  // 'konjo-dark'
 * resolveTheme('konjo', 'light', true);   // 'konjo'
 * resolveTheme('asagi', 'dark', false);   // 'konjo-dark' (asagi-darkは未実装のためフォールバック)
 * ```
 */
export function resolveTheme(
  colorTheme: ColorTheme,
  colorMode: ColorMode,
  systemPrefersDark: boolean
): string {
  const isDark =
    colorMode === "dark" || (colorMode === "system" && systemPrefersDark);

  if (isDark) {
    // 現在はkonjo-darkのみ実装されているため、他のテーマでもkonjo-darkにフォールバック
    // 将来的に各テーマのダーク版が追加されたら、`${colorTheme}-dark` を返すようにする
    return "konjo-dark";
  }

  // ライトモードの場合
  // konjoはデフォルトテーマなので空文字を返す（data-panda-theme属性なし）
  return colorTheme === "konjo" ? "" : colorTheme;
}
