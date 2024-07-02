# terraform/outputs.tf
# Output the base URL for the API Gateway deployment
output "api_url" {
  value = aws_api_gateway_deployment.todo_api_deployment.invoke_url 
}

# Output the URL for the "Create ToDo" endpoint
output "create_todo_endpoint" {
  value = "${aws_api_gateway_deployment.todo_api_deployment.invoke_url}/todos" 
}

# Output the URL for the "Get ToDo" endpoint
output "get_todo_endpoint" {
  value = "${aws_api_gateway_deployment.todo_api_deployment.invoke_url}/todos/{id}"
}

# Output the URL for the "Update ToDo" endpoint
output "update_todo_endpoint" {
  value = "${aws_api_gateway_deployment.todo_api_deployment.invoke_url}/todos/{id}" 
}

# Output the URL for the "Delete ToDo" endpoint
output "delete_todo_endpoint" {
  value = "${aws_api_gateway_deployment.todo_api_deployment.invoke_url}/todos/{id}" 
}
