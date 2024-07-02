"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const todoRepository_1 = require("../repositories/todoRepository");
class TodoService {
    repository;
    constructor() {
        this.repository = new todoRepository_1.TodoRepository();
    }
    async createTodo(todo) {
        return this.repository.create(todo);
    }
    async getTodo(id) {
        return this.repository.get(id);
    }
    async updateTodo(id, todo) {
        return this.repository.update(id, todo);
    }
    async deleteTodo(id) {
        return this.repository.delete(id);
    }
}
exports.TodoService = TodoService;
