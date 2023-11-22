import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

type Data = {
  message: string;
  userId: string;
  postId: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session)
      return res
        .status(401)
        .json({ message: "Por favor, logue em sua conta para fazer um comentário!" });

    //Get User
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
    });
    try {
      const { title, postId } = req.body.data;

      if (!title.length) {
        return res.status(401).json({ message: "Por favor digite algo!" });
      }

      const result = await prisma.comment.create({
        data: {
            message: title,
            userId: prismaUser?.id,
            postId,
        } as Data,
      })
      res.status(200).json(result)
    } catch (err) {
      res.status(403).json({ err: "Erro ocorrido ao buscar posts!" });
    }
  }
}
