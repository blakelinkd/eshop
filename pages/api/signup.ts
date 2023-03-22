import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

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

  res.status(201).json({ userId: newUser.id })
}

export default handleSignUp
