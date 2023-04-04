import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import NodemailerProvider from '../../nodemailer.provider';

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const emailProvider = NodemailerProvider({
  host: process.env.SES_HOST,
  port: process.env.SES_PORT,
  auth: {
    user: process.env.SES_USER,
    pass: process.env.SES_PASSWORD,
  },
  from: process.env.EMAIL_FROM,
});



const handleSignUp = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
    return
  }

  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400).json({ error: 'Please fill in all fields' })
    return
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (existingUser) {
    res.status(409).json({ error: 'A user with that email already exists' })
    return
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })
  const token = crypto.randomBytes(32).toString('hex');

  // Save the token in the database
  const oneWeekFromNow = new Date()
  oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7)
  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires: oneWeekFromNow,
    },
  });

  await prisma.emailVerification.create({
    data: {
      email: email,
      token,
    },
  });

  // Send a verification email
  const verificationLink = `http://${req.headers.host}/api/auth/verify-email?token=${token}`;

  await emailProvider.sendVerificationRequest({
    identifier: email,
    url: verificationLink,
    token,
    baseUrl: `http://${req.headers.host}`,
    provider: emailProvider,
  });
  
  console.log(emailProvider)
  res.status(201).json({ userId: newUser.id })
}

export default handleSignUp
