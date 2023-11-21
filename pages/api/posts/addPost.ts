import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session)
      return res
        .status(401)
        .json({ message: "Por favor, logue para fazer um post!" });

    const title: string = req.body.title;

    //Get User
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    //Check title
    if (title.length > 300){
      return res
        .status(403)
        .json({ message: "Por favor escreva um post menor!" });
    }
    if (!title.length){
      return res
        .status(403)
        .json({ message: "Por favor, não deixe este campo vazio!" });
    }

    //Create Post
    try {
      const result = await prisma.post.create({
        data: {
          title,
          userId: prismaUser.id,
        },
      });
      res.status(200).json(result)
    } catch (err) {
      res.status(403).json({err: "Erro ocorrido ao fazer um post"})

    }
  }
}
