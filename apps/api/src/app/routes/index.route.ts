import { Router } from "express";
import AuthRoutes from "../modules/auth/auth.routes";

const router = Router();

type TRouteModule = {
  path: string;
  route: Router;
};

const routerModules: TRouteModule[] = [{ path: "/auth", route: AuthRoutes }];

routerModules.forEach((routerModule) => {
  router.use(routerModule.path, routerModule.route);
});

export default router;
