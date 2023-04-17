import prisma from "@/utils/prisma"
import { currentUser } from "@clerk/nextjs/app-beta"
import type { Food, Tag } from "@prisma/client"
import ProductsGridDisplay from "./ProductsGridDisplay"

export default async function ProductsGrid() {
  const products = await getProducts()
  if (products === "No user found") return <div>no user found</div>
  if (products.length === 0) return <div>no products found</div>
  console.log(products, "logging products from ProductsGrid")
  return <ProductsGridDisplay products={products[0].foods} />
}

async function getProducts() {
  const user = await currentUser()
  if (!user) return "No user found"

  const data = await prisma.restaurant.findMany({
    where: {
      user_id: user.id,
    },
    select: {
      foods: {
        include: {
          tags: true,
        },
      },
    },
  })
  return data
}
