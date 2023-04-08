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
  const restaurant = req.body
  const success = await prisma.restaurant.create({
    data: {
      user_id: restaurant.user_id,
      name: restaurant.name,
      address: restaurant.address,
      city: restaurant.city,
      state: restaurant.state,
      zip: restaurant.zip,
    },
  })
  console.log(success)
  // retrieve data from your database
  res.status(200).json({ message: "all good" })
}
