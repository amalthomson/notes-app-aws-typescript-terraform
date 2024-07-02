import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { TodoService } from "../services/todoService";
import { TodoDto } from "../dto/todoDto";

const todoService = new TodoService();

export async function createTodo(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  const todo: TodoDto = JSON.parse(event.body || "{}");
  const id = await todoService.createTodo(todo);
  return {
    statusCode: 201,
    body: JSON.stringify({ id }),
  };
}

export async function getTodo(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  const id = event.pathParameters?.id;
  if (!id) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing id" }) };
  }
  const todo = await todoService.getTodo(id);
  if (!todo) {
    return { statusCode: 404, body: JSON.stringify({ error: "Todo not found" }) };
  }
  return { statusCode: 200, body: JSON.stringify(todo) };
}

export async function updateTodo(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  const id = event.pathParameters?.id;
  if (!id) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing id" }) };
  }
  const todo: TodoDto = JSON.parse(event.body || "{}");
  const success = await todoService.updateTodo(id, todo);
  if (!success) {
    return { statusCode: 404, body: JSON.stringify({ error: "Todo not found" }) };
  }
  return { statusCode: 200, body: JSON.stringify({ message: "Todo updated successfully" }) };
}

export async function deleteTodo(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  const id = event.pathParameters?.id;
  if (!id) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing id" }) };
  }
  const success = await todoService.deleteTodo(id);
  if (!success) {
    return { statusCode: 404, body: JSON.stringify({ error: "Todo not found" }) };
  }
  return { statusCode: 200, body: JSON.stringify({ message: "Todo deleted successfully" }) };
}