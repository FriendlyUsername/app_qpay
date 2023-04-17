"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Category, Food, Restaurant, Tag } from "@prisma/client"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { MyInput } from "./MyInput"
import { useState } from "react"
import toast from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"
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

const orderSchema = z.any()

export default function CustomerForm({
  restaurant,
}: {
  restaurant: Restaurant & {
    categories: Category[]
    foods: Food[]
    tags: Tag[]
  }
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    control,
  } = useForm({
    resolver: zodResolver(orderSchema),
  })
  const { fields, append } = useFieldArray({
    control,
    name: "foods", // unique name for your Field Array
  })
  const [foods, setFoods] = useState<Food[]>([])
  const router = useRouter()
  const { slug } = useParams()
  console.log(slug)
  if (!restaurant) return <div className="text-white">no restaurant found</div>
  console.log(foods)
  async function processForm(data: any) {
    console.log(data, "data from customer form")
    // TODO make this come from input
    data.message = "great message"
    data.status = "pending"
    data.id = slug
    try {
      const res = await fetch("/api/addorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (res.status === 200) {
        const message = await res.json()
        toast.success(message.message)
      }
      if (res.status === 500) {
        toast.error("Something went wrong")
      }
      router.refresh()
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="px-4 my-auto text-white flex flex-col">
      <NavBar />
      <div>
        <h2>Categories</h2>
        {restaurant.categories.map((category: Category) => (
          <div key={category.id}>
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
      <div className="pt-4">
        <form onSubmit={handleSubmit(processForm)}>
          <h2>Products</h2>
          {restaurant.foods.map((food: Food) => (
            <button
              type="button"
              key={food.id}
              onClick={() => {
                append(food)
                setFoods([...foods, food])
              }}
            >
              {food.name}
            </button>
          ))}
          <p>foodscount : {foods.length}</p>
          <button className="block" type="submit">
            submit
          </button>
        </form>
      </div>
    </div>
  )
}