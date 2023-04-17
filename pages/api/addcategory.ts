import type { NextApiRequest, NextApiResponse } from "next"
import { getAuth } from "@clerk/nextjs/server"
import prisma from "@/utils/prisma"
import { Category } from "@prisma/client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req)
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" })
    return
  }
  const category: Category = req.body
  try {
    const success = await prisma.category.create({
      data: {
        name: category.name,
        Restaurant: {
          connect: {
            user_id: userId,
          },
        },
      },
    })
    // retrieve data from your database
    res.status(200).json({ message: `Successfully added ${category.name}!` })
  } catch (e) {
    console.log(e, "error adding category")
    res.status(500).json({ message: "error adding category" })
  }
}
