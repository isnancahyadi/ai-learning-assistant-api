import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodObject } from "zod";

export const validateRequest = (schema: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }));

        res.status(400).json({
          status: "Failed",
          message: "Validation Error",
          errors: errorMessages,
        });
      }

      next(error);
    }
  };
};
