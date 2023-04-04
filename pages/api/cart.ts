import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { productId } = req.body;

  try {
    const cart = await prisma.cart.create({
      data: {
        user: { connect: { email: session.user.email } },
        product: { connect: { id: productId } },
      },
      include: {
        product: true,
      },
    });

    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
