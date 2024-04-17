# Spread Design System

3 つのプロジェクトから構成されるモノレポ

1. Spread UI (`/packages/ui`)
   - コンポーネントライブラリ
   - Storybook を内包
   - npm パッケージとして配布
2. Design Token (`/design-tokens`)
   - デザイントークンを定義した JSON
   - Spread UI から参照
3. Apps
   1. Site (`/apps/site`): デザインシステム公開 Web サイト
   2. Example (`/apps/example`): Spread UI を参照するサンプルプロジェクト

## Requirements

- Node v20
- npm 10

## Development

### Preparing

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
