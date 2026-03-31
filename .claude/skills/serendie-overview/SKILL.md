---
name: serendie-overview
description: Serendie Design System（@serendie/ui, @serendie/symbols, @serendie/design-token）の概要やセットアップ手順を提供し、詳細情報を Serendie MCP から得られるように案内する。Serendieを使った実装、コンポーネント・アイコン・デザイントークンの質問など、Serendie への言及でトリガーされる。
---

# Serendieユーザーガイド

## このスキルの対象

**Serendieが提供するライブラリの利用者**（Serendie Design System に準拠したアプリケーションを構築する開発者）を対象としている。ライブラリ自体の開発やデザインシステムの運用に関する情報は含まない。

## Serendieライブラリとは

三菱電機のSerendie Design Systemが提供するWebフロントエンド向けのライブラリ群。ReactベースのUIライブラリ `@serendie/ui` など、複数の関連パッケージから構成される。

### 関連パッケージ

Serendieが提供・メンテナンスしているライブラリは下記の通り。

| パッケージ               | 役割                                                                                                                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@serendie/ui`           | Serendie UIと呼ばれる。UIコンポーネントを提供する中核ライブラリ。Figma上のデザインライブラリ (Serendie UI Kit) と対応している。                                                             |
| `@serendie/design-token` | デザイントークンを提供する。 Panda CSS用トークンの他に、CSS Variables形式などでも提供されており、Serendie UIとは独立して使用も可能。React外の環境でデザイントークンのみ利用する場合を想定。 |
| `@serendie/symbols`      | Serendie Symbolsと呼ばれる。300種類以上のアイコン（React環境前提）を提供。Serendie UIに同梱されるが、独立して使用も可能                                                                     |

### 依存パッケージ

Serendie UIは、Ark UI（ヘッドレスUIライブラリ）およびPanda CSS（スタイリングライブラリ）に基づき開発されている。特に各コンポーネントをユーザー環境に合わせたカスタマイズをする際に、下記のAPI Docsを参照すること。

| パッケージ      | ユーザーへの影響                                                                                                                                        | API Docs                       |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `@ark-ui/react` | 同梱されるためユーザーがプロジェクトに導入する必要は無し。Serendie UIの各コンポーネントはArk UIを継承するため、適宜Ark UIのドキュメントを参照すること。 | https://ark-ui.com/llms.txt    |
| `@pandacss/dev` | ユーザーのプロジェクト導入は任意だが、スタイリング時にSerendie UIとの親和性は高い。                                                                     | https://panda-css.com/llms.txt |

## Serendie MCP

リモートMCPサーバーであるSerendie MCP (https://serendie.design/mcp) が提供されている。詳細な情報は Serendie MCPの各ツールから取得すること。

| ツール                      | 用途                                     | 使いどき                                                         |
| --------------------------- | ---------------------------------------- | ---------------------------------------------------------------- |
| `get-components`            | コンポーネント一覧の取得                 | どんなコンポーネントがあるか調べたいとき                         |
| `get-component-detail`      | コンポーネントの Props・使用例           | 特定コンポーネントの使い方を知りたいとき                         |
| `get-design-tokens`         | デザイントークン一覧の取得               | 利用可能なトークンを調べたいとき                                 |
| `get-design-token-detail`   | デザイントークンの値・使用例             | 特定トークンの詳細を知りたいとき                                 |
| `get-symbols`               | アイコン一覧の取得                       | どんなアイコンがあるか調べたいとき                               |
| `get-symbol-detail`         | アイコンの詳細・使用例                   | 特定アイコンの使い方を知りたいとき                               |
| `search-serendie-guideline` | Serendie Design Systemのガイドライン検索 | 設計指針や各種アセットの使い方、デザイン時の注意点を知りたいとき |

なお、同等の情報をドキュメントサイトおよびStorybookとしても提供している。

- ドキュメント: https://serendie.design/
- Storybook: https://storybook.serendie.design/

## 基本セットアップ

### 1.インストール

```bash
npm install @serendie/ui
```

### 2.[重要] CSSの設定

CSSのルートに以下を追加すること。**この設定が抜けると正しくCSSが適用されない。**

```css
@layer reset, base, tokens, recipes, utilities;
@import "@serendie/ui/styles.css";
```

なお、**Reset CSS は @serendie/ui に同梱済みのため、別途追加してはいけない。**

### 3.インポートパス

ユーザーの環境に合わせて、必要なコンポーネントをインポートして利用する。

```tsx
// Serendie UIのインポート (通常)
import { TextField, Button, Select } from "@serendie/ui";

