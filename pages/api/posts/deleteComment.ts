import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions);
    if (!session)
      return res
        .status(401)
        .json({ message: "Por favor, logue em sua conta!" });

    //Delete a post
    try {
      const commentId = req.body.id
      const result = await prisma.comment.delete({
        where: {
            id: commentId
        }
      })
      res.status(200).json(result)
    } catch (err) {
    //   res.status(403).json({err: "Erro ocorrido ao buscar posts!"})

    }
  }
}
