import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/utils/prisma"
import { Product } from "@prisma/client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const order = req.body
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
            products: {
              createMany: {
                data: order.order.foods.map((product: Product) => ({
                  name: product.name,
                  price: product.price,
                  description: product.description,
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
