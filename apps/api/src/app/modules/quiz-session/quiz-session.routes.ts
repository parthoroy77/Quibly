import { Router } from "express";
import zodSafeParse from "../../handlers/zodSafeParse";
import authMiddleware from "../../middleware/auth.middleware";
import { QuizSessionControllers } from "./quiz-session.controllers";
import { QuizSessionValidationSchema } from "./quiz-session.schema";

const router = Router();

router.post(
  "/",
  authMiddleware("educator"),
  zodSafeParse(QuizSessionValidationSchema),
  QuizSessionControllers.createQuizSession
);

const QuizSessionRoutes = router;

export default QuizSessionRoutes;
