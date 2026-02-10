import { useSyncExternalStore } from "react";

/**
 * ブラウザの色スキーム設定を取得する
 * SSR環境では常にlightを返す
 */
function getSystemColorScheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * prefers-color-schemeメディアクエリのストア
 * useSyncExternalStoreと組み合わせて使用
 */
function subscribeToColorScheme(callback: () => void): () => void {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

/**
 * OSのカラースキーム設定を検出するフック
 * prefers-color-schemeメディアクエリを監視し、変更を検知する
 *
 * @returns 'light' | 'dark' - 現在のシステムカラースキーム
 *
 * @example
 * ```tsx
 * function Component() {
 *   const systemScheme = useSystemColorScheme();
 *   // systemScheme は 'light' または 'dark'
 * }
 * ```
 */
export function useSystemColorScheme(): "light" | "dark" {
  // useSyncExternalStoreを使用してSSR対応
  return useSyncExternalStore(
    subscribeToColorScheme,
    getSystemColorScheme,
    () => "light" // サーバー側のスナップショット
  );
}
