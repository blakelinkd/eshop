import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { setCookie } from 'nookies'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).end() // Method Not Allowed
    return
  }

  const { email, password } = req.body

  // Find the user with the given email address
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })

  // If no user was found, display an error message
  if (!user) {
    res.status(401).json({ error: 'Invalid email or password' })
    return
  }

  // Compare the provided password with the hashed password in the database
  const isValidPassword = await bcrypt.compare(password, user.password)

  // If the password is invalid, display an error message
  if (!isValidPassword) {
    res.status(401).json({ error: 'Invalid email or password' })
    return
  }

  // Set a session cookie to indicate that the user is logged in
  setCookie({ res }, 'authToken', user.id.toString(), {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  })

  // Return a success message
  res.status(200).json({ message: 'Login successful' })
}
