---
name: figma-token-sync
description: Figma デザインとコンポーネント実装のトークン差分を検証・同期する。コンポーネントのトークン更新、Figma との整合性確認時に使用。
argument-hint: [component-name または all]
allowed-tools: Read, Grep, Glob, Edit, Bash, mcp__figma-desktop__get_variable_defs, mcp__figma-desktop__get_design_context, mcp__figma-desktop__get_screenshot
---

# Figma トークン同期スキル

Serendie UI コンポーネントの実装が Figma デザインで使用されているトークンと一致しているかを検証し、差分があれば修正する。

## 対象コンポーネント（32個）

Accordion, Avatar, Badge, Banner, BottomNavigation, Button, Chart, CheckBox, ChoiceBox, DashboardWidget, DataTable, DatePicker, Divider, Drawer, DropdownMenu, IconButton, List, ModalDialog, NotificationBadge, Pagination, PasswordField, ProgressIndicator, RadioButton, Search, Select, Switch, Tabs, TextArea, TextField, Toast, Tooltip, TopAppBar

## 作業手順

### Step 1: Figma Node ID の取得

Stories ファイルから Figma URL を取得して Node ID を抽出：

```bash
grep -r "figma.*node-id" src/components/[ComponentName]/
```

URL 形式: `node-id=XXXX-YYYY` → Node ID: `XXXX:YYYY`（ハイフンをコロンに変換）

### Step 2: Figma トークン取得

`mcp__figma-desktop__get_variable_defs` ツールを使用：

```
nodeId: "XXXX:YYYY"
clientLanguages: "typescript"
clientFrameworks: "react"
```

### Step 3: 実装との比較

コンポーネントの `.tsx` ファイルを読み込み、`cva()` / `sva()` 内の色トークンを確認：

- `sd.system.color.*` - システムカラートークン
- `sd.reference.color.*` - リファレンストークン（システムトークン優先）

### Step 4: 差分の修正

**重要なルール：**
- **色トークンのみ変更** - dimension, typography などは変更しない
- **システムトークン優先** - `sd.reference.*` より `sd.system.*` を使用
- **推測禁止** - 必ず Figma で確認してから変更

## 主なトークンパターン

| 用途 | トークン例 |
|------|----------|
| 背景（通常） | `sd.system.color.component.surface` |
| 背景（浮遊要素） | `sd.system.color.component.surfaceContainerBright` |
| 背景（コンテナ） | `sd.system.color.component.surfaceContainer` |
| テキスト | `sd.system.color.component.onSurface` |
| テキスト（補助） | `sd.system.color.component.onSurfaceVariant` |
| ボーダー | `sd.system.color.component.outline` |
| ボーダー（暗め） | `sd.system.color.component.outlineDim` |
| ボーダー（明るめ） | `sd.system.color.component.outlineBright` |
| プライマリ | `sd.system.color.impression.primary` |
| プライマリ背景 | `sd.system.color.impression.primaryContainer` |
| 無効状態 | `sd.system.color.interaction.disabled` |
| 無効テキスト | `sd.system.color.interaction.disabledOnSurface` |
| ホバー | `sd.system.color.interaction.hoveredVariant` |
| 選択状態 | `sd.system.color.interaction.selectedSurface` |

## 引数

- `all` - 全32コンポーネントを検証
- `ComponentName` - 指定したコンポーネントのみ検証（例: `Button`, `CheckBox`）

## 使用例

```
/figma-token-sync all
/figma-token-sync CheckBox
/figma-token-sync Button Select
```

## 出力

変更があった場合：
1. 変更内容のサマリー（ファイル名、変更前→変更後）
2. git diff --stat の出力

変更がなかった場合：
- Figma と一致していることを報告
