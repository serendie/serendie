variable "aws_region" {
  description = "AWS region for S3 bucket and IAM resources"
  type        = string
  default     = "ap-northeast-1"
}

variable "bucket_name_prefix" {
  description = "Prefix for the Storybook preview S3 bucket. Final name is '<prefix>-<aws_account_id>'."
  type        = string
  default     = "sds-storybook-preview"
}

variable "github_repository" {
  description = "GitHub repository allowed to deploy previews, in 'owner/repo' format"
  type        = string
  default     = "serendie/serendie"

  validation {
    condition     = can(regex("^[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+$", var.github_repository))
    error_message = "github_repository must be in 'owner/repo' format."
  }
}

variable "github_environment" {
  description = "GitHub Actions Environment name that gates OIDC assume-role"
  type        = string
  default     = "storybook-preview"
}

variable "allowed_ipv4_cidrs" {
  description = "IPv4 CIDR blocks (company VPN / office egress) allowed to view previews via WAF"
  type        = list(string)

  validation {
    condition     = length(var.allowed_ipv4_cidrs) > 0
    error_message = "allowed_ipv4_cidrs must not be empty. Without it nobody can reach the preview site."
  }

  validation {
    condition     = alltrue([for c in var.allowed_ipv4_cidrs : can(cidrhost(c, 0))])
    error_message = "Each entry in allowed_ipv4_cidrs must be a valid CIDR block (e.g. 203.0.113.0/24)."
  }
}

variable "allowed_ipv6_cidrs" {
  description = "IPv6 CIDR blocks allowed to view previews via WAF (optional)"
  type        = list(string)
  default     = []

  validation {
    condition     = alltrue([for c in var.allowed_ipv6_cidrs : can(cidrhost(c, 0))])
    error_message = "Each entry in allowed_ipv6_cidrs must be a valid IPv6 CIDR block (e.g. 2001:db8::/32)."
  }
}

variable "create_oidc_provider" {
  description = "Whether to create the GitHub Actions OIDC provider in this account. Set false if it already exists."
  type        = bool
  default     = true
}

variable "iam_role_name" {
  description = "Name of the IAM role assumed by GitHub Actions to deploy previews"
  type        = string
  default     = "sds-storybook-preview-github-actions"
}

variable "cloudfront_price_class" {
  description = "CloudFront price class"
  type        = string
  default     = "PriceClass_200"
}

variable "preview_retention_days" {
  description = "Days after which orphaned preview objects are expired by S3 lifecycle (safety net)"
  type        = number
  default     = 90
}

variable "tags" {
  description = "Default tags applied to all resources"
  type        = map(string)
  default = {
    Project = "serendie-design-system"
    Purpose = "storybook-preview"
  }
}
