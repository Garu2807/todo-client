# Реализовать сервис для работы с данными todo хранящимися на сервере

В приложении реализована логика хранения/добавления/удаления/изменения данных todo в локальном стейте приложения. Необходимо сервис с аналогичной логикой работы. Апи, создаваемого сервиса, должно совпадать с апи существующего сервиса работы с данными todo (`/src/service/BrowserStorage.ts`).

Реализуем `/src/service/ServerStorage.ts`

`class ServerStorage` должен реализовывать интерфейс `ITodoService` `/src/service/types.ts`

API сервера:

```typescript
type Todo = {
  id: number;
  text?: string;
  active: boolean;
};

// domain https://localhost:3001

// GET /list
type ListRequest = undefined;

type ListResponse = {
  status: "success" | "error";
  data?: Todo[];
};

// POST /add
type AddRequest = {
  text: string;
};

type AddResponse = {
  status: "success" | "error";
  data?: Todo;
};

// POST /toggle/:id параметр id передаётся в урле
type ToggleRequest = undefined;

type ToggleResponse = {
  status: "success" | "error";
  data?: Todo;
};

// DELETE /delete/:id параметр id передаётся в урле
type DeleteRequest = undefined;

type DeleteResponse = {
  status: "success" | "error";
  data: undefined;
};
```
