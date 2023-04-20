import prisma from "@/utils/prisma"
import { currentUser } from "@clerk/nextjs/app-beta"
import type { Food, Tag } from "@prisma/client"
import ProductsGridDisplay from "./ProductsGridDisplay"

export default async function ProductsGrid() {
  const products = await getProducts()
  console.log(products)
  if (products === "No user found") return <div>no user found</div>
  if (!products) return <div>no products found</div>
  console.log(products, "logging products from ProductsGrid")
  return <ProductsGridDisplay products={products.foods} />
}

async function getProducts() {
  const user = await currentUser()
  if (!user) return "No user found"

  const data = await prisma.restaurant.findFirst({
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
