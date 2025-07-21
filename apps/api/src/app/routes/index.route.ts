import { Router } from "express";
import AuthRoutes from "../modules/auth/auth.routes";
import QuizSessionRoutes from "../modules/quiz-session/quiz-session.routes";
import QuizRoutes from "../modules/quiz/quiz.routes";

const router = Router();

type TRouteModule = {
  path: string;
  route: Router;
};

const routerModules: TRouteModule[] = [
  { path: "/auth", route: AuthRoutes },
  { path: "/quizzes", route: QuizRoutes },
  { path: "/quiz-sessions", route: QuizSessionRoutes },
];

routerModules.forEach((routerModule) => {
  router.use(routerModule.path, routerModule.route);
});

export default router;
