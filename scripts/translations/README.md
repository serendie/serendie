# Translation CLI

このディレクトリには `src/i18n/ui.ts` と Figma Variables を同期するための TypeScript スクリプトが入っています。共通前提として `.env` に以下を設定してください。

- `FIGMA_ACCESS_TOKEN`: Figma Personal Access Token
- `FIGMA_FILE_KEY`: 対象ファイルのキー
- `FIGMA_TRANSLATION_COLLECTION` (任意): 文字列変数コレクション名。省略時は `locales`

## コマンド

### `npm run translations:pull`
Figma 側の翻訳変数を読み込み、`src/i18n/ui.ts` を上書きします。モード名と言語コードが一致している必要があります。Figma の制約で空文字を送れないため、一時的に `"#"` が入っている値は空文字として扱われます。

### `npm run translations:push`
ローカルの `ui.ts` を Figma Variables に反映します。`"#"` または空文字のキーは「未翻訳」とみなし、Figma には `"#"` を送って placeholder として保存します。Figma 側に該当するモードが無い場合はエラーになるため、先にモードを追加してください。

### `npm run translations:lint`
言語間でキーが揃っているか、値が空文字または `"#"` になっていないかを検査します。翻訳 PR では必ずこのコマンドを通し、未翻訳状態のまま差分が混入しないようにしてください（CI でも必須ジョブ化推奨）。
