import * as path from "path";
import * as fs from "fs";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  ComponentInfo,
  parseComponentsFromDirectory,
} from "../utils/typescript-parser.js";
import {
  getAllComponents,
  getComponent,
  clearComponentCache,
  preloadComponents,
} from "../utils/component-service.js";
import { z } from "zod";

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
export function getComponents(): ComponentInfo[] {
  if (cachedComponents) {
    return cachedComponents;
  }

  try {
    const projectRoot = resolveProjectPath();
    const componentsDir = path.join(projectRoot, "ui", "src", "components");

    console.error(`コンポーネントディレクトリ: ${componentsDir}`);

    if (!fs.existsSync(componentsDir)) {
      console.error(
        `コンポーネントディレクトリが見つかりません: ${componentsDir}`
      );
      return [];
    }

    console.error("コンポーネントを解析しています...");
    const components = parseComponentsFromDirectory(componentsDir);
    console.error(`${components.length}個のコンポーネントを見つけました`);

    if (components.length > 0) {
      // 最初のコンポーネントの情報を表示
      console.error(
        `最初のコンポーネント: ${components[0].name}, プロパティ数: ${components[0].props.length}`
      );
    }

    cachedComponents = components;
    return components;
  } catch (error) {
    console.error("コンポーネント取得中にエラーが発生しました:", error);
    return [];
  }
}

/**
 * コンポーネントリソースを登録する
 * UIコンポーネントとスタイルシステムの両方を含む
 */
export function registerComponentResources(server: McpServer) {
  console.error("統合コンポーネントツールを登録しています...");

  // サーバー起動時にコンポーネントをあらかじめロードする
  preloadComponents();

  // すべてのコンポーネント一覧を取得するツール
  server.tool(
    "components:list",
    "get serendie ui components list",
    {},
    async () => {
      const components = getAllComponents();
      console.error(
        `components.list: ${components.length}個のコンポーネントを返します ` +
          `(UI: ${components.filter((c) => c.type === "ui").length}, ` +
          `Style: ${components.filter((c) => c.type === "style").length})`
      );

      const componentList = components.map((comp) => ({
        name: comp.name,
        type: comp.type,
        propsCount: comp.props.length,
        description: comp.description || "",
        uri: `components://${comp.name}`,
      }));

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(componentList, null, 2),
          },
        ],
      };
    }
  );

  // 特定のコンポーネントの詳細を取得するツール
  server.tool(
    "components:get",
    "get serendie ui components by name",
    {
      componentName: z.string().describe("取得するコンポーネントの名前"),
    },
    async ({ componentName }) => {
      const component = getComponent(componentName);

      if (!component) {
        console.error(
          `components.get: コンポーネント ${componentName} が見つかりません`
        );
        return {
          content: [
            {
              type: "text",
              text: `コンポーネント ${componentName} が見つかりません`,
            },
          ],
          isError: true,
        };
      }

      console.error(
        `components.get: ${component.type}コンポーネント ${componentName} の情報を返します (${component.props.length}個のプロパティ)`
      );

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(component, null, 2),
          },
        ],
      };
    }
  );

  // コンポーネントキャッシュをリフレッシュするツール (開発用)
  server.tool(
    "components:refresh",
    "refresh serendie ui components cache",
    {},
    async () => {
      clearComponentCache();
      const components = getAllComponents();
      console.error(
        `components.refresh: キャッシュを更新しました。${components.length}個のコンポーネント情報を再取得しました。`
      );

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                success: true,
                message: "コンポーネントキャッシュをリフレッシュしました",
                count: components.length,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  console.error("統合コンポーネントツールの登録が完了しました。");
}
