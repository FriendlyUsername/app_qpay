import prisma from "@/utils/prisma"

export default async function handler(req: any, res: any) {
  const { userid } = req.query
  try {
    const orders = await prisma.restaurant.findUnique({
      where: {
        user_id: userid[0],
      },
      select: {
        orders: true,
      },
    })
    return res.status(200).json(orders)
  } catch (e) {
    console.log(e)
  }
  return res.status(200).json({ message: "no success" })
}
