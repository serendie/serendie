---
name: serendie-overview
description: Serendie Design System（@serendie/ui, @serendie/symbols, @serendie/design-token）の概要やセットアップ手順を提供し、詳細情報を Serendie MCP から得られるように案内する。Serendieを使った実装、コンポーネント・アイコン・デザイントークンの質問など、Serendie への言及でトリガーされる。
---

# @serendie/ui 開発ガイド

## このスキルの対象

**@serendie/ui ライブラリの利用者**（Serendie Design System に準拠したアプリケーションを構築する開発者）を対象としている。ライブラリ自体の開発やデザインシステムの運用に関する情報は含まない。

## @serendie/ui とは

三菱電機の Serendie Design System をベースにした React コンポーネントライブラリ。
Ark UI（ヘッドレスUI）を基盤に、PandaCSS でスタイリングされた適応型UIコンポーネントを提供する。

### 関連パッケージ

| パッケージ               | 役割                                                    |
| ------------------------ | ------------------------------------------------------- |
| `@serendie/ui`           | UIコンポーネント本体                                    |
| `@serendie/design-token` | デザイントークン（CSS Variables / JSON 形式でも利用可） |
| `@serendie/symbols`      | 300種類以上のアイコン（React環境前提）                  |
| `@ark-ui/react`          | ヘッドレスUIの基盤（直接インストール不要）              |
| `@pandacss/dev`          | スタイリング基盤（オプション導入で拡張可能）            |

## Serendie MCP ツール

詳細な情報は Serendie MCP サーバーのツールから取得すること。このスキルは概要の提供に留め、具体的な実装情報は MCP ツールに委ねる。

| ツール                      | 用途                           | 使いどき                                   |
| --------------------------- | ------------------------------ | ------------------------------------------ |
| `get-components`            | コンポーネント一覧の取得       | どんなコンポーネントがあるか調べたいとき   |
| `get-component-detail`      | コンポーネントの Props・使用例 | 特定コンポーネントの使い方を知りたいとき   |
| `get-design-tokens`         | デザイントークン一覧の取得     | 利用可能なトークンを調べたいとき           |
| `get-design-token-detail`   | トークンの値・使用例           | 特定トークンの詳細を知りたいとき           |
| `get-symbols`               | アイコン一覧の取得             | どんなアイコンがあるか調べたいとき         |
| `get-symbol-detail`         | アイコンの詳細・使用例         | 特定アイコンの使い方を知りたいとき         |
| `search-serendie-guideline` | デザインガイドライン検索       | デザイン方針やガイドラインを確認したいとき |

## セットアップ

### 基本セットアップ

```bash
npm install @serendie/ui
```

CSS 設定に以下を追加:

```css
@layer reset, base, tokens, recipes, utilities;
@import "@serendie/ui/styles.css";
```

以上で基本的なコンポーネントが使える。**Reset CSS は @serendie/ui に同梱済みのため、別途追加してはいけない。**

### アイコンを使う場合

```bash
npm install @serendie/symbols
```

利用可能なアイコンは MCP の `get-symbols` / `get-symbol-detail` で確認。

### PandaCSS の導入（推奨）

PandaCSS を導入すると、デザイントークンを JSX 内で直接利用できるようになる。

```bash
npm install -D @pandacss/dev
npx panda init --postcss
```

package.json に `"prepare": "panda codegen"` を追加し、panda.config.ts で `SerendiePreset` を設定:

```ts
import { SerendiePreset } from "@serendie/ui";

export default defineConfig({
  jsxFramework: "react",
  presets: [SerendiePreset],
});
```

@serendie/ui にはビルド済み CSS のみが同梱されている。そのため、PandaCSS 未導入の環境では `<Box my="sd.system.dimension.spacing.sixExtraLarge">` のようなトークン指定に対応するクラスが存在しない。この場合は CSS Variables 経由でトークンの値を利用する:

