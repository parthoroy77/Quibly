import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

export default {
  NODE_ENV: process.env.NODE_ENV as string,
  port: process.env.PORT as string,
};
