# terraform/lambda.tf
# Data block to create a zip archive from the 'dist' directory
data "archive_file" "lambda_zip" {
  type        = "zip" 
  source_dir  = "${path.module}/../dist" 
  output_path = "${path.module}/lambda.zip" 
}

# Resource block to define an AWS Lambda function
resource "aws_lambda_function" "todo_lambda" {
  filename         = data.archive_file.lambda_zip.output_path
  function_name    = var.lambda_function_name                 
  role             = aws_iam_role.lambda_role.arn            
  handler          = var.lambda_handler                     
  runtime          = var.lambda_runtime                      
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256 

  # Environment variables for the Lambda function
  environment {
    variables = {
      S3_BUCKET_NAME = aws_s3_bucket.todo_bucket.id 
    }
  }
}
