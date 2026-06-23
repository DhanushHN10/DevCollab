import nodemailer from 'nodemailer';


export const getTransporter = () => {
  if (!process.env.EMAIL_ID || !process.env.EMAIL_PASSWORD) {
    throw new Error("Email credentials not configured");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};
