import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import NodemailerProvider from '../../../nodemailer.provider';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();



export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    NodemailerProvider({
      from: process.env.EMAIL_FROM,
      host: process.env.SES_HOST,
      port: process.env.SES_PORT,
      secure: true,
      auth: {
        user: process.env.SES_USER,
        pass: process.env.SES_PASSWORD,
      },
    }),
  ],
});
