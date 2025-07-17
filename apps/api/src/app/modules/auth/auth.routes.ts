import { loginSchema, registrationSchema, z } from "@quibly/utils/validations";
import { Router } from "express";
import zodSafeParse, { zodCookieParse } from "../../handlers/zodSafeParse";
import authMiddleware from "../../middleware/auth.middleware";
import { AuthControllers } from "./auth.controllers";
import { resendVerificationEmailSchema, sessionRefreshSchema, verifyAccountSchema } from "./auth.schema";

const router = Router();

router.post("/registration", zodSafeParse(registrationSchema), AuthControllers.userRegistration);
router.post("/login", zodSafeParse(loginSchema), AuthControllers.userLogin);
router.post("/logout", authMiddleware(), AuthControllers.userLogout);
router.post(
  "/onboarding",
  authMiddleware(),
  zodSafeParse(z.object({ role: z.enum(["educator", "student"]) })),
  AuthControllers.userOnboarding
);
router.post(
  "/resend-verification",
  zodSafeParse(resendVerificationEmailSchema),
  AuthControllers.resendUserVerificationEmail
);
router.post("/verify-account", zodSafeParse(verifyAccountSchema), AuthControllers.userAccountVerify);

router.post("/refresh-session", zodCookieParse(sessionRefreshSchema), AuthControllers.userSessionRefresh);
router.get("/me", authMiddleware(), AuthControllers.getUserSession);

const AuthRoutes = router;

export default AuthRoutes;
