import CustomerForm from "@/app/_components/CustomerForm"
import prisma from "@/utils/prisma"

export default async function Home(params: { params: { slug: string } }) {
  const restaurant = await getRestaurant(params)
  if (!restaurant) return <div className="text-white">no restaurant found</div>
  if (restaurant.length === 0)
    return <div className="text-white">no restaurant found</div>
  return <CustomerForm restaurant={restaurant[0]} />
}
async function getRestaurant({ params }: { params: { slug: string } }) {
  const userId = params.slug
  const restaurant = await prisma.restaurant.findMany({
    where: {
      user_id: userId,
    },
    include: {
      categories: true,
      foods: true,
      tags: true,
    },
  })
  return restaurant
}
