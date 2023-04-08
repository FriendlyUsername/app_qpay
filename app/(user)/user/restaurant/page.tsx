import Heading from "@/app/_components/Heading"
import { RestaurantForm } from "@/app/_components/RestaurantForm"
import prisma from "@/utils/prisma"
import { currentUser } from "@clerk/nextjs/app-beta"
import { Suspense } from "react"
import Loading from "./loading"

export default async function Restaurant() {
  const restaurant = await getRestaurant()
  if (restaurant === "No user found") return <div>{restaurant}</div>

  return (
    <div className="">
      {/*@ts-expect-error Server Components :(        */}
      <Heading title="Restaurant" />
      <Suspense fallback={<Loading />}>
        {!restaurant && <RestaurantForm method="create" />}
        {restaurant && (
          <RestaurantForm restaurant={restaurant} method="update" />
        )}
      </Suspense>
    </div>
  )
}

async function getRestaurant() {
  const user = await currentUser()
  if (!user) return "No user found"

  const data = await prisma.restaurant.findFirst({
    where: {
      user_id: user.id,
    },
  })
  console.log(data)
  return data
}
