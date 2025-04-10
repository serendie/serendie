import * as path from "path";
import * as fs from "fs";
import {
  ComponentInfo as UIComponentInfo,
  parseComponentsFromDirectory,
} from "./typescript-parser.js";

// コンポーネント情報の拡張インターフェース
export interface ComponentInfo extends Omit<UIComponentInfo, "filePath"> {
  type: "ui" | "style"; // UIコンポーネントかスタイルシステムか
  filePath?: string; // ファイルパスはオプショナル（スタイルシステムでは不要）
}

// キャッシュされたコンポーネント情報
let cachedComponents: ComponentInfo[] | null = null;

/**
 * プロジェクトルートディレクトリを見つける
 */
function resolveProjectPath(): string {
  const currentDir = process.cwd();
  let dir = currentDir;

  // プロジェクトルートを検索
  while (!fs.existsSync(path.join(dir, "ui")) && dir !== "/") {
    const parentDir = path.dirname(dir);
    if (parentDir === dir) {
      break;
    }
    dir = parentDir;
  }

  // uiディレクトリが見つかればその親ディレクトリを返す
  if (fs.existsSync(path.join(dir, "ui"))) {
    console.error(`プロジェクトルートディレクトリを見つけました: ${dir}`);
    return dir;
  }

  // 見つからなければ現在のディレクトリを返す
  console.error(
    `プロジェクトルートディレクトリが見つかりませんでした。現在のディレクトリを使用します: ${currentDir}`
  );
  return currentDir;
}

/**
 * UIコンポーネントの情報を取得する
 */
function getUIComponents(): UIComponentInfo[] {
  try {
    const startTime = Date.now(); // パフォーマンス計測開始

    const projectRoot = resolveProjectPath();
    const componentsDir = path.join(projectRoot, "ui", "src", "components");

    console.error(`コンポーネントディレクトリ: ${componentsDir}`);

    if (!fs.existsSync(componentsDir)) {
      console.error(
        `コンポーネントディレクトリが見つかりません: ${componentsDir}`
      );
      return [];
    }

    console.error("UIコンポーネントを解析しています...");
    const components = parseComponentsFromDirectory(componentsDir);

    const endTime = Date.now(); // パフォーマンス計測終了
    console.error(
      `${components.length}個のUIコンポーネントを見つけました（処理時間: ${endTime - startTime}ms）`
    );

    return components;
  } catch (error) {
    console.error("UIコンポーネント取得中にエラーが発生しました:", error);
    return [];
  }
}

/**
 * 事前生成されたコンポーネント情報をJSONファイルから読み込む
 */
export function loadGeneratedComponents(): ComponentInfo[] {
  const jsonPath = path.resolve("./data/components.json");

  if (!fs.existsSync(jsonPath)) {
    console.error(
      `事前生成されたコンポーネント情報が見つかりません: ${jsonPath}`
    );
    console.error(
      "npm run generate を実行してコンポーネント情報を生成してください"
    );
    return [];
  }

  try {
    const jsonContent = fs.readFileSync(jsonPath, "utf-8");
    const components = JSON.parse(jsonContent) as ComponentInfo[];
    console.error(`${components.length}個のコンポーネント情報をロードしました`);
    return components;
  } catch (error) {
    console.error(
      "コンポーネント情報の読み込み中にエラーが発生しました:",
      error
    );
    return [];
  }
}

/**
 * すべてのコンポーネント情報を取得する
 * UIコンポーネントとスタイルシステムの両方を含む
 */
export function getAllComponents(): ComponentInfo[] {
  // キャッシュがあればそれを返す
  if (cachedComponents) {
    console.error(
      `キャッシュされたコンポーネント情報を使用します (${cachedComponents.length}個)`
    );
    return cachedComponents;
  }

  // JSONファイルからの読み込みを試みる
  const jsonComponents = loadGeneratedComponents();
  if (jsonComponents.length > 0) {
    // JSONから読み込んだコンポーネント情報をキャッシュに保存
    cachedComponents = jsonComponents;
    return cachedComponents;
  }

  console.error(
    "生成済みのJSONファイルが見つからないか空です。ソースコードから解析します。"
  );

  // UIコンポーネントを取得してtypeプロパティを追加し、filePathは省略可能に
  const uiComponents = getUIComponents().map((comp) => {
    return {
      ...comp,
      type: "ui" as const,
    };
  });

  // スタイルシステムコンポーネントは現在使用しないためコメントアウト
  const styleComponents: ComponentInfo[] = [];

  // 結合してキャッシュに保存
  cachedComponents = [...uiComponents, ...styleComponents];
  console.error(
    `合計${cachedComponents.length}個のコンポーネントを取得しました (UI: ${uiComponents.length}, Style: ${styleComponents.length})`
  );
  return cachedComponents;
}

/**
 * 特定のコンポーネント情報を名前で取得する
 */
export function getComponent(name: string): ComponentInfo | null {
  const components = getAllComponents();
  const component = components.find((comp) => comp.name === name);

  if (!component) {
    console.error(`コンポーネント ${name} が見つかりません`);
    return null;
  }

  console.error(
    `コンポーネント ${name} を取得しました (タイプ: ${component.type}, プロパティ数: ${component.props.length})`
  );
  return component;
}

/**
 * キャッシュをクリアする
 */
export function clearComponentCache(): void {
  console.error("コンポーネントキャッシュをクリアします");
  cachedComponents = null;
}

/**
 * サーバー起動時にコンポーネントをあらかじめロードする
 * これにより初回のリクエスト時の遅延を防ぐ
 */
export function preloadComponents(): void {
  console.error("コンポーネントを事前ロードしています...");
  const startTime = Date.now();

  // コンポーネント情報を取得してキャッシュを初期化
  const components = getAllComponents();

  const endTime = Date.now();
  console.error(
    `${components.length}個のコンポーネントを事前ロードしました（処理時間: ${endTime - startTime}ms）`
  );
}
