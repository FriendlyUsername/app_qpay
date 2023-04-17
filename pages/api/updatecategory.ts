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
  const category = req.body
  console.log("in updatecategory")
  try {
    const success = await prisma.restaurant.update({
      where: {
        user_id: userId,
      },
      data: {
        categories: {
          update: {
            where: {
              id: parseInt(category.id),
            },
            data: {
              name: category.name,
            },
          },
        },
      },
    })
    console.log(success, "success in update category")
    // retrieve data from your database
    res.status(200).json({ message: `Successfully updated ${category.name}!` })
  } catch (e) {
    console.log(e, "error updating food")
    res.status(500).json({ message: "error updating category" })
  }
}
