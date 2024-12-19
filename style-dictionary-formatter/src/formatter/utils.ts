/*
 * パスをトークンに変換します。
 * @param token - トークン
 * @param paths - パス
 * @param value - 値
 * @param onlyValue - 値のみを設定するかどうか
 */
export function path2Token(
  token: Token,
  paths: string[],
  value: Token | string | number,
  onlyValue?: boolean
) {
  let cur = token;

  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    if (cur[path] === undefined) {
      cur[path] = {};
    }
    if (i === paths.length - 1) {
      cur[path] = onlyValue ? value : { value };
    }
    cur = cur[path] as Token;
  }
}

/**
 * オブジェクトが文字列であり、特定のキーに対応する場合、数値に変換します。
 *
 * @param obj 変換するオブジェクト
 * @returns 変換されたオブジェクト
 */
export function valueTypeConverter(obj: Token) {
  if (typeof obj !== "object") return obj;
  const ret: Token = {};
  const convert2number = ["offsetX", "offsetY", "blur", "spread"];
  for (const key in obj) {
    let value = obj[key];
    if (typeof value === "string" && convert2number.includes(key)) {
      value = parseFloat(value);
    }
    ret[key] = value;
  }
  return ret;
}
