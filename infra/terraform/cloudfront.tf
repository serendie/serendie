data "aws_cloudfront_cache_policy" "caching_optimized" {
  name = "Managed-CachingOptimized"
}

# Rewrite URIs ending in "/" so that /pr-12/ serves /pr-12/index.html
resource "aws_cloudfront_function" "index_rewrite" {
  name    = "${var.bucket_name_prefix}-index-rewrite"
  runtime = "cloudfront-js-2.0"
  publish = true
  code    = <<-EOF
    function handler(event) {
      var request = event.request;
      if (request.uri.endsWith("/")) {
        request.uri += "index.html";
      }
      return request;
    }
  EOF
}

resource "aws_cloudfront_origin_access_control" "preview" {
  name                              = var.bucket_name_prefix
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "preview" {
  enabled             = true
  is_ipv6_enabled     = true
  http_version        = "http2and3"
  price_class         = var.cloudfront_price_class
  default_root_object = "index.html"
  web_acl_id          = aws_wafv2_web_acl.preview.arn

  origin {
    domain_name              = aws_s3_bucket.preview.bucket_regional_domain_name
    origin_id                = "s3-preview"
    origin_access_control_id = aws_cloudfront_origin_access_control.preview.id
  }

  default_cache_behavior {
    target_origin_id       = "s3-preview"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true
    cache_policy_id        = data.aws_cloudfront_cache_policy.caching_optimized.id

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.index_rewrite.arn
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}
