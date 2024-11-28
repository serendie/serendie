# Serendie Design System

3 つのプロジェクトから構成されるモノレポ

1. Serendie UI (`/ui`)
   - コンポーネントライブラリ
   - Storybook を内包
   - npm パッケージとして配布
2. [Design Token](https://github.com/takram-design-engineering/spread/blob/main/design-tokens/README.md#design-token) (`/design-tokens`)
   - デザイントークンを定義した JSON
   - Serendie UI から参照
3. Apps
   1. Site (`/apps/site`): デザインシステム公開 Web サイト
   2. Example (`/apps/example`): Serendie UI を参照するサンプルプロジェクト

## Requirements

- Node v20
- npm 10

## Development

### Preparing

[こちらのreadme](https://github.com/serendie/serendie/tree/main/ui)の内容も実施

```
npm install
```

### Storybook

```
npm run storybook
```

### Sample Project

```
npm run dev
```
