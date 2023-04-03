import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Schedule } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Schedule | Schedule[] | { message: string }>
) {
  const { method, query } = req
  const { id } = query

  if (method === 'GET') {
    try {
      if (id) {
        const schedule = await prisma.schedule.findUnique({
          where: {
            id: parseInt(id as string),
          },
        })
        if (schedule) {
          return res.status(200).json(schedule)
        }
        return res.status(404).json({ message: 'Schedule not found' })
      } else {
        const schedules = await prisma.schedule.findMany()
        return res.status(200).json(schedules)
      }
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  if (method === 'POST') {
    const { startDate, endDate } = req.body
    try {
      const newSchedule = await prisma.schedule.create({
        data: {
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        },
      })
      return res.status(201).json(newSchedule)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  if (method === 'PUT') {
    const { startDate, endDate } = req.body
    try {
      const updatedSchedule = await prisma.schedule.update({
        where: {
          id: parseInt(id as string),
        },
        data: {
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        },
      })
      return res.status(200).json(updatedSchedule)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  if (method === 'DELETE') {
    try {
      const deletedSchedule = await prisma.schedule.delete({
        where: {
          id: parseInt(id as string),
        },
      })
      return res.status(200).json(deletedSchedule)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  return res.status(400).json({ message: 'Invalid request' })
}
