# Backend configuration.
#
# The default is the local backend (state file on disk, gitignored).
# For team use, migrate to an S3 backend by uncommenting the block below
# and running `terraform init -migrate-state`.
#
# terraform {
#   backend "s3" {
#     bucket         = "your-terraform-state-bucket"
#     key            = "sds-storybook-preview/terraform.tfstate"
#     region         = "ap-northeast-1"
#     dynamodb_table = "your-terraform-state-lock-table"
#     encrypt        = true
#   }
# }
