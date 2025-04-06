# Serendie Component Props MCP Server

Model Context Protocol (MCP) サーバーで、UIコンポーネントとデザイントークンの情報を提供します。AIアシスタントがSerendieのコンポーネントやデザインシステムを理解するための基盤となります。

## 概要

Serendie Component Props MCP Serverは次の機能を提供します：

- UIコンポーネントのプロパティ情報を自動解析して提供
- デザイントークン情報を階層的に提供
- TypeScriptの型情報から自動的にプロパティを抽出
- AIアシスタントがこれらの情報にアクセスするためのMCPインターフェース

## インストール

```bash
# プロジェクトルートから
npm install

# または、このディレクトリから
npm install
```

## 使用方法

### 開発モード

```bash
# プロジェクトルートから
npm run dev:mcp

# または、このディレクトリから
npm run dev
```

### 本番モード

```bash
# プロジェクトルートから
npm run build:mcp
npm run start:mcp

# または、このディレクトリから
npm run build
npm run start
```

## トランスポートモード

MCPサーバーは複数の通信方式（トランスポート）をサポートしています：

### stdio（標準入出力）- デフォルト

```bash
npm run start
# または
npm run start -- stdio
```

### HTTP/SSE

Server-Sent Events (SSE) を使用したHTTPトランスポート：

```bash
npm run start -- sse 3001
```

引数:

1. トランスポートモード: `stdio`（デフォルト）または `sse`
2. HTTPポート番号: SSEモード使用時のみ（デフォルト: 3001）

## 利用可能なツール

### UIコンポーネントツール

- `components:list` - すべてのコンポーネントの一覧を取得
- `components:get` - 特定のコンポーネントのプロパティ情報を取得 (パラメータ: componentName)
- `components:refresh` - コンポーネントキャッシュを更新（開発中の変更を反映）

### デザイントークンツール

- `tokens:categories` - 利用可能なトークンカテゴリの一覧を取得
- `tokens:list` - カテゴリでフィルタリングしたトークン一覧を取得 (パラメータ: category)
- `tokens:search` - キーワードでトークンを検索 (パラメータ: keyword)
- `tokens:refresh` - トークンキャッシュを更新（デザイントークン変更時）

## 使用例

### コンポーネント情報の取得

```
# すべてのコンポーネント一覧を取得
components:list

# 特定のコンポーネントのプロパティ情報を取得
components:get { "componentName": "Button" }

# 開発中にコンポーネント定義を変更した場合にキャッシュを更新
components:refresh
```

### デザイントークン情報の取得

```
# 利用可能なトークンカテゴリを取得
tokens:categories

# 特定カテゴリのトークンを取得（省略時は全トークン）
tokens:list { "category": "colors" }

# キーワードでトークンを検索
tokens:search { "keyword": "primary" }

# トークン情報をリフレッシュ
tokens:refresh
```

## システム要件

- Node.js 16.x 以上
- TypeScript 4.x 以上
- @modelcontextprotocol/sdk 最新版

## 技術的詳細

MCPサーバーは以下の処理を行います：

1. UIコンポーネントの自動解析：TypeScriptの型情報からプロパティを抽出
2. デザイントークンの階層的解析：@serendie/design-tokenからトークン情報を取得
3. スマートキャッシング：パフォーマンス向上のためのデータキャッシュと更新機能

## トラブルシューティング

- **コンポーネントが見つからない場合**：`components:refresh`を実行してキャッシュを更新
- **トークン情報が古い場合**：`tokens:refresh`を実行して最新のデザイントークンを取得
- **サーバー起動エラー**：ログを確認し、依存関係のインストールを確認してください
