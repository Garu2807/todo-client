/**
 * Исключение неверной логики удаления туду, не передеан id для туду
 */
export class DeleteError extends Error {
  constructor(message?: string) {
    super();
    this.name = "DeleteError";
    this.message = message || "Сообщение по умолчанию";
  }
}
