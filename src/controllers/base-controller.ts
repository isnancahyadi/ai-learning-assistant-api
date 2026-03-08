import type { Response } from "express";

export abstract class BaseController {
  protected sendSuccess<T>(
    res: Response,
    data: T | null = null,
    message: string = "Success",
    statusCode: number = 200,
  ): Response {
    return res.status(statusCode).json({
      status: "Success",
      message,
      data,
    });
  }
}
