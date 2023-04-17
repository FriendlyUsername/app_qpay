import prisma from "@/utils/prisma"
import { currentUser } from "@clerk/nextjs/app-beta"
import CategoryGridDisplay from "./CategoryGridDisplay"

export const CategoryGrid = async () => {
  const categories = await getCategories()

  if (categories === "No user found") return <div>no user found</div>
  if (categories.length === 0) return <div>no Categories found</div>

  return (
    <>
      <CategoryGridDisplay categories={categories[0].categories} />
    </>
  )
}
async function getCategories() {
  const user = await currentUser()
  if (!user) return "No user found"

  const categories = await prisma.restaurant.findMany({
    where: {
      user_id: user.id,
    },
    select: {
      categories: true,
    },
  })
  return categories
}
