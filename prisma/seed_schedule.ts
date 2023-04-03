import { PrismaClient } from "@prisma/client";
const faker = require("faker");

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 10; i++) {
    const worker = await prisma.worker.create({
      data: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
      },
    });

    const schedule = await prisma.schedule.create({
      data: {
        startDate: faker.date.future(),
        endDate: faker.date.future(),
        workers: {
          connect: {
            id: worker.id,
          },
        },
      },
    });

    const shift = await prisma.shift.create({
      data: {
        start: faker.date.future(),
        end: faker.date.future(),
        workerId: worker.id,
        scheduleId: schedule.id,
      },
    });

    const availability = await prisma.availability.create({
      data: {
        start: faker.date.future(),
        end: faker.date.future(),
        workerId: worker.id,
      },
    });

    const timeOff = await prisma.timeOff.create({
      data: {
        start: faker.date.future(),
        end: faker.date.future(),
        approved: faker.datatype.boolean(),
        workerId: worker.id,
      },
    });

    const notification = await prisma.notification.create({
      data: {
        content: faker.lorem.sentence(),
        scheduleId: schedule.id,
      },
    });

    const report = await prisma.report.create({
      data: {
        type: faker.random.word(),
        data: {
          example: faker.lorem.sentence(),
       
        },
        scheduleId: schedule.id,
      },
    });
    
    console.log(
      `Created schedule ${i + 1}:`,
      schedule,
      "\nShift:",
      shift,
      "\nWorker:",
      worker,
      "\nAvailability:",
      availability,
      "\nTime Off:",
      timeOff,
      "\nNotification:",
      notification,
      "\nReport:",
      report
    );
}
}

main()
.catch((e) => {
console.error(e);
process.exit(1);
})
.finally(async () => {
await prisma.$disconnect();
});