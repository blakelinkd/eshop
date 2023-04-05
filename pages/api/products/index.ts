import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Product } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, price, description, image } = req.body
    const product = await prisma.product.create({
      data: {
        name,
        price,
        description,
        image,
      },
    })
    res.json(product)
  } else if (req.method === 'GET') {
    const products = await prisma.product.findMany()
    res.json(products)
  } else if (req.method === 'PUT') {
    const { id, name, price, description, image } = req.body
    const product = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        price,
        description,
        image,
      },
    })
    res.json(product)
  } else if (req.method === 'DELETE') {
    const { id } = req.body
    const product = await prisma.product.delete({
      where: {
        id: Number(id),
      },
    })
    res.json(product)
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
