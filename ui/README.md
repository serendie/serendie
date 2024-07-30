# 利用方法

[npm レジストリの利用 \- GitHub Docs](https://docs.github.com/ja/packages/working-with-a-github-packages-registry/working-with-the-npm-registry) を参考に、個人用アクセストークンを発行して`.npmrc` に以下の内容を追加してください。

```plaintext
//npm.pkg.github.com/:_authToken={TOKEN}
@serendie:registry=https://npm.pkg.github.com
```

その後、プロジェクトのルートディレクトリで以下のコマンドを実行してください。

```bash
npm install @serendie/ui
```

# プロジェクトへの導入例

## Vite で React の基本プロジェクト作成

```bash
npm create vite@latest projectName
cd projectName
npm install
```

## serendie/ui をインストール

```bash
npm install -D @serendie/ui
```

## Serendie の CSS を適用

```index.css
@layer reset, base, tokens, recipes, utilities;
@import "@serendie/ui/styles.css";
```

とすれば serendie の CSS が適用されます

## コンポーネントの利用

```tsx
import { Button } from "@serendie/ui";
```

などとして Serendie が提供するコンポーネントを利用してください。

## Panda CSS を使う

Panda CSS が提供するユーティリティ関数やコンポーネントを使う

### Panda CSS をインストール

```bash
 npm install -D @pandacss/dev
```

```bash
npx panda init --postcss
```

を実行してください。

Panda のコード生成を実行するために package.json に

```package.json.diff
{
  "scripts": {
+   "panda": "panda",
+   "prepare": "panda codegen",
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  }
}
```

を追加してください

生成された `panda.config.ts` に以下の設定を追加してください。

```panda.config.ts.diff
+import { SerendiePreset } from "@serendie/ui";

export default defineConfig({
+  jsxFramework: "react",
+  presets: [SerendiePreset],
});

```

Panda CSS の関数やコンポーネントを生成するために以下のコマンドを実行してください。

```bash
npm run panda codegen
```

型情報を参照するために `tsconfig.json` に以下の設定を追加してください。

```tsconfig.json.diff
{
+  "include":  ["src", "styled-system"]
}
```

以上で Panada CSS の関数やコンポーネントを利用できるようになります。

```tsx
import { Flex } from "../styled-system/jsx";
import { css } from "../styled-system/css";
```

# テーマをカスタマイズする

生成された`panda.config.ts`を編集

semanticTokens を上書きする

```diff
   theme: {
-    extend: {},
+    extend: {
+      semanticTokens: {
+        colors: {
+          sd: {
+            system: {
+              color: {
+                impression: {
+                  noticeContainer: { value: "red" },
+                },
+              },
+            },
+          },
+        },
+      },
+    },
   },
```

index.css に自プロジェクトのスタイルも追加

```diff
diff --git a/apps/theme-study/src/index.css b/apps/theme-study/src/index.css
index e7e3f41..b042781 100644
--- a/apps/theme-study/src/index.css
+++ b/apps/theme-study/src/index.css
@@ -1,2 +1,3 @@
 @layer reset, base, tokens, recipes, utilities;
 @import "@serendie/ui/styles.css";
+@import "../styled-system/styles.css";
```

ここまでで、特定のトークンの値を変更してプロダクトに適用できる

<img src=https://github.com/user-attachments/assets/54889348-bd86-4fa8-8c9a-51e6b58cee16 width=400 />

# 動的にテーマを変更する

`panda.config.ts`で設定に`themes`を追加し、値が参照されていなくても CSS に書き出す`staticCss`の設定をする

```diff
diff --git a/apps/theme-study/panda.config.ts b/apps/theme-study/panda.config.ts
index 1542a3f..3759c67 100644
--- a/apps/theme-study/panda.config.ts
+++ b/apps/theme-study/panda.config.ts
@@ -28,4 +28,24 @@ export default defineConfig({
       },
     },
   },
+  themes: {
+    dark: {
+      semanticTokens: {
+        colors: {
+          sd: {
+            system: {
+              color: {
+                impression: {
+                  noticeContainer: { value: "blue" },
+                },
+              },
+            },
+          },
+        },
+      },
+    },
+  },
+  staticCss: {
+    themes: ["dark"],
+  },
 });
```

ここで `npm run panda`で CSS を生成

その上で index.html などに`data-panda-theme`を指定するとテーマに応じてトークンの値が差し代わる

```diff
- <html lang="en">
+ <html lang="en" data-panda-theme="dark">
```

<img src="https://github.com/user-attachments/assets/7a01e1e9-d6f4-4405-8227-788d56f72775" width=400 />

# パッケージの配布

ui ディレクトリ内で `npm run build` した後に `npm publish` でパッケージを配布できます。
`.npmrc`に GitHub Packages のアクセストークンと、serendie のパッケージレジストリを設定することで、GitHub Packages にパッケージを公開できます。
※設定に不備があると外部のレジストリに公開される場合があるので注意してください。

# FAQ

## VSCode で Design Token が保管されない

`tsconfig.json` の設定を確認したうえで、VSCode を立ち上げ直してみてください
