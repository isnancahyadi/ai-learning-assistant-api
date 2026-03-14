import type { Request, Response } from "express";
import type { AuthService } from "~/services/Auth.service";
import { BaseController } from "./base-controller";

export class AuthController extends BaseController {
  constructor(private authService: AuthService) {
    super();
  }

  register = async (req: Request, res: Response) => {
    const user = await this.authService.register(req.body);
    return this.sendSuccess(res, user, "User registered successfully");
  };

  login = async (req: Request, res: Response) => {
    const data = await this.authService.login(req.body);
    return this.sendSuccess(res, data, "Login successful");
  };
}
