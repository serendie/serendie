# Design Token

## Design Token JSON File (`/tokens`)

[W3C Design Token Format Module](https://design-tokens.github.io/community-group/format/)の仕様に沿って書かれたデザイントークン本体です。このファイルをデザイントークンの SSOT として、Serendie UI 実装や Figma Variables に展開します。

- 命名規則
  - 1 つのファイルが、Figma 上で 1 つのモードとして展開されます
  - `.expanded.json` のように 2 重拡張子でモード名を表現します。`.default.json`とした場合は、Figma Variables のデフォルトモードとして扱われます。

## JSON to Figma Script (`/json_to_figma`)

デザイントークン JSON ファイルを、Figma Variables に展開する (JSON to Figma) ためのスクリプトです。Figma REST API を使うため、エンタープライズプラン契約の Figma ファイルのみ実行可能です。

### Prepare

通常は CI 上で実行されますが、ローカルで動かす場合は下記を記述した `/design-tokens/.env` を作成してください。

```
PERSONAL_ACCESS_TOKEN=パーソナルアクセストークン
FILE_KEY=該当FigmaファイルのKEY
```

パーソナルアクセストークンは[Variables の Read/Write 権限](https://www.figma.com/developers/api#access-tokens)が必要です。エンタープライズプラン契約時のみスコープが設定できます（ゲストアカウントは不可）

### Usage

```
npm run sync-json-to-figma
```

## Style Dictonary (`/style_dictonary`)

デザイントークン JSON ファイルを、React/Panda CSS で利用しやすい状態に加工するビルドスクリプトです。生成物は `/dist` に書き出され、Serendie UI から利用されます。

### Usage

```
npm run build
```

## Figma Plugin (`/figma_plugin`)

JSON to Figma Variables 用のプラグイン。API を使わずにアドホックに試したいときに使う想定
