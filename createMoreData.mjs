import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userNames = ['Alice', 'Bob', 'Charlie', 'Dave', 'Eve', 'Frank', 'Grace', 'Heidi', 'Ivan', 'Judy'];
const userEmails = ['alice', 'bob', 'charlie', 'dave', 'eve', 'frank', 'grace', 'heidi', 'ivan', 'judy'].map((name) => `${name}@example.com`);
const userPasswords = ['password1', 'password2', 'password3', 'password4', 'password5', 'password6', 'password7', 'password8', 'password9', 'password10'];

function createRandomUser() {
  const name = userNames[Math.floor(Math.random() * userNames.length)];
  const emailPrefix = userEmails[Math.floor(Math.random() * userEmails.length)];
  const email = `${emailPrefix}-${Math.random().toString(36).substr(2, 5)}@example.com`;
  const password = userPasswords[Math.floor(Math.random() * userPasswords.length)];
  return prisma.user.create({ data: { name, email, password } });
}

// Define a function to create a new post with randomized data and assign it to a random user
async function createRandomPost() {
  const title = postTitles[Math.floor(Math.random() * postTitles.length)];
  const content = postContents[Math.floor(Math.random() * postContents.length)];
  const userCount = await prisma.user.count();
  const authorId = Math.floor(Math.random() * userCount) + 1;
  return prisma.post.create({ data: { title, content, authorId: authorId } });
}

async function main() {
  // Create 10 users with randomized data
  const users = await Promise.all(
    Array(10)
      .fill(null)
      .map(() => createRandomUser())
  );

  // Create 20 posts with randomized data and assign them to random users
  const posts = await Promise.all(
    Array(20)
      .fill(null)
      .map(() => createRandomPost())
  );

  console.log('Users created:', users);
  console.log('Posts created:', posts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
    })
    .finally(async () => {
    await prisma.$disconnect();
    });