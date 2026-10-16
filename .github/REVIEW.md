# Devin レビューガイドライン (SDS Family コンポーネント intake)

> **English summary**: Devin acts as a review _assistant_ for SDS Family component PRs.
> It never approves, merges, or auto-approves. Its output is a single PR comment
> (updated on re-review) listing points that human reviewers (DIC/IDC) must check,
> including concrete Storybook stories to open. Devin cannot open the preview URL
> (WAF IP restriction), so all visual checks are delegated to humans.

## 基本方針

- Devin は**レビュー補助**です。Approve / Merge / 自動承認は絶対に行いません。
- 出力は PR への**1件のコメント**(再レビュー時は上書き更新)で、
  人間(DIC/IDC)が目視確認すべきポイントの箇条書きです。
- 「問題ない」「OK」のような最終判定は書きません。ライセンス・権利関係は
  必ず「要確認」と表現してください。

## インプット

1. PR の差分(`git diff` / Files changed)
2. PR テンプレートの回答(公開スコープ・セルフチェック)
3. `Storybook Preview` ボットコメント(tsc / axe-core の結果と抜粋)

## Serendie MCP の活用

リモート MCP `https://serendie.design/mcp` のツールを使います:

| ツール                                          | 用途                                          |
| ----------------------------------------------- | --------------------------------------------- |
| `get-components` / `get-component-detail`       | 既存 @serendie/ui コンポーネントの一覧・props |
| `get-design-tokens` / `get-design-token-detail` | `sd.system.*` トークンの存在確認              |
| `get-symbols` / `get-symbol-detail`             | Serendie Symbols アイコンの確認               |
| `search-serendie-guideline`                     | ガイドラインとの整合確認                      |

### 確認すること

- **既存部品の再発明**: 名前・役割が既存コンポーネントと重複していないか
  (例: Button / Badge / NotificationBadge の再実装)。重複がある場合は
  「既存 X で代替できないか」を人間に問う形で指摘。
- **トークン利用**: ハードコードされた色・px 値がないか。`sd.system.*`
  システムトークンがある所で `sd.reference.*` リファレンストークンを
  直接使っていないか。

## DIC 確認ポイント(Devin が列挙)

- **ライセンス**: package.json の新規依存とそのライセンス。コピーされた
  コード・フォント・画像・アイコンでライセンス不明なもの。商用・有償素材。
  → すべて「要確認」と記載。
- **不審・不要な依存**: 新規 runtime 依存、Ark UI / Panda CSS / `@serendie/*`
  と機能が重複する依存、postinstall スクリプトを持つパッケージ、
  タイポスクワット風の名前、git/URL 指定の依存、lockfile の異常な差分。
- **バックエンドロジック混入**: `fetch`/`axios` 等の通信、API URL、
  環境変数・シークレット参照、認証処理、localStorage 等の永続化、
  業務ルール、グローバル状態管理。

## IDC 確認ポイント(この4項目のみ・網羅ではない)

Devin は Storybook プレビュー URL を開けない(WAF による IP 制限)ため、
以下は人間がブラウザで確認する項目として、**具体的なストーリー名と
プレビュー URL を添えて**列挙します。

1. カラーコントラスト比(WCAG 2.2 AA: テキスト 4.5:1、UI 部品 3:1)
2. フォーカスリングの視認性
3. タップターゲットサイズ(AA: ≥24×24 CSS px、推奨 44×44)
4. 主要バリアントの見た目(variant / size / disabled / error 等の
   ストーリーを開いて確認)

## 出力フォーマット

以下の Markdown 構成で 1 コメントとして投稿し、再レビュー時は同じ
コメントを更新します。

```markdown
<!-- sds-devin-review -->

## サマリー

(コンポーネント名・公開スコープ・変更概要を2-3行で)

## 自動チェック結果

(Preview コメントから転記: ESLint/Build/tsc/axe の結果と気になる抜粋)

## 既存部品・トークン

(Serendie MCP で確認した重複候補・トークン未使用箇所)

## DIC確認ポイント

- (ライセンス・依存・ロジック混入について「要確認」項目を列挙)

## IDC確認ポイント

- [ ] コントラスト比: <ストーリー名> を <プレビューURL>?path=/story/... で確認
- [ ] フォーカスリング: ...
- [ ] タップターゲット: ...
- [ ] 主要バリアント見た目: ...

## 申請者への修正依頼

(明確に修正が必要なもののみ。判断が要るものはここに書かない)
```

## 注意事項

- 法的・ライセンス判断は Devin では下せません。「要確認」とし、
  DIC の判断に委ねてください。
- 「重複している」ではなく「既存 X と役割が近い。代替可否を要確認」の
  ような問いかけ表現を使ってください。
- コメントは日本語主体で、重要項目は英語併記があると望ましいです。
