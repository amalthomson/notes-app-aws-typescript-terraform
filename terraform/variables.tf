# terraform/variables.tf
# Variable for the Lambda function name
variable "lambda_function_name" {
  default = "todo-lambda" 
}

# Variable for the Lambda handler
variable "lambda_handler" {
  default = "index.handler" 
}

# Variable for the Lambda runtime
variable "lambda_runtime" {
  default = "nodejs20.x"
}
