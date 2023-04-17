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
  const order = req.body
  console.log("orderid in delete order", order)
  try {
    const success = await prisma.restaurant.update({
      where: {
        user_id: userId,
      },
      data: {
        orders: {
          delete: {
            id: parseInt(order.id),
          },
        },
      },
    })
    // retrieve data from your database
    res.status(200).json({ message: "success deleting order" })
  } catch (e) {
    console.log(e, "error deleting order")
    res.status(200).json({ message: `Successfully deleted order !` })
  }
}
