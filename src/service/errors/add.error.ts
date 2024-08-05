/**
 * Исключение неверной логики добавления новой туду, не передеан текст для туду
 */
export class AddError extends Error {
  constructor(message?: string) {
    super();
    this.name = "AddError";
    this.message = message || "Сообщение по умолчанию";
  }
}
