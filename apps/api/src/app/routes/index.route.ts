import { Router } from "express";

const router = Router();

type TRouteModule = {
  path: string;
  route: Router;
};

const routerModules: TRouteModule[] = [];

routerModules.forEach((routerModule) => {
  router.use(routerModule.path, routerModule.route);
});

export default router;
