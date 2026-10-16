provider "aws" {
  region = var.aws_region

  default_tags {
    tags = var.tags
  }
}

# WAF for CloudFront (CLOUDFRONT scope) must be created in us-east-1
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"

  default_tags {
    tags = var.tags
  }
}