```css
.my-class {
  color: var(--sd-system-color-impression-primary);
  margin: var(--sd-system-dimension-spacing-sixExtraLarge);
}
```

## インポートパス

```tsx
// UIコンポーネント
import { TextField, Button, Select } from "@serendie/ui";

// use client 適用済みコンポーネント（Next.js等で便利）
import { TextField, Button } from "@serendie/ui/client";

// PandaCSS スタイルユーティリティ（PandaCSS導入時）
import { css } from "@serendie/ui/css";

// PandaCSS レイアウトコンポーネント（PandaCSS導入時）
import { Box, Center, Flex, Stack, VStack } from "@serendie/ui/jsx";
```

## コンポーネント概要

コンポーネントは以下のカテゴリに分類される。一覧・詳細は MCP の `get-components` / `get-component-detail` で取得すること。

- **Actions**: Button, IconButton, BottomNavigation など
- **Inputs**: TextField, PasswordField, Select, Switch など
- **Layout**: Accordion, Tabs, Divider など
- **Display**: Avatar, Badge, ProgressIndicator など
- **Feedback**: Toast, ModalDialog, Pagination など
- **Other**: その他

バリアント Props 名はコンポーネントごとに異なる（例: Button は `styleType`、Badge は `styleColor`）。汎用的な `variant` ではないので、必ず `get-component-detail` または TypeScript の型定義で確認すること。

## デザイントークン

デザイントークンは Serendie UI でスタイリングする際の基本単位。**px 値や HEX カラーの直接指定は禁止。**

トークンには「システム（`sd.system.*`）」と「リファレンス（`sd.reference.*`）」があり、実装ではシステムトークンを最優先で使用する。利用可能なトークンは MCP の `get-design-tokens` / `get-design-token-detail` で確認すること。

### よくある誤りと正しい例

**NG: px値やHEXカラーを直接指定している**

```ts
css({
  padding: "16px",
  margin: 8,
  color: "#333",
  fontSize: "16px",
});
```

**OK: デザイントークンを使用している**

```ts
css({
  p: "sd.system.dimension.spacing.medium",
  m: "sd.system.dimension.spacing.small",
  color: "sd.system.color.component.onSurface",
  textStyle: "sd.system.typography.headline.small_expanded",
});
```

**NG: リファレンストークンやセマンティクスの合わないトークンを使っている**

```ts
css({
  color: "sd.reference.color.scale.gray.500", // リファレンストークンを直接使用
  borderColor: "sd.system.color.component.onSurface", // テキスト用トークンをボーダーに
});
```

**OK: 用途に合ったシステムトークンを使っている**

```ts
css({
  color: "sd.system.color.component.onSurface", // テキスト色にはonSurface
  borderColor: "sd.system.color.component.outline", // ボーダーにはoutline
});
```

## SerendieProvider

アプリケーション全体のテーマ・カラーモード・言語を一括管理するプロバイダー。アプリのルートで設定する。

```tsx
import { SerendieProvider } from "@serendie/ui";

<SerendieProvider lang="ja" colorTheme="konjo" colorMode="system">
  {/* アプリケーション全体 */}
</SerendieProvider>;
```

- `colorTheme`: `konjo`（デフォルト）/ `asagi` / `sumire` / `tsutsuji` / `kurikawa`
- `colorMode`: `light`（デフォルト）/ `dark` / `system`（OS設定に追従）
- `lang`: `ja`（デフォルト）/ `en`

SSR 環境（Next.js等）では `ColorSchemeScript` を `<head>` に配置して FOUC（テーマのちらつき）を防止する。多言語対応には `useTranslations` フックも利用可能。

詳細は [README](./README.md) の「テーマ切り替え」「多言語対応」セクションを参照。

## 外部リソース

- ドキュメント: https://serendie.design/
- Storybook: https://storybook.serendie.design/
- Ark UI API: https://ark-ui.com/llms.txt
- PandaCSS API: https://panda-css.com/llms.txt

