import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  const emailVerification = await prisma.emailVerification.findUnique({ where: { token: token as string } });

  if (!emailVerification) {
    return res.status(404).json({ error: 'Invalid token' });
  }

  // Mark the user as verified
  await prisma.user.update({
    where: { email: emailVerification.email },
    data: { emailVerified: true },
  });

  // Delete the verification token from the database
  await prisma.emailVerification.delete({ where: { token: token as string } });

  res.status(200).json({ message: 'Email verified. You can now sign in.' });
}
