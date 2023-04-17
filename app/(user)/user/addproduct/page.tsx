import Heading from "@/app/_components/Heading"
import prisma from "@/utils/prisma"
import { currentUser } from "@clerk/nextjs/app-beta"
import { Suspense } from "react"
import Loading from "./loading"
import { AddFoodForm } from "@/app/_components/AddFoodForm"
import { PlusCircleIcon } from "@heroicons/react/24/outline"

export default async function Restaurant() {
  const restaurant = await getRestaurant()
  if (restaurant === "No user found") return <div>{restaurant}</div>

  return (
    <div className="">
      {/*@ts-expect-error Server Components :(        */}
      <Heading
        title={"Add Product"}
        icon={<PlusCircleIcon className="h-6 w-6" />}
      />
      <Suspense fallback={<Loading />}>
        <AddFoodForm method="create" />
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
