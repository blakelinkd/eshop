import { NextApiRequest, NextApiResponse } from 'next'
import { destroyCookie } from 'nookies'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Destroy the session cookie
    destroyCookie({ res }, 'userId')

    // Redirect to the home page
    res.writeHead(302, { Location: '/' })
    res.end()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
