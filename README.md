<h1 align='center'>
  <picture>
    <source srcset='https://github.com/user-attachments/assets/afa39feb-f100-43f4-9f08-d11c81208dc8' media="(prefers-color-scheme: dark)" width='400px'/>
    <img src='https://github.com/user-attachments/assets/a6e4b78e-a50c-4c6b-b04a-bb159a826b65' alt="Serendie Design System" title="Serendie Design System" width='400px'/>
  </picture>
</h1>

<div align="center">

[![GitHub](https://img.shields.io/github/license/serendie/serendie?style=flat)](https://github.com/serendie/serendie/blob/main/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/%40serendie%2Fui)](https://www.npmjs.com/package/@serendie/ui)
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://storybook.serendie.design/)
[![X](https://img.shields.io/twitter/follow/SerendieDesign)](https://x.com/SerendieDesign/)

</div>
<br/>

[Serendie Design System](https://serendie.design/)は、多様な事業と人々をつなぎ、新たな価値を生み出すための三菱電機によるオープンなデザインシステムです。<br/>
[デザイントークン](https://github.com/serendie/design-token)や[Serendie Symbols](https://github.com/serendie/serendie-symbols)など複数のリポジトリから構成され、本リポジトリはSerendie UIを扱います。

# Serendie UI

[Serendie UI Kit (Figma)](https://www.figma.com/community/file/1433690846108785966)と対となるReactベースのUIコンポーネント集です。Figma Code Connectにも対応しており、Storybookと同等の内容が[Figma Devモードでも確認](https://serendie.design/get-started/dev/#section-1)できます。

## 使い方

### インストール

[デザイントークン](https://github.com/serendie/design-token)も同梱されます。

```
npm install @serendie/ui
```

### プロジェクトへの導入

rootのCSSに対して下記を指定してください。1行目は、Serendie UIに対して、スタイルを適切に当てるためにカスケードレイヤーの指定をするもの、2行目は同梱のデザイントークンやデフォルトスタイルを読み込むものです。

```css
@layer reset, base, tokens, recipes, utilities;
@import "@serendie/ui/styles.css";
```

### コンポーネントを使う

各Componentのpropsについては、[ドキュメント](https://serendie.design/components/button/)や、[Storybook](https://storybook.serendie.design/?path=/story/components-button--medium)、Figma Code Connectを参照してください。

```js
import { Button } from "@serendie/ui";

<Button size="medium">Login</Button>;
```

#### Next.js App Routerでの使用

Next.js App RouterのServer Componentから使用する場合は、`@serendie/ui/client`からインポートすることで、`use client`ディレクティブを記述する必要がなくなります。

```js
// app/page.tsx - Server Component
import { Button } from "@serendie/ui/client";

export default function Page() {
  return <Button size="medium">Login</Button>;
}
```

Client Componentでも同様に使用できます：

```js
// app/client-component.tsx - Client Component
"use client";
import { Tabs, TabItem, ModalDialog } from "@serendie/ui/client";

export default function ClientComponent() {
  // インタラクティブなコンポーネントも問題なく動作します
  return <Tabs defaultValue="tab1">...</Tabs>;
}
```

### テーマ切り替え

Serendie Design Systemには5つのカラーテーマがあり、デザイントークンもそれに対応します。htmlタグなどに、`data-panda-theme`属性 (`konjo`, `asagi`, `sumire`, `tsutusji`, `kurikawa`)を付与することでカラーテーマを切り替えることができます。
各テーマについては[こちら](https://serendie.design/foundations/theming/)を参照してください。

```html
<html data-panda-theme="asagi"></html>
```

### 多言語対応

Serendie UIは日本語・英語の多言語対応をサポートしています。`SerendieProvider`を使用して、アプリケーション全体の言語を設定できます。

**注意**: `SerendieProvider`を使用しない場合、デフォルトで日本語が使用されます。

```tsx
import { SerendieProvider } from "@serendie/ui";

function App() {
  return (
    <SerendieProvider lang="ja">
      {/* アプリケーション全体 */}
    </SerendieProvider>
  );
}
```

#### Next.js App Routerでの多言語対応

```tsx
// app/layout.tsx
import { SerendieProvider } from "@serendie/ui";

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { lang: "ja" | "en" };
}) {
  return (
    <html lang={params.lang}>
      <body>
        <SerendieProvider lang={params.lang}>
          {children}
        </SerendieProvider>
      </body>
    </html>
  );
}
```

## スタイリングライブラリと併用する

マージンを微修正したいなど、Serendie UIのスタイルをカスタムしたいシーンでは、プロジェクト側にスタイリングライブラリ(CSS-in-JSなど)を導入してください。どのスタイリングライブラリでも併用は可能ですが、ここではSerendie UIの内部でも使用している[Panda CSS](https://panda-css.com/)の例を紹介します。

### SerendiePresetの追加

Panda CSS導入後に生成される`panda.config.ts`に下記を追記することで、Panda CSSの[Preset](https://panda-css.com/docs/customization/presets)とSerendie Design Systemのデザイントークンを繋ぎこみます。

```
+import { SerendiePreset } from "@serendie/ui";

export default defineConfig({
+  jsxFramework: "react",
+  presets: [SerendiePreset],
});
```

より実践的な例は、こちらの[サンプルプロジェクト](https://github.com/serendie/bootcamp?tab=readme-ov-file#%E3%82%B9%E3%82%BF%E3%82%A4%E3%83%AA%E3%83%B3%E3%82%B0%E3%83%A9%E3%82%A4%E3%83%96%E3%83%A9%E3%83%AA%E3%81%A8%E4%BD%B5%E7%94%A8%E3%81%99%E3%82%8B)を参考にしてください。

## APIを詳しく知る

Serendie UIはヘッドレスUIとして、[Ark UI](https://ark-ui.com/)を内部的に利用しており、各コンポーネントのAPIはArk UIを継承します。Selectコンポーネントなどインタラクションが複雑なコンポーネントは、Ark UIの[APIリファレンス](https://ark-ui.com/react/docs/components/select#api-reference)を合わせて参照してください。

## Serendie UIの開発

Serendie UIに新しくコンポーネントを追加する場合は、Ark UIをベースにしてください。

```
npm run dev
npm run build
```

### Figma Code Connect

Serendie UIでは、Figma Code ConnectをStorybookと繋ぎこむ形で導入しています。下記のコマンドで各コンポーネント毎のstoriesファイルの内容を、Figmaにpublishします。

```
npm run connect:publish
```

storiesファイルに変更が入ると上記が[GitHub Actions](https://github.com/serendie/serendie/blob/main/.github/workflows/publish-code-connect.yml)によって実行されます。

### 翻訳データの管理

Serendie UIの翻訳データは`src/i18n/dictionary.ts`で管理されており、Figma Variablesと同期できます。

#### コンポーネント内での翻訳の使用

`useTranslations`フックを使用して、コンポーネント内で翻訳テキストを取得できます：

```tsx
import { useTranslations } from "@serendie/ui";

function MyComponent() {
  const t = useTranslations();

  return (
    <div>
      {/* 変数なし */}
      <label>{t("common.required")}</label>

      {/* 変数あり - {{key}} プレースホルダーを使用 */}
      <span>{t("pagination.page", { page: 5 })}</span>
    </div>
  );
}
```

翻訳辞書では`{{key}}`形式のプレースホルダーを使用します：

```typescript
// src/i18n/dictionary.ts
export const dictionary = {
  ja: {
    "common.required": "必須",
    "pagination.page": "{{page}}ページ目",
  },
  en: {
    "common.required": "Required",
    "pagination.page": "Page {{page}}",
  },
} as const;
```

#### 環境設定

`.env`ファイルに以下を設定してください：

```env
FIGMA_ACCESS_TOKEN="YOUR_TOKEN"
FIGMA_FILE_KEY="YOUR_FILE_KEY"
# FIGMA_TRANSLATION_COLLECTION="locales"  # オプション（デフォルト: locales）
```

#### 翻訳管理コマンド

```bash
# Figmaから翻訳データを取得して src/i18n/dictionary.ts を更新
npm run locales:pull

# ローカルの翻訳データをFigma Variablesに反映
npm run locales:push

# 翻訳データの整合性チェック（キーの不足や空文字のチェック）
npm run locales:lint
```

翻訳データの詳細については[scripts/locales/README.md](scripts/locales/README.md)を参照してください。

## Resources

Serendie Design Systemは、Serendie UI (本リポジトリ) のほか以下の関連リポジトリから構成されています。

| Package name                          | Location                                                                                     | Description                                                                                                                                               |
| ------------------------------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@serendie/design-token`              | [serendie/design-token](https://github.com/serendie/design-token)                            | [W3C Design Token Format Module](https://serendie.design/foundations/design-tokens/#section-6)の仕様で定義されたSerendie UIのベースとなるデザイントークン |
| `@serendie/symbols`                   | [serendie/symbols](https://github.com/serendie/serendie-symbols)                             | Serendieらしい300種類以上のSVGアイコン集                                                                                                                  |
| `@serendie/figma-utils`               | [serendie/figma-utils](https://github.com/serendie/figma-utils)                              | Figma REST APIを用いて、`@serendie/design-token`とFigma Variablesの同期を行うためのユーティリティー集                                                     |
| `@serendie/style-dictonary-formatter` | [serendie/style-dictonary-formatter](https://github.com/serendie/style-dictionary-formatter) | デザイントークンを各プラットフォームに展開するための[amzn/style-dictonary](https://github.com/amzn/style-dictionary)のフォーマッタ                        |

### Examples

主要パッケージの導入サンプルとして、[serendie/bootcamp](https://github.com/serendie/bootcamp)を用意しています。また三菱電機内ではハンズオン形式で使い方を紹介するブートキャンプを開催しています。

### サブブランド対応

Serendie Design Systemは[三菱電機の有する多様な事業に適応](https://serendie.design/about/#section-3)することがコンセプトの一つです。

`@serendie/desigon-token`および`@serendie/ui`は、デフォルトでSerendieのVisual Identity (VI)を継承しますが、各事業ブランドのVIに合わせてテーミングできるよう社内向けに[serendie/subbrands-template](https://github.com/serendie/subbrands-template)を整備しています。

詳しくはSerendie Design Systemチームまでお問い合わせください。

## License

各パッケージはMITライセンスの下で配布されています。 詳しくは[LICENSE](/LICENSE)を参照してください。
