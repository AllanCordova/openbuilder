import { ActionResponse } from "@/types/ActionResponse.type";
import { AppError, ValidationError } from "@/lib/errors";
import z from "zod";
import { authService } from "@/service/Auth.service";

export const Wrapper = {
  privateValidated: function <TSchema extends z.ZodTypeAny, TReturn>(
    schema: TSchema,
    action: (userId: string, data: z.infer<TSchema>) => Promise<TReturn>,
  ) {
    return withErrorCatching(
      withAuthentication(withValidation(schema, action)),
    );
  },

  publicValidated: function <TSchema extends z.ZodTypeAny, TReturn>(
    schema: TSchema,
    action: (data: z.infer<TSchema>) => Promise<TReturn>,
  ) {
    return withErrorCatching(async (inputData: unknown) => {
      const parsed = schema.safeParse(inputData);

      if (!parsed.success) {
        const firstError = parsed.error.issues[0];
        throw new ValidationError(firstError?.message ?? "Dados inválidos");
      }

      return action(parsed.data);
    });
  },

  private: function <TArgs extends any[], TReturn>(
    action: (userId: string, ...args: TArgs) => Promise<TReturn>,
  ) {
    return withErrorCatching(withAuthentication(action));
  },

  public: function <TArgs extends any[], TReturn>(
    action: (...args: TArgs) => Promise<TReturn>,
  ) {
    return withErrorCatching(action);
  },
};

function withErrorCatching<TArgs extends any[], TReturn>(
  action: (...args: TArgs) => Promise<TReturn>,
) {
  return async (...args: TArgs): Promise<ActionResponse<TReturn>> => {
    try {
      const data = await action(...args);
      return { success: true, data };
    } catch (error: unknown) {
      if (process.env.ENVIRONMENT === "true") {
        console.error("Action Error:", {
          name: error instanceof Error ? error.name : "",
          message: error instanceof Error ? error.message : "",
          stack: error instanceof Error ? error.stack : "",
        });
      }

      const isPublicError = error instanceof AppError && error.isPublic;
      const message =
        isPublicError && error instanceof Error
          ? error.message
          : "Ocorreu um erro inesperado.";

      return {
        success: false,
        error: message,
        data: null,
      };
    }
  };
}

function withAuthentication<TArgs extends any[], TReturn>(
  action: (userId: string, ...args: TArgs) => Promise<TReturn>,
) {
  return async (...args: TArgs): Promise<TReturn> => {
    const userResponse = await authService.getCurrentUser();

    if (!userResponse) {
      throw new ValidationError("User not authenticated");
    }

    const userId = userResponse.id;
    return action(userId, ...args);
  };
}

function withValidation<TSchema extends z.ZodTypeAny, TReturn>(
  schema: TSchema,
  action: (userId: string, data: z.infer<TSchema>) => Promise<TReturn>,
) {
  return async (userId: string, inputData: unknown): Promise<TReturn> => {
    const parsed = schema.safeParse(inputData);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      throw new ValidationError(firstError?.message);
    }

    return action(userId, parsed.data);
  };
}
