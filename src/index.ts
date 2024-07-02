import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as todoController from "./controllers/todoController";

export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  const { httpMethod, resource } = event;

  switch (`${httpMethod} ${resource}`) {
    case "POST /todos":
      return todoController.createTodo(event);
    case "GET /todos/{id}":
      return todoController.getTodo(event);
    case "PUT /todos/{id}":
      return todoController.updateTodo(event);
    case "DELETE /todos/{id}":
      return todoController.deleteTodo(event);
    default:
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Not Found" }),
      };
  }
}