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
  const product = req.body
  try {
    const success = await prisma.restaurant.update({
      where: {
        user_id: userId,
      },
      data: {
        products: {
          create: {
            name: product.name,
            price: product.price.toString(),
            description: product.description,
            img: "https://picsum.photos/200/300?grayscale",
            tags: {
              createMany: {
                data: product.tags.map(({ tag }: { tag: string }) => ({
                  name: tag,
                  restaurantId: 1,
                })),
              },
            },
          },
        },
      },
    })
    console.log(success, "success in addproduct")
    // retrieve data from your database
    res
      .status(200)
      .json({ message: `Successfully added ${product.name}! to your products` })
  } catch (e) {
    console.log(e, "error adding product")
    res.status(500).json({ message: "error adding product" })
  }
}
