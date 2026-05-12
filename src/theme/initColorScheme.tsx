/* eslint-disable react-refresh/only-export-components */
import {
  useThemeContext,
  type ColorTheme,
  type ColorMode,
} from "./ThemeContext";

export interface ColorSchemeScriptOptions {
  /** カラーテーマを直接指定（localStorageより優先） */
  colorTheme?: ColorTheme;
  /** カラーモードを直接指定（localStorageより優先） */
  colorMode?: ColorMode;
  /** デフォルトのカラーテーマ（デフォルト: 'konjo'）。colorTheme未指定かつlocalStorageに値がない場合に使用 */
  defaultTheme?: ColorTheme;
  /** デフォルトのカラーモード（デフォルト: 'light'）。colorMode未指定かつlocalStorageに値がない場合に使用 */
  defaultColorMode?: ColorMode;
  /** localStorageのキー（テーマ）（デフォルト: 'serendie-color-theme'） */
  themeStorageKey?: string;
  /** localStorageのキー（モード）（デフォルト: 'serendie-color-mode'） */
  modeStorageKey?: string;
}

/**
 * FOUC（Flash of Unstyled Content）を防ぐためのインラインスクリプトを生成する
 *
 * このスクリプトはHTMLの<head>内にインラインで埋め込むことで、
 * ページ読み込み時に正しいテーマが即座に適用されるようにします。
 *
 * @param options - スクリプト生成オプション
 * @returns インラインスクリプトの文字列
 *
 * @example
 * ```tsx
 * // Next.js App Routerでの使用例
 * // 推奨: ColorSchemeScriptコンポーネントを使用してください
 * import { getColorSchemeScript } from '@serendie/ui';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html suppressHydrationWarning>
 *       <head>
 *         <script
 *           dangerouslySetInnerHTML={{
 *             __html: getColorSchemeScript({ colorTheme: 'konjo', colorMode: 'system' })
 *           }}
 *         />
 *       </head>
 *       <body>{children}</body>
 *     </html>
 *   );
 * }
 * ```
 */
export function getColorSchemeScript(
  options: ColorSchemeScriptOptions = {}
): string {
  const {
    colorTheme,
    colorMode,
    defaultTheme = "konjo",
    defaultColorMode = "light",
    themeStorageKey = "serendie-color-theme",
    modeStorageKey = "serendie-color-mode",
  } = options;

  // colorTheme/colorModeが指定されている場合はそれを使用（localStorageを参照しない）
  if (colorTheme !== undefined || colorMode !== undefined) {
    const theme = colorTheme ?? defaultTheme;
    const mode = colorMode ?? defaultColorMode;

    // minified inline script (props mode)
    return `(function(){try{var t='${theme}';var m='${mode}';var d=window.matchMedia('(prefers-color-scheme:dark)').matches;var k=m==='dark'||(m==='system'&&d);if(k){document.documentElement.dataset.pandaTheme='konjo-dark'}else if(t!=='konjo'){document.documentElement.dataset.pandaTheme=t}}catch(e){}})();`;
  }

  // 従来の動作: localStorageから読み取る
  return `(function(){try{var t=localStorage.getItem('${themeStorageKey}')||'${defaultTheme}';var m=localStorage.getItem('${modeStorageKey}')||'${defaultColorMode}';var d=window.matchMedia('(prefers-color-scheme:dark)').matches;var k=m==='dark'||(m==='system'&&d);if(k){document.documentElement.dataset.pandaTheme='konjo-dark'}else if(t!=='konjo'){document.documentElement.dataset.pandaTheme=t}}catch(e){}})();`;
}

/**
 * FOUC防止用のReactコンポーネント
 * Next.jsのApp Routerで使用する場合のヘルパー
 *
 * SerendieProviderの内側で使用する場合、propsを省略するとContextから
 * テーマ設定を自動的に取得します。
 *
 * @example
 * ```tsx
 * // layout.tsx（推奨: SerendieProviderの内側で使用）
 * import { ColorSchemeScript, SerendieProvider } from '@serendie/ui';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <SerendieProvider lang="ja" colorTheme="konjo" colorMode="system">
 *       <html suppressHydrationWarning>
 *         <head>
 *           <ColorSchemeScript />
 *         </head>
 *         <body>{children}</body>
 *       </html>
 *     </SerendieProvider>
 *   );
 * }
 * ```
 */
export function ColorSchemeScript(props: ColorSchemeScriptOptions = {}) {
  const themeContext = useThemeContext();

  // propsがあればprops優先、なければContextから取得
  const colorTheme = props.colorTheme ?? themeContext?.colorTheme;
  const colorMode = props.colorMode ?? themeContext?.colorMode;

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: getColorSchemeScript({
          ...props,
          colorTheme,
          colorMode,
        }),
      }}
    />
  );
}
