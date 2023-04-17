import type { NextApiRequest, NextApiResponse } from "next"
import { getAuth } from "@clerk/nextjs/server"
import prisma from "@/utils/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req)
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" })
    return
  }
  const food = req.body
  console.log("food in deletefood", food)
  try {
    const success = await prisma.restaurant.update({
      where: {
        user_id: userId,
      },
      data: {
        foods: {
          delete: {
            id: parseInt(food.id),
          },
        },
      },
    })
    // retrieve data from your database
    res.status(200).json({ message: `Successfully deleted product !` })
  } catch (e) {
    console.log(e, "error deleting food")
    res.status(500).json({ message: "error deleting product" })
  }
}
