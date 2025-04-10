import * as fs from "fs";
import * as path from "path";
import { getAllComponents } from "../src/utils/component-service.js";

async function main() {
  console.log("コンポーネント情報を解析しています...");
  const startTime = Date.now();

  // コンポーネント情報を取得
  const components = getAllComponents();

  // 出力ディレクトリの作成
  const outputDir = path.resolve("./data");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 解析結果をJSONファイルに書き込み
  const outputPath = path.join(outputDir, "components.json");
  fs.writeFileSync(outputPath, JSON.stringify(components, null, 2), "utf-8");

  const endTime = Date.now();
  console.log(
    `解析完了: ${components.length}個のコンポーネント情報を生成しました（${endTime - startTime}ms）`
  );
  console.log(`出力先: ${outputPath}`);
}

main().catch((err) => {
  console.error("エラーが発生しました:", err);
  process.exit(1);
});
