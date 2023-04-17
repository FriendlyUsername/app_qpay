import CustomerForm from "@/app/_components/CustomerForm"
import prisma from "@/utils/prisma"
import type { Category, Food } from "@prisma/client"
const NavBar = () => {
  return (
    <div className="flex flex-row justify-between pb-4">
      <div>
        <a href="/app/customer/customer/[slug]" className="text-white">
          Home
        </a>
      </div>
      <div>
        <a href="/app/customer/customer/[slug]/cart" className="text-white">
          Cart
        </a>
      </div>
    </div>
  )
}

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
