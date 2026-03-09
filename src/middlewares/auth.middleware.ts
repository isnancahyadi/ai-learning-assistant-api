import type { NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import { env } from "~/config/env";
import { AppError } from "~/utils";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
    email: string;
  };
}

export const requireAuth = (req: AuthRequest, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Access denied.", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      id: string;
      username: string;
      email: string;
    };

    req.user = decoded;

    next();
  } catch {
    return next(new AppError("Token not valid or expired.", 401));
  }
};
