import { Todo } from "../types";

export interface ITodoService {
  getAll: () => Promise<Todo[]>;
  add: (text: string) => Promise<Todo>;
  toggle: (id: number) => Promise<Todo>;
  delete: (id: number) => Promise<undefined>;
}

export type Response<Res = undefined> =
  | {
      status: "error";
      message?: string;
    }
  | {
      status: "success";
      data: Res;
    };
