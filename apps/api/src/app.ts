import { toNodeHandler } from "better-auth/node";
import cookieParser from "cookie-parser";
import express, { Application } from "express";
import { ApiResponse } from "./app/handlers/ApiResponse";
import globalErrorHandler from "./app/handlers/globalErrorHandler";
import notFoundHandler from "./app/handlers/notFounderHandler";
import { applyLogger } from "./app/logger";
import { applyCors } from "./app/middleware/cors.middleware";
import { authConfig } from "./app/modules/auth/auth.config";
import router from "./app/routes/index.route";

const app: Application = express();

// logger
applyLogger(app);

// cookie parser
app.use(cookieParser());

// cors middleware
applyCors(app);

// Better Auth Config
app.all("/api/v1/auth/*splat", toNodeHandler(authConfig));

// body parser
app.use(express.json());

// Test Routes
app.get("/ping", (_, res) => {
  ApiResponse(res, { message: "OK", success: true, statusCode: 200, data: {} });
});

app.get("/api/v1", (_, res) => {
  ApiResponse(res, { message: "Server Running", success: true, statusCode: 200, data: {} });
});

// routes
app.use("/api/v1", router);

// handle global error handler
app.use(globalErrorHandler);

// handle 404 error
app.use(notFoundHandler);

export default app;