// use client 適用済みのSerendie UI（Next.js環境）
import { TextField, Button } from "@serendie/ui/client";

// PandaCSS スタイルユーティリティ（PandaCSS導入時）
import { css } from "@serendie/ui/css";

// PandaCSS レイアウトコンポーネント（PandaCSS導入時）
import { Box, Center, Flex, Stack, VStack } from "@serendie/ui/jsx";
```

## Serendie Symbols (アイコン) を使う

`@serendie/ui` の依存パッケージとして自動的にインストールされるため、追加インストールは不要。`@serendie/ui` を使わずアイコンのみ利用する場合は `npm install @serendie/symbols` で個別導入する。

使用例:

```tsx
import {
  SerendieSymbolHome, // homeアイコン (outline)
  SerendieSymbolSettingsFilled, // 設定アイコン (filled)
} from "@serendie/symbols";
```

利用可能なアイコンはSerendie MCPの `get-symbols` / `get-symbol-detail` で確認すること。

## PandaCSS の導入（推奨）

ユーザープロジェクトに、PandaCSS を導入すると、デザイントークンを JSX 内で直接利用できるなど、よりシームレスにSerendie UIを利用できる。

インストール:

```bash
npm install -D @pandacss/dev
npx panda init --postcss
```

package.json に `"prepare": "panda codegen"` を追加し、panda.config.ts で **`SerendiePreset` を presets に指定する**。これによりデザイントークンやレシピがPandaCSSから利用可能になる。

```ts
import { SerendiePreset } from "@serendie/ui";

export default defineConfig({
  presets: [SerendiePreset],
  // jsxFramework, include, exclude 等はPandaCSSのドキュメントに従って設定
});
```

その他のPandaCSS設定（`include`, `exclude`, `jsxFramework` 等）は公式ドキュメント (https://panda-css.com/llms.txt) を参照のこと。

この設定により、下記のようにデザイントークン名をコード内で扱うことができる。なお、このデザイントークン名は、Figmaのデザインライブラリ (Serendie UI Kit) のデザイントークン名 (Figma Variables) と一致する。

```jsx
  <Box my="sd.system.dimension.spacing.sixExtraLarge">
