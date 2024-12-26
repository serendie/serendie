// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pathToObject = (path: string, value: any, object: any) => {
  const keys = path.split(".");
  let current = object;

  // 最後のキーを除いて、必要な階層のオブジェクトを作成
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    current[key] = current[key] || {};
    current = current[key];
  }

  // 最後のキーに対する処理
  const lastKey = keys[keys.length - 1];

  // 既に値が存在する場合はエラーをスロー
  if (current[lastKey] !== undefined) {
    throw new Error("Node already exists");
  }

  // 値を設定
  current[lastKey] = value;

  return object;
};
