// scripts/createUser.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash('BonerFart99', saltRounds);

  const newUser = await prisma.user.create({
    data: {
      name: 'test_user',
      email: 'test_user@example.com', // Replace with the desired email address
      password: hashedPassword,
    },
  });

  console.log('User created:', newUser);
}

main()
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
