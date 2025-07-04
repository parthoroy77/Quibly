import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

export default {
  NODE_ENV: process.env.NODE_ENV as string,
  port: process.env.PORT as string,

  web_domain_url: process.env.WEB_DOMAIN_URL as string,
  api_domain_url: process.env.API_DOMAIN_URL as string,

  database_url: process.env.DATABASE_URL as string,

  google_client_id: process.env.GOOGLE_CLIENT_ID as string,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
  better_auth_secret: process.env.BETTER_AUTH_SECRET as string,
};
