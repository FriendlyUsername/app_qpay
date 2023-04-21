import Heading from "@/app/_components/Heading"
import prisma from "@/utils/prisma"
import { currentUser } from "@clerk/nextjs/app-beta"
import { Suspense } from "react"
import Loading from "./loading"
import { AddProductForm } from "@/app/_components/AddProductForm"
import { PlusCircleIcon } from "@heroicons/react/24/outline"

export default async function Restaurant() {
  const restaurant = await getRestaurant()
  if (!restaurant) return <div>no Restaurant found</div>
  if (restaurant === "No user found") return <div>{restaurant}</div>

  return (
    <div className="">
      <Suspense fallback={<Loading />}>
        {/*@ts-expect-error Server Components :(        */}
        <Heading
          title={"Add Product"}
          icon={<PlusCircleIcon className="h-6 w-6" />}
        />
        <AddProductForm method="create" />
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
  return data
}
