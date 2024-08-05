/**
 * Исключение неверной логики запроса списка туду
 */
export class GetAllError extends Error {
  constructor(message?: string) {
    super();
    this.name = "GetAllError";
    this.message = message || "Сообщение по умолчанию";
  }
}
