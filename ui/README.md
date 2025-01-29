# Serendie UI


[![GitHub](https://img.shields.io/github/license/serendie/serendie?style=flat)](https://github.com/serendie/serendie/blob/main/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/%40serendie%2Fui)](https://www.npmjs.com/package/@serendie/ui)
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://storybook.serendie.design/)

[Serendie UI Kit (Figma)](https://www.figma.com/community/file/1433690846108785966)と対となるReactベースのUIコンポーネント集です。Figma Code Connectにも対応しており、Storybookと同等の内容が[Figma Devモードでも確認](https://serendie.design/get-started/dev/#section-1)できます。

## 使い方

### インストール

デザイントークンも同梱されるので同時インストールは不要です。

```
npm install @serendie/ui
```

### プロジェクトへの導入

rootのCSSに対して、次の2行を設定してください。1行目は、Serendie UIに対して、スタイルを適切に当てるためにカスケードレイヤーの指定をするもの、2行目は同梱のデザイントークンやデフォルトスタイルを読み込むものです。

```css
@layer reset, base, tokens, recipes, utilities;
@import "@serendie/ui/styles.css";
```

### コンポーネントを使う

使いたいComponentをimportしたうえで、通常のReact Componentとして使用してください。各Componentが持つpropsについては、[ドキュメント](https://serendie.design/components/button/)や、[Storybook](https://storybook.serendie.design/?path=/story/components-button--medium)、Figma Code Connectを参照してください。

```js
import { Button } from "@serendie/ui";

<Button size="medium">Login</Button>
```

### テーマ切り替え

Serendie Design Systemには5つのカラーテーマがあり、デザイントークンもそれに対応します。htmlタグなどに、`data-panda-theme`属性 (`konjo`, `asagi`, `sumire`, `tsutusji`, `kurikawa`)を付与することでカラーテーマを切り替えることができます。
各テーマについては[こちら](https://serendie.design/foundations/theming/)を参照してください。

```html
<html data-panda-theme="asagi"></html>
```

## スタイリングライブラリと併用する

あるコンポーネントのmarginを微修正したいなど、Serendie UIのスタイルをカスタムしたいシーンでは、プロジェクト側にスタイリングライブラリ(CSS-in-JSなど)を導入してください。どのスタイリングライブラリでも併用は可能ですが、ここではSerendie UIの内部でも使用している[Panda CSS](https://panda-css.com/)の例を紹介します。

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

## 開発

Serendie UIに新しくコンポーネントを追加する場合は、Ark UIをベースにしてください。

```
npm run dev # run storybook
npm run build
```

## Figma Code Connect

Serendie UIでは、Figma Code ConnectをStorybookと繋ぎこむ形で導入しています。下記のコマンドで各コンポーネント毎のstoriesファイルの内容を、Figmaにpublishします。

```
npm run connect:publish
```

storiesファイルに変更が入ると上記が[GitHub Actions](https://github.com/serendie/serendie/blob/main/.github/workflows/publish-code-connect.yml)によって実行されます。
