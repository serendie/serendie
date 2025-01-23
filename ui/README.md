# Serendie UI


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

あるコンポーネントのpaddingやmarginを微修正したいなど、Serendie UIのスタイルをカスタムしたいシーンでは、プロジェクト側にスタイリングライブラリ(CSS-in-JSなど)を導入してください。どのスタイリングライブラリでも併用は可能ですが、ここではSerendie UIの内部でも使用している[Panda CSS](https://panda-css.com/)の例を紹介します。

### Panda CSSの導入

各プロジェクトの環境に合わせて導入が必要です。こちらの[サンプルプロジェクト](https://github.com/serendie/bootcamp)を参考にしてください。

### SerendiePresetの追加

Panda CSS導入後に生成される`panda.config.ts`に下記を追記することで、Panda CSSの[Preset](https://panda-css.com/docs/customization/presets)とSerendie Design Systemのデザイントークンを繋ぎこみます。

```
+import { SerendiePreset } from "@serendie/ui";

export default defineConfig({
+  jsxFramework: "react",
+  presets: [SerendiePreset],
});
```

その後、Panda CSSが提供するユーティリティやコンポーネントを生成するために以下のコマンドを実行してください。

```
npm run panda codegen
```

### サンプル

下記のように、Panda CSSの提供するユーティリティ (`css`) やレイアウトコンポーネント (`VStack`) を使いつつ、デザイントークンや、Serendie UI、Serendie Symbolsを組み合わせて画面をスタイリングすることができます。

```typescript
import { Button, TextField } from "@serendie/ui";
import { VStack } from "../styled-system/jsx";
import { css } from "../styled-system/css";
import { SerendieSymbol } from "@serendie/symbols";

function App() {
  return (
    <main
      className={css({
        padding: "sd.system.dimension.spacing.extraLarge",
        "& h1": {
          textStyle: "sd.system.typography.title.large_compact",
          marginBottom: "sd.system.dimension.spacing.extraLarge",
        },
      })}
    >
      <h1>SDS Bootcamp</h1>
      <VStack
        gap={"sd.system.dimension.spacing.extraLarge"}
        alignItems="flex-start"
      >
        <TextField label="メールアドレス" placeholder="email" />
        <TextField label="パスワード" placeholder="password" />
        <Button
          size="medium"
          className={css({ width: "100%" })}
          leftIcon={<SerendieSymbol name="login" />}
        >
          ログイン
        </Button>
        <Button styleType="ghost" size="small" className={css({ px: 0 })}>
          パスワードをお忘れですか？
        </Button>
      </VStack>
    </main>
  );
}

export default App;
```
