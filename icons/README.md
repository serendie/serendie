# Serendie Icons

## Usage

```tsx
import { Icon } from "@serendie/icons";

<Icon name="home" size={24} variant="filled" />;
```

## Props

- `name`: アイコンの名前、[iconNames.ts](./src/generated/iconNames.ts)を参照
- `size`: アイコンのサイズ、SVGのwidthとheightに適用される
- `variant`: アイコンのバリアント、`outlined`か`filled`

## scripts/generateIconNames.js

- `assets/outlined`と`assets/filled`にあるアイコンの名前を生成するスクリプト
- ビルド時に実行され、`src/generated/iconNames.ts`を更新する
- `npm run generate-icon-names`で手動実行することもできる
