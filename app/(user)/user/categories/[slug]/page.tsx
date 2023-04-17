import Heading from "@/app/_components/Heading"
import { Suspense } from "react"
import Loading from "../loading"
import type { Category, Food } from "@prisma/client"
import { AddFoodForm } from "@/app/_components/AddFoodForm"
import { currentUser } from "@clerk/nextjs/app-beta"
import prisma from "@/utils/prisma"
import { CategoryForm } from "@/app/_components/CategoryForm"
type CategoryReturn = "No user found" | Category | "No category found" | null
const ShowCategory = ({ category }: { category: CategoryReturn }) => {
  if (category === "No user found") return <div>not logged in</div>
  if (category === "No category found" || category === null)
    return <div>no Product found go create one :)</div>
  console.log(category, "logging foof from ShowFood")

  return <CategoryForm method="update" category={category} />
}

export default async function Category({ params }: { params: any }) {
  const category: CategoryReturn = await getCategory(params)
  return (
    <div className="">
      {/*@ts-expect-error Server Components :(        */}
      <Heading title={`Edit ${category.name}`} />
      {/* <Suspense fallback={<Loading />}> */}
      {/* {!restaurant && <RestaurantForm method="create" />}
        {restaurant && (
          <RestaurantForm restaurant={restaurant} method="update" />
        )} */}
      {/* <ProductsGrid /> */}
      <ShowCategory category={category} />
      {/* </Suspense> */}
    </div>
  )
}

async function getCategory(params: { slug: string }) {
  const user = await currentUser()
  if (!user) return "No user found"
  try {
    const data = await prisma.category.findFirst({
      where: {
        id: parseInt(params.slug),
        restaurant_id: user.id,
      },
    })
    return data
  } catch (err) {
    console.log(err)
    return "No category found"
  }
}
