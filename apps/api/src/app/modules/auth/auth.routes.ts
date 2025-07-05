import { loginSchema, registrationSchema } from "@quibly/utils/validations";
import { Router } from "express";
import zodSafeParse, { zodCookieParse } from "../../handlers/zodSafeParse";
import authMiddleware from "../../middleware/auth.middleware";
import { AuthControllers } from "./auth.controllers";
import { sessionRefreshSchema } from "./auth.schema";

const AuthRoutes = Router();

AuthRoutes.post("/registration", zodSafeParse(registrationSchema), AuthControllers.userRegistration);
AuthRoutes.post("/login", zodSafeParse(loginSchema), AuthControllers.userLogin);
AuthRoutes.post("/logout", authMiddleware(), AuthControllers.userLogout);

AuthRoutes.post("/refresh-session", zodCookieParse(sessionRefreshSchema), AuthControllers.userSessionRefresh);
AuthRoutes.get("/me", authMiddleware(), AuthControllers.getUserSession);

export default AuthRoutes;
