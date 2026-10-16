terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source = "hashicorp/aws"
      # thumbprint_list on aws_iam_openid_connect_provider became optional in v5.81.0
      version = "~> 5.81"
    }
  }
}
