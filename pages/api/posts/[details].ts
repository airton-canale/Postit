import prisma from '../../../prisma/client'
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
        const data = await prisma.post.findUnique({
            where: {
                id: req.query.details as string
            },
            include: {
              user: true, 
              Comment: {
                orderBy: {
                  createdAt: "desc"
                },
                include: {
                  user: true
                }
              }
            }
        })
        return res.status(200).json(data)
    } catch (err) {
      res.status(403).json({err: "Erro ocorrido ao buscar post!"})
    }
}
}
