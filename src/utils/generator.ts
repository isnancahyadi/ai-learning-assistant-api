import jwt from "jsonwebtoken";
import { env } from "~/config/env";

export const generateToken = (payload: { id: string; username: string; email: string }) => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
