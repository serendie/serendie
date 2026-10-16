data "aws_caller_identity" "current" {}

data "aws_partition" "current" {}

locals {
  bucket_name     = "${var.bucket_name_prefix}-${data.aws_caller_identity.current.account_id}"
  github_oidc_url = "https://token.actions.githubusercontent.com"
}
