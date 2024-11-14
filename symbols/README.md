# Serendie Symbols

## Usage

```tsx
import { Symbol } from "@serendie/symbols";

<Symbol name="home" size={24} variant="filled" />;
```

## Props

- `name`: アイコンの名前、[symbolNames.ts](./src/generated/symbolNames.ts)を参照
- `size`: アイコンのサイズ、SVGのwidthとheightに適用される
- `variant`: アイコンのバリアント、`outlined`か`filled`

## scripts/generateSymbolNames.js

- `assets/outlined`と`assets/filled`にあるアイコンの名前を生成するスクリプト
- ビルド時に実行され、`src/generated/symbolNames.ts`を更新する
- `npm run generate-symbol-names`で手動実行することもできる
