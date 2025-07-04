import { formatDate } from "date-fns/format";
import { Application } from "express";
import morgan from "morgan";
import { createLogger, format, transports } from "winston";
const { combine, timestamp, json, colorize } = format;

// Custom format for console logging with colors
const consoleLogFormat = format.combine(
  format.colorize(),
  format.printf(({ level, message, timestamp }) => {
    return `${level}: ${message}   ${formatDate(timestamp as string, "hh:mm:ss:ms")}`;
  })
);

// Create a Winston logger
const logger = createLogger({
  level: "info",
  format: combine(colorize(), timestamp(), json()),
  transports: [
    new transports.Console({
      format: consoleLogFormat,
    }),
    // saving the log in filesystem
    // new transports.File({ filename: "api.log" }),
  ],
});

export default logger;

const morganFormat = ":method :url :status :response-time ms";

export const applyLogger = (app: Application) => {
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
};
