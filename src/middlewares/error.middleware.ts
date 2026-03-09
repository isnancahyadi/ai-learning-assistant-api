import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "~/utils";

export const globalErrorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ZodError) {
    const errorMessages = err.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    return res.status(400).json({
      status: "Failed",
      message: "Validation Error",
      errors: errorMessages,
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.statusCode >= 500 ? "Error" : "Failed",
      message: err.message,
      errors: null,
    });
  }

  return res.status(500).json({
    status: "Error",
    message: "An internal error occurred on the server",
    errors: null,
  });
};
