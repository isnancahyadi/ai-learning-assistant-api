import { eq, or } from "drizzle-orm";

import db from "~/db";
import { usersTable } from "~/db/schema";
import { AppError, generateToken } from "~/utils";
import type { LoginInputType, RegisterInputType } from "~/validations/auth.validation";

export class AuthService {
  async register(data: RegisterInputType) {
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(or(eq(usersTable.email, data.email), eq(usersTable.username, data.username)))
      .limit(1);

    if (existingUser.length > 0) {
      throw new AppError("Email or Username already registered", 400);
    }

    const hashedPassword = await Bun.password.hash(data.password, "bcrypt");

    const result = await db
      .insert(usersTable)
      .values({
        username: data.username,
        email: data.email,
        password: hashedPassword,
      })
      .returning({
        id: usersTable.id,
        username: usersTable.username,
        email: usersTable.email,
      });

    const newUser = result[0];

    const token = generateToken({
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
    });

    return {
      user: newUser,
      token,
    };
  }

  async login(data: LoginInputType) {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, data.email))
      .limit(1);

    if (user.length === 0) {
      throw new AppError("Invalid credential", 401);
    }

    const foundUser = user[0];

    const isPasswordMatch = await Bun.password.verify(data.password, foundUser.password);

    if (!isPasswordMatch) {
      throw new AppError("Invalid credential", 401);
    }

    const token = generateToken({
      id: foundUser.id,
      email: foundUser.email,
      username: foundUser.username,
    });

    return {
      user: {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
      },
      token,
    };
  }
}
