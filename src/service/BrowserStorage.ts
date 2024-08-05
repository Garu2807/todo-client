import { ITodoService } from "./types";
import { Todo } from "../types";
import { AddError } from "./errors/add.error";
import { ToggleError } from "./errors/toggle.error";
import { DeleteError } from "./errors/delete.error";

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class BrowserStorage implements ITodoService {
  static lastId = 0;

  constructor() {
    // Инициализируем состояние из localStorage
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      const todos = JSON.parse(storedTodos);
      BrowserStorage.lastId =
        todos.reduce((maxId, todo) => Math.max(maxId, todo.id), 0) + 1;
    }
  }

  private saveToLocalStorage(todos: Todo[]) {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  private getTodosFromLocalStorage(): Todo[] {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  }

  getAll() {
    const todos = this.getTodosFromLocalStorage();
    return Promise.resolve(todos);
  }

  async add(text: string) {
    if (!text) {
      return Promise.reject(new AddError());
    }

    const todos = this.getTodosFromLocalStorage();

    const todo: Todo = {
      text,
      active: true,
      id: BrowserStorage.lastId,
    };

    todos.push(todo);
    this.saveToLocalStorage(todos);

    BrowserStorage.lastId++;

    return Promise.resolve(todo);
  }

  toggle(id: number) {
    if (id === undefined) {
      return Promise.reject(new ToggleError());
    }

    const todos = this.getTodosFromLocalStorage();
    const indexTodo = todos.findIndex((el) => el.id === id);

    if (indexTodo === -1) {
      return Promise.reject(new ToggleError());
    }

    todos[indexTodo].active = !todos[indexTodo].active;
    this.saveToLocalStorage(todos);

    return Promise.resolve(todos[indexTodo]);
  }

  delete(id: number) {
    if (id === undefined) {
      return Promise.reject(new DeleteError());
    }

    const todos = this.getTodosFromLocalStorage();
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    this.saveToLocalStorage(updatedTodos);

    return Promise.resolve(undefined);
  }
}

export const browserStorage = new BrowserStorage();
