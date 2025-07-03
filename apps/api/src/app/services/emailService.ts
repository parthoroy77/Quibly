import { EmailService } from "@quibly/email-service";
import config from "../config";

const emailService = new EmailService({
  host: config.nodemailer_host as string,
  port: Number(config.nodemailer_port),
  auth: {
    user: config.nodemailer_user as string,
    pass: config.nodemailer_password as string,
  },
  appName: "Stellar Shop",
  address: config.nodemailer_user as string,
});

export const sendEmail = async (to: string, subject: string, template: string) => {
  await emailService.sendEmail({ to, subject, html: template });
};

export default emailService;
