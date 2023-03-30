import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  const session = await getSession({ req });
  const userId = session?.userId;

  switch (method) {
    case 'GET':
      try {
        const user = await prisma.user.findUnique({
          where: {
            id: Number(userId)
          },
          include: {
            cart: {
              include: {
                items: {
                  include: {
                    product: true
                  }
                }
              }
            }
          }
        });

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(user.cart);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }

    case 'POST':
      const { productId, quantity } = body;

      try {
        const user = await prisma.user.findUnique({
          where: {
            id: Number(userId)
          },
          include: {
            cart: {
              include: {
                items: true
              }
            }
          }
        });

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        const cartItem = user.cart.items.find(item => item.productId === productId);

        if (cartItem) {
          await prisma.cartItem.update({
            where: {
              id: cartItem.id
            },
            data: {
              quantity: cartItem.quantity + quantity
            }
          });
        } else {
          await prisma.cartItem.create({
            data: {
              cart: {
                connect: {
                  id: user.cart.id
                }
              },
              product: {
                connect: {
                  id: productId
                }
              },
              quantity: quantity
            }
          });
        }

        return res.status(201).json({ message: 'Item added to cart' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }

    case 'DELETE':
      const { itemId } = body;

      try {
        const cartItem = await prisma.cartItem.findUnique({
          where: {
            id: Number(itemId)
          }
        });

        if (!cartItem) {
          return res.status(404).json({ message: 'Cart item not found' });
        }

        await prisma.cartItem.delete({
          where: {
            id: Number(itemId)
          }
        });

        return res.status(200).json({ message: 'Cart item deleted' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}
