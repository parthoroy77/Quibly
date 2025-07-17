import { Resend } from "resend";
import config from "../../config";

export const resend = new Resend(config.resend_api_key);

export const sendEmail = async (to: string, subject: string, template: string) => {
  return await resend.emails.send({
    from: "Quibly <message@mail.parthoroy.com>",
    to: to,
    subject,
    html: template,
  });
};
