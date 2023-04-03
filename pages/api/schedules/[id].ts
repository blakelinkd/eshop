import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Schedule } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<Schedule | Schedule[]>) {
  const { id } = req.query

  if (req.method === 'GET') {
    var schedule = await prisma.schedule.findUnique({
      where: {
        id: parseInt(id as string)
      }
    })

    res.json(schedule)
  } else if (req.method === 'PUT') {
    const { startDate, endDate } = req.body

    const updatedSchedule = await prisma.schedule.update({
      where: {
        id: parseInt(id as string)
      },
      data: {
        startDate: new Date(startDate),
        endDate: new Date(endDate)
      }
    })

    res.json(updatedSchedule)
  } else if (req.method === 'DELETE') {
    try {
      await prisma.shift.deleteMany({
        where: {
          scheduleId: parseInt(id as string)
        }
      })

      const deletedSchedule = await prisma.schedule.delete({
        where: {
          id: parseInt(id as string)
        }
      })

      res.json(deletedSchedule)
    } catch (error) {
      console.log("error value: " + error)
      res.status(500).json({"error": error.message})
    }
  }
}
