import { TodoRepository } from "../repositories/todoRepository";
import { TodoDto } from "../dto/todoDto";

export class TodoService {
  private repository: TodoRepository;

  constructor() {
    this.repository = new TodoRepository();
  }

  async createTodo(todo: TodoDto): Promise<string> {
    return this.repository.create(todo);
  }

  async getTodo(id: string): Promise<TodoDto | null> {
    return this.repository.get(id);
  }

  async updateTodo(id: string, todo: TodoDto): Promise<boolean> {
    return this.repository.update(id, todo);
  }

  async deleteTodo(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}