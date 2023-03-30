import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient()

export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const posts = await prisma.post.findMany()
            // Render posts on the screen
            const postList = posts.map(post => `<li>${post.title}: ${post.content} (Author ID: ${post.authorId})</li>`).join('')
            res.setHeader('Content-Type', 'text/html')
            res.status(200).end(`<h1>All Posts</h1><ul>${postList}</ul>`)
        } catch (error) {
            res.status(500).json({ error: 'Error fetching posts' })
        }
    }
    else if ( req.method === 'POST') {
        try {
            const postData = req.body
            const newPost = await prisma.post.create({ data: postData })
            res.status(200).json(newPost)
        }
        catch (error) {
            res.status(500).json({ error: `post method exception:\n${error}`})
        }
    }
    else {
        res.status(405).json({ error: 'Method not allowed' })
    }
}
