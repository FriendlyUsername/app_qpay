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
  console.log("in updatefood")
  try {
    const success = await prisma.restaurant.update({
      where: {
        user_id: userId,
      },
      data: {
        products: {
          update: {
            where: {
              id: parseInt(product.id),
            },
            data: {
              description: product.description,
              category: product.category,
              name: product.name,
              price: product.price.toString(),
              tags: {
                createMany: {
                  data:
                    product.tags?.map((tag: any) => ({
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
    res.status(200).json({ message: `Successfully updated ${product.name}!` })
  } catch (e) {
    console.log(e, "error updating product")
    res.status(500).json({ message: "error updatign product" })
  }
}
