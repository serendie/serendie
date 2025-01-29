# Design Token

[![GitHub](https://img.shields.io/github/license/serendie/serendie?style=flat)](https://github.com/serendie/serendie/blob/main/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/%40serendie%2Fdesign-token)](https://www.npmjs.com/package/@serendie/design-token)

[デザイントークン](https://serendie.design/foundations/design-tokens/)はSerendie Design Systemを構成する最小単位です。コードベースとデザイン(Figma)でデザイントークンを共有することで、**Single Source of Truth**を実現することを念頭において設計されています。

## 使い方

デザイントークン(`@serendie/design-token`)は、Serendie UI(`@serendie/ui`)に同梱されますが、単独で使用することもできます。単独で使用する場合は、HTML/CSS環境など React以外でも使用できます。
最もシンプルな使い方を紹介します。

### インストール

```
npm install @serendie/design-token
```

### CSS Variablesとして使う

```css
@import "@serendie/design-token/tokens.css";

h1 {
  font-size: var(--sd-reference-typography-scale-expanded-large);
  color: var(--sd-system-color-impression-primary);
}
```

### テーマ切り替え

Serendie Design Systemには5つのカラーテーマがあり、デザイントークンもそれに対応します。htmlタグなどに、`data-panda-theme`属性 (`konjo`, `asagi`, `sumire`, `tsutusji`, `kurikawa`)を付与することで、CSS 環境であってもテーマを切り替えることができます。
各テーマについては[こちら](https://serendie.design/foundations/theming/)を参照してください。

```html
<html data-panda-theme="asagi"></html>
```

## ドキュメント

デザイントークンの設計思想は[ドキュメントサイト](https://serendie.design/foundations/design-tokens/)を参照してください。提供するリファレンストークンおよびシステムトークンの[一覧](https://serendie.design/foundations/design-tokens/reference-tokens/)もあります。

また[カラーロール](https://serendie.design/foundations/color/role/)や[タイポグラフィロール](https://serendie.design/foundations/typography/#section-4)といった、デザイントークンの役割についても解説しています。デザイントークンをベースに独自のUIコンポーネントを作る際に参照してください。

## 仕様

デザイントークンはリファレンストークンとシステムトークンの2種類で構成され、[W3C Design Token Format Module](https://design-tokens.github.io/community-group/format/)の仕様に沿ってJSON形式で定義します。`/tokens`に置かれたJSONファイルをビルドした後、Serendie UIやFigma Variablesに展開します。

> [!IMPORTANT]
> W3C Design Token Format Moduleではテーマの扱いがまだ定まっていません。そのため次のような独自の命名規則を採用し、Figma Variablesとの整合性を考慮しています。
> ここでテーマとは、カラーテーマの変化や、ブラウザ幅によるフォントサイズの変化など、コンテキスト毎のデザイントークンセットを指します。
> またFigma Variablesではテーマを、Varialbeモードと呼びます。

**命名規則**
- `typography.compact.json`や`color.konjo.json`のように2重拡張子でテーマ名を表現する
  - 単一テーマの場合は、`.default.json`とする
- 1つのJSONファイルが、Figma Variables上で1つのVariableモードとして展開される
  - `.default.json`は、Figma Variablesのデフォルトモードとして扱う

## ビルド

[`@serendie/style-dictionary-formatter`](https://github.com/serendie/serendie/tree/main/style-dictionary-formatter)によってデザイントークンのJSONファイルを各プラットフォームに合わせて加工します。成果物は `/dist` に配置され、Serendie UI から利用されます。

```
npm run build
```

## Figma Variablesとの同期

[`@serendie/figma-utils`](https://github.com/serendie/figma-utils)によって、デザイントークンJSONファイルをFigma Vairablesに同期します。

```
npm run sync-json-to-figma
```

なお、`/tokens`に変更が入るとGitHub Actionsにて[自動で実行](https://github.com/serendie/serendie/blob/main/.github/workflows/sync-tokens-to-figma.yml)されます。

> [!WARNING]
> この仕組みは三菱電機社内向けです。Figma REST APIを利用しており、Figmaのエンタープライズプラン契約が必要になります。
