"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTodo = createTodo;
exports.getTodo = getTodo;
exports.updateTodo = updateTodo;
exports.deleteTodo = deleteTodo;
const todoService_1 = require("../services/todoService");
const todoService = new todoService_1.TodoService();
async function createTodo(event) {
    const todo = JSON.parse(event.body || "{}");
    const id = await todoService.createTodo(todo);
    return {
        statusCode: 201,
        body: JSON.stringify({ id }),
    };
}
async function getTodo(event) {
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
async function updateTodo(event) {
    const id = event.pathParameters?.id;
    if (!id) {
        return { statusCode: 400, body: JSON.stringify({ error: "Missing id" }) };
    }
    const todo = JSON.parse(event.body || "{}");
    const success = await todoService.updateTodo(id, todo);
    if (!success) {
        return { statusCode: 404, body: JSON.stringify({ error: "Todo not found" }) };
    }
    return { statusCode: 200, body: JSON.stringify({ message: "Todo updated successfully" }) };
}
async function deleteTodo(event) {
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
