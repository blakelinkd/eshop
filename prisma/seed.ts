export {}
const { PrismaClient } = require('@prisma/client');
const faker = require('faker');

const prisma = new PrismaClient();

async function seed() {
  try {
    const userCount = 5;
    const productCount = 10;
    const postCount = 20;

    // create users
    const users = [];
    for (let i = 0; i < userCount; i++) {
      const user = await prisma.user.create({
        data: {
          name: faker.name.findName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        },
      });
      users.push(user);
    }

    // create products
    const products = [];
    for (let i = 0; i < productCount; i++) {
      const product = await prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          price: faker.commerce.price(),
          description: faker.lorem.sentences(),
          image: faker.image.imageUrl(),
        },
      });
      products.push(product);
    }

    // create posts
    const posts = [];
    for (let i = 0; i < postCount; i++) {
      const post = await prisma.post.create({
        data: {
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraph(),
          published: faker.datatype.boolean(),
          user: {
            connect: { id: faker.random.arrayElement(users).id },
          },
        },
      });
      posts.push(post);
    }

    // create carts and cart items
    for (const user of users) {
      const cart = await prisma.cart.create({
        data: {
          user: {
            connect: { id: user.id },
          },
        },
      });
      const cartItems = [];
      for (let i = 0; i < faker.datatype.number({ min: 1, max: 5 }); i++) {
        const product = faker.random.arrayElement(products);
        const cartItem = {
          productId: product.id,
          quantity: faker.datatype.number({ min: 1, max: 10 }),
        };
        cartItems.push(cartItem);
      }
      await prisma.cartItem.createMany({
        data: cartItems.map((item) => ({
          cartId: cart.id,
          ...item,
        })),
      });
    }

    console.log('Seed data created successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
