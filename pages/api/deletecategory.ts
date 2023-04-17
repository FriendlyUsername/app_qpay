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
  console.log("category in deletecategory", category)
  try {
    const success = await prisma.category.delete({
      where: {
        id: parseInt(category.id),
      },
      include: {
        Food: true,
      },
    })
    // retrieve data from your database
    res.status(200).json({ message: `Successfully deleted category !` })
  } catch (e) {
    console.log(e, "error deleting category")
    res.status(500).json({ message: "error deleting category" })
  }
}
