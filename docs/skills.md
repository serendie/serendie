# SDS Family コンポーネント申請ガイド / Contribution Guide

海外拠点・事業部から Serendie UI (`@serendie/ui`) へコンポーネントを
申請・コントリビュートする際のガイドです。
Guide for overseas subsidiaries and business units contributing components
to Serendie UI (`@serendie/ui`).

---

## 申請前準備 / Preparation

### 社内 Agent Skills(推奨)

申請前に中谷さんが提供する以下のスキルを使うと、Serendie に則った
コンポーネント作成とプレビュー確認ができます。

Using the internal skills below (maintained by Nakatani-san) before
submitting helps you build Serendie-compliant components and preview them.

<!-- TODO: 以下のプレースホルダーを正式なインストール手順・URLに置き換える / Replace placeholders with the official install steps and URLs -->

1. **internal-design-system-builder**
   - インストール / Install: `{{INTERNAL_DESIGN_SYSTEM_BUILDER_INSTALL_COMMAND}}`
   - ドキュメント / Docs: `{{INTERNAL_DESIGN_SYSTEM_BUILDER_URL}}`
   - Serendie の設計ルールに沿ったコンポーネントの骨格を生成します。
2. **product-ui-preview-builder**
   - インストール / Install: `{{PRODUCT_UI_PREVIEW_BUILDER_INSTALL_COMMAND}}`
   - ドキュメント / Docs: `{{PRODUCT_UI_PREVIEW_BUILDER_URL}}`
   - 作成したコンポーネントのプレビューを生成します。

一般的な手順 / Typical workflow:

1. スキルをインストール / Install the skill
2. スキルを実行してコンポーネント/プレビューを生成 / Run it to generate the component/preview
3. 出力内容を確認(トークン使用・ストーリー同梱など)/ Check the output
4. PR に結果を添付 / Attach results to the PR

### 公式 Agent Skill / Official Agent Skill

エージェントに Serendie の知識を与える公式 Skill が公開されています。

```bash
npx skills add serendie/serendie
```

Claude Code をお使いの場合は Plugin 形式での導入が推奨されます。
詳細: <https://serendie.design/ai/agent-skills>

### Serendie MCP 接続 / Serendie MCP server

Serendie MCP に接続すると、コンポーネント一覧・デザイントークン・
アイコン・ガイドラインをエージェントが参照できます。

- エンドポイント / Endpoint: `https://serendie.design/mcp`
- ドキュメント / Docs: <https://serendie.design/ai/mcp-server>

Claude Code:

```bash
claude mcp add --transport http serendie https://serendie.design/mcp
```

汎用的な設定例 / Generic JSON config:

```json
{
  "mcpServers": {
    "serendie": {
      "type": "http",
      "url": "https://serendie.design/mcp"
    }
  }
}
```

---

## ルール / Rules

### ロジック完全分離 / Strict logic separation

申請コンポーネントは **UI のみ** です。API 通信・環境変数・シークレット・
業務ロジック・グローバル状態を含めてはいけません。
データは props で受け取り、イベントはコールバックで返します。
コンテナ(データ取得を伴う部品)は製品側リポジトリに置いてください。

Submitted components are **UI only**. No fetch/API calls, env vars, secrets,
business logic, or global state. Data comes in via props; events go out via
callbacks. Containers belong in your product repository.

```tsx
// ✅ Good: props in / callbacks out
<LineChart data={data} onSelect={handleSelect} />

// ❌ Bad: component fetching its own data
function MyChart() {
  useEffect(() => {
    fetch(`${process.env.API_URL}/metrics`).then(...); // NG
  }, []);
}
```

### Storybook ストーリー(CSF3)

- `X.stories.tsx` をコンポーネントと同じディレクトリに配置
  / Colocate `X.stories.tsx` with the component.
- 以下の形式に従う / Follow this pattern:

```tsx
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: MyComponent,
  // argTypes, parameters, ...
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    /* ... */
  },
};
```

- ストーリーは `args` を使うオブジェクト形式。`Template.bind` は使わない
  / Object stories with `args`; do not use `Template.bind`.
- 最低限 `Default` + 各主要バリアント + 状態(disabled, error 等)を用意
  / Include at least `Default`, each main variant, and states (disabled, error, ...).
- 操作可能な props は `argTypes` で controls を設定
  / Expose interactive props via `argTypes` controls.
- ストーリー内でネットワーク通信を行わない
  / No network access inside stories.
- `parameters.a11y` は、正当な理由がある場合のみ disable に使用し、
  理由をコメントに残す / Use `parameters.a11y` only to disable axe with
  a documented justification.

---

## セルフチェック / Self-check

PR テンプレートと同じ内容です。申請前に確認してください。
Same list as the PR template — verify before submitting.

- [ ] 商用・有償ライセンスの素材/依存を含まない
      / No commercial or paid-license assets or dependencies
- [ ] ロジック完全分離(API通信・業務ロジック・状態管理なし)
      / Strict logic separation (no API calls, business logic, state)
- [ ] `@serendie/ui` 既存コンポーネント・`sd.system.*` トークン・
      `@serendie/symbols` を利用
      / Reuses existing components, `sd.system.*` tokens, `@serendie/symbols`
- [ ] Storybook(CSF3)同梱 / Stories included (CSF3)
- [ ] 基本アクセシビリティ(コントラスト・フォーカスリング・
      キーボード操作・タップ領域・ラベル)
      / Basic accessibility (contrast, focus ring, keyboard, tap target, labels)

---

## プレビューと CI の仕組み / How preview & CI work

PR を作成すると自動で以下が実行されます:

| チェック        | 結果                                      |
| --------------- | ----------------------------------------- |
| ESLint          | **Blocking** — 失敗すると審査に進めません |
| Storybook build | **Blocking**                              |
| tsc             | 参考情報(non-blocking)                    |
| axe-core        | 参考情報(non-blocking)                    |

ビルドが成功すると、`Storybook Preview` ボットが PR に
**プレビュー URL のコメント**を投稿します。
この URL は **社内 VPN / 拠点ネットワークからのみ閲覧可能**です
(WAF による IP 制限)。IDC のデザイン審査はこのプレビューで行われます。

When a build succeeds, a bot posts a **preview URL** comment on the PR.
The URL is **accessible only from the company VPN** (WAF IP restriction).
IDC design review happens on this preview.
