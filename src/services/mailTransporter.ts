import nodemailer, { Transporter } from "nodemailer";
import { config } from "../config";

const mailConfig = {
  SMTP_HOST: config.SMTP_HOST,
  SMTP_PORT: config.SMTP_PORT,
  SMTP_USERNAME: config.SMTP_USERNAME,
  SMTP_PASSWORD: config.SMTP_PASSWORD,
};

const transporter: Transporter = nodemailer.createTransport({
  host: mailConfig.SMTP_HOST,
  port: mailConfig.SMTP_PORT,
  secure: mailConfig.SMTP_PORT === 465,
  auth: {
    user: mailConfig.SMTP_USERNAME,
    pass: mailConfig.SMTP_PASSWORD,
  },
});

export default transporter;
