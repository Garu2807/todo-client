import { browserStorage } from "./BrowserStorage";
import { Todo } from "../types";

class StorageManager {
  static isLocalService = true;

  async getAll(callback: (t: Todo[]) => void) {
    let todos = [];
    todos = await browserStorage.getAll();

    callback(todos);
  }

  add(text: string) {
    return browserStorage.add(text);
  }

  toggle(id: number) {
    return browserStorage.toggle(id);
  }

  delete(id: number) {
    return browserStorage.delete(id);
  }
}

export const storageManager = new StorageManager();
