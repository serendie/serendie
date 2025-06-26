# Ark UI v3.5.0 → v5 アップグレードガイド

このドキュメントは、Serendie UIライブラリで使用しているArk UIを、v3.5.0から最新のv5.xにアップグレードするための詳細なガイドです。

## 目次

1. [現状分析](#現状分析)
2. [破壊的変更と影響範囲](#破壊的変更と影響範囲)
3. [アップグレード手順](#アップグレード手順)
4. [コンポーネント別の確認事項](#コンポーネント別の確認事項)
5. [Storybookテストの更新](#storybookテストの更新)
6. [型定義の変更](#型定義の変更)
7. [トラブルシューティング](#トラブルシューティング)
8. [新機能の活用（オプション）](#新機能の活用オプション)

## 現状分析

### 現在の環境
- **Ark UIバージョン**: v3.5.0
- **React**: v18.3.1以上
- **TypeScript**: v5.5.3
- **Panda CSS**: v0.53.0
- **ビルドツール**: Vite v5.3.3
- **テストツール**: Storybook v8.2.4 + test-runner

### Ark UIを使用しているコンポーネント（16個）

| コンポーネント | 使用しているArk UIコンポーネント |
|--------------|--------------------------------|
| Accordion | AccordionItemProps, Accordion |
| AccordionGroup | Accordion |
| Avatar | Avatar, AvatarRootProps |
| CheckBox | Checkbox, CheckboxRootProps |
| ChoiceBox | Checkbox, RadioGroup |
| Drawer | Dialog, DialogRootProps, Portal |
| DropdownMenu | Menu, MenuRootProps, Portal |
| ModalDialog | Dialog, DialogRootProps, Portal |
| RadioButton | RadioGroup, RadioGroupItemProps |
| RadioGroup | RadioGroup, RadioGroupRootProps |
| Search | Combobox, ComboboxRootProps, Portal |
| Select | Select, SelectRootProps, Portal |
| Switch | Switch, SwitchRootProps |
| Tabs | Tabs |
| TabItem | Tabs |
| Toast | Toast, Toaster, createToaster |

## 破壊的変更と影響範囲

### v3.5.0 → v5の主な破壊的変更

#### 1. **パフォーマンス改善による内部実装の変更**
- 外部ストアからReactのネイティブリアクティブプリミティブへ移行
- **影響**: コンポーネントの状態更新が非同期になる

#### 2. **Carouselコンポーネント**（当プロジェクトでは未使用）
- `Carousel.Root`に`slideCount`プロパティが必須
- **影響**: なし

#### 3. **Splitterコンポーネント**（当プロジェクトでは未使用）
- APIの完全な再設計
- **影響**: なし

#### 4. **テストの非同期化**
- コンポーネントのマウント時の初期状態が非同期で設定される
- **影響**: Storybookのplay関数テスト（5個）で修正が必要

### 影響を受けるStorybookテスト
1. `ModalDialog.stories.tsx` - PlayClickedButton
2. `Drawer.stories.tsx`
3. `Toast.stories.tsx`
4. `Select.stories.tsx`
5. `Search.stories.tsx`

## アップグレード手順

### 1. 事前準備

```bash
# 現在の状態をコミット
git add .
git commit -m "feat: Ark UI v5アップグレード前の状態を保存"

# アップグレード用のブランチを作成
git checkout -b upgrade/ark-ui-v5

# 現在の動作を確認
npm run build
npm run test
npm run storybook
```

### 2. 依存関係の更新

```bash
# Ark UIを最新版に更新
npm install @ark-ui/react@latest

# package.jsonのpeerDependenciesも更新されているか確認
# "peerDependencies": {
#   "@ark-ui/react": "^5.0.0",
#   ...
# }
```

### 3. ビルドエラーの確認

```bash
# TypeScriptの型チェック
npm run build:panda
npm run build:components

# 型エラーが発生した場合は、次のセクションを参照
```

### 4. コンポーネントの動作確認

```bash
# Storybookで各コンポーネントの動作を確認
npm run storybook
```

### 5. テストの更新と実行

```bash
# テストを実行してエラーを確認
npm run test

# エラーが発生した場合は、Storybookテストの更新セクションを参照
```

## コンポーネント別の確認事項

### 1. 基本的な確認事項（全コンポーネント共通）

各コンポーネントで以下を確認：

```typescript
// 型インポートの変更がないか確認
import { ComponentProps } from '@ark-ui/react'

// PropsTypeの互換性を確認
type MyComponentProps = ComponentProps & {
  // カスタムプロパティ
}
```

### 2. Portal使用コンポーネント

以下のコンポーネントはPortalを使用しているため、特に注意：
- Drawer
- DropdownMenu
- ModalDialog
- Search
- Select

```typescript
// Portalの動作が変更されていないか確認
import { Portal } from '@ark-ui/react'
```

### 3. Contextパターン使用コンポーネント

以下のコンポーネントは、親コンポーネントのContextを参照：
- CheckBox（CheckBox.Context）
- RadioButton（RadioGroup.ItemContext）

```typescript
// Context APIの変更がないか確認
<Component.Context>
  {(context) => (
    // context.valueなどのプロパティが変更されていないか
  )}
</Component.Context>
```

## Storybookテストの更新

### play関数の非同期対応

v5では、コンポーネントの初期状態が非同期で設定されるため、以下のパターンで更新が必要：

#### 修正前
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole("button");
  
  await userEvent.click(button);
  
  // 同期的な要素の取得
  const dialog = canvas.getByRole("dialog");
  expect(dialog).toBeInTheDocument();
}
```

#### 修正後
```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole("button");
  
  await userEvent.click(button);
  
  // 非同期的な要素の取得
  await waitFor(async () => {
    const dialog = await canvas.findByRole("dialog");
    expect(dialog).toBeInTheDocument();
  });
}
```

### 具体的な修正箇所

1. **ModalDialog.stories.tsx**
```typescript
// PlayClickedButtonストーリーのplay関数
await waitFor(async () => {
  const modalHeading = await root.findByText("Dialog Title");
  expect(modalHeading).toBeInTheDocument();
});
```

2. **その他のストーリーファイル**
同様のパターンでgetByRole/getByTextをfindByRole/findByTextに変更し、waitForでラップ

## 型定義の変更

### 新しいデフォルトプロパティ

v5で追加された新しいデフォルトプロパティを活用できます：

```typescript
// Combobox（Search）
interface ComboboxProps {
  defaultHighlightedValue?: string;
  defaultInputValue?: string;
  // ...
}

// Select
interface SelectProps {
  defaultHighlightedValue?: string;
  // ...
}
```

### 新しいコールバック

```typescript
// Select
interface SelectProps {
  onSelect?: (details: { value: string }) => void;
  // ...
}
```

## トラブルシューティング

### よくあるエラーと対処法

#### 1. TypeScriptの型エラー

```bash
# エラー例
Type 'ComponentProps' is not assignable to type...

# 対処法
# 1. node_modulesを削除して再インストール
rm -rf node_modules package-lock.json
npm install

# 2. TypeScriptのキャッシュをクリア
rm -rf styled-system
npm run build:panda
```

#### 2. ランタイムエラー

```javascript
// エラー例
Cannot read property 'open' of undefined

// 対処法
// onOpenChangeのイベントオブジェクトの構造を確認
onOpenChange={(details) => {
  console.log(details); // { open: boolean }の構造を確認
  setIsOpen(details.open);
}}
```

#### 3. Storybookテストのタイムアウト

```javascript
// エラー例
Timed out in waitFor after 1000ms

// 対処法
// waitForのタイムアウトを延長
await waitFor(async () => {
  // テスト内容
}, { timeout: 3000 });
```

### ロールバック手順

問題が解決できない場合：

```bash
# 変更を破棄してv3.5.0に戻す
git checkout main
git branch -D upgrade/ark-ui-v5

# 依存関係を元に戻す
npm install @ark-ui/react@3.5.0
```

## 新機能の活用（オプション）

### 新しいコンポーネント

v5で追加された新コンポーネントを活用できます：

#### 1. PasswordInput
```typescript
import { PasswordInput } from '@ark-ui/react'

// パスワード表示/非表示トグル付きの入力フィールド
<PasswordInput.Root>
  <PasswordInput.Input />
  <PasswordInput.VisibilityToggle />
</PasswordInput.Root>
```

#### 2. Listbox
```typescript
import { Listbox } from '@ark-ui/react'

// 単一/複数選択可能なリストボックス
<Listbox.Root>
  <Listbox.Item value="item1">Item 1</Listbox.Item>
  <Listbox.Item value="item2">Item 2</Listbox.Item>
</Listbox.Root>
```

### パフォーマンスの向上

v5では1.5倍〜4倍のパフォーマンス向上が期待できます：
- レンダリング速度の向上
- バンドルサイズの削減
- よりスムーズなアニメーション

## まとめ

1. **影響範囲は限定的**: CarouselとSplitterを使用していないため、主な変更はテストの非同期対応のみ
2. **段階的アップグレード**: まずv5にアップグレードし、動作確認後に新機能を検討
3. **パフォーマンス向上**: アップグレードによる大幅なパフォーマンス改善が期待できる

## 参考リンク

- [Ark UI Changelog](https://ark-ui.com/docs/overview/changelog)
- [Ark UI Documentation](https://ark-ui.com/)
- [GitHub: chakra-ui/ark](https://github.com/chakra-ui/ark)