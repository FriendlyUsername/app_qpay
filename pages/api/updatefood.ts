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
  console.log("in updatefood")
  try {
    const success = await prisma.restaurant.update({
      where: {
        user_id: userId,
      },
      data: {
        foods: {
          update: {
            where: {
              id: parseInt(food.id),
            },
            data: {
              description: food.description,
              category: food.category,
              name: food.name,
              price: food.price.toString(),
              tags: {
                createMany: {
                  data:
                    food.tags?.map((tag: any) => ({
                      tag: tag.tag,
                    })) || [],
                },
              },
            },
          },
        },
      },
    })
    console.log(success, "success in update")
    // retrieve data from your database
    res.status(200).json({ message: `Successfully updated ${food.name}!` })
  } catch (e) {
    console.log(e, "error updating food")
    res.status(500).json({ message: "error updatign food" })
  }
}
