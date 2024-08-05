/**
 * Исключение неверной логики переключения туду, не передеан id для туду
 */
export class ToggleError extends Error {
  constructor(message?: string) {
    super();
    this.name = "ToggleError";
    this.message = message || "Сообщение по умолчанию";
  }
}
