export class AppError extends Error {
  public statusCode: number;
  public isPublic: boolean;

  constructor(message: string, statusCode = 500, isPublic = false) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isPublic = isPublic;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400, true);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string = "Erro interno no banco de dados.") {
    super(message, 500, false);
  }
}
