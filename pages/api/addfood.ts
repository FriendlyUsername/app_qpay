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
  console.log("food in addfood", food)
  try {
    const success = await prisma.restaurant.update({
      where: {
        user_id: userId,
      },
      data: {
        foods: {
          create: {
            name: food.name,
            price: food.price.toString(),
            description: food.description,
            img: "https://picsum.photos/200/300?grayscale",
          },
        },
      },
    })
    console.log(success, "success in addfood")
    // retrieve data from your database
    res
      .status(200)
      .json({ message: `Successfully added ${food.name}! to your products` })
  } catch (e) {
    console.log(e, "error adding food")
    res.status(500).json({ message: "error adding food" })
  }
}
