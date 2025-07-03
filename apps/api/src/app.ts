import cookieParser from "cookie-parser";
import express, { Application } from "express";
import morgan from "morgan";
import { ApiResponse } from "./app/handlers/ApiResponse";
import globalErrorHandler from "./app/handlers/globalErrorHandler";
import notFoundHandler from "./app/handlers/notFounderHandler";
import logger from "./app/logger";
import { applyCors } from "./app/middleware/cors.middleware";
import router from "./app/routes/index.route";

const app: Application = express();

// parser
app.use(express.json());
app.use(cookieParser());

// cors middleware
applyCors(app);
const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

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
