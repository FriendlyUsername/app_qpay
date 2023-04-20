import CustomerForm from "@/app/_components/CustomerForm"
import { CustomerFoodList } from "@/app/_components/CustomerGrid"
import prisma from "@/utils/prisma"

export default async function Home(params: { params: { slug: string } }) {
  const restaurant = await getRestaurant(params)
  if (!restaurant) return <div className="text-white">no restaurant found</div>
  return (
    <CustomerForm restaurant={restaurant}>
      {/*@ts-expect-error server comp  */}
      <CustomerFoodList foods={restaurant.foods} />
    </CustomerForm>
  )
}
async function getRestaurant({ params }: { params: { slug: string } }) {
  const userId = params.slug
  const restaurant = await prisma.restaurant.findFirst({
    where: {
      user_id: userId,
    },
    include: {
      categories: true,
      foods: {
        include: {
          tags: true,
        },
      },
    },
  })
  return restaurant
}
