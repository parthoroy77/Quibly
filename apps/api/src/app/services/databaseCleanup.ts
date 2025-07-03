import prisma from "@quibly/prisma/client";
import { parseTimeToDate } from "@quibly/utils/functions";
import config from "../config";
import logger from "../logger";

const sessionCleanup = async () => {
  try {
    await prisma.session.deleteMany({
      where: {
        expiresAt: {
          lte: parseTimeToDate(config.jwt_access_token_expires_in!),
        },
      },
    });
    logger.info("Expired session cleared successfully");
  } catch (error) {
    logger.error("Session cleanup failed");
  }
};

const refreshTokenCleanup = async () => {
  try {
    await prisma.refreshToken.deleteMany({
      where: {
        expiresAt: {
          lte: parseTimeToDate(config.jwt_refresh_token_expires_in!),
        },
      },
    });
    logger.info("Expired refresh tokens cleared");
  } catch (error) {
    logger.error("Refresh token cleanup failed");
  }
};

setInterval(() => {
  sessionCleanup();
}, 86400000);

setInterval(() => {
  refreshTokenCleanup();
}, 604800000);

export { refreshTokenCleanup, sessionCleanup };
