import nodemailer, { Transporter } from 'nodemailer';

const transporter: Transporter = nodemailer.createTransport({
  service: 'your-email-service', // e.g., 'gmail', 'outlook', etc.
  auth: {
    user: process.env.EMAIL_SERVER_USER!,
    pass: process.env.EMAIL_SERVER_PASSWORD!,
  },
});

export default async function sendEmail(to: string, subject: string, text: string): Promise<void> {
  await transporter.sendMail({
    from: process.env.EMAIL_SERVER_USER!,
    to,
    subject,
    text,
  });
}