```

また、css()メソッドを利用して同様のことができる。

```jsx
import { css } from "@serendie/ui/css";
// ...snip...
<div className={css({ my: "sd.system.dimension.spacing.sixExtraLarge" })}>
```

## コンポーネントの概要

コンポーネントは以下のカテゴリに分類される。一覧・詳細は Serendie MCP の `get-components` / `get-component-detail` で取得すること。

- **Actions**: Button, IconButton, BottomNavigation など
- **Inputs**: TextField, PasswordField, Select, Switch など
- **Layout**: Accordion, Tabs, Divider など
- **Display**: Avatar, Badge, ProgressIndicator など
- **Feedback**: Toast, ModalDialog, Pagination など
- **Other**: その他

バリアント Props 名はコンポーネントごとに異なる（例: Button は `styleType`、Badge は `styleColor`）。 **他のUIライブラリでみられる `variant` ではないので、必ず `get-component-detail` または TypeScript の型定義で確認すること。**

## デザイントークンの概要

- [重要] デザイントークンは、Serendie UIを扱う際のデザインにおける基本単位。**ユーザーから指定が無い限り、px値やHEXカラーなど直値の指定は禁止であり、デザイントークンを原則使うこと。**
- 利用可能なデザイントークンは Serendie MCP の `get-design-tokens` / `get-design-token-detail` で確認すること

### デザイントークンの基礎

より詳細はSerendie MCPの `search-serendie-guideline`でキーワード検索して確認すること。

- デザイントークンには「システムトークン（`sd.system.*`）」と「リファレンストークン（`sd.reference.*`）」の2層から構成される。システムトークンはリファレンストークンを参照する。
- 通常ユーザープロジェクトでは、**システムトークンを最優先で使用する。** リファレンストークンを直接扱うのは理由が無い限り避けるのがベストプラクティス。
- デザイントークンは、タイプとロールという概念を持ち、デザイントークン文字列の内部で表現される。
  - タイプ: デザイントークンのカテゴリ。カラー、書体、寸法など、適用範囲が分かる。
    - Color, Typography, Dimension, Elevationなど。`sd.system.dimension` のように3階層目で表現される。
  - ロール: タイプをさらに細分化したもの。システムトークンのみ持つ情報であり、デザイントークンの適用箇所を表す。
    - `sd.system.dimension.spacing`のように4階層目で表現される
    - Colorロール: impression（ブランドカラー）, component（UI構造色）, interaction（状態変化色: hovered, disabled等。装飾目的で流用しないこと）など
    - Typographyロール: title, headlineなど
    - Dimensionロール: spacingなど
  - [重要] タイプおよびロールは、セマンティクスに従って適切に使うこと。用途が不明なときは、Serendie MCPを活用するか、**Serendie UIコンポーネントの既存実装での使い方を調べること。**
- デザイントークンの末尾につくsuffix (`expanded`, `compact`) は、デバイス環境を示す。`expanded`はPC/Laptop環境、`compact`はスマートフォン環境に対応している。レスポンシブデザインの場合は、breakpointごとに使い分けるなど、ユーザーのプロジェクトに合わせて使い分けること。

### よくある誤りと正しい例

**NG: px値やHEXカラーを直接指定している**

```ts
css({
  padding: "16px",
  margin: 8,
  color: "#333",
  fontSize: "16px",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
});
```

**OK: デザイントークンを使用している**

```ts
css({
  p: "sd.system.dimension.spacing.medium",
  m: "sd.system.dimension.spacing.small",
  color: "sd.system.color.component.onSurface",
  textStyle: "sd.system.typography.headline.small_expanded",
  borderRadius: "sd.system.dimension.radius.medium",       // 8px相当
  boxShadow: "sd.system.elevation.shadow.level2",           // カード等の浮遊感
});
```

なお `textStyle` は PandaCSS の [Text Styles](https://panda-css.com/docs/theming/text-styles) 機能を利用しており、fontSize / fontWeight / lineHeight 等を個別に指定するのではなく `textStyle` で一括指定する。

**NG: リファレンストークンやセマンティクスの合わないトークンを使っている**

```ts
css({
  color: "sd.reference.color.scale.gray.500", // リファレンストークンを直接使用
  borderColor: "sd.system.color.component.onSurface", // テキスト用トークンをボーダーに (セマンティクスの不一致)
  bg: "sd.system.color.interaction.disabled", // interactionロールは状態変化専用。「グレーの背景が欲しいから」と装飾目的で流用してはいけない
});
```

**OK: 用途に合ったシステムトークンを使っている**

```ts
css({
  color: "sd.system.color.component.onSurface", // テキスト色にはonSurface
  borderColor: "sd.system.color.component.outline", // ボーダーにはoutline
});
```

## 発展

### カラーテーマ

- Serendie UIは、組み込みで5つのカラーテーマ (konjo, asagi, kurikawa, sumire, tsutsuji) を持ち、デフォルトはkonjo
- htmlタグなどに、data-panda-theme属性を付与することで、CSS 環境であってもテーマを切り替えることができる

```html
<html data-panda-theme="asagi"></html>
```

### カラーモードおよび多言語対応

- Serendie UIは、前述のカラーテーマのほか、カラーモード (端末に応じたライト/ダークモード)や、言語切替 (日英) もサポート
- カラーモードと言語切替を利用する場合は、 `SerendieProvider` をアプリケーションのルートで利用すること。カラーテーマも `SerendieProvider` から指定可能
- SSR 環境（Next.js等）では `ColorSchemeScript` を `<head>` に配置して FOUC（テーマのちらつき）を防止する

```tsx
import { SerendieProvider } from "@serendie/ui";

<SerendieProvider lang="ja" colorTheme="konjo" colorMode="system">
  {/* アプリケーション全体 */}
</SerendieProvider>;
```

詳細は`@serendie/ui`のREADME の「テーマ切り替え」「多言語対応」セクションを参照。

### CSS Variablesを利用する

プロジェクトの制約によりPandaCSSを利用できないが、Serendieのデザイントークンを適用したい場合は、CSS Variablesが利用可能。

```css
.my-class {
  color: var(--sd-system-color-impression-primary);
  margin: var(--sd-system-dimension-spacing-sixExtraLarge);
}
```
