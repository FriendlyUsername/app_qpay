import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/utils/prisma"
import type { Food } from "@prisma/client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const order = req.body
  console.log("order in addorder", order)
  try {
    const success = await prisma.restaurant.update({
      where: {
        user_id: order.id,
      },
      data: {
        orders: {
          create: {
            message: order.message || "",
            status: order.status || "pending",
            foods: {
              createMany: {
                data: order.foods.map((food: Food) => ({
                  name: food.name,
                  price: food.price,
                  description: food.description,
                })),
              },
            },
          },
        },
      },
    })
    console.log(success, "success in addfood")
    // retrieve data from your database
    res.status(200).json({ message: `Successfully created order` })
  } catch (e) {
    console.log(e, "error adding order")
    res.status(500).json({ message: "error adding order" })
  }
}
