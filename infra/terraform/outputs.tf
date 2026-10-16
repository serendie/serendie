output "bucket_name" {
  description = "S3 bucket storing Storybook previews"
  value       = aws_s3_bucket.preview.bucket
}

output "cloudfront_domain_name" {
  description = "CloudFront distribution domain name for previews"
  value       = aws_cloudfront_distribution.preview.domain_name
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID (used for cache invalidations)"
  value       = aws_cloudfront_distribution.preview.id
}

output "github_actions_role_arn" {
  description = "IAM role ARN assumed by GitHub Actions via OIDC"
  value       = aws_iam_role.github_actions.arn
}

output "waf_web_acl_arn" {
  description = "WAFv2 Web ACL ARN (CLOUDFRONT scope)"
  value       = aws_wafv2_web_acl.preview.arn
}

output "github_actions_variables" {
  description = "Values to set as GitHub repository/environment Variables for the deploy workflow"
  value = {
    AWS_ROLE_ARN               = aws_iam_role.github_actions.arn
    AWS_REGION                 = var.aws_region
    PREVIEW_BUCKET             = aws_s3_bucket.preview.bucket
    CLOUDFRONT_DOMAIN          = aws_cloudfront_distribution.preview.domain_name
    CLOUDFRONT_DISTRIBUTION_ID = aws_cloudfront_distribution.preview.id
  }
}
