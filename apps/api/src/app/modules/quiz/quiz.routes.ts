import { UserRole } from "@quibly/database/client";
import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import { QuizControllers } from "./quiz.controllers";

const router = Router();

router.post("/", authMiddleware(UserRole.educator), QuizControllers.createQuiz);
router.get("/", authMiddleware(), QuizControllers.getAllQuiz);
router.get("/user/", authMiddleware(UserRole.educator), QuizControllers.getAllQuizByUserId);
router.get("/with-question/:quizId", authMiddleware(UserRole.educator), QuizControllers.getQuizWithQuestion);

const QuizRoutes = router;

export default QuizRoutes;
