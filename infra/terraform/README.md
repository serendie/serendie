# Storybook プレビュー基盤 (Terraform)

海外拠点・事業部からの SDS Family コンポーネント PR に対して、
Storybook ビルド成果物を CloudFront + S3 でホスティングするための基盤です。
WAF で IP 制限を行い、社内 VPN / 拠点ネットワークからのみ閲覧可能にします。

## アーキテクチャ

- **S3**: プレビュー成果物を `pr-<番号>/` プレフィックス配下に保存。非公開(OAC 経由のみ)。
- **CloudFront**: OAC (sigv4) で S3 にアクセス。CloudFront Function で `/pr-N/` → `/pr-N/index.html` を書き換え。
- **WAF (CLOUDFRONT scope, us-east-1)**: デフォルト Block (403)。許可 IP セットにのみ Allow。
- **IAM OIDC**: GitHub Actions がアクセスキーなしで AssumeRole。
  `sub = repo:<owner>/<repo>:environment:<env>` に限定するため、Environment 経由のジョブ以外は引き受け不可。
- **ライフサイクル**: `preview_retention_days` 経過した `pr-*` オブジェクトを自動削除(クローズ時削除のセーフティネット)。

## 前提条件

- Terraform >= 1.5
- 対象 AWS アカウントへの管理者相当の権限(S3 / CloudFront / WAF / IAM の作成)
- CloudFront 用 WAF は **us-east-1 固定**(`us_east_1` プロバイダで自動対応)

## 適用手順

```bash
cd infra/terraform
cp terraform.tfvars.example terraform.tfvars
# terraform.tfvars を編集: allowed_ipv4_cidrs に社内 VPN / 拠点の
# 出口 IP レンジを記入(実 IP は gitignore される terraform.tfvars のみに書く)
terraform init
terraform plan
terraform apply
```

`aws_iam_openid_connect_provider` (token.actions.githubusercontent.com) が
アカウントに既に存在する場合は `create_oidc_provider = false` に設定してください。

## GitHub 側の設定(apply 後)

1. リポジトリの **Settings → Environments** で Environment
   `storybook-preview` を作成します。
2. `terraform output github_actions_variables` の値を、リポジトリまたは
   Environment の **Variables** として設定します:

   | Variable                     | 内容                                            |
   | ---------------------------- | ----------------------------------------------- |
   | `AWS_ROLE_ARN`               | GitHub Actions が引き受ける IAM ロール ARN      |
   | `AWS_REGION`                 | S3 バケットのリージョン                         |
   | `PREVIEW_BUCKET`             | プレビュー用 S3 バケット名                      |
   | `CLOUDFRONT_DOMAIN`          | CloudFront ドメイン名                           |
   | `CLOUDFRONT_DISTRIBUTION_ID` | キャッシュ無効化に使うディストリビューション ID |

3. `.github/workflows/storybook-preview-deploy.yml` がこれらの変数を参照します。
   変数が未設定の場合、ワークフローは AWS デプロイをスキップし、
   「プレビュー未構成」のコメントだけを投稿します。

## セキュリティメモ

- アクセスキーは発行しません。OIDC + Environment 制約のみ。
- バケットは完全非公開(パブリックアクセスブロック全て有効、OAC のみ GetObject 許可)。
- `terraform.tfvars` には実 IP を書きますが、gitignore 済みです。
  `.example` / コードには documentation レンジのみ記載してください。

## ステート管理

デフォルトはローカルバックエンドです。チームで運用する場合は
`backend.tf` のコメントアウトされた S3 backend 設定を有効化してください。
