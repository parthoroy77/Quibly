import { UserRole } from "@quibly/database/client";
import { GenerateQuestionValidationSchema, QuestionSchema, z } from "@quibly/utils/validations";
import { Router } from "express";
import zodSafeParse from "../../handlers/zodSafeParse";
import authMiddleware from "../../middleware/auth.middleware";
import { QuizControllers } from "./quiz.controllers";

const router = Router();

router.get("/", authMiddleware(), QuizControllers.getAllQuiz);
router.post("/", authMiddleware(UserRole.educator), QuizControllers.createQuiz);
router.get("/user/", authMiddleware(UserRole.educator), QuizControllers.getAllQuizByUserId);
router.get("/with-question/:quizId", authMiddleware(UserRole.educator), QuizControllers.getQuizWithQuestion);
router.post(
  "/:quizId/questions/batch",
  authMiddleware(UserRole.educator),
  zodSafeParse(
    z.object({
      create: z.array(QuestionSchema),
      update: z.array(QuestionSchema),
      remove: z.array(z.string()),
    })
  ),
  QuizControllers.batchQuizQuestions
);
router.post(
  "/questions/generate",
  authMiddleware(UserRole.educator),
  zodSafeParse(GenerateQuestionValidationSchema),
  QuizControllers.generateQuizQuestionsFromAI
);

const QuizRoutes = router;

export default QuizRoutes;
