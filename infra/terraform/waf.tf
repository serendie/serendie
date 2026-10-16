resource "aws_wafv2_ip_set" "ipv4" {
  provider = aws.us_east_1

  name               = "${var.bucket_name_prefix}-allowed-ipv4"
  scope              = "CLOUDFRONT"
  ip_address_version = "IPV4"
  addresses          = var.allowed_ipv4_cidrs
}

resource "aws_wafv2_ip_set" "ipv6" {
  provider = aws.us_east_1
  count    = length(var.allowed_ipv6_cidrs) > 0 ? 1 : 0

  name               = "${var.bucket_name_prefix}-allowed-ipv6"
  scope              = "CLOUDFRONT"
  ip_address_version = "IPV6"
  addresses          = var.allowed_ipv6_cidrs
}

resource "aws_wafv2_web_acl" "preview" {
  provider = aws.us_east_1

  name  = "${var.bucket_name_prefix}-acl"
  scope = "CLOUDFRONT"

  default_action {
    block {
      custom_response {
        response_code = 403
      }
    }
  }

  rule {
    name     = "allow-company-networks"
    priority = 0

    action {
      allow {}
    }

    statement {
      dynamic "or_statement" {
        for_each = length(var.allowed_ipv6_cidrs) > 0 ? [1] : []
        content {
          statement {
            ip_set_reference_statement {
              arn = aws_wafv2_ip_set.ipv4.arn
            }
          }
          statement {
            ip_set_reference_statement {
              arn = aws_wafv2_ip_set.ipv6[0].arn
            }
          }
        }
      }

      dynamic "ip_set_reference_statement" {
        for_each = length(var.allowed_ipv6_cidrs) > 0 ? [] : [1]
        content {
          arn = aws_wafv2_ip_set.ipv4.arn
        }
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "${var.bucket_name_prefix}-allow"
      sampled_requests_enabled   = true
    }
  }

  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "${var.bucket_name_prefix}-acl"
    sampled_requests_enabled   = true
  }
}
