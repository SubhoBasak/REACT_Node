import nodemailer from "nodemailer";
import template from "./templates.js";

const sendEmail = (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === "true" ? true : false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PSWD,
    },
  });

  return transporter.sendMail({
    from: `RECRM | Zubylake <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

export const verifyEmail = (to, otp) =>
  sendEmail(to, "AUTH EMAIL", template.authEmail(otp));
