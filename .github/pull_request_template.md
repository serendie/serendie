<!--
日本語の後に英語を併記しています。該当項目にチェックを入れてください。
Please check the applicable items. Instructions are in HTML comments.
-->

## 概要 / Summary

<!--
このPRで追加・変更するコンポーネントと目的を簡潔に記載してください。
Briefly describe the component(s) added/changed and their purpose.
-->

## 公開スコープ / Release scope

<!--
どちらか一方にチェックしてください。/ Check one.
- Custom System: MELCOグループ内限定で利用されるコンポーネント / MELCO Group internal only
- Base System: OSS として公開される汎用コンポーネント / Published as open source
-->

- [ ] Custom System(MELCOグループ内限定 / MELCO Group internal only)
- [ ] Base System(OSS公開 / Open source)

## 申請者セルフチェック / Self-check

<!--
すべてチェックしてください。チェックできない項目がある場合は概要欄で理由を説明してください。
Check all items. If any cannot be checked, explain why in the Summary.
-->

- [ ] 商用・有償ライセンスの素材(フォント・画像・アイコン等)や依存パッケージを含まない / Contains no commercial or paid-license assets (fonts, images, icons) or dependencies
- [ ] ロジック完全分離:API通信・業務ロジック・グローバル状態管理を含まない(UIのみ) / UI only — no backend communication, business logic, or global state
- [ ] `@serendie/ui` の既存コンポーネント、デザイントークン(`sd.system.*`)、`@serendie/symbols` を再利用している / Reuses existing `@serendie/ui` components, `sd.system.*` design tokens, and `@serendie/symbols`
- [ ] Storybook ストーリー(CSF3)を同梱している / Storybook stories (CSF3) are included
- [ ] 基本アクセシビリティを確認した(コントラスト・フォーカスリング・キーボード操作・タップ領域・ラベル) / Basic accessibility checked (contrast, focus ring, keyboard operation, tap target size, labels)

<!--
コントリビュート手順の詳細は docs/skills.md を参照してください。
See docs/skills.md for the contribution guide.
-->

## 運営確認欄 / For maintainers (DIC/IDC only)

<!--
申請者は記入しないでください。運営(DIC/IDC)が審査時にチェックします。
Do not fill this in — checked by maintainers during review.
-->

- [ ] CI通過（ESLint / Storybook build）・tsc / axe-core 結果確認済み / CI passed (ESLint / Storybook build); tsc / axe-core results reviewed
- [ ] Devin レビューコメント確認済み / Devin review comment checked
- [ ] DIC 技術審査 承認 / DIC technical review approved
- [ ] IDC デザイン審査 承認（Storybook プレビュー確認）/ IDC design review approved (via Storybook preview)
