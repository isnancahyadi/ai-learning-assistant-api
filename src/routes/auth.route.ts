import { Router } from "express";
import { AuthController } from "~/controllers/Auth.controller";
import { validateRequest } from "~/middlewares";
import { AuthService } from "~/services/Auth.service";
import { catchAsync } from "~/utils";
import { LoginSchema, RegisterSchema } from "~/validations/auth.validation";

const router = Router();

const authService = new AuthService();
const authController = new AuthController(authService);

router.post("/register", validateRequest(RegisterSchema), catchAsync(authController.register));
router.post("/login", validateRequest(LoginSchema), catchAsync(authController.login));

export default router;
