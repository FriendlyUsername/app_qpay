import Heading from "@/app/_components/Heading"
import { Suspense } from "react"
import Loading from "../loading"
import type { Food } from "@prisma/client"
import { AddFoodForm } from "@/app/_components/AddFoodForm"
import { currentUser } from "@clerk/nextjs/app-beta"
import prisma from "@/utils/prisma"
type FoodReturn = "No user found" | Food | "No food found" | null
const ShowFood = ({ food }: { food: FoodReturn }) => {
  if (food === "No user found") return <div>not logged in</div>
  if (food === "No food found" || food === null)
    return <div>no Product found go create one :)</div>
  console.log(food, "logging foof from ShowFood")

  return <AddFoodForm method="update" food={food} />
}

export default async function Restaurant({ params }: { params: any }) {
  const food: FoodReturn = await getFood(params)
  return (
    <div className="">
      {/*@ts-expect-error Server Components :(        */}
      <Heading title={`Edit ${food.name}`} />
      {/* <Suspense fallback={<Loading />}> */}
      {/* {!restaurant && <RestaurantForm method="create" />}
        {restaurant && (
          <RestaurantForm restaurant={restaurant} method="update" />
        )} */}
      {/* <ProductsGrid /> */}
      <ShowFood food={food} />
      {/* </Suspense> */}
    </div>
  )
}

async function getFood(params: any) {
  const user = await currentUser()
  if (!user) return "No user found"
  try {
    const data = await prisma.food.findFirst({
      where: {
        id: parseInt(params.slug),
        restaurant_id: user.id,
      },
    })
    return data
  } catch (err) {
    console.log(err)
    return "No food found"
  }
}
